import type { Metadata } from "next";
import {
  Clapperboard,
  Mail,
  MessageCircle,
  MonitorPlay,
  Users,
} from "lucide-react";
import { Revelar, RevelarGrupo, RevelarItem } from "@/components/animacion";
import { Button } from "@/components/ui/button";
import { LINK_DIAGNOSTICO, NEGOCIO, REDES, linkWhatsApp } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos por correo o WhatsApp, síguenos en YouTube, Facebook y TikTok, o reserva directamente tu diagnóstico gratuito.",
};

const CANALES = [
  {
    icono: Mail,
    titulo: "Correo",
    detalle: NEGOCIO.email,
    href: `mailto:${NEGOCIO.email}`,
    externo: false,
  },
  {
    icono: MessageCircle,
    titulo: "WhatsApp",
    detalle: "Respuesta directa para tus consultas",
    href: linkWhatsApp("Hola Tarareando, quiero más información 🎵"),
    externo: true,
  },
  {
    icono: MonitorPlay,
    titulo: "YouTube",
    detalle: "@Tarareando — contenido educativo gratuito",
    href: REDES.youtube,
    externo: true,
  },
  {
    icono: Users,
    titulo: "Facebook",
    detalle: "tarareando.pe",
    href: REDES.facebook,
    externo: true,
  },
  {
    icono: Clapperboard,
    titulo: "TikTok",
    detalle: "@tarareando.pe",
    href: REDES.tiktok,
    externo: true,
  },
];

export default function PaginaContacto() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 md:py-20">
      <Revelar>
        <h1 className="text-4xl font-bold sm:text-5xl">Contacto</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          ¿Tienes dudas sobre las clases, los recursos o tu ruta de estudio?
          Escríbenos por el canal que prefieras.
        </p>
      </Revelar>

      <RevelarGrupo className="mt-10 grid gap-4 sm:grid-cols-2">
        {CANALES.map((canal) => (
          <RevelarItem key={canal.titulo}>
            <a
              href={canal.href}
              {...(canal.externo
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex h-full items-start gap-4 rounded-3xl border border-brand-ink/10 bg-white p-6 transition-colors hover:border-brand-purple/40 hover:bg-brand-cream/50"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-purple/10">
                <canal.icono
                  className="size-5 text-brand-purple"
                  aria-hidden
                />
              </span>
              <span>
                <span className="block text-lg font-bold">{canal.titulo}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {canal.detalle}
                </span>
              </span>
            </a>
          </RevelarItem>
        ))}
      </RevelarGrupo>

      <Revelar className="mt-14">
        <div className="rounded-3xl bg-brand-cream px-6 py-12 text-center sm:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            ¿Prefieres que hablemos de tu caso?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Reserva una sesión de diagnóstico gratuito y revisamos juntos tu
            formación musical.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-7 rounded-full px-10 text-base font-bold"
          >
            <a
              href={LINK_DIAGNOSTICO}
              target="_blank"
              rel="noopener noreferrer"
            >
              Reserva tu diagnóstico gratuito
            </a>
          </Button>
        </div>
      </Revelar>
    </div>
  );
}
