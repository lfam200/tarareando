import type { Metadata } from "next";
import { Revelar, RevelarGrupo, RevelarItem } from "@/components/animacion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { REDES, RUTA_RESERVA } from "@/lib/config";
import { RECONOCIMIENTOS } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Sobre Tarareando",
  description:
    "Tarareando es un proyecto de educación musical que acompaña a músicos autodidactas y estudiantes a ordenar su formación. Conoce su historia, trayectoria y reconocimientos.",
};

const HITOS = [
  {
    titulo: "Nace en Trujillo, en YouTube",
    detalle:
      "Tarareando nació en Trujillo como un proyecto de educación musical para explicar la música de forma clara, cercana y práctica, empezando por videos de teoría musical para quienes no podían acceder a una formación formal.",
  },
  {
    titulo: "Crece como comunidad",
    detalle:
      "Con el tiempo, el proyecto creció como canal, comunidad y espacio de formación, acompañando a músicos independientes que buscan entender mejor lo que hacen y avanzar con más orden, con talleres, asesorías y actividades junto a instituciones aliadas.",
  },
  {
    titulo: "Hoy, desde Cajabamba",
    detalle:
      "Actualmente, desde Cajabamba, Tarareando continúa desarrollando recursos, asesorías y espacios de formación para músicos autodidactas y estudiantes de música que quieren construir una ruta de aprendizaje más clara y realista.",
  },
];

export default function PaginaSobre() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 md:py-20">
      <Revelar>
        <span className="inline-block rounded-full bg-brand-purple/10 px-4 py-1.5 text-sm font-bold text-brand-purple">
          Músico autodidacta, no improvisado
        </span>
        <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
          Sobre Tarareando
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Un proyecto de educación musical con historia real: del canal de
          YouTube a un espacio de orientación, acompañamiento y formación
          para músicos independientes.
        </p>
      </Revelar>

      {/* Historia */}
      <RevelarGrupo className="mt-12 space-y-6">
        {HITOS.map((hito, i) => (
          <RevelarItem key={hito.titulo}>
            <div className="flex gap-5 rounded-3xl bg-brand-cream p-6 sm:p-8">
              <span
                className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-yellow font-heading text-lg font-bold text-brand-ink"
                aria-hidden
              >
                {i + 1}
              </span>
              <div>
                <h2 className="text-xl font-bold">{hito.titulo}</h2>
                <p className="mt-2 text-muted-foreground">{hito.detalle}</p>
              </div>
            </div>
          </RevelarItem>
        ))}
      </RevelarGrupo>

      {/* Quién está detrás */}
      <Revelar className="mt-14">
        <h2 className="text-2xl font-bold">Quién está detrás del proyecto</h2>
        <p className="mt-3 text-muted-foreground">
          Tarareando es dirigido por Cristhian López, músico y educador
          cajabambino, junto a un equipo de profesionales que viven de la
          música. El proyecto nació en Trujillo, Perú, y hoy se desarrolla
          desde Cajabamba, con la convicción de que la educación musical de
          calidad no debería depender de dónde vives ni de haber pasado por
          un conservatorio.
        </p>
        <p className="mt-3 text-muted-foreground">
          Desde sus inicios, Tarareando ha apostado por descentralizar la
          educación musical: contenido gratuito en YouTube, talleres para
          músicos independientes y materiales educativos pensados para quien
          estudia por su cuenta.
        </p>
      </Revelar>

      {/* Reconocimientos */}
      <Revelar className="mt-14">
        <h2 className="text-2xl font-bold">Un proyecto con trayectoria</h2>
      </Revelar>
      <RevelarGrupo className="mt-6 grid gap-4 sm:grid-cols-2">
        {RECONOCIMIENTOS.map((r) => (
          <RevelarItem key={r.texto}>
            <div className="flex h-full items-start gap-3 rounded-2xl border border-brand-ink/10 bg-white p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-purple/10">
                <r.icono className="size-5 text-brand-purple" aria-hidden />
              </span>
              <p className="pt-1.5 font-semibold text-brand-ink/85">
                {r.texto}
              </p>
            </div>
          </RevelarItem>
        ))}
      </RevelarGrupo>

      {/* Misión */}
      <Revelar className="mt-14">
        <div className="rounded-3xl bg-brand-ink px-6 py-12 text-center sm:px-10">
          <h2 className="text-2xl font-bold text-brand-yellow">
            Nuestra misión hoy
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Ayudar a músicos autodidactas y estudiantes de música a ordenar su
            formación, detectar sus vacíos y construir una ruta de estudio
            realista para tocar, entender y crear música mejor.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base font-bold"
            >
              <Link href={RUTA_RESERVA}>
                Reserva tu diagnóstico gratuito
              </Link>
            </Button>
            <a
              href={REDES.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              Visita el canal de YouTube
            </a>
          </div>
        </div>
      </Revelar>
    </div>
  );
}
