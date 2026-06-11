import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EstadoBadge } from "@/components/admin/estado-badge";
import { getClienteDetalle } from "@/lib/data-admin";
import { formatoFecha, formatoSoles } from "@/lib/format";
import { linkWhatsApp } from "@/lib/config";

export const metadata: Metadata = {
  title: "Detalle de cliente",
  robots: { index: false },
};

export default async function PaginaCliente({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detalle = await getClienteDetalle(id);
  if (!detalle) notFound();
  const { cliente, pedidos, sesiones, saldos } = detalle;

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/clientes"
          className="text-sm font-semibold text-brand-purple hover:underline"
        >
          ← Clientes
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold">{cliente.nombre}</h1>
          <EstadoBadge estado={cliente.estado} />
        </div>
        <p className="mt-1 text-muted-foreground">
          {cliente.email} · {cliente.telefono ?? "sin teléfono"} · fuente:{" "}
          <span className="capitalize">{cliente.fuente ?? "sin dato"}</span>
        </p>
        {cliente.telefono ? (
          <Button
            asChild
            size="sm"
            variant="outline"
            className="mt-3 rounded-full font-semibold"
          >
            <a
              href={linkWhatsApp(
                `¡Hola ${cliente.nombre}! Te escribimos de Tarareando 🎵`,
                cliente.telefono,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribir por WhatsApp
            </a>
          </Button>
        ) : null}
      </div>

      {/* Saldo de clases (reporte clave del brief 6.2) */}
      {saldos.length > 0 ? (
        <section>
          <h2 className="text-xl font-bold">Saldo de clases</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {saldos.map((saldo) => (
              <Card key={saldo.pedido_id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">
                    {saldo.producto}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-heading text-2xl font-bold">
                    {saldo.clases_restantes}{" "}
                    <span className="text-sm font-sans font-semibold text-muted-foreground">
                      de {saldo.clases_total} clases disponibles
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="text-xl font-bold">Pedidos</h2>
        {pedidos.length === 0 ? (
          <p className="mt-2 text-muted-foreground">Sin pedidos todavía.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {pedidos.map((pedido) => (
              <li
                key={pedido.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white px-5 py-4"
              >
                <div>
                  <p className="font-semibold">{pedido.productos?.nombre}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatoFecha(pedido.created_at)} · {pedido.metodo_pago}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold">
                    {formatoSoles(Number(pedido.monto))}
                  </span>
                  <EstadoBadge estado={pedido.estado} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold">Sesiones</h2>
        {sesiones.length === 0 ? (
          <p className="mt-2 text-muted-foreground">Sin sesiones todavía.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {sesiones.map((sesion) => (
              <li
                key={sesion.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white px-5 py-4"
              >
                <div>
                  <p className="font-semibold">
                    {sesion.tipo === "asesoria"
                      ? "Asesoría personalizada"
                      : "Clase en vivo"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatoFecha(sesion.fecha_hora)}
                  </p>
                </div>
                <EstadoBadge estado={sesion.estado} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {cliente.notas ? (
        <section>
          <h2 className="text-xl font-bold">Notas</h2>
          <p className="mt-2 whitespace-pre-wrap text-muted-foreground">
            {cliente.notas}
          </p>
        </section>
      ) : null}
    </div>
  );
}
