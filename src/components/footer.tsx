import Link from "next/link";
import { Logo } from "./logo";
import { LINK_DIAGNOSTICO, NEGOCIO, REDES, linkWhatsApp } from "@/lib/config";

const EXPLORA = [
  { href: "/asesoria", etiqueta: "Asesoría gratuita" },
  { href: "/clases", etiqueta: "Clases personalizadas" },
  { href: "/recursos", etiqueta: "Recursos" },
  { href: "/blog", etiqueta: "Blog" },
  { href: "/sobre-tarareando", etiqueta: "Sobre Tarareando" },
  { href: "/contacto", etiqueta: "Contacto" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <div className="rounded-2xl bg-white/95 p-3 w-fit">
            <Logo />
          </div>
          <p className="text-sm text-white/70 max-w-xs">
            {NEGOCIO.eslogan}. Acompañamos a músicos autodidactas y
            estudiantes de música a ordenar su formación con asesorías,
            clases personalizadas y recursos prácticos.
          </p>
          <a
            href={LINK_DIAGNOSTICO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-brand-yellow px-5 py-2 text-sm font-bold text-brand-ink"
          >
            Reserva tu diagnóstico gratuito
          </a>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-heading text-base font-bold text-brand-yellow">
            Explora
          </p>
          {EXPLORA.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="block text-white/80 hover:text-white"
            >
              {e.etiqueta}
            </Link>
          ))}
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
          <a
            href={REDES.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white/80 hover:text-white"
          >
            YouTube
          </a>
          <a
            href={REDES.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white/80 hover:text-white"
          >
            Facebook
          </a>
          <a
            href={REDES.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white/80 hover:text-white"
          >
            TikTok
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
