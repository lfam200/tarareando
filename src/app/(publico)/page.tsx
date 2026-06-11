import Link from "next/link";
import { Hero } from "@/components/hero";
import { Newsletter } from "@/components/newsletter";
import { ProductoCard } from "@/components/producto-card";
import {
  Revelar,
  RevelarGrupo,
  RevelarItem,
} from "@/components/animacion";
import { Button } from "@/components/ui/button";
import { getProductos } from "@/lib/data";

export const revalidate = 60;

const PASOS = [
  {
    emoji: "🎯",
    titulo: "Elige tu camino",
    detalle:
      "Cursos online para aprender a tu ritmo, clases en vivo 1 a 1 o una asesoría personalizada.",
  },
  {
    emoji: "💳",
    titulo: "Paga como prefieras",
    detalle:
      "Yape, PayPal o transferencia bancaria. Te confirmamos por WhatsApp en minutos.",
  },
  {
    emoji: "🎸",
    titulo: "¡A hacer música!",
    detalle:
      "Empieza tus clases con profes que viven de la música y acompañan cada paso.",
  },
];

export default async function Home() {
  const productos = await getProductos();
  const destacados = productos.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Cursos destacados */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Revelar>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Aprende con nosotros
              </h2>
              <p className="mt-2 text-muted-foreground">
                Lo más pedido por las familias Tarareando.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-2 font-bold"
            >
              <Link href="/cursos">Ver todo el catálogo</Link>
            </Button>
          </div>
        </Revelar>

        <RevelarGrupo className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((producto) => (
            <RevelarItem key={producto.id}>
              <ProductoCard producto={producto} />
            </RevelarItem>
          ))}
        </RevelarGrupo>
      </section>

      {/* Cómo funciona */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <Revelar>
            <h2 className="text-center text-3xl font-bold sm:text-4xl">
              Empezar es facilísimo
            </h2>
          </Revelar>
          <RevelarGrupo className="mt-12 grid gap-8 md:grid-cols-3">
            {PASOS.map((paso, i) => (
              <RevelarItem key={paso.titulo}>
                <div className="relative rounded-3xl bg-white p-8 text-center shadow-sm h-full">
                  <span className="absolute -top-4 left-1/2 grid size-9 -translate-x-1/2 place-items-center rounded-full bg-brand-yellow font-heading font-bold text-brand-ink shadow">
                    {i + 1}
                  </span>
                  <span className="text-5xl" aria-hidden>
                    {paso.emoji}
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{paso.titulo}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {paso.detalle}
                  </p>
                </div>
              </RevelarItem>
            ))}
          </RevelarGrupo>
        </div>
      </section>

      {/* CTA asesoría */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
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
            <h2 className="relative text-3xl font-bold text-white sm:text-4xl">
              ¿No sabes por dónde empezar?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-white/75">
              Agenda una asesoría personalizada y armamos juntos la ruta de
              aprendizaje ideal para tu hijo o hija.
            </p>
            <Button
              asChild
              size="lg"
              className="relative mt-8 rounded-full px-10 text-base font-bold"
            >
              <Link href="/agenda">Agenda tu sesión</Link>
            </Button>
          </div>
        </Revelar>
      </section>

      <Newsletter />
    </>
  );
}
