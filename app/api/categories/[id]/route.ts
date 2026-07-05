import { NextRequest, NextResponse } from "next/server";
import { getCategories, saveCategories } from "@/lib/data";
import { requireAuth } from "@/lib/auth-helpers";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.id === Number(id));
  if (!category)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  return NextResponse.json(category);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = requireAuth(request);
  if (unauth) return unauth;

  const { id } = await params;
  const categories = await getCategories();
  const idx = categories.findIndex((c) => c.id === Number(id));
  if (idx === -1)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });

  const body = await request.json();
  categories[idx] = { ...categories[idx], ...body };
  await saveCategories(categories);
  return NextResponse.json(categories[idx]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = requireAuth(request);
  if (unauth) return unauth;

  const { id } = await params;
  const categories = await getCategories();
  const idx = categories.findIndex((c) => c.id === Number(id));
  if (idx === -1)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });

  categories.splice(idx, 1);
  await saveCategories(categories);
  return NextResponse.json({ ok: true });
}
