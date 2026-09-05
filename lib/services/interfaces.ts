import {
  Lead,
  LeadDocument,
  LeadStatus,
  LeadSubmissionInput,
  ScoringResult,
} from "@/lib/types/lead";

/**
 * Service contracts. Every concrete implementation (mock, Prisma-backed,
 * HubSpot-backed, etc.) implements these interfaces. Callers (API routes,
 * future admin dashboard) depend only on these types — never on a
 * concrete class — so swapping providers never touches calling code.
 */

export interface LeadService {
  create(input: LeadSubmissionInput, scoring: ScoringResult, documents: LeadDocument[]): Promise<Lead>;
  getById(id: string): Promise<Lead | null>;
  updateStatus(id: string, status: LeadStatus, actor: "SYSTEM" | "SALESPERSON"): Promise<Lead>;
  addNote(id: string, note: string): Promise<Lead>;
  assignSalesperson(id: string, salesperson: string): Promise<Lead>;
  list(filter?: LeadListFilter): Promise<Lead[]>;
  /** Idempotency guard: has an equivalent submission already been recorded recently? */
  findRecentDuplicate(email: string, windowMs: number): Promise<Lead | null>;
}

export interface LeadListFilter {
  status?: LeadStatus;
  minScore?: number;
  projectType?: string;
  location?: string;
}

export interface ScoringService {
  score(input: LeadSubmissionInput["project"]): ScoringResult;
}

/**
 * CRM abstraction. Concrete adapters: HubSpotCRMService, PipedriveCRMService,
 * SalesforceCRMService, RDStationCRMService. The API layer only ever talks
 * to this interface.
 */
export interface CRMService {
  providerName: string;
  syncLead(lead: Lead): Promise<{ success: boolean; externalId?: string; error?: string }>;
}

export interface NotificationService {
  /** Internal commercial-team alert (e.g. Slack, internal webhook, SMS). */
  notifyNewLead(lead: Lead): Promise<{ success: boolean; error?: string }>;
}

export interface EmailService {
  sendCommercialNotification(lead: Lead): Promise<{ success: boolean; error?: string }>;
  sendConfirmationToLead(lead: Lead): Promise<{ success: boolean; error?: string }>;
}

export interface StorageService {
  /** Persists an uploaded file and returns an internal reference — never a public URL. */
  store(file: {
    fileName: string;
    fileType: string;
    sizeBytes: number;
    data: ArrayBuffer | Buffer;
  }): Promise<{ internalRef: string }>;
  /** Generates a short-lived signed URL for authorized internal viewing only. */
  getSignedUrl(internalRef: string, expiresInSeconds?: number): Promise<string>;
  validate(file: { fileType: string; sizeBytes: number }): { valid: boolean; reason?: string };
}

export type AnalyticsEventName =
  | "page_view"
  | "project_view"
  | "capability_view"
  | "qualification_started"
  | "qualification_completed"
  | "contact_started"
  | "lead_submitted"
  | "document_uploaded"
  | "cta_clicked";

export interface AnalyticsService {
  track(event: AnalyticsEventName, properties?: Record<string, unknown>): Promise<void>;
}
