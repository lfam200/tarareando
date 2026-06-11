import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMetricas } from "@/lib/data-admin";
import { MODO_DEMO } from "@/lib/data";
import { formatoSoles } from "@/lib/format";

export const metadata: Metadata = {
  title: "Resumen",
  robots: { index: false },
};

export default async function PaginaResumen() {
  const metricas = await getMetricas();

  const tarjetas = [
    {
      titulo: "Alumnos",
      valor: String(metricas.alumnos),
      href: "/admin/clientes",
    },
    {
      titulo: "Interesados",
      valor: String(metricas.interesados),
      href: "/admin/clientes",
    },
    {
      titulo: "Pedidos pendientes",
      valor: String(metricas.pedidosPendientes),
      href: "/admin/pedidos",
    },
    {
      titulo: "Ventas del mes",
      valor: formatoSoles(metricas.ventasMes),
      href: "/admin/pedidos",
    },
    {
      titulo: "Sesiones reservadas",
      valor: String(metricas.sesionesReservadas),
      href: "/admin/sesiones",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Resumen</h1>

      {MODO_DEMO ? (
        <p className="rounded-2xl border-2 border-brand-yellow bg-brand-cream p-5 font-semibold">
          ⚠️ Modo demo: Supabase no está configurado. Copia
          <code className="mx-1 rounded bg-white px-1.5">.env.example</code> a
          <code className="mx-1 rounded bg-white px-1.5">.env.local</code>,
          completa las credenciales y ejecuta
          <code className="mx-1 rounded bg-white px-1.5">
            supabase/schema.sql
          </code>
          en tu proyecto.
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {tarjetas.map((t) => (
          <Link key={t.titulo} href={t.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  {t.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-3xl font-bold">{t.valor}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section>
        <h2 className="text-xl font-bold">¿De dónde vienen los clientes?</h2>
        {metricas.fuentes.length === 0 ? (
          <p className="mt-3 text-muted-foreground">
            Aún no hay datos de origen.
          </p>
        ) : (
          <div className="mt-4 space-y-2">
            {metricas.fuentes.map((f) => {
              const max = metricas.fuentes[0].total;
              return (
                <div key={f.fuente} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 truncate text-sm font-semibold capitalize">
                    {f.fuente}
                  </span>
                  <div className="h-7 flex-1 overflow-hidden rounded-full bg-white">
                    <div
                      className="flex h-full items-center rounded-full bg-brand-purple px-3 text-xs font-bold text-white"
                      style={{
                        width: `${Math.max((f.total / max) * 100, 8)}%`,
                      }}
                    >
                      {f.total}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
