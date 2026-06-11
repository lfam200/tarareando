import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { FormularioLogin } from "./formulario";

export const metadata: Metadata = {
  title: "Ingresar al panel",
  robots: { index: false },
};

export default function PaginaLogin() {
  return (
    <div className="grid min-h-dvh place-items-center bg-brand-cream px-4">
      <div className="w-full max-w-sm rounded-3xl border border-brand-ink/8 bg-white p-8 shadow-sm">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-2xl font-bold">
          Panel de gestión
        </h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Acceso solo para el equipo de Tarareando.
        </p>
        <div className="mt-6">
          <FormularioLogin />
        </div>
      </div>
    </div>
  );
}
