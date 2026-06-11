import type { Metadata } from "next";
import { Revelar } from "@/components/animacion";
import { FormularioAgenda } from "./formulario";

export const metadata: Metadata = {
  title: "Agenda tu sesión",
  description:
    "Reserva una clase en vivo o una asesoría personalizada con Tarareando.",
};

export default function PaginaAgenda() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <Revelar>
        <h1 className="text-3xl font-bold sm:text-4xl">Agenda tu sesión 🎤</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Cuéntanos qué necesitas y la fecha que prefieres. Te confirmamos el
          horario por WhatsApp o correo, sin compromiso.
        </p>
        <div className="mt-8">
          <FormularioAgenda />
        </div>
      </Revelar>
    </div>
  );
}
