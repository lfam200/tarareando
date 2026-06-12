import type { Metadata } from "next";
import { Revelar, RevelarGrupo, RevelarItem } from "@/components/animacion";
import { Newsletter } from "@/components/newsletter";
import { Button } from "@/components/ui/button";
import { RECURSOS } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Estamos preparando los primeros recursos gratuitos de Tarareando: guías, ejercicios, plantillas y materiales complementarios para estudiar música con más orden.",
};

// Página de espera: los recursos aún no están publicados, así que el
// objetivo es capturar el correo vía newsletter. Cuando haya recursos
// listos (con `enlace` en RECURSOS), convertirla en una galería de
// descargas.
export default function PaginaRecursos() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 md:py-20">
        <Revelar>
          <span className="inline-block rounded-full bg-brand-orange/10 px-4 py-1.5 text-sm font-bold text-brand-orange">
            En preparación
          </span>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            Estamos preparando los primeros recursos gratuitos de Tarareando
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Muy pronto encontrarás guías, ejercicios, plantillas y materiales
            complementarios para estudiar música con más orden.
          </p>
          <p className="mt-3 text-lg font-semibold text-brand-ink">
            Únete a la newsletter y te avisaremos cuando estén disponibles.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-full px-10 text-base font-bold"
          >
            <a href="#newsletter">Quiero recibir los recursos</a>
          </Button>
        </Revelar>

        <Revelar className="mt-16 text-left">
          <h2 className="text-center text-2xl font-bold">
            Lo que estamos preparando
          </h2>
        </Revelar>
        <RevelarGrupo className="mt-6 grid gap-4 text-left sm:grid-cols-2">
          {RECURSOS.map((recurso) => (
            <RevelarItem key={recurso.titulo}>
              <div className="flex h-full items-start gap-4 rounded-2xl bg-brand-cream p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white">
                  <recurso.icono
                    className="size-5 text-brand-orange"
                    aria-hidden
                  />
                </span>
                <div>
                  <h3 className="font-bold">{recurso.titulo}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {recurso.detalle}
                  </p>
                </div>
              </div>
            </RevelarItem>
          ))}
        </RevelarGrupo>
      </div>

      <Newsletter />
    </>
  );
}
