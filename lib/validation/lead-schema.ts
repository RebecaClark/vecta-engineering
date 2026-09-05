import { z } from "zod";
import { UPLOAD_CONFIG } from "@/lib/config/questionnaire-config";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(200),
  company: z.string().trim().min(2).max(200),
  role: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(30)
    .regex(/^[+()\d\s-]+$/, "Telefone contém caracteres inválidos"),
});

const projectSchema = z.object({
  type: z.string().trim().min(1),
  location: z.string().trim().min(2).max(300),
  landStatus: z.string().trim().min(1),
  landArea: z.string().trim().max(100).nullable(),
  builtArea: z.string().trim().min(1),
  projectStage: z.string().trim().min(1),
  estimatedInvestment: z.string().trim().min(1),
  expectedStart: z.string().trim().min(1),
  servicesRequired: z.array(z.string().trim().min(1)).min(1).max(20),
  description: z.string().trim().max(4000).nullable(),
});

const documentSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  fileType: z.enum(UPLOAD_CONFIG.acceptedFileTypes),
  fileSizeBytes: z
    .number()
    .int()
    .positive()
    .max(UPLOAD_CONFIG.maxFileSizeBytes),
  uploadedAt: z.string().datetime(),
  uploadRef: z.string().trim().min(1),
});

const marketingSchema = z.object({
  utmSource: z.string().trim().max(200).nullable().optional(),
  utmMedium: z.string().trim().max(200).nullable().optional(),
  utmCampaign: z.string().trim().max(200).nullable().optional(),
  utmTerm: z.string().trim().max(200).nullable().optional(),
  utmContent: z.string().trim().max(200).nullable().optional(),
  referrer: z.string().trim().max(500).nullable().optional(),
  landingPage: z.string().trim().max(500).nullable().optional(),
});

export const leadSubmissionSchema = z.object({
  contact: contactSchema,
  project: projectSchema,
  documents: z.array(documentSchema).max(UPLOAD_CONFIG.maxFilesPerLead).default([]),
  marketing: marketingSchema.default({}),
  technical: z.object({ device: z.string().trim().max(100).nullable() }),
  consent: z.object({
    commercialContactAccepted: z.literal(true, {
      message: "É necessário aceitar o contato comercial para prosseguir.",
    }),
  }),
});

export type ValidatedLeadSubmission = z.infer<typeof leadSubmissionSchema>;
