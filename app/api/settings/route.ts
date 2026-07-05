import { NextRequest, NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/data";
import { requireAuth } from "@/lib/auth-helpers";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings, {
    headers: { "Cache-Control": "public, max-age=60" },
  });
}

export async function PUT(request: NextRequest) {
  const unauth = requireAuth(request);
  if (unauth) return unauth;

  try {
    const body = await request.json();
    const settings = await getSettings();
    const updated = { ...settings, ...body };
    await saveSettings(updated);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
