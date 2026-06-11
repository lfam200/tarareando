"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { crearProducto, type EstadoProducto } from "@/lib/actions/admin";

const ESTADO_INICIAL: EstadoProducto = { error: "" };

const TIPOS = [
  { valor: "curso", etiqueta: "Curso online" },
  { valor: "recurso", etiqueta: "Recurso descargable" },
  { valor: "paquete_clases", etiqueta: "Paquete de clases" },
  { valor: "asesoria", etiqueta: "Asesoría" },
];

export function FormularioProducto() {
  const [abierto, setAbierto] = useState(false);
  const [tipo, setTipo] = useState("curso");
  const [estado, accion, pendiente] = useActionState(
    crearProducto,
    ESTADO_INICIAL,
  );

  if (!abierto) {
    return (
      <Button
        onClick={() => setAbierto(true)}
        className="rounded-full font-bold"
      >
        + Nuevo producto
      </Button>
    );
  }

  return (
    <form
      action={accion}
      className="space-y-4 rounded-2xl border bg-white p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre *</Label>
          <Input id="nombre" name="nombre" required className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo *</Label>
          <select
            id="tipo"
            name="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="h-9 w-full rounded-xl border border-input bg-transparent px-3 text-sm"
          >
            {TIPOS.map((t) => (
              <option key={t.valor} value={t.valor}>
                {t.etiqueta}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="precio">Precio (S/) *</Label>
          <Input
            id="precio"
            name="precio"
            type="number"
            step="0.01"
            min="0"
            required
            className="rounded-xl"
          />
        </div>
        {tipo === "paquete_clases" ? (
          <div className="space-y-2">
            <Label htmlFor="num_clases">Número de clases *</Label>
            <Input
              id="num_clases"
              name="num_clases"
              type="number"
              min="1"
              required
              className="rounded-xl"
            />
          </div>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          name="descripcion"
          rows={2}
          className="rounded-xl"
        />
      </div>

      {estado.error ? (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
          {estado.error}
        </p>
      ) : null}

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={pendiente}
          className="rounded-full font-bold"
        >
          {pendiente ? "Guardando…" : "Guardar producto"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setAbierto(false)}
          className="rounded-full"
        >
          Cerrar
        </Button>
      </div>
    </form>
  );
}
