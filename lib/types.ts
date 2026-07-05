export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  image: string;
  badge: string;
  status: string;
  desc: string;
  material: string;
  finish: string;
  weight: string;
  occasion: string;
};

export type Category = {
  id: number;
  name: string;
  image: string;
  status: string;
};

export type Settings = {
  storeName: string;
  currency: string;
  tagline: string;
  phone: string;
  address: string;
};
