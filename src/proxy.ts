import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Refresca la sesión de Supabase y protege /admin (excepto el login).
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const esLogin = request.nextUrl.pathname === "/admin/login";

  if (!url || !anonKey) {
    // Sin Supabase configurado: deja pasar al login, que muestra el aviso.
    return esLogin
      ? response
      : NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !esLogin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (user && esLogin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
