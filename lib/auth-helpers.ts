import { verifyToken } from "./auth";
import { NextResponse } from "next/server";

export function getAuthUser(request: Request): { username: string } | null {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const payload = verifyToken(auth.slice(7));
  return payload ? { username: payload.username } : null;
}

export function requireAuth(request: Request): NextResponse | null {
  const user = getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
