import Link from "next/link";
import { ArrowRight, Music } from "lucide-react";
import { Hero } from "@/components/hero";
import { Newsletter } from "@/components/newsletter";
import {
  Revelar,
  RevelarGrupo,
  RevelarItem,
} from "@/components/animacion";
import { Button } from "@/components/ui/button";
import { RUTA_RESERVA } from "@/lib/config";
import {
  AREAS,
  FORMATOS_CLASES,
  RECONOCIMIENTOS,
  RECURSOS,
  TESTIMONIOS,
} from "@/lib/contenido";
import { formatoFecha, getEntradas } from "@/lib/blog";

export const revalidate = 60;

const FLUJO_CLASES = [
  "Diagnóstico gratuito",
  "Recomendación de ruta",
  "Clases o acompañamiento personalizado",
];

export default async function Home() {
  const entradas = (await getEntradas()).slice(0, 3);

  return (
    <>
      <Hero />

      {/* El problema */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Revelar>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              ¿Estudias mucho, pero sin saber si avanzas?
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Ves tutoriales, aprendes canciones, guardas ejercicios, intentas
              entender teoría, practicas escalas, sigues consejos sueltos… pero
              no sabes si estás avanzando en el orden correcto.
            </p>
            <p className="mt-4 text-lg font-semibold text-brand-ink">
              Estudiar música por tu cuenta no está mal. El problema es
              hacerlo sin ruta.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              En Tarareando te ayudamos a ordenar tu proceso para que sepas
              qué estudiar, cómo practicar y hacia dónde avanzar según tus
              objetivos.
            </p>
          </div>
        </Revelar>
      </section>

      {/* Diagnóstico gratuito: el usuario se identifica con el problema y
          de inmediato puede reservar. */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-20">
        <Revelar>
          <div className="relative overflow-hidden rounded-3xl bg-brand-ink px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden
              className="absolute -left-10 -top-10 size-48 rounded-full bg-brand-orange/30 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-12 -right-8 size-56 rounded-full bg-brand-purple/40 blur-3xl"
            />
            <span className="relative inline-block rounded-full bg-brand-yellow px-4 py-1.5 text-sm font-bold text-brand-ink">
              Diagnóstico gratuito para músicos autodidactas
            </span>
            <h2 className="relative mt-5 text-3xl font-bold text-white sm:text-4xl">
              Reserva una asesoría gratuita y descubre qué necesitas ordenar
              primero
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-white/75">
              En esta sesión revisamos tu nivel, tus objetivos, tus hábitos de
              estudio y los principales vacíos que pueden estar frenando tu
              avance. Al final tendrás una orientación más clara sobre qué
              estudiar, cómo organizarte y qué camino puede tener más sentido
              para ti.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 text-base font-bold"
              >
                <Link href={RUTA_RESERVA}>
                  Reservar diagnóstico gratuito
                </Link>
              </Button>
              <Link
                href="/asesoria"
                className="font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                ¿Cómo funciona la asesoría?
              </Link>
            </div>
          </div>
        </Revelar>
      </section>

      <Newsletter />

      {/* Método Tarareando */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <Revelar>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                El mapa que usamos para ordenar tu formación musical
              </h2>
              <p className="mt-4 text-muted-foreground">
                No se trata de estudiar todo al mismo tiempo, sino de saber
                qué área necesita atención primero. Partimos de tu nivel, tus
                objetivos y tus hábitos de estudio para construir una ruta más
                clara, siempre desde un enfoque práctico y realista.
              </p>
            </div>
          </Revelar>
          <RevelarGrupo className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((area) => (
              <RevelarItem key={area.titulo}>
                <div className="h-full rounded-3xl bg-white p-6 shadow-sm">
                  <span className="grid size-11 place-items-center rounded-2xl bg-brand-purple/10">
                    <area.icono
                      className="size-5 text-brand-purple"
                      aria-hidden
                    />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{area.titulo}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {area.detalle}
                  </p>
                </div>
              </RevelarItem>
            ))}
          </RevelarGrupo>
        </div>
      </section>

      {/* Clases personalizadas */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Revelar>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Clases personalizadas para músicos que quieren avanzar con orden
            </h2>
            <p className="mt-4 text-muted-foreground">
              Las clases de Tarareando no parten de una plantilla única.
              Trabajamos según tu nivel, tus objetivos y el tiempo real que
              tienes para estudiar. Pueden servirte si quieres ordenar tu
              práctica, mejorar tu comprensión musical, fortalecer tu
              instrumento, entender mejor la teoría, trabajar ritmo, entrenar
              el oído o aplicar lo que aprendes en canciones reales.
            </p>
          </div>
        </Revelar>

        {/* Flujo: las clases son la continuación natural del diagnóstico */}
        <Revelar className="mt-10">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {FLUJO_CLASES.map((paso, i) => (
              <span key={paso} className="flex items-center gap-3">
                <span className="rounded-full bg-brand-purple/10 px-5 py-2.5 text-sm font-bold text-brand-purple">
                  {paso}
                </span>
                {i < FLUJO_CLASES.length - 1 && (
                  <ArrowRight
                    className="size-4 text-brand-ink/40"
                    aria-hidden
                  />
                )}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm text-muted-foreground">
            Después del diagnóstico, si tiene sentido trabajar juntos, te
            proponemos una ruta de clases o acompañamiento según tu objetivo,
            nivel y tiempo disponible.
          </p>
        </Revelar>

        <RevelarGrupo className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        <Revelar className="mt-10 text-center">
          <Button asChild size="lg" className="rounded-full px-10 font-bold">
            <Link href="/asesoria">Quiero una clase personalizada</Link>
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">
            Empezamos con un diagnóstico gratuito para recomendarte la ruta
            correcta.
          </p>
        </Revelar>
      </section>

      {/* Recursos (en preparación) */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <Revelar>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <span className="inline-block rounded-full bg-brand-orange/10 px-4 py-1.5 text-sm font-bold text-brand-orange">
                  En preparación
                </span>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Recursos para estudiar con más orden
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Estamos preparando guías, ejercicios, plantillas y
                  materiales complementarios de los videos de Tarareando para
                  organizar mejor tu estudio musical.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-2 font-bold"
              >
                <Link href="/recursos">Quiero recibir los recursos</Link>
              </Button>
            </div>
          </Revelar>
          <RevelarGrupo className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {RECURSOS.slice(0, 3).map((recurso) => (
              <RevelarItem key={recurso.titulo}>
                <div className="h-full rounded-3xl bg-white p-6 shadow-sm">
                  <span className="grid size-11 place-items-center rounded-2xl bg-brand-yellow/15">
                    <recurso.icono
                      className="size-5 text-brand-orange"
                      aria-hidden
                    />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{recurso.titulo}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {recurso.detalle}
                  </p>
                </div>
              </RevelarItem>
            ))}
          </RevelarGrupo>
        </div>
      </section>

      {/* Blog */}
      {entradas.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <Revelar>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Últimas entradas del blog
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Ideas, guías y explicaciones para entender mejor la música y
                  ordenar tu estudio.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-2 font-bold"
              >
                <Link href="/blog">Ver todos los artículos</Link>
              </Button>
            </div>
          </Revelar>
          <RevelarGrupo className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entradas.map((entrada) => (
              <RevelarItem key={entrada.slug} className="h-full">
                <Link
                  href={`/blog/${entrada.slug}`}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-brand-ink/10 bg-white transition-shadow hover:shadow-md"
                >
                  {entrada.imagen ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={entrada.imagen}
                      alt=""
                      className="aspect-[16/9] w-full object-cover"
                    />
                  ) : (
                    <div className="grid aspect-[16/9] w-full place-items-center bg-brand-purple/10">
                      <Music
                        className="size-10 text-brand-purple/50"
                        aria-hidden
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {entrada.fecha && (
                      <p className="text-xs font-semibold text-muted-foreground">
                        {formatoFecha(entrada.fecha)}
                      </p>
                    )}
                    <h3 className="mt-1 text-lg font-bold">
                      {entrada.titulo}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {entrada.extracto}
                    </p>
                    <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-bold text-brand-purple">
                      Leer más
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              </RevelarItem>
            ))}
          </RevelarGrupo>
        </section>
      )}

      {/* Sobre Tarareando + Reconocimientos */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Revelar>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Sobre Tarareando
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tarareando nació en Trujillo como un proyecto de educación
              musical para explicar la música de forma clara, cercana y
              práctica.
            </p>
            <p className="mt-3 text-muted-foreground">
              Con el tiempo, el proyecto creció como canal, comunidad y
              espacio de formación, acompañando a músicos independientes que
              buscan entender mejor lo que hacen y avanzar con más orden.
            </p>
            <p className="mt-3 text-muted-foreground">
              Actualmente, desde Cajabamba, Tarareando continúa desarrollando
              recursos, asesorías y espacios de formación para músicos
              autodidactas y estudiantes de música que quieren construir una
              ruta de aprendizaje más clara y realista.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-6 rounded-full border-2 font-bold"
            >
              <Link href="/sobre-tarareando">
                Conoce más sobre Tarareando
              </Link>
            </Button>
          </Revelar>

          <Revelar>
            <div className="rounded-3xl bg-brand-ink p-8 text-white">
              <h3 className="text-xl font-bold text-brand-yellow">
                Un proyecto con trayectoria
              </h3>
              <ul className="mt-5 space-y-4">
                {RECONOCIMIENTOS.map((r) => (
                  <li key={r.texto} className="flex items-start gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/10">
                      <r.icono
                        className="size-4 text-brand-yellow"
                        aria-hidden
                      />
                    </span>
                    <span className="pt-1 text-sm text-white/85">
                      {r.texto}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Revelar>
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <Revelar>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Lo que dicen quienes han aprendido con Tarareando
              </h2>
              <p className="mt-3 text-muted-foreground">
                Comentarios, reseñas y experiencias de músicos que han
                aprendido con nuestros contenidos, clases o espacios de
                formación.
              </p>
            </div>
          </Revelar>
          <RevelarGrupo className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIOS.map((t) => (
              <RevelarItem key={t.origen}>
                <figure
                  className={`h-full rounded-3xl bg-white p-6 shadow-sm ${
                    t.placeholder ? "opacity-60" : ""
                  }`}
                >
                  <blockquote className="text-sm italic text-brand-ink/80">
                    “{t.texto}”
                  </blockquote>
                  <figcaption className="mt-4">
                    <p className="text-sm font-bold">{t.nombre}</p>
                    <p className="text-xs text-muted-foreground">{t.origen}</p>
                  </figcaption>
                  {t.placeholder && (
                    <p className="mt-3 text-xs font-semibold text-brand-orange">
                      Espacio reservado para un testimonio real.
                    </p>
                  )}
                </figure>
              </RevelarItem>
            ))}
          </RevelarGrupo>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 md:py-20">
        <Revelar>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Músico autodidacta, no improvisado.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Da el primer paso: una sesión gratuita para saber dónde estás y
            qué ordenar primero.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-full px-10 text-base font-bold"
          >
            <Link href={RUTA_RESERVA}>
              Reserva tu diagnóstico gratuito
            </Link>
          </Button>
        </Revelar>
      </section>
    </>
  );
}
