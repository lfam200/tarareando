import { createAdminClient, supabaseConfigurado } from "./supabase/server";
import { CATALOGO_DEMO } from "./catalogo-demo";
import type { Cliente, Pedido, Producto } from "./types";

export const MODO_DEMO = !supabaseConfigurado();

export async function getProductos(): Promise<Producto[]> {
  if (MODO_DEMO) return CATALOGO_DEMO;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .order("created_at");
  if (error) throw new Error(`Error cargando catálogo: ${error.message}`);
  return data ?? [];
}

export async function getProductoPorSlug(
  slug: string,
): Promise<Producto | null> {
  if (MODO_DEMO) return CATALOGO_DEMO.find((p) => p.slug === slug) ?? null;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("slug", slug)
    .eq("activo", true)
    .maybeSingle();
  if (error) throw new Error(`Error cargando producto: ${error.message}`);
  return data;
}

export interface PedidoDetalle extends Pedido {
  productos: Producto | null;
  clientes: Pick<Cliente, "nombre" | "email"> | null;
}

// Para la página de gracias: el pedido con su producto y cliente.
export async function getPedidoDetalle(
  id: string,
): Promise<PedidoDetalle | null> {
  if (MODO_DEMO) return null;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("pedidos")
    .select("*, productos(*), clientes(nombre, email)")
    .eq("id", id)
    .maybeSingle();
  if (error) return null;
  return data as PedidoDetalle | null;
}
