import { NextRequest, NextResponse } from "next/server";
import { getCategories, saveCategories } from "@/lib/data";
import { requireAuth } from "@/lib/auth-helpers";

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json(categories, {
    headers: { "Cache-Control": "public, max-age=60" },
  });
}

export async function POST(request: NextRequest) {
  const unauth = requireAuth(request);
  if (unauth) return unauth;

  try {
    const body = await request.json();
    const categories = await getCategories();
    const nextId = Math.max(...categories.map((c) => c.id), 0) + 1;
    const category = { id: nextId, ...body };
    categories.push(category);
    await saveCategories(categories);
    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
