"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  suscribirNewsletter,
  type EstadoFormulario,
} from "@/lib/actions/publico";

const ESTADO_INICIAL: EstadoFormulario = { ok: false, mensaje: "" };

export function Newsletter() {
  const [estado, accion, pendiente] = useActionState(
    suscribirNewsletter,
    ESTADO_INICIAL,
  );

  return (
    <section className="relative overflow-hidden bg-brand-purple">
      <div
        aria-hidden
        className="absolute -right-16 -top-16 size-64 rounded-full bg-brand-yellow/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          No te pierdas ningún acorde 🎶
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Suscríbete y entérate primero de nuevos cursos, talleres y
          promociones para tu familia.
        </p>

        {estado.ok ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto mt-8 w-fit rounded-full bg-brand-yellow px-6 py-3 font-bold text-brand-ink"
          >
            {estado.mensaje}
          </motion.p>
        ) : (
          <form
            action={accion}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <Input
              name="nombre"
              placeholder="Tu nombre"
              required
              className="h-12 rounded-full border-0 bg-white px-5"
            />
            <Input
              name="email"
              type="email"
              placeholder="tu@correo.com"
              required
              className="h-12 rounded-full border-0 bg-white px-5"
            />
            <Button
              type="submit"
              disabled={pendiente}
              className="h-12 rounded-full px-8 font-bold"
            >
              {pendiente ? "Enviando…" : "Suscribirme"}
            </Button>
          </form>
        )}
        {!estado.ok && estado.mensaje ? (
          <p className="mt-3 text-sm font-semibold text-brand-yellow">
            {estado.mensaje}
          </p>
        ) : null}
      </div>
    </section>
  );
}
