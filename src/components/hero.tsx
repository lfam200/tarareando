"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const NOTAS = [
  { simbolo: "♪", x: "8%", y: "18%", retraso: 0, tam: "text-4xl" },
  { simbolo: "♫", x: "85%", y: "12%", retraso: 0.8, tam: "text-5xl" },
  { simbolo: "♩", x: "78%", y: "65%", retraso: 1.6, tam: "text-3xl" },
  { simbolo: "♬", x: "12%", y: "70%", retraso: 2.4, tam: "text-4xl" },
  { simbolo: "♪", x: "48%", y: "8%", retraso: 3.2, tam: "text-2xl" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream">
      {/* Notas musicales flotantes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {NOTAS.map((nota, i) => (
          <motion.span
            key={i}
            className={`absolute select-none font-heading text-brand-purple/25 ${nota.tam}`}
            style={{ left: nota.x, top: nota.y }}
            animate={{ y: [0, -18, 0], rotate: [0, 8, -6, 0] }}
            transition={{
              duration: 6,
              delay: nota.retraso,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {nota.simbolo}
          </motion.span>
        ))}
        <div className="absolute -right-24 -top-24 size-72 rounded-full bg-brand-yellow/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-80 rounded-full bg-brand-purple/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.65, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-purple/10 px-4 py-1.5 text-sm font-bold text-brand-purple">
            🎵 Música para niños y adolescentes
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-brand-ink sm:text-5xl md:text-6xl">
            El talento que rompe{" "}
            <span className="relative inline-block text-brand-purple">
              más que barreras
              <motion.svg
                viewBox="0 0 220 12"
                className="absolute -bottom-2 left-0 w-full text-brand-yellow"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.6 }}
                aria-hidden
              >
                <motion.path
                  d="M4 8 C 60 2, 160 2, 216 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.6 }}
                />
              </motion.svg>
            </span>
          </h1>

          <p className="mt-6 text-lg text-brand-ink/70 sm:text-xl">
            Cursos online, clases en vivo y asesorías personalizadas para que
            tu hijo o hija descubra la música a su ritmo, con profes que viven
            de ella.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 text-base font-bold shadow-lg shadow-brand-yellow/40"
              >
                <Link href="/cursos">Explorar cursos</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-brand-purple px-8 text-base font-bold text-brand-purple hover:bg-brand-purple hover:text-white"
              >
                <Link href="/agenda">Agenda una asesoría</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
