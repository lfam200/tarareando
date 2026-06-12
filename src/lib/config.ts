// Datos del negocio usados en la web pública y las notificaciones.
// Las instrucciones de pago se muestran tras crear un pedido (pago manual v1).

export const NEGOCIO = {
  nombre: "Tarareando",
  eslogan: "Músico autodidacta, no improvisado",
  email: "cristhianlopez@tarareando.pe",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NEGOCIO ?? "51959833147",
} as const;

// Reserva directa del diagnóstico gratuito (Google Calendar).
// El usuario hace clic y reserva en los horarios disponibles, sin formularios.
export const LINK_DIAGNOSTICO = "https://calendar.app.google/WiZtYtrJ2p9sFNUy5";

// Versión embebible del mismo calendario de citas (`?gv=true` permite el
// iframe). La reserva ocurre dentro de la web, en /asesoria.
export const LINK_DIAGNOSTICO_EMBED =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1Bl79waGei1FwrYRKrjMYcyse_CkJhmvlaWZsITmHyDba3_jeA1kSN7LT2AYn-WcZqHBF-gMk7?gv=true";

// Destino interno de los CTAs de reserva: la página de asesoría con el
// calendario embebido.
export const RUTA_RESERVA = "/asesoria#reservar";

export const REDES = {
  youtube: "https://www.youtube.com/@Tarareando",
  facebook: "https://www.facebook.com/tarareando.pe",
  tiktok: "https://www.tiktok.com/@tarareando.pe",
} as const;

export const INSTRUCCIONES_PAGO = {
  yape: {
    titulo: "Yape",
    detalle: "Yapea al 959 833 147 (Cristhian Lopez).",
  },
  paypal: {
    titulo: "PayPal",
    detalle: "Envía el pago a cristhianlopez@tarareando.pe vía PayPal.",
  },
  transferencia: {
    titulo: "Transferencia bancaria",
    detalle:
      "Solicítanos el número de cuenta por WhatsApp y envíanos la constancia.",
  },
} as const;

export function linkWhatsApp(mensaje: string, telefono = NEGOCIO.whatsapp) {
  return `https://wa.me/${telefono.replace(/\D/g, "")}?text=${encodeURIComponent(mensaje)}`;
}
