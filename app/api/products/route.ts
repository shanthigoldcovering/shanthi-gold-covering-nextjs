import { NextRequest, NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/data";
import { requireAuth } from "@/lib/auth-helpers";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products, {
    headers: { "Cache-Control": "public, max-age=60" },
  });
}

export async function POST(request: NextRequest) {
  const unauth = requireAuth(request);
  if (unauth) return unauth;

  try {
    const body = await request.json();
    const products = await getProducts();
    const nextId = Math.max(...products.map((p) => p.id), 0) + 1;
    const product = { id: nextId, ...body };
    products.push(product);
    await saveProducts(products);
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
