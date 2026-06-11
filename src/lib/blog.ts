import { promises as fs } from "fs";
import path from "path";

// Blog basado en archivos markdown migrados de la web anterior (WordPress).
// Cada entrada vive en src/contenido/blog/<slug>.md con frontmatter:
//   titulo, fecha (YYYY-MM-DD o ""), extracto, imagen (ruta en /public o "").
// Sin categorías por ahora (decisión del rediseño); cuando hagan falta,
// agregar una clave al frontmatter y filtrar aquí.

export interface EntradaBlog {
  slug: string;
  titulo: string;
  fecha: string;
  extracto: string;
  imagen: string;
  contenido: string;
}

const DIR_BLOG = path.join(process.cwd(), "src/contenido/blog");

function parsearEntrada(slug: string, crudo: string): EntradaBlog | null {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(crudo);
  if (!match) return null;

  const meta: Record<string, string> = {};
  for (const linea of match[1].split(/\r?\n/)) {
    const par = /^(\w+):\s*"((?:[^"\\]|\\.)*)"\s*$/.exec(linea.trim());
    if (par) meta[par[1]] = par[2].replace(/\\(["\\])/g, "$1");
  }
  if (!meta.titulo) return null;

  return {
    slug,
    titulo: meta.titulo,
    fecha: meta.fecha ?? "",
    extracto: meta.extracto ?? "",
    imagen: meta.imagen ?? "",
    contenido: match[2].trim(),
  };
}

export async function getEntradas(): Promise<EntradaBlog[]> {
  let archivos: string[];
  try {
    archivos = await fs.readdir(DIR_BLOG);
  } catch {
    return []; // Sin entradas migradas todavía.
  }

  const entradas = await Promise.all(
    archivos
      .filter((a) => a.endsWith(".md"))
      .map(async (archivo) => {
        const crudo = await fs.readFile(path.join(DIR_BLOG, archivo), "utf8");
        return parsearEntrada(archivo.replace(/\.md$/, ""), crudo);
      }),
  );

  // Más recientes primero; las entradas sin fecha quedan al final.
  return entradas
    .filter((e): e is EntradaBlog => e !== null)
    .sort((a, b) => (b.fecha || "0000").localeCompare(a.fecha || "0000"));
}

export async function getEntradaPorSlug(
  slug: string,
): Promise<EntradaBlog | null> {
  // El slug viene de la URL: valida que sea un nombre de archivo simple.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const crudo = await fs.readFile(
      path.join(DIR_BLOG, `${slug}.md`),
      "utf8",
    );
    return parsearEntrada(slug, crudo);
  } catch {
    return null;
  }
}

export function formatoFecha(fecha: string): string {
  if (!fecha) return "";
  const dt = new Date(`${fecha}T12:00:00`);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
