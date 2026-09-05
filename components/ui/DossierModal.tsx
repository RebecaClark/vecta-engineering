"use client";

import React, { useState } from "react";
import { X, ArrowRight, ShieldCheck, Download, CheckCircle2 } from "lucide-react";
import { ProjectItem } from "@/lib/projects-data";
import { buildWhatsAppLink } from "@/lib/config/whatsapp-config";

interface DossierModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ project, isOpen, onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", organization: "", email: "", scope: "" });

  if (!isOpen || !project) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = [
      "NOVA SOLICITAÇÃO DE DOSSIÊ — VECTA ENGINEERING",
      "",
      `Projeto de referência: ${project.title} (${project.ref})`,
      `Signatário: ${formData.name}`,
      `Instituição: ${formData.organization}`,
      `E-mail: ${formData.email}`,
    ].join("\n");

    // Abre o WhatsApp da empresa com a mensagem já preenchida com os dados do cliente.
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");

    setFormSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#0d0e10]/85 backdrop-blur-md"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#121417] border border-[#998f83]/40 p-6 sm:p-8 md:p-10 text-[#e3e2e5] shadow-2xl">
        {/* Corner Datum Crosshairs */}
        <span aria-hidden="true" className="absolute top-2 left-2 font-mono text-[10px] text-[#8e9196]">+</span>
        <span aria-hidden="true" className="absolute top-2 right-2 font-mono text-[10px] text-[#8e9196]">+</span>
        <span aria-hidden="true" className="absolute bottom-2 left-2 font-mono text-[10px] text-[#8e9196]">+</span>
        <span aria-hidden="true" className="absolute bottom-2 right-2 font-mono text-[10px] text-[#8e9196]">+</span>

        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#998f83]/20">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-[#c5a880] uppercase tracking-widest">
                {project.ref}
              </span>
              <span className="font-mono text-[10px] text-[#8e9196]">// {project.coordinates}</span>
            </div>
            <h2 id="dossier-modal-title" className="font-space text-2xl sm:text-3xl text-[#e3e2e5] font-medium">
              {project.title}
            </h2>
            <p className="font-mono text-xs text-[#8e9196]">{project.location} · {project.year}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-[#4d463c] hover:border-[#c5a880] text-[#8e9196] hover:text-[#e3e2e5] transition-colors"
            aria-label="Fechar dossiê"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-6">
          {/* Left: Engineering Specifications */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <h3 className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest mb-2">
                Narrativa Estrutural Executiva
              </h3>
              <p className="font-sans text-sm text-[#d1c5b8] leading-relaxed font-light">
                {project.fullNarrative}
              </p>
            </div>

            <div>
              <h3 className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest mb-3">
                Destaques Principais de Engenharia
              </h3>
              <ul className="space-y-2 font-sans text-xs text-[#8e9196]">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#c5a880] font-mono text-[10px] mt-0.5">0{i + 1}.</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[11px] text-[#c5a880] uppercase tracking-widest mb-3">
                Métricas Físicas Determinísticas
              </h3>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                {project.specs.map((s, i) => (
                  <div key={i} className="p-3 bg-[#0d0e10] border border-[#1f2022]">
                    <span className="text-[10px] text-[#8e9196] uppercase block">{s.label}</span>
                    <span className="text-[#e3e2e5] font-medium pt-0.5 block">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Request Official Dossier Form */}
          <div className="md:col-span-5 p-6 bg-[#0d0e10] border border-[#998f83]/30 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#c5a880] font-mono text-[10px] uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>REQUISIÇÃO DE DOSSIÊ CONFIDENCIAL</span>
              </div>
              <h3 className="font-space text-lg text-[#e3e2e5]">
                Solicitar Caderno Completo de Cálculos
              </h3>
              <p className="font-sans text-xs text-[#8e9196] leading-relaxed font-light">
                Inclui malhas exportadas de FEA não linear, ensaios em túnel de vento de camada limite e sondagens geotécnicas sob termo bilateral de confidencialidade (NDA).
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-4 bg-[#1f2022] border border-[#c5a880] space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-[#c5a880] mx-auto" />
                <span className="font-mono text-xs text-[#e3e2e5] block font-semibold">
                  PROTOCOLO DE ENVIO INICIADO
                </span>
                <p className="font-sans text-xs text-[#8e9196]">
                  Um engenheiro responsável de nossa sede em Zurique validará as credenciais em até 2 horas úteis.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-[10px] text-[#8e9196] uppercase mb-1">
                    Signatário Autorizado
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="NOME COMPLETO & CARGO"
                    className="w-full bg-[#121417] border border-[#4d463c] px-3 py-2 text-[#e3e2e5] placeholder-[#4d463c] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#8e9196] uppercase mb-1">
                    Instituição / Autoridade
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="MINISTÉRIO / NOME DA EMPRESA"
                    className="w-full bg-[#121417] border border-[#4d463c] px-3 py-2 text-[#e3e2e5] placeholder-[#4d463c] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#8e9196] uppercase mb-1">
                    E-mail Corporativo / Institucional
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="E-MAIL DE DOMÍNIO OFICIAL"
                    className="w-full bg-[#121417] border border-[#4d463c] px-3 py-2 text-[#e3e2e5] placeholder-[#4d463c] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#c5a880] hover:bg-[#fedeb2] text-[#281800] uppercase font-semibold text-xs tracking-widest flex items-center justify-center gap-2 transition-colors mt-2"
                >
                  <span>Solicitar Projeto Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="pt-2 border-t border-[#1f2022] flex items-center justify-between text-[9px] font-mono text-[#8e9196]">
              <span>CRIPTOGRAFIA ISO 27001</span>
              <span>PROTOCOLO CHE-109</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
