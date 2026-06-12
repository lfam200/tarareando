"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { MODO_DEMO, getProductoPorSlug } from "@/lib/data";
import { leerFuente } from "@/lib/fuente";
import { notificarNegocio } from "@/lib/notify";
import { formatoSoles } from "@/lib/format";
import type { MetodoPago, TipoSesion } from "@/lib/types";

// Un archivo "use server" solo puede exportar funciones async;
// el estado inicial de los formularios se define en cada componente.
export interface EstadoFormulario {
  ok: boolean;
  mensaje: string;
}

function limpiar(valor: FormDataEntryValue | null): string {
  return typeof valor === "string" ? valor.trim() : "";
}

function emailValido(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Busca o crea el cliente por email. El origen (fuente/UTM) solo se asigna
// al crearlo: el primer origen del cliente nunca se sobreescribe.
async function upsertCliente(datos: {
  nombre: string;
  email: string;
  telefono?: string;
  suscribirNewsletter?: boolean;
  notas?: string;
}): Promise<string> {
  const supabase = createAdminClient();
  const { data: existente } = await supabase
    .from("clientes")
    .select("id, telefono, suscrito_newsletter, notas")
    .eq("email", datos.email)
    .maybeSingle();

  if (existente) {
    await supabase
      .from("clientes")
      .update({
        nombre: datos.nombre,
        telefono: datos.telefono || existente.telefono,
        suscrito_newsletter:
          existente.suscrito_newsletter || Boolean(datos.suscribirNewsletter),
        notas: existente.notas || datos.notas || null,
      })
      .eq("id", existente.id);
    return existente.id;
  }

  const fuente = await leerFuente();
  const { data: nuevo, error } = await supabase
    .from("clientes")
    .insert({
      nombre: datos.nombre,
      email: datos.email,
      telefono: datos.telefono || null,
      suscrito_newsletter: Boolean(datos.suscribirNewsletter),
      notas: datos.notas || null,
      ...fuente,
    })
    .select("id")
    .single();
  if (error || !nuevo)
    throw new Error(`No se pudo registrar el cliente: ${error?.message}`);
  return nuevo.id;
}

// --- Checkout: crea el pedido pendiente y redirige a las instrucciones de pago.
export async function crearPedido(formData: FormData) {
  const slug = limpiar(formData.get("producto_slug"));
  const nombre = limpiar(formData.get("nombre"));
  const email = limpiar(formData.get("email")).toLowerCase();
  const telefono = limpiar(formData.get("telefono"));
  const metodoPago = limpiar(formData.get("metodo_pago")) as MetodoPago;

  if (!nombre || !emailValido(email) || !slug) {
    redirect(`/comprar/${slug}?error=datos`);
  }
  if (!["yape", "paypal", "transferencia"].includes(metodoPago)) {
    redirect(`/comprar/${slug}?error=metodo`);
  }

  const producto = await getProductoPorSlug(slug);
  if (!producto) redirect("/cursos");

  if (MODO_DEMO) {
    redirect(`/gracias/demo?slug=${slug}&metodo=${metodoPago}`);
  }

  const clienteId = await upsertCliente({ nombre, email, telefono });
  const fuente = await leerFuente();
  const supabase = createAdminClient();
  const { data: pedido, error } = await supabase
    .from("pedidos")
    .insert({
      cliente_id: clienteId,
      producto_id: producto.id,
      monto: producto.precio,
      metodo_pago: metodoPago,
      fuente: fuente.fuente,
    })
    .select("id")
    .single();
  if (error || !pedido)
    throw new Error(`No se pudo crear el pedido: ${error?.message}`);

  await notificarNegocio(
    `Nuevo pedido: ${producto.nombre} (${formatoSoles(producto.precio)})`,
    `<p><strong>${nombre}</strong> (${email}, ${telefono || "sin teléfono"})
     pidió <strong>${producto.nombre}</strong> por
     <strong>${formatoSoles(producto.precio)}</strong> vía ${metodoPago}.</p>
     <p>Confírmalo en el panel: ${process.env.NEXT_PUBLIC_SITE_URL}/admin/pedidos</p>`,
  );

  redirect(`/gracias/${pedido.id}`);
}

// --- Newsletter "Cartas para músicos autodidactas": captura de leads vía
// lead magnet (guía gratuita). Hoy los suscriptores se guardan en la tabla
// `clientes` de Supabase (suscrito_newsletter = true) y se notifica al
// negocio para enviar la guía manualmente. Cuando exista una herramienta de
// email marketing (p. ej. una audiencia de Resend con autoresponder),
// conectar aquí el alta y el envío automático de la guía.
export async function suscribirNewsletter(
  _estado: EstadoFormulario,
  formData: FormData,
): Promise<EstadoFormulario> {
  const nombre = limpiar(formData.get("nombre"));
  const email = limpiar(formData.get("email")).toLowerCase();
  const nivel = limpiar(formData.get("nivel"));
  if (!nombre || !emailValido(email)) {
    return { ok: false, mensaje: "Escribe tu nombre y un correo válido." };
  }
  if (!MODO_DEMO) {
    await upsertCliente({
      nombre,
      email,
      suscribirNewsletter: true,
      notas: nivel ? `Nivel/interés (newsletter): ${nivel}` : undefined,
    });
    await notificarNegocio(
      "Nuevo suscriptor pidió la guía gratuita",
      `<p><strong>${nombre}</strong> (${email}${nivel ? `, ${nivel}` : ""})
       descargó la guía y se unió a la newsletter.</p>
       <p>Envíale la guía: "Cómo ordenar tu estudio musical si eres autodidacta".</p>`,
    );
  }
  return {
    ok: true,
    mensaje: "¡Listo! Te enviaremos la guía a tu correo.",
  };
}

// --- Agenda tu sesión: crea la solicitud de clase en vivo o asesoría.
export async function solicitarSesion(
  _estado: EstadoFormulario,
  formData: FormData,
): Promise<EstadoFormulario> {
  const nombre = limpiar(formData.get("nombre"));
  const email = limpiar(formData.get("email")).toLowerCase();
  const telefono = limpiar(formData.get("telefono"));
  const tipo = limpiar(formData.get("tipo")) as TipoSesion;
  const fechaHora = limpiar(formData.get("fecha_hora"));
  const notas = limpiar(formData.get("notas"));

  if (!nombre || !emailValido(email) || !fechaHora) {
    return {
      ok: false,
      mensaje: "Completa tu nombre, un correo válido y la fecha que prefieres.",
    };
  }
  if (!["clase_en_vivo", "asesoria"].includes(tipo)) {
    return { ok: false, mensaje: "Elige el tipo de sesión." };
  }

  if (!MODO_DEMO) {
    const clienteId = await upsertCliente({ nombre, email, telefono });
    const supabase = createAdminClient();
    const { error } = await supabase.from("sesiones").insert({
      cliente_id: clienteId,
      tipo,
      fecha_hora: new Date(fechaHora).toISOString(),
      notas: notas || null,
    });
    if (error) {
      return {
        ok: false,
        mensaje: "No pudimos registrar tu solicitud. Inténtalo de nuevo.",
      };
    }
    await notificarNegocio(
      `Nueva reserva de ${tipo === "asesoria" ? "asesoría" : "clase en vivo"}`,
      `<p><strong>${nombre}</strong> (${email}, ${telefono || "sin teléfono"})
       solicitó una ${tipo === "asesoria" ? "asesoría" : "clase en vivo"}
       para <strong>${fechaHora}</strong>.</p>
       ${notas ? `<p>Notas: ${notas}</p>` : ""}
       <p>Gestiónala en el panel: ${process.env.NEXT_PUBLIC_SITE_URL}/admin/sesiones</p>`,
    );
  }

  return {
    ok: true,
    mensaje:
      "¡Solicitud enviada! Te confirmaremos el horario por WhatsApp o correo. 🎶",
  };
}
