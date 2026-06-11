export type EstadoCliente = "interesado" | "alumno";
export type TipoProducto = "curso" | "recurso" | "paquete_clases" | "asesoria";
export type MetodoPago = "yape" | "paypal" | "transferencia";
export type EstadoPedido = "pendiente" | "pagado" | "cancelado";
export type TipoSesion = "clase_en_vivo" | "asesoria";
export type EstadoSesion = "reservada" | "realizada" | "cancelada";

export interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string | null;
  estado: EstadoCliente;
  fuente: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  suscrito_newsletter: boolean;
  notas: string | null;
  created_at: string;
}

export interface Producto {
  id: string;
  tipo: TipoProducto;
  nombre: string;
  slug: string;
  descripcion: string | null;
  precio: number;
  num_clases: number | null;
  activo: boolean;
  created_at: string;
}

export interface Pedido {
  id: string;
  cliente_id: string;
  producto_id: string;
  monto: number;
  metodo_pago: MetodoPago;
  estado: EstadoPedido;
  fuente: string | null;
  notas: string | null;
  created_at: string;
  pagado_at: string | null;
}

export interface Sesion {
  id: string;
  cliente_id: string;
  pedido_id: string | null;
  tipo: TipoSesion;
  fecha_hora: string;
  estado: EstadoSesion;
  notas: string | null;
  created_at: string;
}

export interface SaldoClases {
  pedido_id: string;
  cliente_id: string;
  producto: string;
  clases_total: number;
  clases_usadas: number;
  clases_restantes: number;
}

export interface PedidoConRelaciones extends Pedido {
  clientes: Pick<Cliente, "id" | "nombre" | "email" | "telefono"> | null;
  productos: Pick<Producto, "id" | "nombre" | "tipo" | "num_clases"> | null;
}

export interface SesionConCliente extends Sesion {
  clientes: Pick<Cliente, "id" | "nombre" | "email" | "telefono"> | null;
}
