import Link from "next/link";
import { Logo } from "./logo";
import { NEGOCIO, linkWhatsApp } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <div className="rounded-2xl bg-white/95 p-3 w-fit">
            <Logo />
          </div>
          <p className="text-sm text-white/70 max-w-xs">
            {NEGOCIO.eslogan}. Cursos online de música para niños y
            adolescentes, clases en vivo y asesorías personalizadas.
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-heading text-base font-bold text-brand-yellow">
            Explora
          </p>
          <Link href="/cursos" className="block text-white/80 hover:text-white">
            Cursos y recursos
          </Link>
          <Link href="/agenda" className="block text-white/80 hover:text-white">
            Agenda tu sesión
          </Link>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-heading text-base font-bold text-brand-yellow">
            Contacto
          </p>
          <a
            href={linkWhatsApp("Hola Tarareando, quiero más información 🎵")}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white/80 hover:text-white"
          >
            WhatsApp
          </a>
          <a
            href={`mailto:${NEGOCIO.email}`}
            className="block text-white/80 hover:text-white"
          >
            {NEGOCIO.email}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {NEGOCIO.nombre}. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
