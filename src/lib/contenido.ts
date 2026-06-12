// Contenido editorial de la web pública (enfoque: músicos autodidactas).
// Editar aquí los textos de áreas, formatos, recursos, reconocimientos y
// testimonios sin tocar las páginas.

import {
  Award,
  BookOpen,
  CalendarDays,
  CalendarRange,
  Compass,
  Drum,
  Ear,
  GraduationCap,
  Guitar,
  Landmark,
  ListMusic,
  MonitorPlay,
  Sparkles,
  Timer,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

// --- Método Tarareando: áreas de la formación musical -----------------------

export interface Area {
  icono: LucideIcon;
  titulo: string;
  detalle: string;
}

export const AREAS: Area[] = [
  {
    icono: Guitar,
    titulo: "Instrumento",
    detalle: "Técnica y práctica con intención, no solo repetir canciones.",
  },
  {
    icono: BookOpen,
    titulo: "Lenguaje musical",
    detalle: "Entiende lo que tocas: lectura, armonía y vocabulario musical.",
  },
  {
    icono: Ear,
    titulo: "Oído",
    detalle: "Reconoce acordes, melodías e intervalos en la música real.",
  },
  {
    icono: Drum,
    titulo: "Ritmo",
    detalle: "Pulso, subdivisión y metrónomo como aliados, no como castigo.",
  },
  {
    icono: ListMusic,
    titulo: "Repertorio",
    detalle: "Canciones elegidas para tu nivel y tus objetivos.",
  },
  {
    icono: Sparkles,
    titulo: "Aplicación creativa",
    detalle: "Lleva lo que estudias a componer, improvisar y crear.",
  },
  {
    icono: CalendarDays,
    titulo: "Organización del estudio",
    detalle: "Rutinas realistas según el tiempo que de verdad tienes.",
  },
];

// --- Asesoría gratuita: qué se revisa en la sesión ---------------------------

export const ASESORIA_REVISA = [
  "Tu nivel actual.",
  "Tus objetivos musicales.",
  "Cómo estás estudiando ahora.",
  "Qué áreas podrías reforzar.",
  "Qué ruta de estudio puede tener más sentido para ti.",
];

// --- Clases personalizadas ---------------------------------------------------

export const FORMATOS_CLASES = [
  {
    titulo: "Clase personalizada individual",
    detalle: "Una sesión 1 a 1 enfocada en lo que necesitas trabajar hoy.",
  },
  {
    titulo: "Plan mensual de acompañamiento",
    detalle: "Clases y seguimiento continuo para sostener el avance.",
  },
  {
    titulo: "Ruta para músicos autodidactas",
    detalle: "Ordena lo que ya sabes y cierra los vacíos de tu formación.",
  },
  {
    titulo: "Ruta para músicos por hobby",
    detalle: "Avanza con orden sin que la música deje de ser un disfrute.",
  },
  {
    titulo: "Ruta para compositores",
    detalle: "Teoría, oído y lenguaje aplicados a crear tu propia música.",
  },
  {
    titulo: "Ruta para instrumentistas",
    detalle: "Técnica, repertorio y musicalidad para tu instrumento.",
  },
];

export const AREAS_CLASES = [
  "Instrumento",
  "Ritmo",
  "Teoría aplicada",
  "Lenguaje musical",
  "Entrenamiento auditivo",
  "Repertorio",
  "Composición",
  "Organización del estudio",
];

// --- Recursos: materiales complementarios de los videos ----------------------
// Todavía en preparación: la página de recursos funciona como página de
// espera con CTA a la newsletter. Cuando un recurso esté listo, agregar su
// `enlace` (PDF o página de descarga) y reactivar las cards de descarga.

export interface Recurso {
  icono: LucideIcon;
  titulo: string;
  detalle: string;
  enlace?: string;
}

export const RECURSOS: Recurso[] = [
  {
    icono: Compass,
    titulo: "Guía para ordenar tu estudio musical",
    detalle:
      "El punto de partida si estudias por tu cuenta: qué mirar primero y cómo armar tu ruta.",
  },
  {
    icono: CalendarRange,
    titulo: "Plantilla de rutina semanal de práctica",
    detalle:
      "Organiza tus sesiones de estudio según el tiempo real que tienes.",
  },
  {
    icono: Drum,
    titulo: "Ejercicios de ritmo",
    detalle: "Secuencias progresivas para afinar tu pulso y subdivisión.",
  },
  {
    icono: Timer,
    titulo: "Ejercicios de metrónomo",
    detalle: "Rutinas para que el metrónomo trabaje a tu favor.",
  },
  {
    icono: BookOpen,
    titulo: "Guías básicas de teoría musical",
    detalle: "Material claro para entender lo que tocas y escuchas.",
  },
  {
    icono: MonitorPlay,
    titulo: "Material complementario de YouTube",
    detalle: "Los recursos mencionados en los videos de Tarareando.",
  },
];

// --- Reconocimientos y trayectoria -------------------------------------------

export interface Reconocimiento {
  icono: LucideIcon;
  texto: string;
}

export const RECONOCIMIENTOS: Reconocimiento[] = [
  {
    icono: Landmark,
    texto: "Proyecto financiado por el Ministerio de Cultura",
  },
  {
    icono: Trophy,
    texto: "Ganador de “Creadores de un Perú que da Gusto” de Inca Kola",
  },
  {
    icono: Award,
    texto: "Finalista de “Protagonistas del Cambio” de la UPC",
  },
  {
    icono: GraduationCap,
    texto: "Más de 1000 músicos independientes capacitados",
  },
  {
    icono: Users,
    texto: "Comunidad construida desde YouTube y espacios de formación musical",
  },
];

// --- Testimonios -------------------------------------------------------------
// Placeholders editables: reemplazar con comentarios reales de YouTube,
// reseñas de alumnos y experiencias de asesorías. Marcar placeholder: false
// (o eliminar la propiedad) al cargar un testimonio real; los placeholders se
// muestran atenuados y con una nota.

export interface Testimonio {
  nombre: string;
  origen: string; // ej. "Comentario en YouTube", "Alumno de clases"
  texto: string;
  placeholder?: boolean;
}

export const TESTIMONIOS: Testimonio[] = [
  {
    nombre: "Nombre del alumno",
    origen: "Alumno de clases personalizadas",
    texto:
      "Aquí irá la experiencia de un alumno que llevó clases o asesorías con Tarareando.",
    placeholder: true,
  },
  {
    nombre: "Nombre del suscriptor",
    origen: "Comentario en YouTube",
    texto:
      "Aquí irá un comentario real del canal de YouTube de Tarareando.",
    placeholder: true,
  },
  {
    nombre: "Nombre del participante",
    origen: "Participante de talleres",
    texto:
      "Aquí irá la reseña de alguien que participó en actividades de formación de Tarareando.",
    placeholder: true,
  },
];
