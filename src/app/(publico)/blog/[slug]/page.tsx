import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Revelar } from "@/components/animacion";
import { Button } from "@/components/ui/button";
import { LINK_DIAGNOSTICO } from "@/lib/config";
import { formatoFecha, getEntradaPorSlug, getEntradas } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entrada = await getEntradaPorSlug(slug);
  return {
    title: entrada?.titulo ?? "Blog",
    description: entrada?.extracto || undefined,
  };
}

export async function generateStaticParams() {
  const entradas = await getEntradas();
  return entradas.map((e) => ({ slug: e.slug }));
}

export default async function PaginaEntrada({ params }: Props) {
  const { slug } = await params;
  const entrada = await getEntradaPorSlug(slug);
  if (!entrada) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Revelar>
        <Link
          href="/blog"
          className="text-sm font-bold text-brand-purple hover:underline"
        >
          ← Volver al blog
        </Link>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          {entrada.titulo}
        </h1>
        {entrada.fecha && (
          <p className="mt-3 text-sm font-semibold text-muted-foreground">
            {formatoFecha(entrada.fecha)}
          </p>
        )}
        {entrada.imagen && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entrada.imagen}
            alt=""
            className="mt-8 w-full rounded-3xl object-cover"
          />
        )}
      </Revelar>

      <div className="prose-tarareando mt-10">
        <Markdown remarkPlugins={[remarkGfm]}>{entrada.contenido}</Markdown>
      </div>

      <div className="mt-14 rounded-3xl bg-brand-cream px-6 py-10 text-center sm:px-10">
        <h2 className="text-2xl font-bold">
          ¿Quieres ordenar tu formación musical?
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
          Reserva una sesión de diagnóstico gratuito y descubre qué estudiar
          primero según tus objetivos.
        </p>
        <Button asChild size="lg" className="mt-6 rounded-full px-8 font-bold">
          <a href={LINK_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
            Reserva tu diagnóstico gratuito
          </a>
        </Button>
      </div>
    </article>
  );
}
