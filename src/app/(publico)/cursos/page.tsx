import type { Metadata } from "next";
import { ProductoCard } from "@/components/producto-card";
import {
  Revelar,
  RevelarGrupo,
  RevelarItem,
} from "@/components/animacion";
import { getProductos } from "@/lib/data";
import type { TipoProducto } from "@/lib/types";

const TITULO_SECCION: Record<TipoProducto, string> = {
  curso: "Cursos online",
  paquete_clases: "Clases en vivo",
  asesoria: "Asesorías",
  recurso: "Recursos descargables",
};

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cursos y recursos",
  description:
    "Catálogo de cursos online de música, clases en vivo, recursos y asesorías de Tarareando.",
};

const ORDEN_TIPOS: TipoProducto[] = [
  "curso",
  "paquete_clases",
  "asesoria",
  "recurso",
];

export default async function PaginaCursos() {
  const productos = await getProductos();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Revelar>
        <h1 className="text-4xl font-bold sm:text-5xl">Cursos y recursos</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Todo lo que necesitas para aprender música: cursos online, clases en
          vivo, material de práctica y asesorías personalizadas.
        </p>
      </Revelar>

      {ORDEN_TIPOS.map((tipo) => {
        const grupo = productos.filter((p) => p.tipo === tipo);
        if (grupo.length === 0) return null;
        return (
          <section key={tipo} className="mt-14">
            <Revelar>
              <h2 className="text-2xl font-bold">{TITULO_SECCION[tipo]}</h2>
            </Revelar>
            <RevelarGrupo className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grupo.map((producto) => (
                <RevelarItem key={producto.id}>
                  <ProductoCard producto={producto} />
                </RevelarItem>
              ))}
            </RevelarGrupo>
          </section>
        );
      })}
    </div>
  );
}
