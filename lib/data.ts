import fs from "fs";
import path from "path";
import type { Product, Category, Settings } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

const DEFAULTS = {
  products: [
    { id: 1, name: "Impon Addigai Bridal Necklace Set", category: "Necklace Sets", price: 2299, oldPrice: 3999, image: "/images/products/1.svg", badge: "bridal", status: "active", desc: "Traditional Impon Addigai necklace with matching earrings. Micro gold plated with ruby & emerald kemp stones. Perfect for weddings & bridal ceremonies.", material: "Copper & Brass", finish: "Micro Gold Plating", weight: "65g", occasion: "Bridal / Wedding" },
    { id: 2, name: "Temple Haram Long Necklace", category: "Haram & Long Necklaces", price: 1399, oldPrice: 2100, image: "/images/products/2.svg", badge: "sale", status: "active", desc: "Traditional South Indian temple haram with Lakshmi dollar design. Ruby-emerald stone studded. 26 inch length with extension chain.", material: "Panchaloha (5 Metal)", finish: "Impon Gold Plating", weight: "48g", occasion: "Wedding / Festival" },
    { id: 3, name: "Impon Gold Bangles Set (12 pcs)", category: "Bangles", price: 1149, oldPrice: 4950, image: "/images/products/3.svg", badge: "trending", status: "active", desc: "Traditional micro gold plated Impon bangles with American Diamond stones. Set of 12. Festive & traditional wear.", material: "Brass", finish: "Micro Gold Plating", weight: "90g (set)", occasion: "Festival / Daily" },
    { id: 4, name: "Impon Jhumka Earrings", category: "Earrings", price: 699, oldPrice: 1400, image: "/images/products/4.svg", badge: "sale", status: "active", desc: "South Indian Jimiki jhumka design earrings in Impon finish. Ruby stone setting with hanging pearl drops. Screw lock for secure fit.", material: "Brass", finish: "Impon", weight: "18g (pair)", occasion: "Daily / Festival" },
    { id: 5, name: "Maang Tikka with Pearl Chain", category: "Maang Tikka", price: 549, oldPrice: null, image: "/images/products/5.svg", badge: "new", status: "active", desc: "Traditional Maang Tikka with pearl & kemp stone setting. Gold plated finish. Adjustable chain length. Perfect for bridal & functions.", material: "Brass", finish: "Gold Plating", weight: "22g", occasion: "Bridal / Wedding" },
    { id: 6, name: "Impon Finger Rings Set (6 pcs)", category: "Rings", price: 499, oldPrice: null, image: "/images/products/6.svg", badge: "new", status: "active", desc: "Set of 6 traditional Impon finger rings with various stone settings. Adjustable size. Suitable for daily & festive wear.", material: "Brass", finish: "Impon", weight: "30g (set)", occasion: "Daily / Festival" },
    { id: 7, name: "Gold Covering Necklace with AD Stones", category: "Necklace Sets", price: 1899, oldPrice: 2800, image: "/images/products/7.svg", badge: "trending", status: "active", desc: "Premium 2 gram gold covering necklace with American Diamond stones. Includes matching earrings. Ideal for functions & events.", material: "1 Gram Gold Covering", finish: "Micro Gold Plating", weight: "55g", occasion: "Functions / Events" },
    { id: 8, name: "Impon Anklet Pair (Kolusu)", category: "Anklets", price: 399, oldPrice: null, image: "/images/products/8.svg", badge: "new", status: "active", desc: "Traditional Impon silver-tone anklets with small bells. Lightweight for daily wear. Pair of 2.", material: "Brass", finish: "Impon Silver Tone", weight: "35g (pair)", occasion: "Daily Wear" },
    { id: 9, name: "Bridal Vanki (Armlet)", category: "Vanki & Armlets", price: 1299, oldPrice: 1999, image: "/images/products/9.svg", badge: "bridal", status: "active", desc: "Traditional South Indian Vanki armlet with peacock design. Ruby & emerald stones. Essential bridal accessory.", material: "Brass", finish: "Impon Gold", weight: "42g", occasion: "Bridal" },
    { id: 10, name: "Ear Chain Mattal (South Indian Style)", category: "Ear Chains", price: 599, oldPrice: 1000, image: "/images/products/10.svg", badge: "sale", status: "active", desc: "Premium South Indian ear chain mattal with white stone & ruby. One gram gold plated. Connects earring to hair clip.", material: "Brass", finish: "Gold Plating", weight: "12g", occasion: "Bridal / Wedding" },
    { id: 11, name: "Kemp Stone Choker Necklace", category: "Necklace Sets", price: 1599, oldPrice: null, image: "/images/products/11.svg", badge: "new", status: "active", desc: "Attigai-style close-neck choker with kemp stones and impon base. Traditional temple artistry. Perfect with silk sarees.", material: "Copper & Brass", finish: "Impon", weight: "32g", occasion: "Temple / Festival" },
    { id: 12, name: "Impon Pendant Dollar Chain", category: "Pendant Chains", price: 1199, oldPrice: 1800, image: "/images/products/12.svg", badge: "sale", status: "active", desc: "Lakshmi dollar pendant with 30 inch gold plated chain. Traditional Impon finish. Religious & auspicious design.", material: "Brass", finish: "Impon Gold", weight: "28g", occasion: "Daily / Religious" },
  ] as Product[],

  categories: [
    { id: 1, name: "Necklace Sets", image: "/images/categories/1.svg", status: "active" },
    { id: 2, name: "Haram & Long Necklaces", image: "/images/categories/2.svg", status: "active" },
    { id: 3, name: "Bangles", image: "/images/categories/3.svg", status: "active" },
    { id: 4, name: "Earrings", image: "/images/categories/4.svg", status: "active" },
    { id: 5, name: "Maang Tikka", image: "/images/categories/5.svg", status: "active" },
    { id: 6, name: "Rings", image: "/images/categories/6.svg", status: "active" },
    { id: 7, name: "Anklets", image: "/images/categories/7.svg", status: "active" },
    { id: 8, name: "Vanki & Armlets", image: "/images/categories/8.svg", status: "active" },
    { id: 9, name: "Ear Chains", image: "/images/categories/9.svg", status: "active" },
    { id: 10, name: "Pendant Chains", image: "/images/categories/10.svg", status: "active" },
  ] as Category[],

  settings: {
    storeName: "Shanthi Gold Covering",
    currency: "\u20B9",
    tagline: "Trusted Impon Jwellery Since 1989",
    phone: "+91 9600325709",
    address: "Shop No. 447, Near Women Paltech, Bharathiyar Road, Papanaickenpalayam, Coimbatore - 641037, Tamil Nadu",
  } as Settings,
};

function getFilePath(name: string): string {
  return path.join(DATA_DIR, `${name}.json`);
}

async function ensureDir(): Promise<void> {
  await fs.promises.mkdir(DATA_DIR, { recursive: true });
}

async function readJSON<T>(name: string, fallback: T): Promise<T> {
  await ensureDir();
  const fp = getFilePath(name);
  try {
    const raw = await fs.promises.readFile(fp, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    // File doesn't exist or is corrupt — write fallback and return it
    await fs.promises.writeFile(fp, JSON.stringify(fallback, null, 2), "utf-8");
    return fallback;
  }
}

async function writeJSON<T>(name: string, data: T): Promise<void> {
  await ensureDir();
  const fp = getFilePath(name);
  await fs.promises.writeFile(fp, JSON.stringify(data, null, 2), "utf-8");
}

export async function getProducts(): Promise<Product[]> {
  return readJSON("products", DEFAULTS.products);
}

export async function saveProducts(products: Product[]): Promise<void> {
  return writeJSON("products", products);
}

export async function getCategories(): Promise<Category[]> {
  return readJSON("categories", DEFAULTS.categories);
}

export async function saveCategories(categories: Category[]): Promise<void> {
  return writeJSON("categories", categories);
}

export async function getSettings(): Promise<Settings> {
  return readJSON("settings", DEFAULTS.settings);
}

export async function saveSettings(settings: Settings): Promise<void> {
  return writeJSON("settings", settings);
}
