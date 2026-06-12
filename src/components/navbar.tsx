"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { RUTA_RESERVA } from "@/lib/config";

const ENLACES = [
  { href: "/", etiqueta: "Inicio" },
  { href: "/asesoria", etiqueta: "Asesoría gratuita" },
  { href: "/clases", etiqueta: "Clases" },
  { href: "/recursos", etiqueta: "Recursos" },
  { href: "/blog", etiqueta: "Blog" },
  { href: "/sobre-tarareando", etiqueta: "Sobre Tarareando" },
];

export function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-ink/5 bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <div className="hidden items-center gap-5 lg:flex">
          {ENLACES.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="text-sm font-semibold text-brand-ink/70 transition-colors hover:text-brand-ink"
            >
              {e.etiqueta}
            </Link>
          ))}
          <Button asChild className="rounded-full font-bold">
            <Link href={RUTA_RESERVA}>Reserva tu diagnóstico gratuito</Link>
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-brand-ink"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-6"
            aria-hidden
          >
            {abierto ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-brand-ink/5 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {ENLACES.map((e) => (
                <Link
                  key={e.href}
                  href={e.href}
                  onClick={() => setAbierto(false)}
                  className="rounded-lg px-3 py-2.5 font-semibold text-brand-ink/80 hover:bg-brand-cream"
                >
                  {e.etiqueta}
                </Link>
              ))}
              <Button asChild className="mt-2 rounded-full font-bold">
                <Link href={RUTA_RESERVA} onClick={() => setAbierto(false)}>
                  Reserva tu diagnóstico gratuito
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
