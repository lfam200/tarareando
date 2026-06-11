import type { Metadata } from "next";
import { Revelar, RevelarGrupo, RevelarItem } from "@/components/animacion";
import { Button } from "@/components/ui/button";
import { LINK_DIAGNOSTICO } from "@/lib/config";
import { ASESORIA_REVISA } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Asesoría gratuita",
  description:
    "Diagnóstico gratuito para músicos autodidactas: revisamos dónde estás, qué estás estudiando y qué ordenar primero para avanzar con claridad.",
};

export default function PaginaAsesoria() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <Revelar>
        <span className="inline-block rounded-full bg-brand-yellow px-4 py-1.5 text-sm font-bold text-brand-ink">
          100% gratuita · Reserva directa, sin formularios
        </span>
        <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
          Diagnóstico gratuito para músicos autodidactas
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Una sesión para revisar dónde estás, qué estás estudiando y qué
          podrías ordenar primero para avanzar con más claridad.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 rounded-full px-10 text-base font-bold"
        >
          <a href={LINK_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
            Reservar mi diagnóstico gratuito
          </a>
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">
          Elige directamente el horario que te acomode en el calendario y tu
          cita queda reservada.
        </p>
      </Revelar>

      <Revelar className="mt-14">
        <h2 className="text-2xl font-bold">En esta asesoría revisamos:</h2>
      </Revelar>
      <RevelarGrupo className="mt-6 space-y-3">
        {ASESORIA_REVISA.map((punto) => (
          <RevelarItem key={punto}>
            <div className="flex items-start gap-3 rounded-2xl bg-brand-cream p-5">
              <span
                className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-yellow text-sm font-bold text-brand-ink"
                aria-hidden
              >
                ✓
              </span>
              <p className="font-semibold text-brand-ink/85">{punto}</p>
            </div>
          </RevelarItem>
        ))}
      </RevelarGrupo>

      <Revelar className="mt-14">
        <div className="rounded-3xl bg-brand-ink px-6 py-12 text-center sm:px-10">
          <p className="mx-auto max-w-xl text-lg text-white/85">
            No necesitas tener todo claro antes de empezar. La idea de esta
            sesión es justamente ayudarte a ordenar el camino.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-7 rounded-full px-10 text-base font-bold"
          >
            <a
              href={LINK_DIAGNOSTICO}
              target="_blank"
              rel="noopener noreferrer"
            >
              Reservar mi diagnóstico gratuito
            </a>
          </Button>
        </div>
      </Revelar>
    </div>
  );
}
