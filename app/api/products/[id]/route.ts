import { NextRequest, NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/data";
import { requireAuth } from "@/lib/auth-helpers";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === Number(id));
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = requireAuth(request);
  if (unauth) return unauth;

  const { id } = await params;
  const products = await getProducts();
  const idx = products.findIndex((p) => p.id === Number(id));
  if (idx === -1)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const body = await request.json();
  products[idx] = { ...products[idx], ...body };
  await saveProducts(products);
  return NextResponse.json(products[idx]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = requireAuth(request);
  if (unauth) return unauth;

  const { id } = await params;
  const products = await getProducts();
  const idx = products.findIndex((p) => p.id === Number(id));
  if (idx === -1)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  products.splice(idx, 1);
  await saveProducts(products);
  return NextResponse.json({ ok: true });
}
