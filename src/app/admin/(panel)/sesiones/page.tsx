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
import { getSesiones } from "@/lib/data-admin";
import { cambiarEstadoSesion } from "@/lib/actions/admin";
import { formatoFecha } from "@/lib/format";
import { linkWhatsApp } from "@/lib/config";

export const metadata: Metadata = {
  title: "Sesiones",
  robots: { index: false },
};

export default async function PaginaSesiones() {
  const sesiones = await getSesiones();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sesiones</h1>
      <p className="text-sm text-muted-foreground">
        Al marcar una sesión como realizada se descuenta automáticamente del
        paquete de clases pagado del alumno (si tiene saldo).
      </p>

      {sesiones.length === 0 ? (
        <p className="text-muted-foreground">
          Sin sesiones por ahora. Las reservas de la web aparecerán aquí.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sesiones.map((sesion) => {
                const marcarRealizada = cambiarEstadoSesion.bind(
                  null,
                  sesion.id,
                  "realizada" as const,
                );
                const cancelar = cambiarEstadoSesion.bind(
                  null,
                  sesion.id,
                  "cancelada" as const,
                );
                const recordatorio = sesion.clientes?.telefono
                  ? linkWhatsApp(
                      `¡Hola ${sesion.clientes.nombre}! 🎵 Te recordamos tu ${
                        sesion.tipo === "asesoria" ? "asesoría" : "clase en vivo"
                      } del ${formatoFecha(sesion.fecha_hora)}. ¡Nos vemos!`,
                      sesion.clientes.telefono,
                    )
                  : null;
                return (
                  <TableRow key={sesion.id}>
                    <TableCell>
                      <Link
                        href={`/admin/clientes/${sesion.cliente_id}`}
                        className="font-semibold text-brand-purple hover:underline"
                      >
                        {sesion.clientes?.nombre ?? "—"}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {sesion.tipo === "asesoria" ? "Asesoría" : "Clase en vivo"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatoFecha(sesion.fecha_hora)}
                    </TableCell>
                    <TableCell>
                      <EstadoBadge estado={sesion.estado} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {sesion.estado === "reservada" ? (
                          <>
                            {recordatorio ? (
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="rounded-full font-semibold"
                              >
                                <a
                                  href={recordatorio}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Recordar
                                </a>
                              </Button>
                            ) : null}
                            <form action={marcarRealizada}>
                              <Button
                                type="submit"
                                size="sm"
                                className="rounded-full font-bold"
                              >
                                Realizada
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
                          </>
                        ) : null}
                      </div>
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
