-- Esquema Tarareando MVP — ejecutar en el SQL Editor de Supabase.
-- Modelo derivado del brief (docs/mvps/tarareando en incubapp).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- clientes: leads y alumnos (regla 5.2 del brief: interesado → alumno)
-- ---------------------------------------------------------------------------
create table if not exists clientes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text not null unique,
  telefono text,
  estado text not null default 'interesado' check (estado in ('interesado', 'alumno')),
  fuente text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  suscrito_newsletter boolean not null default false,
  notas text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- productos: catálogo (cursos, recursos, paquetes de clases, asesorías)
-- ---------------------------------------------------------------------------
create table if not exists productos (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('curso', 'recurso', 'paquete_clases', 'asesoria')),
  nombre text not null,
  slug text not null unique,
  descripcion text,
  precio numeric(10,2) not null check (precio >= 0),
  num_clases int check (num_clases is null or num_clases > 0),
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  constraint paquete_requiere_clases
    check (tipo <> 'paquete_clases' or num_clases is not null)
);

-- ---------------------------------------------------------------------------
-- pedidos: compras; el pago se verifica manualmente (pendiente → pagado/cancelado)
-- ---------------------------------------------------------------------------
create table if not exists pedidos (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references clientes(id) on delete cascade,
  producto_id uuid not null references productos(id),
  monto numeric(10,2) not null,
  metodo_pago text not null check (metodo_pago in ('yape', 'paypal', 'transferencia')),
  estado text not null default 'pendiente' check (estado in ('pendiente', 'pagado', 'cancelado')),
  fuente text,
  notas text,
  created_at timestamptz not null default now(),
  pagado_at timestamptz
);

create index if not exists pedidos_cliente_idx on pedidos (cliente_id);
create index if not exists pedidos_estado_idx on pedidos (estado);

-- ---------------------------------------------------------------------------
-- sesiones: clases en vivo y asesorías; descuentan saldo del paquete pagado
-- ---------------------------------------------------------------------------
create table if not exists sesiones (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references clientes(id) on delete cascade,
  pedido_id uuid references pedidos(id) on delete set null,
  tipo text not null check (tipo in ('clase_en_vivo', 'asesoria')),
  fecha_hora timestamptz not null,
  estado text not null default 'reservada' check (estado in ('reservada', 'realizada', 'cancelada')),
  notas text,
  created_at timestamptz not null default now()
);

create index if not exists sesiones_cliente_idx on sesiones (cliente_id);
create index if not exists sesiones_fecha_idx on sesiones (fecha_hora);

-- ---------------------------------------------------------------------------
-- Regla de negocio: el primer pedido pagado convierte al cliente en alumno.
-- El origen (fuente/UTM) del cliente nunca se sobreescribe (se hace en la app).
-- ---------------------------------------------------------------------------
create or replace function promover_a_alumno() returns trigger as $$
begin
  if new.estado = 'pagado' and (old.estado is distinct from 'pagado') then
    new.pagado_at := coalesce(new.pagado_at, now());
    update clientes set estado = 'alumno' where id = new.cliente_id;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_promover_a_alumno on pedidos;
create trigger trg_promover_a_alumno
  before update on pedidos
  for each row execute function promover_a_alumno();

-- ---------------------------------------------------------------------------
-- Saldo de clases: calculado, nunca almacenado (evita inconsistencias).
-- clases_restantes = num_clases del producto − sesiones realizadas del pedido.
-- ---------------------------------------------------------------------------
create or replace view saldo_clases as
select
  p.id as pedido_id,
  p.cliente_id,
  pr.nombre as producto,
  pr.num_clases as clases_total,
  count(s.id) filter (where s.estado = 'realizada') as clases_usadas,
  pr.num_clases - count(s.id) filter (where s.estado = 'realizada') as clases_restantes
from pedidos p
join productos pr on pr.id = p.producto_id
left join sesiones s on s.pedido_id = p.id
where p.estado = 'pagado' and pr.num_clases is not null
group by p.id, p.cliente_id, pr.nombre, pr.num_clases;

-- ---------------------------------------------------------------------------
-- Seguridad: RLS activado en todo; el acceso es solo vía servidor
-- (service role) — no hay acceso anónimo directo a las tablas.
-- ---------------------------------------------------------------------------
alter table clientes enable row level security;
alter table productos enable row level security;
alter table pedidos enable row level security;
alter table sesiones enable row level security;

-- El catálogo sí es legible públicamente (la web lo muestra sin sesión).
drop policy if exists productos_publicos on productos;
create policy productos_publicos on productos
  for select using (activo = true);
