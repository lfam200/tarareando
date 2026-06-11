import type { Metadata } from "next";
import Link from "next/link";
import { Revelar, RevelarGrupo, RevelarItem } from "@/components/animacion";
import { Button } from "@/components/ui/button";
import { RECURSOS } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Recursos para músicos autodidactas: guías, ejercicios, plantillas y materiales complementarios de los videos de Tarareando.",
};

export default function PaginaRecursos() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
      <Revelar>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Recursos para músicos autodidactas
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Materiales prácticos para acompañar tu estudio musical: guías,
            ejercicios, plantillas y recursos mencionados en los videos de
            Tarareando.
          </p>
        </div>
      </Revelar>

      <RevelarGrupo className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {RECURSOS.map((recurso) => (
          <RevelarItem key={recurso.titulo} className="h-full">
            <div className="flex h-full flex-col rounded-3xl bg-brand-cream p-6">
              <span className="text-3xl" aria-hidden>
                {recurso.icono}
              </span>
              <h2 className="mt-3 text-lg font-bold">{recurso.titulo}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {recurso.detalle}
              </p>
              <div className="mt-auto pt-5">
                {recurso.enlace ? (
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full font-bold"
                  >
                    <a href={recurso.enlace}>Descargar</a>
                  </Button>
                ) : (
                  <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold text-brand-ink/60">
                    Muy pronto
                  </span>
                )}
              </div>
            </div>
          </RevelarItem>
        ))}
      </RevelarGrupo>

      <Revelar className="mt-14">
        <div className="rounded-3xl bg-brand-purple px-6 py-12 text-center sm:px-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Sé el primero en recibir cada recurso nuevo
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Los recursos se publican primero en “Cartas para músicos
            autodidactas”, nuestra newsletter educativa.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-7 rounded-full px-10 text-base font-bold"
          >
            <Link href="/#newsletter">Únete a la newsletter</Link>
          </Button>
        </div>
      </Revelar>
    </div>
  );
}
