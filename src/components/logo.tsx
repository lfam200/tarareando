import Link from "next/link";
import { cn } from "@/lib/utils";

// Wordmark provisional inspirado en el logo real (lettering negro sobre
// círculo amarillo). Reemplazar por el asset oficial cuando lo envíe el cliente.
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2 group", className)}
    >
      <span className="grid size-9 place-items-center rounded-full bg-brand-yellow text-brand-ink shadow-sm transition-transform group-hover:rotate-12">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
          aria-hidden
        >
          <path d="M9 18.5a3 3 0 1 1-2-2.83V6.2a1 1 0 0 1 .76-.97l9-2.2A1 1 0 0 1 18 4v10.7a3 3 0 1 1-2-2.83V7.06l-7 1.71v9.73Z" />
        </svg>
      </span>
      <span className="font-heading text-xl font-bold tracking-tight text-brand-ink">
        Tarareando
      </span>
    </Link>
  );
}
