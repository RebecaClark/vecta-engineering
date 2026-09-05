import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { leadSubmissionSchema } from "@/lib/validation/lead-schema";
import { services } from "@/lib/services";
import { LeadDocument, LeadSubmissionInput, LeadSubmissionResult } from "@/lib/types/lead";

export const runtime = "nodejs";

/**
 * In-memory rate limiter (per-IP, fixed window). Adequate for Phase 1.
 * Phase 3 should replace this with a durable store (Redis/Upstash) once
 * the app runs across multiple instances/edge regions.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const DUPLICATE_WINDOW_MS = 5 * 60_000;

const rateLimitBuckets = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitBuckets.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  rateLimitBuckets.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  // --- Rate limiting -------------------------------------------------
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas submissões em pouco tempo. Tente novamente em instantes." },
      { status: 429 }
    );
  }

  // --- Parse + validate ------------------------------------------------
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const parsed = leadSubmissionSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", details: z.treeifyError(parsed.error) },
      { status: 422 }
    );
  }
  const input = parsed.data;

  // --- Duplicate prevention -------------------------------------------
  const duplicate = await services.lead.findRecentDuplicate(input.contact.email, DUPLICATE_WINDOW_MS);
  if (duplicate) {
    const result: LeadSubmissionResult = {
      id: duplicate.id,
      status: "RECEIVED",
      createdAt: duplicate.createdAt,
    };
    return NextResponse.json(result, { status: 200 });
  }

  // --- Validate + persist documents (StorageService) -------------------
  const storedDocuments: LeadDocument[] = [];
  for (const doc of input.documents) {
    const validation = services.storage.validate({ fileType: doc.fileType, sizeBytes: doc.fileSizeBytes });
    if (!validation.valid) {
      return NextResponse.json({ error: validation.reason ?? "Arquivo inválido." }, { status: 422 });
    }
    // Phase 1: files are already uploaded client-side to a pre-signed slot (uploadRef).
    // We record the reference here; a real StorageService would confirm/finalize it.
    storedDocuments.push({
      fileName: doc.fileName,
      fileType: doc.fileType,
      fileSizeBytes: doc.fileSizeBytes,
      uploadedAt: doc.uploadedAt,
      fileUrl: doc.uploadRef,
    });
  }

  // --- Score --------------------------------------------------------
  const scoring = services.scoring.score(input.project);

  // --- Save lead ------------------------------------------------------
  const submissionInput: LeadSubmissionInput = {
    contact: input.contact,
    project: input.project,
    documents: input.documents,
    marketing: input.marketing,
    technical: input.technical,
    consent: input.consent,
  };
  const lead = await services.lead.create(submissionInput, scoring, storedDocuments);

  // --- Marketing attribution is already captured on the lead record above ---

  // --- Notify + email (best-effort: failures are logged, never block the response) ---
  const [notifyResult, commercialEmailResult, confirmationEmailResult, crmResult] = await Promise.allSettled([
    services.notification.notifyNewLead(lead),
    services.email.sendCommercialNotification(lead),
    services.email.sendConfirmationToLead(lead),
    services.crm.syncLead(lead),
  ]);

  for (const [label, outcome] of [
    ["notification", notifyResult],
    ["commercial_email", commercialEmailResult],
    ["confirmation_email", confirmationEmailResult],
    ["crm_sync", crmResult],
  ] as const) {
    if (outcome.status === "rejected") {
      console.error(`[leads.POST] ${label} failed`, outcome.reason);
    }
  }

  await services.analytics.track("lead_submitted", {
    leadId: lead.id,
    projectType: lead.project.type,
    priority: lead.priority,
  });

  // --- Confirmation (never leak score/priority to the client) ---------
  const result: LeadSubmissionResult = {
    id: lead.id,
    status: "RECEIVED",
    createdAt: lead.createdAt,
  };
  return NextResponse.json(result, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
