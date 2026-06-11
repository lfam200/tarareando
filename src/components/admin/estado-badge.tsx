import { Badge } from "@/components/ui/badge";

const ESTILOS: Record<string, string> = {
  // pedidos
  pendiente: "bg-brand-yellow text-brand-ink",
  pagado: "bg-emerald-600 text-white",
  cancelado: "bg-zinc-300 text-zinc-700",
  // clientes
  interesado: "bg-brand-purple/15 text-brand-purple",
  alumno: "bg-brand-purple text-white",
  // sesiones
  reservada: "bg-brand-yellow text-brand-ink",
  realizada: "bg-emerald-600 text-white",
  cancelada: "bg-zinc-300 text-zinc-700",
};

export function EstadoBadge({ estado }: { estado: string }) {
  return (
    <Badge className={`rounded-full capitalize ${ESTILOS[estado] ?? ""}`}>
      {estado.replace(/_/g, " ")}
    </Badge>
  );
}
