import type { Metadata } from "next";
import Link from "next/link";
import { Revelar, RevelarGrupo, RevelarItem } from "@/components/animacion";
import { Button } from "@/components/ui/button";
import { AREAS_CLASES, FORMATOS_CLASES } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Clases personalizadas",
  description:
    "Clases de música personalizadas para avanzar con una ruta clara: instrumento, ritmo, teoría aplicada, oído, repertorio, composición y organización del estudio.",
};

export default function PaginaClases() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
      <Revelar>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Clases personalizadas para avanzar con una ruta clara
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            En Tarareando las clases se adaptan a tu nivel, tus objetivos y tu
            forma real de estudiar. No se trata solo de aprender canciones o
            ejercicios sueltos, sino de entender qué necesitas trabajar y cómo
            organizar tu proceso.
          </p>
        </div>
      </Revelar>

      <Revelar className="mt-14">
        <h2 className="text-2xl font-bold">Áreas que pueden trabajarse</h2>
      </Revelar>
      <RevelarGrupo className="mt-6 flex flex-wrap gap-3">
        {AREAS_CLASES.map((area) => (
          <RevelarItem key={area}>
            <span className="inline-block rounded-full bg-brand-purple/10 px-5 py-2.5 font-semibold text-brand-purple">
              {area}
            </span>
          </RevelarItem>
        ))}
      </RevelarGrupo>

      <Revelar className="mt-14">
        <h2 className="text-2xl font-bold">Formatos</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Los detalles de cada plan se definen contigo después del diagnóstico
          gratuito, según tu nivel, tus objetivos y tu tiempo disponible.
        </p>
      </Revelar>
      <RevelarGrupo className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FORMATOS_CLASES.map((formato) => (
          <RevelarItem key={formato.titulo}>
            <div className="h-full rounded-3xl border border-brand-ink/10 bg-white p-6">
              <h3 className="text-lg font-bold">{formato.titulo}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {formato.detalle}
              </p>
            </div>
          </RevelarItem>
        ))}
      </RevelarGrupo>

      <Revelar className="mt-14">
        <div className="rounded-3xl bg-brand-cream px-6 py-12 text-center sm:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            ¿No sabes qué formato te conviene?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Empieza por la asesoría gratuita: revisamos tu caso y te
            recomendamos la ruta con más sentido para ti, sin compromiso.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-7 rounded-full px-10 text-base font-bold"
          >
            <Link href="/asesoria">Quiero orientación para elegir mi ruta</Link>
          </Button>
        </div>
      </Revelar>
    </div>
  );
}
