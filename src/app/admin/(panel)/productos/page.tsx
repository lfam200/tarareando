import type { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProductosAdmin } from "@/lib/data-admin";
import { alternarProductoActivo } from "@/lib/actions/admin";
import { ETIQUETA_TIPO, formatoSoles } from "@/lib/format";
import { FormularioProducto } from "./formulario";

export const metadata: Metadata = {
  title: "Catálogo",
  robots: { index: false },
};

export default async function PaginaProductos() {
  const productos = await getProductosAdmin();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Catálogo</h1>

      <FormularioProducto />

      {productos.length === 0 ? (
        <p className="text-muted-foreground">
          No hay productos. Crea el primero arriba o corre
          <code className="mx-1 rounded bg-white px-1.5">
            supabase/seed.sql
          </code>
          para cargar el catálogo de ejemplo.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Clases</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productos.map((producto) => {
                const alternar = alternarProductoActivo.bind(
                  null,
                  producto.id,
                  !producto.activo,
                );
                return (
                  <TableRow key={producto.id}>
                    <TableCell className="font-semibold">
                      {producto.nombre}
                      <p className="text-xs font-normal text-muted-foreground">
                        /{producto.slug}
                      </p>
                    </TableCell>
                    <TableCell>{ETIQUETA_TIPO[producto.tipo]}</TableCell>
                    <TableCell className="font-semibold">
                      {formatoSoles(Number(producto.precio))}
                    </TableCell>
                    <TableCell>{producto.num_clases ?? "—"}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          producto.activo
                            ? "rounded-full bg-emerald-600 text-white"
                            : "rounded-full bg-zinc-300 text-zinc-700"
                        }
                      >
                        {producto.activo ? "publicado" : "oculto"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <form action={alternar}>
                        <Button
                          type="submit"
                          size="sm"
                          variant="outline"
                          className="rounded-full font-semibold"
                        >
                          {producto.activo ? "Ocultar" : "Publicar"}
                        </Button>
                      </form>
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
