import { randomUUID } from "crypto";
import { Lead } from "@/lib/types/lead";
import {
  AnalyticsEventName,
  AnalyticsService,
  CRMService,
  EmailService,
  NotificationService,
  StorageService,
} from "@/lib/services/interfaces";
import { UPLOAD_CONFIG } from "@/lib/config/questionnaire-config";

/**
 * Mock CRM adapter. Real adapters (HubSpotCRMService, PipedriveCRMService,
 * SalesforceCRMService, RDStationCRMService) implement the same CRMService
 * interface and are selected in lib/services/index.ts via env var —
 * no other file needs to change when a real CRM is connected.
 */
export class MockCRMService implements CRMService {
  providerName = "mock";

  async syncLead(lead: Lead): Promise<{ success: boolean; externalId?: string; error?: string }> {
    console.info(`[MockCRMService] would sync lead ${lead.id} to CRM`, {
      contact: lead.contact.email,
      score: lead.leadScore,
    });
    return { success: true, externalId: `mock-crm-${lead.id}` };
  }
}

export class MockNotificationService implements NotificationService {
  async notifyNewLead(lead: Lead): Promise<{ success: boolean; error?: string }> {
    console.info(
      `[MockNotificationService] NEW LEAD [${lead.priority}] score=${lead.leadScore} ` +
        `${lead.contact.company} — ${lead.project.type} @ ${lead.project.location}`
    );
    return { success: true };
  }
}

export class MockEmailService implements EmailService {
  async sendCommercialNotification(lead: Lead): Promise<{ success: boolean; error?: string }> {
    console.info(`[MockEmailService] commercial notification email for lead ${lead.id} → sales@vecta.eng`);
    return { success: true };
  }

  async sendConfirmationToLead(lead: Lead): Promise<{ success: boolean; error?: string }> {
    console.info(`[MockEmailService] confirmation email for lead ${lead.id} → ${lead.contact.email}`);
    return { success: true };
  }
}

/**
 * Mock storage. Stores files in memory only, keyed by an internal reference —
 * never a public URL, matching the "never expose private storage URLs" rule.
 * Swap for an S3/GCS-backed StorageService without touching callers.
 */
export class MockStorageService implements StorageService {
  private files = new Map<string, { fileName: string; fileType: string; sizeBytes: number }>();

  validate(file: { fileType: string; sizeBytes: number }): { valid: boolean; reason?: string } {
    const type = file.fileType.toLowerCase().replace(".", "");
    if (!UPLOAD_CONFIG.acceptedFileTypes.includes(type as (typeof UPLOAD_CONFIG.acceptedFileTypes)[number])) {
      return { valid: false, reason: `Tipo de arquivo não suportado: ${file.fileType}` };
    }
    if (file.sizeBytes > UPLOAD_CONFIG.maxFileSizeBytes) {
      return { valid: false, reason: "Arquivo excede o tamanho máximo permitido (25 MB)." };
    }
    return { valid: true };
  }

  async store(file: {
    fileName: string;
    fileType: string;
    sizeBytes: number;
    data: ArrayBuffer | Buffer;
  }): Promise<{ internalRef: string }> {
    const internalRef = `mock-storage-${randomUUID()}`;
    this.files.set(internalRef, {
      fileName: file.fileName,
      fileType: file.fileType,
      sizeBytes: file.sizeBytes,
    });
    return { internalRef };
  }

  async getSignedUrl(internalRef: string): Promise<string> {
    if (!this.files.has(internalRef)) throw new Error(`Unknown storage ref: ${internalRef}`);
    // In a real implementation this returns a short-lived signed URL from the provider SDK.
    return `https://internal.vecta.eng/mock-signed/${internalRef}?expires=900`;
  }
}

export class MockAnalyticsService implements AnalyticsService {
  async track(event: AnalyticsEventName, properties?: Record<string, unknown>): Promise<void> {
    console.info(`[MockAnalyticsService] ${event}`, properties ?? {});
  }
}

export const mockCRMService = new MockCRMService();
export const mockNotificationService = new MockNotificationService();
export const mockEmailService = new MockEmailService();
export const mockStorageService = new MockStorageService();
export const mockAnalyticsService = new MockAnalyticsService();
