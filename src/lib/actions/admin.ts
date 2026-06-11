"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { supabaseConfigurado } from "@/lib/supabase/server";
import type { EstadoPedido, EstadoSesion } from "@/lib/types";

// --- Autenticación (Supabase Auth, 1 usuario admin en v1) ---

export interface EstadoLogin {
  error: string;
}

export async function iniciarSesion(
  _estado: EstadoLogin,
  formData: FormData,
): Promise<EstadoLogin> {
  if (!supabaseConfigurado()) {
    return {
      error:
        "Supabase no está configurado. Completa las variables en .env.local.",
    };
  }
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return { error: "Correo o contraseña incorrectos." };
  }
  redirect("/admin");
}

export async function cerrarSesion() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// --- Pedidos: pendiente → pagado | cancelado (regla 5.2 del brief).
// El trigger de BD promueve al cliente a "alumno" al marcar pagado. ---

export async function cambiarEstadoPedido(
  pedidoId: string,
  estado: EstadoPedido,
) {
  const supabase = createAdminClient();
  await supabase.from("pedidos").update({ estado }).eq("id", pedidoId);
  revalidatePath("/admin");
}

// --- Sesiones: al marcar "realizada" se descuenta del paquete pagado
// más antiguo con saldo del cliente (regla del plan). ---

export async function cambiarEstadoSesion(
  sesionId: string,
  estado: EstadoSesion,
) {
  const supabase = createAdminClient();

  if (estado === "realizada") {
    const { data: sesion } = await supabase
      .from("sesiones")
      .select("cliente_id, pedido_id")
      .eq("id", sesionId)
      .maybeSingle();

    if (sesion && !sesion.pedido_id) {
      const { data: saldos } = await supabase
        .from("saldo_clases")
        .select("pedido_id, clases_restantes")
        .eq("cliente_id", sesion.cliente_id)
        .gt("clases_restantes", 0)
        .order("pedido_id");
      const pedidoConSaldo = saldos?.[0];
      if (pedidoConSaldo) {
        await supabase
          .from("sesiones")
          .update({ estado, pedido_id: pedidoConSaldo.pedido_id })
          .eq("id", sesionId);
        revalidatePath("/admin");
        return;
      }
    }
  }

  await supabase.from("sesiones").update({ estado }).eq("id", sesionId);
  revalidatePath("/admin");
}

// --- Productos: alta y activar/desactivar (catálogo). ---

export interface EstadoProducto {
  error: string;
}

export async function crearProducto(
  _estado: EstadoProducto,
  formData: FormData,
): Promise<EstadoProducto> {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const tipo = String(formData.get("tipo") ?? "");
  const precio = Number(formData.get("precio"));
  const descripcion = String(formData.get("descripcion") ?? "").trim();
  const numClases = Number(formData.get("num_clases")) || null;

  if (!nombre || !tipo || Number.isNaN(precio) || precio < 0) {
    return { error: "Completa nombre, tipo y un precio válido." };
  }
  if (tipo === "paquete_clases" && !numClases) {
    return { error: "Un paquete de clases necesita el número de clases." };
  }

  const slug = nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const supabase = createAdminClient();
  const { error } = await supabase.from("productos").insert({
    nombre,
    tipo,
    precio,
    descripcion: descripcion || null,
    num_clases: tipo === "paquete_clases" ? numClases : null,
    slug,
  });
  if (error) {
    return { error: `No se pudo crear: ${error.message}` };
  }
  revalidatePath("/admin/productos");
  revalidatePath("/cursos");
  return { error: "" };
}

export async function alternarProductoActivo(
  productoId: string,
  activo: boolean,
) {
  const supabase = createAdminClient();
  await supabase.from("productos").update({ activo }).eq("id", productoId);
  revalidatePath("/admin/productos");
  revalidatePath("/cursos");
}
