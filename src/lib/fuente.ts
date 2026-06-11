import { cookies } from "next/headers";

export const COOKIE_FUENTE = "t_fuente";

export interface Fuente {
  fuente: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

// Lee el origen del visitante capturado por <CapturaFuente /> en su primera
// visita (regla del plan: el primer origen se guarda y no se sobreescribe).
export async function leerFuente(): Promise<Fuente> {
  const vacio: Fuente = {
    fuente: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
  };
  try {
    const raw = (await cookies()).get(COOKIE_FUENTE)?.value;
    if (!raw) return vacio;
    const datos = JSON.parse(raw);
    return {
      fuente: datos.fuente ?? null,
      utm_source: datos.utm_source ?? null,
      utm_medium: datos.utm_medium ?? null,
      utm_campaign: datos.utm_campaign ?? null,
    };
  } catch {
    return vacio;
  }
}
