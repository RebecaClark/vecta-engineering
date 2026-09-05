/**
 * Single source of truth for the qualification questionnaire.
 *
 * Rule: UI components (Phase 2) render off this structure. They must not
 * hardcode option lists, weights, or copy. Changing a question's options
 * or adding a new step happens here — never in a component file.
 */

export type QuestionInputType = "single-select" | "multi-select" | "text" | "date" | "file-upload";

export interface QuestionOption {
  value: string;
  label: string;
  /** Optional weight hint consumed by the scoring engine's default rule set. */
  scoreWeight?: number;
}

export interface QuestionStep {
  id: string;
  category:
    | "project_type"
    | "project_location"
    | "built_area"
    | "land_status"
    | "project_stage"
    | "expected_start"
    | "investment_range"
    | "services_required"
    | "documentation"
    | "contact_information";
  inputType: QuestionInputType;
  title: string;
  helperText?: string;
  options?: QuestionOption[];
  required: boolean;
}

export const QUESTIONNAIRE_STEPS: QuestionStep[] = [
  {
    id: "project_type",
    category: "project_type",
    inputType: "single-select",
    title: "Qual a natureza do projeto?",
    required: true,
    options: [
      { value: "corporate_hq", label: "Sede Corporativa / Edifício Comercial", scoreWeight: 8 },
      { value: "residential_highrise", label: "Torre Residencial", scoreWeight: 7 },
      { value: "mixed_use", label: "Uso Misto", scoreWeight: 8 },
      { value: "industrial", label: "Industrial / Logístico", scoreWeight: 6 },
      { value: "infrastructure", label: "Infraestrutura (pontes, viadutos, portos)", scoreWeight: 10 },
      { value: "institutional", label: "Institucional / Público", scoreWeight: 7 },
      { value: "hospitality", label: "Hospitalidade / Resort", scoreWeight: 7 },
      { value: "other", label: "Outro", scoreWeight: 3 },
    ],
  },
  {
    id: "project_location",
    category: "project_location",
    inputType: "text",
    title: "Onde o projeto está localizado?",
    helperText: "Cidade, estado e país.",
    required: true,
  },
  {
    id: "built_area",
    category: "built_area",
    inputType: "single-select",
    title: "Qual a área construída aproximada?",
    required: true,
    options: [
      { value: "lt_2000", label: "Até 2.000 m²", scoreWeight: 2 },
      { value: "2000_10000", label: "2.000 – 10.000 m²", scoreWeight: 5 },
      { value: "10000_50000", label: "10.000 – 50.000 m²", scoreWeight: 8 },
      { value: "gt_50000", label: "Acima de 50.000 m²", scoreWeight: 10 },
    ],
  },
  {
    id: "land_status",
    category: "land_status",
    inputType: "single-select",
    title: "Qual a situação do terreno?",
    required: true,
    options: [
      { value: "owned", label: "Terreno próprio, matriculado", scoreWeight: 9 },
      { value: "under_negotiation", label: "Em negociação / opção de compra", scoreWeight: 5 },
      { value: "not_defined", label: "Ainda não definido", scoreWeight: 2 },
    ],
  },
  {
    id: "project_stage",
    category: "project_stage",
    inputType: "single-select",
    title: "Em que estágio o projeto se encontra?",
    required: true,
    options: [
      { value: "concept", label: "Ideia / Conceito inicial", scoreWeight: 3 },
      { value: "feasibility", label: "Estudo de viabilidade", scoreWeight: 5 },
      { value: "preliminary_design", label: "Anteprojeto", scoreWeight: 7 },
      { value: "approved_design", label: "Projeto aprovado, pronto para execução", scoreWeight: 10 },
    ],
  },
  {
    id: "expected_start",
    category: "expected_start",
    inputType: "single-select",
    title: "Quando pretende iniciar o projeto?",
    required: true,
    options: [
      { value: "immediate", label: "Imediato (0–3 meses)", scoreWeight: 10 },
      { value: "short_term", label: "Curto prazo (3–6 meses)", scoreWeight: 7 },
      { value: "mid_term", label: "Médio prazo (6–12 meses)", scoreWeight: 4 },
      { value: "long_term", label: "Longo prazo (12+ meses)", scoreWeight: 1 },
    ],
  },
  {
    id: "investment_range",
    category: "investment_range",
    inputType: "single-select",
    title: "Qual a faixa de investimento estimada?",
    required: true,
    options: [
      { value: "lt_5m", label: "Até R$ 5 milhões", scoreWeight: 2 },
      { value: "5m_20m", label: "R$ 5 – 20 milhões", scoreWeight: 5 },
      { value: "20m_100m", label: "R$ 20 – 100 milhões", scoreWeight: 8 },
      { value: "gt_100m", label: "Acima de R$ 100 milhões", scoreWeight: 10 },
      { value: "prefer_not_to_say", label: "Prefiro não informar agora", scoreWeight: 0 },
    ],
  },
  {
    id: "services_required",
    category: "services_required",
    inputType: "multi-select",
    title: "Quais serviços você precisa?",
    required: true,
    options: [
      { value: "structural_engineering", label: "Engenharia estrutural", scoreWeight: 3 },
      { value: "architecture", label: "Arquitetura", scoreWeight: 2 },
      { value: "construction_management", label: "Gestão de obra", scoreWeight: 4 },
      { value: "full_epc", label: "EPC completo (projeto + execução)", scoreWeight: 6 },
      { value: "feasibility_study", label: "Estudo de viabilidade", scoreWeight: 2 },
      { value: "consulting", label: "Consultoria técnica", scoreWeight: 1 },
    ],
  },
  {
    id: "documentation",
    category: "documentation",
    inputType: "file-upload",
    title: "Deseja anexar alguma documentação do projeto?",
    helperText: "Opcional. Plantas, estudos, memoriais ou apresentações.",
    required: false,
  },
  {
    id: "contact_information",
    category: "contact_information",
    inputType: "text",
    title: "Como podemos retornar o contato?",
    required: true,
  },
];

export const UPLOAD_CONFIG = {
  acceptedFileTypes: ["pdf", "dwg", "dxf", "jpg", "jpeg", "png", "zip"] as const,
  maxFileSizeBytes: 25 * 1024 * 1024, // 25 MB
  maxFilesPerLead: 8,
};

export const CONSENT_CONFIG = {
  policyVersion: "2026-09-04",
  requiredForSubmission: true,
};
