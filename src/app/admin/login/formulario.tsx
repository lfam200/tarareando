"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { iniciarSesion, type EstadoLogin } from "@/lib/actions/admin";

const ESTADO_INICIAL: EstadoLogin = { error: "" };

export function FormularioLogin() {
  const [estado, accion, pendiente] = useActionState(
    iniciarSesion,
    ESTADO_INICIAL,
  );

  return (
    <form action={accion} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Correo</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="h-11 rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="h-11 rounded-xl"
        />
      </div>
      {estado.error ? (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
          {estado.error}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={pendiente}
        className="w-full rounded-full font-bold"
      >
        {pendiente ? "Ingresando…" : "Ingresar"}
      </Button>
    </form>
  );
}
