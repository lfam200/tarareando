"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  suscribirNewsletter,
  type EstadoFormulario,
} from "@/lib/actions/publico";

const ESTADO_INICIAL: EstadoFormulario = { ok: false, mensaje: "" };

const NIVELES = [
  "Autodidacta empezando",
  "Autodidacta con experiencia",
  "Estudiante de música",
  "Músico por hobby",
  "Compositor / creador",
];

// Lead magnet de la newsletter "Cartas para músicos autodidactas":
// la descarga de la guía suscribe a la persona a la newsletter.
export function Newsletter() {
  const [estado, accion, pendiente] = useActionState(
    suscribirNewsletter,
    ESTADO_INICIAL,
  );

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-brand-purple scroll-mt-20"
    >
      <div
        aria-hidden
        className="absolute -right-16 -top-16 size-64 rounded-full bg-brand-yellow/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold text-white">
          <Mail className="size-4" aria-hidden />
          Guía gratuita
        </span>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          Cómo ordenar tu estudio musical si eres autodidacta
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Recibe una guía práctica para detectar qué estás estudiando, qué te
          falta ordenar y cómo armar una ruta de práctica más clara según tu
          nivel.
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
            className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-2"
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
            <select
              name="nivel"
              defaultValue=""
              aria-label="Nivel o interés musical (opcional)"
              className="h-12 w-full appearance-none rounded-full border-0 bg-white px-5 text-sm text-brand-ink/80 sm:col-span-2"
            >
              <option value="">Nivel o interés musical (opcional)</option>
              {NIVELES.map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
            <Button
              type="submit"
              disabled={pendiente}
              className="h-12 rounded-full px-8 font-bold sm:col-span-2"
            >
              {pendiente ? "Enviando…" : "Descargar la guía gratuita"}
            </Button>
          </form>
        )}
        {!estado.ok && estado.mensaje ? (
          <p className="mt-3 text-sm font-semibold text-brand-yellow">
            {estado.mensaje}
          </p>
        ) : null}

        <p className="mt-6 text-sm text-white/70">
          Creada desde la experiencia de Tarareando acompañando y capacitando
          a más de 1000 músicos independientes. Al descargarla te unes a
          “Cartas para músicos autodidactas”, nuestra newsletter educativa.
        </p>
      </div>
    </section>
  );
}
