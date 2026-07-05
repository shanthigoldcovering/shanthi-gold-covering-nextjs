import type { Product, Category, Settings } from "./types";

// Auth token management
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("sgc_token");
}

export function setToken(token: string): void {
  sessionStorage.setItem("sgc_token", token);
}

export function clearToken(): void {
  sessionStorage.removeItem("sgc_token");
}

export function hasToken(): boolean {
  return !!getToken();
}

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  // Don't set Content-Type for FormData — browser sets it with boundary
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

// Login
export async function login(
  username: string,
  password: string
): Promise<{ token: string }> {
  const res = await request<{ token: string }>("/api/auth", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  setToken(res.token);
  return res;
}

// Products
export async function fetchProducts(): Promise<Product[]> {
  return request<Product[]>("/api/products");
}

export async function createProduct(
  data: Omit<Product, "id">
): Promise<Product> {
  return request<Product>("/api/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateProduct(
  id: number,
  data: Partial<Product>
): Promise<Product> {
  return request<Product>(`/api/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: number): Promise<void> {
  await request<{ ok: boolean }>(`/api/products/${id}`, {
    method: "DELETE",
  });
}

// Categories
export async function fetchCategories(): Promise<Category[]> {
  return request<Category[]>("/api/categories");
}

export async function createCategory(
  data: Omit<Category, "id">
): Promise<Category> {
  return request<Category>("/api/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCategory(
  id: number,
  data: Partial<Category>
): Promise<Category> {
  return request<Category>(`/api/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(id: number): Promise<void> {
  await request<{ ok: boolean }>(`/api/categories/${id}`, {
    method: "DELETE",
  });
}

// Settings
export async function fetchSettings(): Promise<Settings> {
  return request<Settings>("/api/settings");
}

export async function updateSettings(
  data: Partial<Settings>
): Promise<Settings> {
  return request<Settings>("/api/settings", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// Image upload
export async function uploadImage(file: File): Promise<{ url: string }> {
  const fd = new FormData();
  fd.append("file", file);
  return request<{ url: string }>("/api/upload", {
    method: "POST",
    body: fd,
  });
}
