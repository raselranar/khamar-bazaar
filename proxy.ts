import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserSession } from "./lib/userSession";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const userSession = await getUserSession();
  if (!userSession)
    return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/listings/add"],
};
