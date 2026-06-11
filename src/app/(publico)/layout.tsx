import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CapturaFuente } from "@/components/captura-fuente";
import { ProveedorAnimacion } from "@/components/animacion";

export default function LayoutPublico({ children }: { children: ReactNode }) {
  return (
    <ProveedorAnimacion>
      <CapturaFuente />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </ProveedorAnimacion>
  );
}
