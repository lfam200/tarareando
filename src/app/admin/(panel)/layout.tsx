import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cerrarSesion } from "@/lib/actions/admin";

// El panel siempre lee datos frescos de la BD.
export const dynamic = "force-dynamic";

const ENLACES = [
  { href: "/admin", etiqueta: "Resumen" },
  { href: "/admin/pedidos", etiqueta: "Pedidos" },
  { href: "/admin/clientes", etiqueta: "Clientes" },
  { href: "/admin/sesiones", etiqueta: "Sesiones" },
  { href: "/admin/productos", etiqueta: "Catálogo" },
];

export default function LayoutPanel({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-brand-cream/60">
      <header className="border-b border-brand-ink/8 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />
          <form action={cerrarSesion}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="font-semibold text-muted-foreground"
            >
              Cerrar sesión
            </Button>
          </form>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2 sm:px-6">
          {ENLACES.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold text-brand-ink/70 hover:bg-brand-cream hover:text-brand-ink"
            >
              {e.etiqueta}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
