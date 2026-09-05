import { LeadProject, LeadPriority, ScoringResult } from "@/lib/types/lead";
import { QUESTIONNAIRE_STEPS } from "@/lib/config/questionnaire-config";

/**
 * Lead scoring engine.
 *
 * Rules are data (weights in questionnaire-config.ts) plus a small set of
 * explicit business rules below. Nothing here reads from the request,
 * the UI, or any transport layer — it is a pure function of LeadProject.
 *
 * Never expose the numeric score or qualificationReason to the visitor;
 * only internal services (EmailService, NotificationService, the future
 * admin dashboard) may read ScoringResult.
 */

const WEIGHT_MAP: Map<string, Map<string, number>> = new Map(
  QUESTIONNAIRE_STEPS.filter((s) => s.options).map((s) => [
    s.category,
    new Map(s.options!.map((o) => [o.value, o.scoreWeight ?? 0])),
  ])
);

function weightFor(category: string, value: string | null | undefined): number {
  if (!value) return 0;
  return WEIGHT_MAP.get(category)?.get(value) ?? 0;
}

/** Max possible weighted points across single/multi-select categories, used to normalize to 0-100. */
const MAX_RAW_SCORE = QUESTIONNAIRE_STEPS.reduce((sum, step) => {
  if (!step.options) return sum;
  if (step.inputType === "multi-select") {
    // multi-select can sum every option; cap contribution at the two highest to avoid over-rewarding checkbox spam
    const weights = step.options.map((o) => o.scoreWeight ?? 0).sort((a, b) => b - a);
    return sum + weights.slice(0, 2).reduce((a, b) => a + b, 0);
  }
  return sum + Math.max(...step.options.map((o) => o.scoreWeight ?? 0));
}, 0);

export function calculateLeadScore(project: LeadProject): ScoringResult {
  const reasons: string[] = [];

  let raw = 0;

  const typeW = weightFor("project_type", project.type);
  raw += typeW;
  if (typeW >= 8) reasons.push("tipo de projeto de alto porte");

  const areaW = weightFor("built_area", project.builtArea);
  raw += areaW;
  if (areaW >= 8) reasons.push("área construída significativa");

  const landW = weightFor("land_status", project.landStatus);
  raw += landW;
  if (landW >= 9) reasons.push("terreno próprio e regularizado");
  if (landW <= 2) reasons.push("terreno ainda não definido (fator de risco)");

  const stageW = weightFor("project_stage", project.projectStage);
  raw += stageW;
  if (stageW >= 10) reasons.push("projeto aprovado e pronto para execução");

  const startW = weightFor("expected_start", project.expectedStart);
  raw += startW;
  if (startW >= 10) reasons.push("início imediato");

  const investmentW = weightFor("investment_range", project.estimatedInvestment);
  raw += investmentW;
  if (investmentW >= 8) reasons.push("faixa de investimento elevada");

  const servicesWeights = (project.servicesRequired ?? [])
    .map((v) => weightFor("services_required", v))
    .sort((a, b) => b - a)
    .slice(0, 2);
  const servicesW = servicesWeights.reduce((a, b) => a + b, 0);
  raw += servicesW;
  if ((project.servicesRequired ?? []).includes("full_epc")) {
    reasons.push("escopo EPC completo");
  }

  const normalized = MAX_RAW_SCORE > 0 ? Math.round((raw / MAX_RAW_SCORE) * 100) : 0;
  const score = Math.min(100, Math.max(0, normalized));

  const priority = scoreToPriority(score);

  return {
    score,
    priority,
    qualificationReason:
      reasons.length > 0
        ? `Score ${score}/100 — ${reasons.join("; ")}.`
        : `Score ${score}/100 — dados insuficientes para qualificação detalhada.`,
  };
}

function scoreToPriority(score: number): LeadPriority {
  if (score >= 80) return "CRITICAL";
  if (score >= 60) return "HIGH";
  if (score >= 35) return "MEDIUM";
  return "LOW";
}
