/**
 * Número de WhatsApp da empresa que recebe os leads do site.
 *
 * Formato: código do país + DDD + número, só dígitos (padrão wa.me).
 * Ex: "5511999998888" para +55 11 99999-8888.
 *
 * TROQUE o valor abaixo pelo número real da Vecta antes de publicar.
 * Pode também definir NEXT_PUBLIC_WHATSAPP_NUMBER no ambiente de deploy
 * (Vercel > Settings > Environment Variables) sem tocar no código.
 */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5500000000000"; // <- placeholder, trocar

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
