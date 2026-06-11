import { createAdminClient } from "./supabase/server";
import { MODO_DEMO } from "./data";
import type {
  Cliente,
  PedidoConRelaciones,
  Producto,
  SaldoClases,
  SesionConCliente,
} from "./types";

export interface Metricas {
  alumnos: number;
  interesados: number;
  pedidosPendientes: number;
  ventasMes: number;
  sesionesReservadas: number;
  fuentes: { fuente: string; total: number }[];
}

const METRICAS_VACIAS: Metricas = {
  alumnos: 0,
  interesados: 0,
  pedidosPendientes: 0,
  ventasMes: 0,
  sesionesReservadas: 0,
  fuentes: [],
};

export async function getMetricas(): Promise<Metricas> {
  if (MODO_DEMO) return METRICAS_VACIAS;
  const supabase = createAdminClient();
  const inicioMes = new Date();
  inicioMes.setDate(1);
  inicioMes.setHours(0, 0, 0, 0);

  const [alumnos, interesados, pendientes, pagadosMes, reservadas, clientes] =
    await Promise.all([
      supabase
        .from("clientes")
        .select("id", { count: "exact", head: true })
        .eq("estado", "alumno"),
      supabase
        .from("clientes")
        .select("id", { count: "exact", head: true })
        .eq("estado", "interesado"),
      supabase
        .from("pedidos")
        .select("id", { count: "exact", head: true })
        .eq("estado", "pendiente"),
      supabase
        .from("pedidos")
        .select("monto")
        .eq("estado", "pagado")
        .gte("pagado_at", inicioMes.toISOString()),
      supabase
        .from("sesiones")
        .select("id", { count: "exact", head: true })
        .eq("estado", "reservada"),
      supabase.from("clientes").select("fuente"),
    ]);

  const conteoFuentes = new Map<string, number>();
  for (const c of clientes.data ?? []) {
    const fuente = c.fuente ?? "sin dato";
    conteoFuentes.set(fuente, (conteoFuentes.get(fuente) ?? 0) + 1);
  }

  return {
    alumnos: alumnos.count ?? 0,
    interesados: interesados.count ?? 0,
    pedidosPendientes: pendientes.count ?? 0,
    ventasMes: (pagadosMes.data ?? []).reduce(
      (suma, p) => suma + Number(p.monto),
      0,
    ),
    sesionesReservadas: reservadas.count ?? 0,
    fuentes: [...conteoFuentes.entries()]
      .map(([fuente, total]) => ({ fuente, total }))
      .sort((a, b) => b.total - a.total),
  };
}

export async function getClientes(): Promise<Cliente[]> {
  if (MODO_DEMO) return [];
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("clientes")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export interface ClienteDetalle {
  cliente: Cliente;
  pedidos: PedidoConRelaciones[];
  sesiones: SesionConCliente[];
  saldos: SaldoClases[];
}

export async function getClienteDetalle(
  id: string,
): Promise<ClienteDetalle | null> {
  if (MODO_DEMO) return null;
  const supabase = createAdminClient();
  const [cliente, pedidos, sesiones, saldos] = await Promise.all([
    supabase.from("clientes").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("pedidos")
      .select("*, clientes(id, nombre, email, telefono), productos(id, nombre, tipo, num_clases)")
      .eq("cliente_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("sesiones")
      .select("*, clientes(id, nombre, email, telefono)")
      .eq("cliente_id", id)
      .order("fecha_hora", { ascending: false }),
    supabase.from("saldo_clases").select("*").eq("cliente_id", id),
  ]);
  if (!cliente.data) return null;
  return {
    cliente: cliente.data,
    pedidos: (pedidos.data ?? []) as PedidoConRelaciones[],
    sesiones: (sesiones.data ?? []) as SesionConCliente[],
    saldos: (saldos.data ?? []) as SaldoClases[],
  };
}

export async function getPedidos(): Promise<PedidoConRelaciones[]> {
  if (MODO_DEMO) return [];
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("pedidos")
    .select("*, clientes(id, nombre, email, telefono), productos(id, nombre, tipo, num_clases)")
    .order("created_at", { ascending: false });
  return (data ?? []) as PedidoConRelaciones[];
}

export async function getSesiones(): Promise<SesionConCliente[]> {
  if (MODO_DEMO) return [];
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("sesiones")
    .select("*, clientes(id, nombre, email, telefono)")
    .order("fecha_hora", { ascending: false });
  return (data ?? []) as SesionConCliente[];
}

export async function getProductosAdmin(): Promise<Producto[]> {
  if (MODO_DEMO) return [];
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("productos")
    .select("*")
    .order("created_at");
  return data ?? [];
}
