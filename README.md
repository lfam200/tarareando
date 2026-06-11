# Tarareando — Web de ventas & gestión de alumnos

Web pública de venta (cursos online de música, recursos, clases en vivo y
asesorías) + panel interno de gestión para Tarareando. MVP construido por
IncubApp — ficha y plan en `incubapp/docs/mvps/tarareando/`.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 + shadcn/ui · Motion
(animaciones) · Supabase (Postgres + Auth) · Resend (alertas por correo).

## Cómo correr

```bash
npm install
npm run dev
```

Sin configurar nada, la web corre en **modo demo**: catálogo de ejemplo, los
formularios no escriben en ninguna BD y el panel pide configuración. Para el
modo real:

1. Crea un proyecto en [Supabase](https://supabase.com) y ejecuta en el SQL
   Editor, en orden: `supabase/schema.sql` y luego `supabase/seed.sql`.
2. Crea el usuario admin en Supabase → Authentication → Users
   (email + contraseña; es el único acceso al panel).
3. Copia `.env.example` a `.env.local` y completa las variables.
4. (Opcional) Crea una API key en [Resend](https://resend.com) para las
   alertas por correo de nuevos pedidos y reservas.

## Mapa del proyecto

| Ruta | Qué es |
|---|---|
| `/` | Home pública (hero animado, destacados, newsletter) |
| `/cursos` y `/cursos/[slug]` | Catálogo y detalle de producto |
| `/comprar/[slug]` | Checkout (pago manual: Yape / PayPal / transferencia) |
| `/gracias/[pedido]` | Instrucciones de pago + envío de constancia por WhatsApp |
| `/agenda` | Solicitud de clase en vivo o asesoría |
| `/admin` | Panel: resumen, pedidos, clientes, sesiones, catálogo |

Lógica clave:

- `src/lib/actions/publico.ts` — pedidos, newsletter y reservas de la web.
- `src/lib/actions/admin.ts` — confirmar pagos, sesiones y catálogo.
- `src/components/captura-fuente.tsx` — guarda el canal/UTM de origen del
  visitante en su primera visita (reporte "de dónde vienen los clientes").
- `supabase/schema.sql` — tablas, trigger interesado→alumno y vista
  `saldo_clases` (clases restantes por paquete).

## Reglas de negocio implementadas

- Cliente `interesado` pasa a `alumno` con su primer pedido pagado (trigger).
- Pedido: `pendiente → pagado | cancelado`; solo el admin confirma pagos.
- Sesión marcada como realizada descuenta del paquete pagado más antiguo
  con saldo del alumno.
- El origen (fuente/UTM) del cliente se captura una vez y no se sobreescribe.
