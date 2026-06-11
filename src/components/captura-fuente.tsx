"use client";

import { useEffect } from "react";

const COOKIE = "t_fuente";

function inferirFuente(referrer: string, utmSource: string | null) {
  if (utmSource) return utmSource.toLowerCase();
  if (!referrer) return "directo";
  try {
    const host = new URL(referrer).hostname;
    if (host.includes("instagram")) return "instagram";
    if (host.includes("facebook")) return "facebook";
    if (host.includes("tiktok")) return "tiktok";
    if (host.includes("youtube")) return "youtube";
    if (host.includes("whatsapp") || host.includes("wa.me")) return "whatsapp";
    if (host.includes("google")) return "google";
    return host;
  } catch {
    return "directo";
  }
}

// Guarda el origen del visitante (canal + UTM) en su PRIMERA visita.
// No se sobreescribe: el reporte "de dónde vienen los clientes" usa este dato.
export function CapturaFuente() {
  useEffect(() => {
    if (document.cookie.includes(`${COOKIE}=`)) return;
    const params = new URLSearchParams(window.location.search);
    const datos = {
      fuente: inferirFuente(document.referrer, params.get("utm_source")),
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
    };
    const unAnio = 60 * 60 * 24 * 365;
    document.cookie = `${COOKIE}=${encodeURIComponent(
      JSON.stringify(datos),
    )}; path=/; max-age=${unAnio}; samesite=lax`;
  }, []);

  return null;
}
