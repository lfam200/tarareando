"use client";

import { motion, MotionConfig, type Variants } from "motion/react";
import type { ReactNode } from "react";

// Wrappers de animación de la web pública (Motion).
// MotionConfig reducedMotion="user" respeta prefers-reduced-motion.

export function ProveedorAnimacion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const aparecer: Variants = {
  oculto: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.65, 0.36, 1] },
  },
};

export function Revelar({
  children,
  className,
  retraso = 0,
}: {
  children: ReactNode;
  className?: string;
  retraso?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={aparecer}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: retraso }}
    >
      {children}
    </motion.div>
  );
}

export function RevelarGrupo({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.12 }}
    >
      {children}
    </motion.div>
  );
}

export function RevelarItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={aparecer}>
      {children}
    </motion.div>
  );
}

// Tarjeta con micro-interacción al pasar el mouse.
export function TarjetaInteractiva({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
