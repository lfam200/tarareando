import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Revelar } from "@/components/animacion";
import { Button } from "@/components/ui/button";
import { getPedidoDetalle, getProductoPorSlug, MODO_DEMO } from "@/lib/data";
import { formatoSoles } from "@/lib/format";
import { INSTRUCCIONES_PAGO, linkWhatsApp } from "@/lib/config";
import type { MetodoPago } from "@/lib/types";

export const metadata: Metadata = { title: "¡Pedido recibido!" };

interface Props {
  params: Promise<{ pedido: string }>;
  searchParams: Promise<{ slug?: string; metodo?: string }>;
}

export default async function PaginaGracias({ params, searchParams }: Props) {
  const { pedido: pedidoId } = await params;
  const { slug, metodo } = await searchParams;

  let nombreProducto: string;
  let monto: number;
  let metodoPago: MetodoPago;

  if (MODO_DEMO && pedidoId === "demo" && slug) {
    const producto = await getProductoPorSlug(slug);
    if (!producto) notFound();
    nombreProducto = producto.nombre;
    monto = producto.precio;
    metodoPago = (metodo as MetodoPago) ?? "yape";
  } else {
    const pedido = await getPedidoDetalle(pedidoId);
    if (!pedido || !pedido.productos) notFound();
    nombreProducto = pedido.productos.nombre;
    monto = Number(pedido.monto);
    metodoPago = pedido.metodo_pago;
  }

  const instrucciones = INSTRUCCIONES_PAGO[metodoPago];
  const mensajeWhatsApp = `Hola Tarareando 🎵 Acabo de pedir "${nombreProducto}" (${formatoSoles(
    monto,
  )}) y te envío mi constancia de pago por ${instrucciones.titulo}.`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Revelar>
        <div className="text-center">
          <span className="text-6xl" aria-hidden>
            🎉
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            ¡Pedido recibido!
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Reservamos <strong>{nombreProducto}</strong> para ti. Solo falta un
            paso: completa tu pago de{" "}
            <strong className="text-brand-ink">{formatoSoles(monto)}</strong>.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border-2 border-brand-yellow bg-brand-cream p-8">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-orange">
            Paso 1 · Paga con {instrucciones.titulo}
          </p>
          <p className="mt-2 text-lg font-semibold text-brand-ink">
            {instrucciones.detalle}
          </p>

          <p className="mt-6 text-xs font-bold uppercase tracking-wide text-brand-orange">
            Paso 2 · Envíanos tu constancia
          </p>
          <p className="mt-2 text-brand-ink/80">
            Mándanos la captura o constancia por WhatsApp y activamos tu compra
            de inmediato.
          </p>

          <Button
            asChild
            size="lg"
            className="mt-6 w-full rounded-full text-base font-bold"
          >
            <a
              href={linkWhatsApp(mensajeWhatsApp)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enviar constancia por WhatsApp
            </a>
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          ¿Pagaste y no recibes respuesta en unas horas? Escríbenos de nuevo
          por WhatsApp o a nuestro correo.{" "}
          <Link href="/" className="font-semibold text-brand-purple">
            Volver al inicio
          </Link>
        </p>
      </Revelar>
    </div>
  );
}
