import type { Producto } from "./types";

// Catálogo de demostración: se usa cuando Supabase aún no está configurado,
// para poder ver y validar la web sin credenciales. Espeja supabase/seed.sql.
export const CATALOGO_DEMO: Producto[] = [
  {
    id: "demo-curso-canto",
    tipo: "curso",
    nombre: "Curso de canto para niños",
    slug: "curso-canto-ninos",
    descripcion:
      "Aprende técnica vocal desde cero con ejercicios divertidos pensados para niños de 7 a 12 años.",
    precio: 149,
    num_clases: null,
    activo: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "demo-curso-guitarra",
    tipo: "curso",
    nombre: "Curso de guitarra para adolescentes",
    slug: "curso-guitarra-adolescentes",
    descripcion:
      "De los primeros acordes a tocar tus canciones favoritas. Para adolescentes de 13 a 17 años.",
    precio: 149,
    num_clases: null,
    activo: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "demo-pack-recursos",
    tipo: "recurso",
    nombre: "Pack de pistas y partituras",
    slug: "pack-pistas-partituras",
    descripcion:
      "Material descargable para practicar en casa: pistas, partituras y guías de estudio.",
    precio: 39,
    num_clases: null,
    activo: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "demo-paquete-4",
    tipo: "paquete_clases",
    nombre: "Paquete de 4 clases en vivo",
    slug: "paquete-4-clases",
    descripcion:
      "Cuatro clases en vivo 1 a 1 por videollamada. Agenda cada clase cuando quieras.",
    precio: 240,
    num_clases: 4,
    activo: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "demo-asesoria",
    tipo: "asesoria",
    nombre: "Asesoría personalizada",
    slug: "asesoria-personalizada",
    descripcion:
      "Sesión 1 a 1 para resolver tus dudas, definir tu ruta de aprendizaje o preparar una audición.",
    precio: 80,
    num_clases: null,
    activo: true,
    created_at: "2026-01-01T00:00:00Z",
  },
];
