"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  solicitarSesion,
  type EstadoFormulario,
} from "@/lib/actions/publico";

const ESTADO_INICIAL: EstadoFormulario = { ok: false, mensaje: "" };

export function FormularioAgenda() {
  const [estado, accion, pendiente] = useActionState(
    solicitarSesion,
    ESTADO_INICIAL,
  );

  if (estado.ok) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border-2 border-brand-yellow bg-brand-cream p-10 text-center"
      >
        <span className="text-5xl" aria-hidden>
          ✅
        </span>
        <p className="mt-4 text-xl font-bold">{estado.mensaje}</p>
      </motion.div>
    );
  }

  return (
    <form
      action={accion}
      className="space-y-6 rounded-3xl border border-brand-ink/8 bg-white p-8 shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="nombre">Tu nombre *</Label>
        <Input
          id="nombre"
          name="nombre"
          required
          placeholder="Nombre y apellido"
          className="h-12 rounded-xl"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Correo *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="tu@correo.com"
            className="h-12 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono">WhatsApp</Label>
          <Input
            id="telefono"
            name="telefono"
            type="tel"
            placeholder="+51 999 999 999"
            className="h-12 rounded-xl"
          />
        </div>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold">
          ¿Qué tipo de sesión buscas? *
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-brand-ink/10 p-4 font-semibold transition-colors has-[:checked]:border-brand-purple has-[:checked]:bg-brand-purple/5">
            <input
              type="radio"
              name="tipo"
              value="asesoria"
              defaultChecked
              className="accent-brand-purple"
            />
            ✨ Asesoría personalizada
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-brand-ink/10 p-4 font-semibold transition-colors has-[:checked]:border-brand-purple has-[:checked]:bg-brand-purple/5">
            <input
              type="radio"
              name="tipo"
              value="clase_en_vivo"
              className="accent-brand-purple"
            />
            🎤 Clase en vivo
          </label>
        </div>
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="fecha_hora">Fecha y hora que prefieres *</Label>
        <Input
          id="fecha_hora"
          name="fecha_hora"
          type="datetime-local"
          required
          className="h-12 rounded-xl"
        />
        <p className="text-xs text-muted-foreground">
          Es tu preferencia, no la cita final: la confirmamos contigo.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notas">¿Algo que debamos saber?</Label>
        <Textarea
          id="notas"
          name="notas"
          rows={3}
          placeholder="Edad del alumno, instrumento, nivel, qué te gustaría lograr…"
          className="rounded-xl"
        />
      </div>

      {!estado.ok && estado.mensaje ? (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
          {estado.mensaje}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={pendiente}
        className="w-full rounded-full text-base font-bold"
      >
        {pendiente ? "Enviando…" : "Solicitar sesión"}
      </Button>
    </form>
  );
}
