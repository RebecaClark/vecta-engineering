import {
  AnalyticsService,
  CRMService,
  EmailService,
  LeadService,
  NotificationService,
  ScoringService,
  StorageService,
} from "@/lib/services/interfaces";
import { mockLeadService } from "@/lib/services/mock/mock-lead-service";
import {
  mockAnalyticsService,
  mockCRMService,
  mockEmailService,
  mockNotificationService,
  mockStorageService,
} from "@/lib/services/mock/mock-services";
import { calculateLeadScore } from "@/lib/scoring/scoring-engine";

/**
 * Composition root.
 *
 * This is the ONLY file that should decide which concrete implementation
 * backs each service. API routes and future admin-dashboard code import
 * from here — never directly from a mock/* or a provider-specific file.
 *
 * To go live with a real provider:
 *   1. Implement the interface (e.g. lib/services/crm/hubspot-crm-service.ts)
 *   2. Add a branch below keyed off an env var (e.g. CRM_PROVIDER=hubspot)
 *   3. Nothing else in the codebase changes.
 */

const scoringService: ScoringService = {
  score: calculateLeadScore,
};

function resolveLeadService(): LeadService {
  // TODO(Phase 3): return new PrismaLeadService() when DATABASE_URL is set.
  return mockLeadService;
}

function resolveCRMService(): CRMService {
  // TODO(Phase 3): switch on process.env.CRM_PROVIDER ("hubspot" | "pipedrive" | "salesforce" | "rdstation").
  return mockCRMService;
}

function resolveNotificationService(): NotificationService {
  return mockNotificationService;
}

function resolveEmailService(): EmailService {
  // TODO(Phase 3): swap for a Resend/SES-backed EmailService when credentials exist.
  return mockEmailService;
}

function resolveStorageService(): StorageService {
  // TODO(Phase 3): swap for an S3/GCS-backed StorageService when credentials exist.
  return mockStorageService;
}

function resolveAnalyticsService(): AnalyticsService {
  return mockAnalyticsService;
}

export const services = {
  lead: resolveLeadService(),
  scoring: scoringService,
  crm: resolveCRMService(),
  notification: resolveNotificationService(),
  email: resolveEmailService(),
  storage: resolveStorageService(),
  analytics: resolveAnalyticsService(),
};
