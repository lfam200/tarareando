import { Resend } from "resend";
import { NEGOCIO } from "./config";

// Alertas por correo a Tarareando (6.3 del brief). Si Resend no está
// configurado, no envía nada — el pedido/reserva igual queda registrado.
export async function notificarNegocio(asunto: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.NOTIFICACIONES_EMAIL ?? NEGOCIO.email;
  if (!apiKey) {
    console.warn(`[notify] RESEND_API_KEY no configurado — omitido: ${asunto}`);
    return;
  }
  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Tarareando Web <notificaciones@tarareando.pe>",
      to: destino,
      subject: asunto,
      html,
    });
  } catch (error) {
    // Nunca rompemos el flujo de compra por una alerta fallida.
    console.error("[notify] Error enviando alerta:", error);
  }
}
