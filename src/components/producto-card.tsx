import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TarjetaInteractiva } from "./animacion";
import { ETIQUETA_TIPO, formatoSoles } from "@/lib/format";
import type { Producto } from "@/lib/types";

const COLOR_TIPO: Record<Producto["tipo"], string> = {
  curso: "bg-brand-yellow text-brand-ink",
  recurso: "bg-brand-orange text-white",
  paquete_clases: "bg-brand-purple text-white",
  asesoria: "bg-brand-ink text-white",
};

const EMOJI_TIPO: Record<Producto["tipo"], string> = {
  curso: "🎹",
  recurso: "🎼",
  paquete_clases: "🎤",
  asesoria: "✨",
};

export function ProductoCard({ producto }: { producto: Producto }) {
  const esAgendable = producto.tipo === "asesoria";
  return (
    <TarjetaInteractiva className="h-full">
      <article className="flex h-full flex-col rounded-3xl border border-brand-ink/8 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <span className="text-4xl" aria-hidden>
            {EMOJI_TIPO[producto.tipo]}
          </span>
          <Badge className={`rounded-full ${COLOR_TIPO[producto.tipo]}`}>
            {ETIQUETA_TIPO[producto.tipo]}
          </Badge>
        </div>

        <h3 className="mt-4 text-xl font-bold leading-snug">
          {producto.nombre}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">
          {producto.descripcion}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-heading text-2xl font-bold text-brand-ink">
            {formatoSoles(producto.precio)}
            {producto.num_clases ? (
              <span className="block text-xs font-sans font-semibold text-muted-foreground">
                {producto.num_clases} clases en vivo
              </span>
            ) : null}
          </p>
          <Button asChild className="rounded-full font-bold">
            <Link
              href={
                esAgendable ? "/agenda" : `/cursos/${producto.slug}`
              }
            >
              {esAgendable ? "Agendar" : "Ver más"}
            </Link>
          </Button>
        </div>
      </article>
    </TarjetaInteractiva>
  );
}
