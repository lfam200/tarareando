import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Revelar } from "@/components/animacion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProductoPorSlug } from "@/lib/data";
import { crearPedido } from "@/lib/actions/publico";
import { ETIQUETA_TIPO, formatoSoles } from "@/lib/format";

export const metadata: Metadata = { title: "Completa tu compra" };

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string }>;
}

const METODOS = [
  { valor: "yape", etiqueta: "Yape", emoji: "📱" },
  { valor: "paypal", etiqueta: "PayPal", emoji: "🌎" },
  { valor: "transferencia", etiqueta: "Transferencia", emoji: "🏦" },
];

const MENSAJE_ERROR: Record<string, string> = {
  datos: "Revisa tu nombre y correo: parece que algo faltó.",
  metodo: "Elige un método de pago para continuar.",
};

export default async function PaginaComprar({ params, searchParams }: Props) {
  const { slug } = await params;
  const { error } = await searchParams;
  const producto = await getProductoPorSlug(slug);
  if (!producto || producto.tipo === "asesoria") notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <Revelar>
        <Link
          href={`/cursos/${producto.slug}`}
          className="text-sm font-semibold text-brand-purple hover:underline"
        >
          ← Volver
        </Link>

        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          Completa tu compra
        </h1>

        {/* Resumen */}
        <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-brand-cream p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand-purple">
              {ETIQUETA_TIPO[producto.tipo]}
            </p>
            <p className="font-heading text-lg font-bold">{producto.nombre}</p>
          </div>
          <p className="font-heading text-2xl font-bold">
            {formatoSoles(producto.precio)}
          </p>
        </div>

        {error && MENSAJE_ERROR[error] ? (
          <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
            {MENSAJE_ERROR[error]}
          </p>
        ) : null}

        <form action={crearPedido} className="mt-8 space-y-6">
          <input type="hidden" name="producto_slug" value={producto.slug} />

          <div className="space-y-2">
            <Label htmlFor="nombre">Tu nombre *</Label>
            <Input
              id="nombre"
              name="nombre"
              required
              placeholder="Nombre y apellido"
              className="h-12 rounded-xl"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Correo *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tu@correo.com"
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">WhatsApp</Label>
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="+51 999 999 999"
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold">
              ¿Cómo prefieres pagar? *
            </legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {METODOS.map((metodo, i) => (
                <label
                  key={metodo.valor}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-brand-ink/10 p-4 font-semibold transition-colors has-[:checked]:border-brand-purple has-[:checked]:bg-brand-purple/5"
                >
                  <input
                    type="radio"
                    name="metodo_pago"
                    value={metodo.valor}
                    defaultChecked={i === 0}
                    required
                    className="accent-brand-purple"
                  />
                  <span aria-hidden>{metodo.emoji}</span>
                  {metodo.etiqueta}
                </label>
              ))}
            </div>
          </fieldset>

          <Button
            type="submit"
            size="lg"
            className="h-13 w-full rounded-full text-base font-bold"
          >
            Confirmar pedido — {formatoSoles(producto.precio)}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Al confirmar verás las instrucciones de pago. Tu pedido queda
            reservado y lo activamos apenas confirmemos tu pago.
          </p>
        </form>
      </Revelar>
    </div>
  );
}
