import { randomUUID } from "crypto";
import {
  Lead,
  LeadDocument,
  LeadStatus,
  LeadSubmissionInput,
  ScoringResult,
} from "@/lib/types/lead";
import { LeadListFilter, LeadService } from "@/lib/services/interfaces";
import { CONSENT_CONFIG } from "@/lib/config/questionnaire-config";

/**
 * In-memory LeadService.
 *
 * Ships today with zero external dependencies so the qualification flow
 * can be built and tested end-to-end before a database is provisioned.
 * Swap for `PrismaLeadService` (implements the same interface, backed by
 * prisma/schema.prisma) once DATABASE_URL is available — no caller changes.
 *
 * NOTE: state is per-process and resets on redeploy/restart. Do not use
 * this implementation in production.
 */
export class MockLeadService implements LeadService {
  private store = new Map<string, Lead>();

  async create(
    input: LeadSubmissionInput,
    scoring: ScoringResult,
    documents: LeadDocument[]
  ): Promise<Lead> {
    const now = new Date().toISOString();
    const lead: Lead = {
      id: randomUUID(),
      createdAt: now,
      status: "NEW",
      leadScore: scoring.score,
      priority: scoring.priority,
      qualificationReason: scoring.qualificationReason,
      contact: input.contact,
      project: input.project,
      documents,
      marketing: {
        utmSource: input.marketing.utmSource ?? null,
        utmMedium: input.marketing.utmMedium ?? null,
        utmCampaign: input.marketing.utmCampaign ?? null,
        utmTerm: input.marketing.utmTerm ?? null,
        utmContent: input.marketing.utmContent ?? null,
        referrer: input.marketing.referrer ?? null,
        landingPage: input.marketing.landingPage ?? null,
      },
      technical: {
        device: input.technical.device,
        createdAt: now,
        updatedAt: now,
      },
      consent: {
        commercialContactAccepted: true,
        acceptedAt: now,
        policyVersion: CONSENT_CONFIG.policyVersion,
      },
      assignedSalesperson: null,
      events: [
        {
          id: randomUUID(),
          type: "CREATED",
          createdAt: now,
          actor: "SYSTEM",
          payload: { source: "qualification_form" },
        },
      ],
    };
    this.store.set(lead.id, lead);
    return lead;
  }

  async getById(id: string): Promise<Lead | null> {
    return this.store.get(id) ?? null;
  }

  async updateStatus(id: string, status: LeadStatus, actor: "SYSTEM" | "SALESPERSON"): Promise<Lead> {
    const lead = this.store.get(id);
    if (!lead) throw new Error(`Lead ${id} not found`);
    lead.status = status;
    lead.technical.updatedAt = new Date().toISOString();
    lead.events.push({
      id: randomUUID(),
      type: "STATUS_CHANGED",
      createdAt: lead.technical.updatedAt,
      actor,
      payload: { status },
    });
    return lead;
  }

  async addNote(id: string, note: string): Promise<Lead> {
    const lead = this.store.get(id);
    if (!lead) throw new Error(`Lead ${id} not found`);
    lead.events.push({
      id: randomUUID(),
      type: "NOTE_ADDED",
      createdAt: new Date().toISOString(),
      actor: "SALESPERSON",
      payload: { note },
    });
    return lead;
  }

  async assignSalesperson(id: string, salesperson: string): Promise<Lead> {
    const lead = this.store.get(id);
    if (!lead) throw new Error(`Lead ${id} not found`);
    lead.assignedSalesperson = salesperson;
    return lead;
  }

  async list(filter?: LeadListFilter): Promise<Lead[]> {
    let leads = Array.from(this.store.values());
    if (filter?.status) leads = leads.filter((l) => l.status === filter.status);
    if (filter?.minScore !== undefined) leads = leads.filter((l) => l.leadScore >= filter.minScore!);
    if (filter?.projectType) leads = leads.filter((l) => l.project.type === filter.projectType);
    if (filter?.location) leads = leads.filter((l) => l.project.location.includes(filter.location!));
    return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async findRecentDuplicate(email: string, windowMs: number): Promise<Lead | null> {
    const cutoff = Date.now() - windowMs;
    for (const lead of this.store.values()) {
      if (
        lead.contact.email.toLowerCase() === email.toLowerCase() &&
        new Date(lead.createdAt).getTime() >= cutoff
      ) {
        return lead;
      }
    }
    return null;
  }
}

/** Process-wide singleton so API routes share state across requests in dev. */
export const mockLeadService = new MockLeadService();
