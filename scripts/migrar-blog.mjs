// Migra las entradas del blog de la web anterior (WordPress, tarareando.pe)
// a archivos markdown en src/contenido/blog/, descargando las imágenes a
// public/blog/<slug>/. Se puede re-ejecutar: sobreescribe lo migrado.
//
//   node scripts/migrar-blog.mjs
//
// Usa la API REST de WordPress (sigue activa aunque el sitio esté en
// modo mantenimiento). El frontmatter generado es el contrato que parsea
// src/lib/blog.ts: titulo, fecha, extracto, imagen (siempre entre comillas).

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import TurndownService from "turndown";

const ORIGEN = "https://tarareando.pe";
const DIR_MD = path.join(process.cwd(), "src/contenido/blog");
const DIR_IMG = path.join(process.cwd(), "public/blog");

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
});
turndown.remove(["script", "style", "iframe", "form", "noscript"]);

function decodificar(html) {
  return html
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&#8211;", "–")
    .replaceAll("&#8216;", "‘")
    .replaceAll("&#8217;", "’")
    .replaceAll("&#8220;", "“")
    .replaceAll("&#8221;", "”")
    .replaceAll("&hellip;", "…")
    .replaceAll("&nbsp;", " ");
}

function limpiarExtracto(htmlExtracto) {
  const texto = decodificar(htmlExtracto.replace(/<[^>]+>/g, "")).trim();
  // WordPress corta el extracto con " […]"; lo cerramos en la última frase
  // completa o, si no hay punto, con puntos suspensivos.
  const sinCorte = texto.replace(/\s*\[…\]\s*$/, "");
  const ultimaFrase = sinCorte.lastIndexOf(". ");
  return ultimaFrase > 40
    ? sinCorte.slice(0, ultimaFrase + 1)
    : `${sinCorte}…`;
}

function escaparYaml(valor) {
  return valor.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

async function descargarImagen(url, slug) {
  // WordPress enlaza miniaturas ("...-300x169.png"); intenta primero el
  // archivo original a tamaño completo y cae a la miniatura si no existe.
  const original = url.replace(/-\d+x\d+(\.\w+)$/, "$1");
  let respuesta = await fetch(original);
  let final = original;
  if (!respuesta.ok && original !== url) {
    respuesta = await fetch(url);
    final = url;
  }
  if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

  const nombre = decodeURIComponent(new URL(final).pathname.split("/").pop())
    .replaceAll(/[^\w.-]/g, "_");
  const destino = path.join(DIR_IMG, slug, nombre);
  await mkdir(path.dirname(destino), { recursive: true });
  await writeFile(destino, Buffer.from(await respuesta.arrayBuffer()));
  return `/blog/${slug}/${nombre}`;
}

// Reemplaza en el markdown las imágenes remotas del dominio antiguo por
// copias locales. Si una descarga falla, deja la URL original.
async function localizarImagenes(markdown, slug) {
  const urls = [
    ...new Set(
      [...markdown.matchAll(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)/g)].map(
        (m) => m[1],
      ),
    ),
  ];
  let resultado = markdown;
  for (const url of urls) {
    if (!url.includes("tarareando.pe")) continue;
    try {
      const local = await descargarImagen(url, slug);
      resultado = resultado.replaceAll(url, local);
    } catch (e) {
      console.warn(`  ⚠ imagen no descargada (${url}): ${e.message}`);
    }
  }
  return resultado;
}

const respuesta = await fetch(
  `${ORIGEN}/wp-json/wp/v2/posts?per_page=50&_embed=wp:featuredmedia`,
);
if (!respuesta.ok) {
  throw new Error(`La API de WordPress respondió ${respuesta.status}`);
}
const posts = await respuesta.json();
console.log(`Entradas encontradas: ${posts.length}`);

await mkdir(DIR_MD, { recursive: true });
const fallidas = [];

for (const post of posts) {
  const slug = post.slug;
  try {
    const titulo = decodificar(post.title.rendered).trim();
    const fecha = (post.date ?? "").slice(0, 10);
    const extracto = limpiarExtracto(post.excerpt.rendered);

    let contenido = turndown.turndown(post.content.rendered).trim();
    // El título de la página ya es el h1: degrada los h1 del contenido.
    contenido = contenido.replace(/^# /gm, "## ");
    contenido = await localizarImagenes(contenido, slug);

    let imagen = "";
    const destacada = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    if (destacada) {
      try {
        imagen = await descargarImagen(destacada, slug);
      } catch (e) {
        console.warn(`  ⚠ portada no descargada: ${e.message}`);
        imagen = destacada;
      }
    }

    const md = `---
titulo: "${escaparYaml(titulo)}"
fecha: "${fecha}"
extracto: "${escaparYaml(extracto)}"
imagen: "${escaparYaml(imagen)}"
---

${contenido}
`;
    await writeFile(path.join(DIR_MD, `${slug}.md`), md);
    console.log(`✓ ${slug} (${fecha})`);
  } catch (e) {
    fallidas.push(slug);
    console.error(`✗ ${slug}: ${e.message}`);
  }
}

if (fallidas.length) {
  console.error(`\nFallaron: ${fallidas.join(", ")}`);
  process.exitCode = 1;
}
