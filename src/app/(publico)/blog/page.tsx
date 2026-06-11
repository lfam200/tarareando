import type { Metadata } from "next";
import Link from "next/link";
import { Revelar, RevelarGrupo, RevelarItem } from "@/components/animacion";
import { formatoFecha, getEntradas } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos de educación musical de Tarareando: teoría, lectura de partituras y herramientas para músicos independientes.",
};

export default async function PaginaBlog() {
  const entradas = await getEntradas();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
      <Revelar>
        <h1 className="text-4xl font-bold sm:text-5xl">Blog</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Artículos para entender mejor la música y estudiar con más orden.
        </p>
      </Revelar>

      {entradas.length === 0 ? (
        <Revelar className="mt-12">
          <div className="rounded-3xl bg-brand-cream p-10 text-center">
            <p className="text-lg font-semibold">
              Estamos migrando las entradas del blog. ¡Vuelve pronto! 🎵
            </p>
          </div>
        </Revelar>
      ) : (
        <RevelarGrupo className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <div className="grid aspect-[16/9] w-full place-items-center bg-brand-purple/10 text-4xl">
                    🎵
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  {entrada.fecha && (
                    <p className="text-xs font-semibold text-muted-foreground">
                      {formatoFecha(entrada.fecha)}
                    </p>
                  )}
                  <h2 className="mt-1 text-lg font-bold">{entrada.titulo}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {entrada.extracto}
                  </p>
                  <span className="mt-auto pt-4 text-sm font-bold text-brand-purple">
                    Leer más →
                  </span>
                </div>
              </Link>
            </RevelarItem>
          ))}
        </RevelarGrupo>
      )}
    </div>
  );
}
