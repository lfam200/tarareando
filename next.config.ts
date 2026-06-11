import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Rutas de la etapa anterior (web de cursos): el catálogo y el
      // formulario de agenda fueron reemplazados por recursos y la
      // asesoría gratuita. /cursos/[slug] y /comprar siguen activos
      // para enlaces directos a productos.
      { source: "/agenda", destination: "/asesoria", permanent: false },
      { source: "/cursos", destination: "/recursos", permanent: false },
    ];
  },
};

export default nextConfig;
