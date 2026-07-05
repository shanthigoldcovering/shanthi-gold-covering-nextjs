import crypto from "crypto";

const ADMIN_USER = "admin";
const ADMIN_PASS = "shanthi123";
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

// Derive a stable secret from the admin password
function getSecret(): Buffer {
  return crypto.createHash("sha256").update(ADMIN_PASS).digest();
}

export interface TokenPayload {
  username: string;
  exp: number; // epoch ms
}

export function createToken(username: string): string {
  const payload: TokenPayload = { username, exp: Date.now() + TOKEN_EXPIRY_MS };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", getSecret()).update(encoded).digest("base64url");
  return `${encoded}.${sig}`;
}

export function verifyToken(token: string): TokenPayload | null {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;
  const encoded = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expectedSig = crypto.createHmac("sha256", getSecret()).update(encoded).digest("base64url");
  // Constant-time compare
  if (sig.length !== expectedSig.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) return null;
  try {
    const payload: TokenPayload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf-8"));
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function checkCredentials(username: string, password: string): boolean {
  return username === ADMIN_USER && password === ADMIN_PASS;
}
