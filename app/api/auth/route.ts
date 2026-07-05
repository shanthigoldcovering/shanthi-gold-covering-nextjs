import { NextRequest, NextResponse } from "next/server";
import { checkCredentials, createToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    if (!checkCredentials(username, password)) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }
    const token = createToken(username);
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
