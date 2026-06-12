import { LINK_DIAGNOSTICO, LINK_DIAGNOSTICO_EMBED } from "@/lib/config";

// Calendario de citas de Google embebido: el usuario reserva el diagnóstico
// gratuito sin salir de la web. El enlace inferior es el respaldo si el
// navegador bloquea el iframe (cookies de terceros, extensiones, etc.).
export function CalendarioDiagnostico() {
  return (
    <div id="reservar" className="scroll-mt-24">
      <div className="overflow-hidden rounded-3xl border border-brand-ink/10 bg-white shadow-sm">
        <iframe
          src={LINK_DIAGNOSTICO_EMBED}
          title="Reserva tu diagnóstico gratuito — calendario de citas"
          loading="lazy"
          className="h-[760px] w-full border-0"
        />
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        ¿No ves el calendario?{" "}
        <a
          href={LINK_DIAGNOSTICO}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-brand-purple underline underline-offset-4"
        >
          Ábrelo en Google Calendar
        </a>
        .
      </p>
    </div>
  );
}
