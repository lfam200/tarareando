import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tarareando — Aprende música a tu ritmo",
    template: "%s | Tarareando",
  },
  description:
    "Cursos online de música para niños y adolescentes, clases en vivo y asesorías personalizadas. El talento que rompe más que barreras.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${nunito.variable} ${baloo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
