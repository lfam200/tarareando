import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Revelar } from "@/components/animacion";
import { getProductoPorSlug, getProductos } from "@/lib/data";
import { ETIQUETA_TIPO, formatoSoles } from "@/lib/format";
import { linkWhatsApp } from "@/lib/config";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const producto = await getProductoPorSlug(slug);
  return {
    title: producto?.nombre ?? "Producto",
    description: producto?.descripcion ?? undefined,
  };
}

export async function generateStaticParams() {
  const productos = await getProductos();
  return productos
    .filter((p) => p.tipo !== "asesoria")
    .map((p) => ({ slug: p.slug }));
}

const INCLUYE: Record<string, string[]> = {
  curso: [
    "Acceso completo al curso online",
    "Material de práctica descargable",
    "Acompañamiento por WhatsApp",
  ],
  recurso: [
    "Descarga inmediata tras confirmar el pago",
    "Material en PDF y audio",
    "Actualizaciones incluidas",
  ],
  paquete_clases: [
    "Clases en vivo 1 a 1 por videollamada",
    "Horarios flexibles: agendas cada clase",
    "Profes que viven de la música",
  ],
  asesoria: [
    "Sesión 1 a 1 por videollamada",
    "Plan de aprendizaje personalizado",
    "Resolución de todas tus dudas",
  ],
};

export default async function PaginaProducto({ params }: Props) {
  const { slug } = await params;
  const producto = await getProductoPorSlug(slug);
  if (!producto) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Revelar>
        <Link
          href="/cursos"
          className="text-sm font-semibold text-brand-purple hover:underline"
        >
          ← Volver al catálogo
        </Link>

        <div className="mt-6 rounded-3xl border border-brand-ink/8 bg-white p-8 shadow-sm sm:p-12">
          <Badge className="rounded-full bg-brand-purple text-white">
            {ETIQUETA_TIPO[producto.tipo]}
          </Badge>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            {producto.nombre}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {producto.descripcion}
          </p>

          <ul className="mt-8 space-y-3">
            {(INCLUYE[producto.tipo] ?? []).map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-yellow text-sm font-bold text-brand-ink">
                  ✓
                </span>
                <span className="text-brand-ink/80">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-brand-cream p-6">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Precio
              </p>
              <p className="font-heading text-4xl font-bold text-brand-ink">
                {formatoSoles(producto.precio)}
              </p>
              {producto.num_clases ? (
                <p className="text-sm font-semibold text-brand-purple">
                  {producto.num_clases} clases en vivo incluidas
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 font-bold"
              >
                <Link href={`/comprar/${producto.slug}`}>Comprar ahora</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-2 font-bold"
              >
                <a
                  href={linkWhatsApp(
                    `Hola Tarareando, tengo una consulta sobre "${producto.nombre}" 🎵`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Revelar>
    </div>
  );
}
