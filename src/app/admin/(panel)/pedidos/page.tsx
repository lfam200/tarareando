import type { Metadata } from "next";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EstadoBadge } from "@/components/admin/estado-badge";
import { getPedidos } from "@/lib/data-admin";
import { cambiarEstadoPedido } from "@/lib/actions/admin";
import { formatoFecha, formatoSoles } from "@/lib/format";
import { linkWhatsApp } from "@/lib/config";

export const metadata: Metadata = {
  title: "Pedidos",
  robots: { index: false },
};

export default async function PaginaPedidos() {
  const pedidos = await getPedidos();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pedidos</h1>

      {pedidos.length === 0 ? (
        <p className="text-muted-foreground">
          Aún no hay pedidos. Llegarán solos cuando la web esté en línea. 🎵
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidos.map((pedido) => {
                const marcarPagado = cambiarEstadoPedido.bind(
                  null,
                  pedido.id,
                  "pagado" as const,
                );
                const cancelar = cambiarEstadoPedido.bind(
                  null,
                  pedido.id,
                  "cancelado" as const,
                );
                return (
                  <TableRow key={pedido.id}>
                    <TableCell>
                      <Link
                        href={`/admin/clientes/${pedido.cliente_id}`}
                        className="font-semibold text-brand-purple hover:underline"
                      >
                        {pedido.clientes?.nombre ?? "—"}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {pedido.clientes?.email}
                      </p>
                    </TableCell>
                    <TableCell>{pedido.productos?.nombre ?? "—"}</TableCell>
                    <TableCell className="font-semibold">
                      {formatoSoles(Number(pedido.monto))}
                    </TableCell>
                    <TableCell className="capitalize">
                      {pedido.metodo_pago}
                    </TableCell>
                    <TableCell>
                      <EstadoBadge estado={pedido.estado} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatoFecha(pedido.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      {pedido.estado === "pendiente" ? (
                        <div className="flex justify-end gap-2">
                          <form action={marcarPagado}>
                            <Button
                              type="submit"
                              size="sm"
                              className="rounded-full font-bold"
                            >
                              Marcar pagado
                            </Button>
                          </form>
                          <form action={cancelar}>
                            <Button
                              type="submit"
                              size="sm"
                              variant="ghost"
                              className="rounded-full text-muted-foreground"
                            >
                              Cancelar
                            </Button>
                          </form>
                        </div>
                      ) : pedido.clientes?.telefono &&
                        pedido.estado === "pagado" ? (
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="rounded-full font-semibold"
                        >
                          <a
                            href={linkWhatsApp(
                              `¡Hola ${pedido.clientes.nombre}! 🎵 Confirmamos tu pago de "${pedido.productos?.nombre}". ¡Bienvenido/a a Tarareando!`,
                              pedido.clientes.telefono,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            WhatsApp
                          </a>
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
