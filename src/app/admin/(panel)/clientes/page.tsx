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
import { EstadoBadge } from "@/components/admin/estado-badge";
import { getClientes } from "@/lib/data-admin";
import { formatoFecha } from "@/lib/format";

export const metadata: Metadata = {
  title: "Clientes",
  robots: { index: false },
};

export default async function PaginaClientes() {
  const clientes = await getClientes();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Clientes</h1>

      {clientes.length === 0 ? (
        <p className="text-muted-foreground">
          Tu base de clientes se llenará con cada lead y compra de la web.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fuente</TableHead>
                <TableHead>Newsletter</TableHead>
                <TableHead>Registro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>
                    <Link
                      href={`/admin/clientes/${cliente.id}`}
                      className="font-semibold text-brand-purple hover:underline"
                    >
                      {cliente.nombre}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{cliente.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {cliente.telefono ?? "sin teléfono"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <EstadoBadge estado={cliente.estado} />
                  </TableCell>
                  <TableCell className="text-sm capitalize">
                    {cliente.fuente ?? "—"}
                  </TableCell>
                  <TableCell>
                    {cliente.suscrito_newsletter ? "✅" : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatoFecha(cliente.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
