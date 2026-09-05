/**
 * Core domain types for the Lead entity.
 *
 * These types are the single source of truth for lead shape across:
 * the qualification UI (Phase 2), the API layer, the scoring engine,
 * and every service (LeadService, CRMService, EmailService, etc).
 *
 * Business rules and copy live in lib/config and lib/scoring, never here.
 */

export type LeadStatus =
  | "NEW"
  | "CONTACTING"
  | "QUALIFIED"
  | "MEETING"
  | "PROPOSAL"
  | "NEGOTIATION"
  | "WON"
  | "LOST";

export type LeadPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface LeadContact {
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
}

export interface LeadProject {
  type: string;
  location: string;
  landStatus: string;
  landArea: string | null;
  builtArea: string;
  projectStage: string;
  estimatedInvestment: string;
  expectedStart: string;
  servicesRequired: string[];
  description: string | null;
}

export type DocumentFileType =
  | "pdf"
  | "dwg"
  | "dxf"
  | "jpg"
  | "jpeg"
  | "png"
  | "zip";

export interface LeadDocument {
  fileName: string;
  /**
   * Internal storage reference only (e.g. object key / signed-URL id).
   * NEVER expose a raw, permanent public storage URL to the client.
   * Public-facing access must always go through StorageService.getSignedUrl().
   */
  fileUrl: string;
  fileType: DocumentFileType;
  fileSizeBytes: number;
  uploadedAt: string;
}

export interface LeadMarketingAttribution {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  referrer: string | null;
  landingPage: string | null;
}

export interface LeadTechnicalMetadata {
  device: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadConsent {
  commercialContactAccepted: boolean;
  acceptedAt: string;
  policyVersion: string;
}

/**
 * The internal, full-fidelity Lead record.
 * This is what persists in the database and what CRM/Email/Notification
 * services consume. It is NEVER returned directly by a public API.
 */
export interface Lead {
  id: string;
  createdAt: string;
  status: LeadStatus;
  leadScore: number;
  priority: LeadPriority;

  contact: LeadContact;
  project: LeadProject;
  documents: LeadDocument[];
  marketing: LeadMarketingAttribution;
  technical: LeadTechnicalMetadata;
  consent: LeadConsent;

  /** Free-text explanation of why the score/priority were assigned. Internal only. */
  qualificationReason: string;

  /** Assigned commercial owner, set later from the internal dashboard (Phase 4). */
  assignedSalesperson: string | null;

  /** Append-only audit trail: status changes, notes, notifications sent. */
  events: LeadEvent[];
}

export type LeadEventType =
  | "CREATED"
  | "STATUS_CHANGED"
  | "NOTE_ADDED"
  | "NOTIFICATION_SENT"
  | "EMAIL_SENT"
  | "CRM_SYNCED"
  | "CRM_SYNC_FAILED"
  | "DOCUMENT_ADDED";

export interface LeadEvent {
  id: string;
  type: LeadEventType;
  createdAt: string;
  actor: "SYSTEM" | "SALESPERSON";
  payload: Record<string, unknown>;
}

/**
 * The payload accepted from the public qualification form (Phase 2 UI).
 * Intentionally narrower than Lead: no id, score, status, or internal fields.
 * This is what gets validated by lib/validation/lead-schema.ts.
 */
export interface LeadSubmissionInput {
  contact: LeadContact;
  project: LeadProject;
  /** fileUrl is assigned server-side after StorageService upload; client only sends the upload reference. */
  documents: Array<Omit<LeadDocument, "fileUrl"> & { uploadRef: string }>;
  marketing: Partial<LeadMarketingAttribution>;
  technical: { device: string | null };
  consent: { commercialContactAccepted: true };
}

/** Result returned to the client after a successful submission. Contains zero internal scoring data. */
export interface LeadSubmissionResult {
  id: string;
  status: "RECEIVED";
  createdAt: string;
}

export interface ScoringResult {
  score: number;
  priority: LeadPriority;
  qualificationReason: string;
}
