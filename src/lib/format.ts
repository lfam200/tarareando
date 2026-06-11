import type { TipoProducto } from "./types";

export function formatoSoles(monto: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(monto);
}

export function formatoFecha(iso: string) {
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Lima",
  }).format(new Date(iso));
}

export const ETIQUETA_TIPO: Record<TipoProducto, string> = {
  curso: "Curso online",
  recurso: "Recurso descargable",
  paquete_clases: "Clases en vivo",
  asesoria: "Asesoría",
};
