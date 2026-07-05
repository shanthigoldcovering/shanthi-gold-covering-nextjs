"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

const JEWEL_EMOJIS = [
  "📿","💎","💍","👑","✨","🪷","🪬","🔮","💫","🌟",
  "⭐","🌙","🪩","🔱","💫","🛍️","📿","🎀","🔮","✨",
  "💠","💎","🏵️","🎀","💫","🌟","✨","💎","✨","✨",
];

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  emoji: string;
  badge: string;
  status: string;
  desc: string;
  material: string;
  finish: string;
  weight: string;
  occasion: string;
};

type Category = {
  id: number;
  name: string;
  emoji: string;
  status: string;
};

type CartItem = Product & { qty: number };

const initialProducts: Product[] = [
  { id: 1, name: "Impon Addigai Bridal Necklace Set", category: "Necklace Sets", price: 2299, oldPrice: 3999, emoji: "📿", badge: "bridal", status: "active", desc: "Traditional Impon Addigai necklace with matching earrings. Micro gold plated with ruby & emerald kemp stones. Perfect for weddings & bridal ceremonies.", material: "Copper & Brass", finish: "Micro Gold Plating", weight: "65g", occasion: "Bridal / Wedding" },
  { id: 2, name: "Temple Haram Long Necklace", category: "Haram & Long Necklaces", price: 1399, oldPrice: 2100, emoji: "🪬", badge: "sale", status: "active", desc: "Traditional South Indian temple haram with Lakshmi dollar design. Ruby-emerald stone studded. 26 inch length with extension chain.", material: "Panchaloha (5 Metal)", finish: "Impon Gold Plating", weight: "48g", occasion: "Wedding / Festival" },
  { id: 3, name: "Impon Gold Bangles Set (12 pcs)", category: "Bangles", price: 1149, oldPrice: 4950, emoji: "💎", badge: "trending", status: "active", desc: "Traditional micro gold plated Impon bangles with American Diamond stones. Set of 12. Festive & traditional wear.", material: "Brass", finish: "Micro Gold Plating", weight: "90g (set)", occasion: "Festival / Daily" },
  { id: 4, name: "Impon Jhumka Earrings", category: "Earrings", price: 699, oldPrice: 1400, emoji: "✨", badge: "sale", status: "active", desc: "South Indian Jimiki jhumka design earrings in Impon finish. Ruby stone setting with hanging pearl drops. Screw lock for secure fit.", material: "Brass", finish: "Impon", weight: "18g (pair)", occasion: "Daily / Festival" },
  { id: 5, name: "Maang Tikka with Pearl Chain", category: "Maang Tikka", price: 549, oldPrice: null, emoji: "🔮", badge: "new", status: "active", desc: "Traditional Maang Tikka with pearl & kemp stone setting. Gold plated finish. Adjustable chain length. Perfect for bridal & functions.", material: "Brass", finish: "Gold Plating", weight: "22g", occasion: "Bridal / Wedding" },
  { id: 6, name: "Impon Finger Rings Set (6 pcs)", category: "Rings", price: 499, oldPrice: null, emoji: "💍", badge: "new", status: "active", desc: "Set of 6 traditional Impon finger rings with various stone settings. Adjustable size. Suitable for daily & festive wear.", material: "Brass", finish: "Impon", weight: "30g (set)", occasion: "Daily / Festival" },
  { id: 7, name: "Gold Covering Necklace with AD Stones", category: "Necklace Sets", price: 1899, oldPrice: 2800, emoji: "🌟", badge: "trending", status: "active", desc: "Premium 2 gram gold covering necklace with American Diamond stones. Includes matching earrings. Ideal for functions & events.", material: "1 Gram Gold Covering", finish: "Micro Gold Plating", weight: "55g", occasion: "Functions / Events" },
  { id: 8, name: "Impon Anklet Pair (Kolusu)", category: "Anklets", price: 399, oldPrice: null, emoji: "🪷", badge: "new", status: "active", desc: "Traditional Impon silver-tone anklets with small bells. Lightweight for daily wear. Pair of 2.", material: "Brass", finish: "Impon Silver Tone", weight: "35g (pair)", occasion: "Daily Wear" },
  { id: 9, name: "Bridal Vanki (Armlet)", category: "Vanki & Armlets", price: 1299, oldPrice: 1999, emoji: "🛍️", badge: "bridal", status: "active", desc: "Traditional South Indian Vanki armlet with peacock design. Ruby & emerald stones. Essential bridal accessory.", material: "Brass", finish: "Impon Gold", weight: "42g", occasion: "Bridal" },
  { id: 10, name: "Ear Chain Mattal (South Indian Style)", category: "Ear Chains", price: 599, oldPrice: 1000, emoji: "✨", badge: "sale", status: "active", desc: "Premium South Indian ear chain mattal with white stone & ruby. One gram gold plated. Connects earring to hair clip.", material: "Brass", finish: "Gold Plating", weight: "12g", occasion: "Bridal / Wedding" },
  { id: 11, name: "Kemp Stone Choker Necklace", category: "Necklace Sets", price: 1599, oldPrice: null, emoji: "📿", badge: "new", status: "active", desc: "Attigai-style close-neck choker with kemp stones and impon base. Traditional temple artistry. Perfect with silk sarees.", material: "Copper & Brass", finish: "Impon", weight: "32g", occasion: "Temple / Festival" },
  { id: 12, name: "Impon Pendant Dollar Chain", category: "Pendant Chains", price: 1199, oldPrice: 1800, emoji: "💫", badge: "sale", status: "active", desc: "Lakshmi dollar pendant with 30 inch gold plated chain. Traditional Impon finish. Religious & auspicious design.", material: "Brass", finish: "Impon Gold", weight: "28g", occasion: "Daily / Religious" },
];

const initialCategories: Category[] = [
  { id: 1, name: "Necklace Sets", emoji: "📿", status: "active" },
  { id: 2, name: "Haram & Long Necklaces", emoji: "🪬", status: "active" },
  { id: 3, name: "Bangles", emoji: "💎", status: "active" },
  { id: 4, name: "Earrings", emoji: "✨", status: "active" },
  { id: 5, name: "Maang Tikka", emoji: "🔮", status: "active" },
  { id: 6, name: "Rings", emoji: "💍", status: "active" },
  { id: 7, name: "Anklets", emoji: "🪷", status: "active" },
  { id: 8, name: "Vanki & Armlets", emoji: "🛍️", status: "active" },
  { id: 9, name: "Ear Chains", emoji: "✨", status: "active" },
  { id: 10, name: "Pendant Chains", emoji: "💫", status: "active" },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminSection, setAdminSection] = useState("dashboard");
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState<{ icon: string; msg: string } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Admin form state
  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pPriceOld, setPPriceOld] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pBadge, setPBadge] = useState("");
  const [pStatus, setPStatus] = useState("active");
  const [pEmoji, setPEmoji] = useState("");
  const [cName, setCName] = useState("");
  const [cStatus, setCStatus] = useState("active");
  const [cEmoji, setCEmoji] = useState("");
  const [settingsName, setSettingsName] = useState("Shanthi Gold Covering");
  const [settingsCurrency, setSettingsCurrency] = useState("₹");
  const [settingsTagline, setSettingsTagline] = useState("Trusted Impon Jwellery Since 1989");
  const [settingsPhone, setSettingsPhone] = useState("+91 98XXX XXXXX");
  const [settingsAddress, setSettingsAddress] = useState("Coimbatore, Tamil Nadu");

  const currency = settingsCurrency;

  const showToast = useCallback((icon: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg({ icon, msg });
    toastTimer.current = setTimeout(() => setToastMsg(null), 2800);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Cart
  const addToCart = useCallback(
    (id: number) => {
      const p = products.find((p) => p.id === id);
      if (!p) return;
      setCart((prev) => {
        const ex = prev.find((i) => i.id === id);
        if (ex) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
        return [...prev, { ...p, qty: 1 }];
      });
      showToast("🛒", `${p.name} added to cart!`);
    },
    [products, showToast]
  );

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const changeQty = useCallback(
    (id: number, delta: number) => {
      setCart((prev) => {
        const item = prev.find((i) => i.id === id);
        if (!item) return prev;
        if (item.qty + delta <= 0) return prev.filter((i) => i.id !== id);
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i));
      });
    },
    []
  );

  const cartTotal = cart.reduce((a, i) => a + i.qty, 0);
  const cartValue = cart.reduce((a, i) => a + i.price * i.qty, 0);

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (p.status !== "active") return false;
    if (activeFilter !== "All" && p.category !== activeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }
    return true;
  });

  const activeCategories = categories.filter((c) => c.status === "active");
  const activeProductCount = products.filter((p) => p.status === "active").length;

  // Admin actions
  const nextId = Math.max(...products.map((p) => p.id), ...categories.map((c) => c.id)) + 1;

  const saveProduct = () => {
    if (!pName || !pCategory || !pPrice) {
      showToast("⚠️", "Please fill all required fields!");
      return;
    }
    const emoji = pEmoji || "💎";
    if (editingProduct !== null) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct
            ? { ...p, name: pName, category: pCategory, price: +pPrice, oldPrice: pPriceOld ? +pPriceOld : null, desc: pDesc, badge: pBadge, status: pStatus, emoji }
            : p
        )
      );
      setEditingProduct(null);
    } else {
      setProducts((prev) => [
        ...prev,
        { id: nextId, name: pName, category: pCategory, price: +pPrice, oldPrice: pPriceOld ? +pPriceOld : null, desc: pDesc, badge: pBadge, status: pStatus, emoji, material: "", finish: "", weight: "", occasion: "" },
      ]);
    }
    clearProductForm();
    showToast("✅", `Product "${pName}" saved!`);
  };

  const clearProductForm = () => {
    setPName(""); setPCategory(""); setPPrice(""); setPPriceOld(""); setPDesc(""); setPBadge(""); setPStatus("active"); setPEmoji("");
  };

  const deleteProduct = (id: number) => {
    const p = products.find((p) => p.id === id);
    if (!p || !confirm(`Delete "${p.name}"?`)) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((i) => i.id !== id));
    showToast("🗑️", "Product deleted.");
  };

  const editProduct = (id: number) => {
    const p = products.find((p) => p.id === id);
    if (!p) return;
    setEditingProduct(id);
    setPName(p.name); setPCategory(p.category); setPPrice(String(p.price)); setPPriceOld(p.oldPrice ? String(p.oldPrice) : ""); setPDesc(p.desc); setPBadge(p.badge); setPStatus(p.status); setPEmoji(p.emoji);
    setAdminSection("add-product");
  };

  const saveCategory = () => {
    if (!cName) { showToast("⚠️", "Please enter a category name!"); return; }
    const emoji = cEmoji || "💎";
    if (editingCategory !== null) {
      setCategories((prev) => prev.map((c) => (c.id === editingCategory ? { ...c, name: cName, status: cStatus, emoji } : c)));
      setEditingCategory(null);
    } else {
      setCategories((prev) => [...prev, { id: nextId, name: cName, status: cStatus, emoji }]);
    }
    setCName(""); setCStatus("active"); setCEmoji("");
    showToast("✅", `Category "${cName}" saved!`);
  };

  const deleteCategory = (id: number) => {
    const c = categories.find((c) => c.id === id);
    if (!c || !confirm(`Delete category "${c.name}"?`)) return;
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast("🗑️", "Category deleted.");
  };

  const editCategory = (id: number) => {
    const c = categories.find((c) => c.id === id);
    if (!c) return;
    setEditingCategory(id); setCName(c.name); setCStatus(c.status); setCEmoji(c.emoji);
    setAdminSection("add-category");
  };

  const saveSettings = () => {
    showToast("✅", "Settings saved!");
  };

  const adminTitles: Record<string, string> = {
    dashboard: "Dashboard", "products-admin": "Products", "add-product": "Add Product",
    "categories-admin": "Categories", "add-category": "Add Category", designs: "Latest Designs",
    orders: "Orders", settings: "Settings",
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="ann-bar">
        <span className="ann-dot"></span>
        ✦ Free Shipping on orders above ₹1,999 &nbsp;|&nbsp; Guaranteed Impon Quality &nbsp;|&nbsp; COD Available
        <span className="ann-dot"></span>
      </div>

      {/* Header */}
      <header className="site-header" id="header">
        <div className="header-inner">
          <div className="logo-wrap" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="logo-icon">
              <Image src="/logo.png" alt="Shanthi Gold Covering" width={48} height={48} className="logo-img" priority />
            </div>
            <div className="logo-text">
              <div className="logo-main">Shanthi Gold Covering</div>
              <div className="logo-sub">Impon Jwellery — Est. 1989</div>
            </div>
          </div>
          <nav className="nav-desktop">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("products"); }}>Collections</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("categories"); }}>Categories</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("collections"); }}>Bridal</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>About Us</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("testimonials"); }}>Reviews</a>
          </nav>
          <div className="header-actions">
            <button className="icon-btn" title="Search" onClick={() => { scrollTo("products"); setTimeout(() => document.getElementById("search-input")?.focus(), 400); }}>🔍</button>
            <button className="icon-btn" title="Admin" onClick={() => setAdminOpen(true)}>⚙️</button>
            <button className="icon-btn" onClick={() => setCartOpen(true)}>
              🛒
              {cartTotal > 0 && <span className="cart-count">{cartTotal}</span>}
            </button>
            <div className="hamburger" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className={`mobile-nav-overlay ${mobileNavOpen ? "open" : ""}`} onClick={() => setMobileNavOpen(false)} />
      <div className={`mobile-nav ${mobileNavOpen ? "open" : ""}`}>
        <div className="mobile-nav-header">
          <div className="logo-text">
            <div className="logo-main" style={{ fontSize: "16px" }}>Shanthi Gold</div>
            <div className="logo-sub">Menu</div>
          </div>
          <div className="mobile-nav-close" onClick={() => setMobileNavOpen(false)}>✕</div>
        </div>
        <div className="mobile-nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("products"); setMobileNavOpen(false); }}><span className="nav-icon">💎</span>Collections</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("categories"); setMobileNavOpen(false); }}><span className="nav-icon">📿</span>Categories</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("collections"); setMobileNavOpen(false); }}><span className="nav-icon">👑</span>Bridal Sets</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("about"); setMobileNavOpen(false); }}><span className="nav-icon">🏠</span>About Us</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("testimonials"); setMobileNavOpen(false); }}><span className="nav-icon">⭐</span>Reviews</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setMobileNavOpen(false); setAdminOpen(true); }}><span className="nav-icon">⚙️</span>Admin Panel</a>
        </div>
      </div>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge"><div className="hero-badge-dot"></div>New Arrivals — Festive 2025</div>
            <h1 className="hero-title">
              <span>Shanthi Gold Covering</span>
              Traditional <em>Impon</em><br />Jwellery
            </h1>
            <p className="hero-desc">Discover exquisite Impon, Gold Covering &amp; micro gold-plated jewellery. Crafted with traditional South Indian artistry — perfect for weddings, festivals &amp; everyday elegance. Trusted since 1989.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollTo("products")}>Shop Collection</button>
              <button className="btn-maroon" onClick={() => scrollTo("collections")}>Bridal Sets</button>
            </div>
            <div className="hero-trust">
              <div className="trust-item"><div className="trust-num">{activeProductCount}+</div><div className="trust-label">Products</div></div>
              <div className="trust-item"><div className="trust-num">35+</div><div className="trust-label">Yrs Experience</div></div>
              <div className="trust-item"><div className="trust-num">50k+</div><div className="trust-label">Happy Customers</div></div>
              <div className="trust-item"><div className="trust-num">4.9★</div><div className="trust-label">Rating</div></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-showcase">
              <div className="showcase-card big">
                <div className="showcase-img" style={{ fontSize: "90px" }}>💎✨</div>
                <div className="showcase-info">
                  <div className="showcase-label">Best Seller — Bridal</div>
                  <div className="showcase-name">Impon Addigai Bridal Set</div>
                  <div className="showcase-price">From ₹12,299</div>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-img" style={{ height: 120, fontSize: 44 }}>🪬</div>
                <div className="showcase-info">
                  <div className="showcase-label">Necklace</div>
                  <div className="showcase-name">Temple Haram</div>
                  <div className="showcase-price">₹11,399</div>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-img" style={{ height: 120, fontSize: 44 }}>💍</div>
                <div className="showcase-info">
                  <div className="showcase-label">Rings</div>
                  <div className="showcase-name">Impon Finger Ring</div>
                  <div className="showcase-price">₹1,349</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <div className="features-strip">
        <div className="features-strip-inner">
          <div className="feature-item"><span className="feature-icon">🚚</span><div><div className="feature-text-title">Free Shipping</div><div className="feature-text-desc">On orders above ₹1,999</div></div></div>
          <div className="feature-item"><span className="feature-icon">✅</span><div><div className="feature-text-title">Quality Guaranteed</div><div className="feature-text-desc">Certified Impon & Gold Covering</div></div></div>
          <div className="feature-item"><span className="feature-icon">↩️</span><div><div className="feature-text-title">Easy Returns</div><div className="feature-text-desc">7-day hassle-free returns</div></div></div>
          <div className="feature-item"><span className="feature-icon">💬</span><div><div className="feature-text-title">WhatsApp Support</div><div className="feature-text-desc">Mon — Sat, 9am to 8pm</div></div></div>
        </div>
      </div>

      {/* Categories */}
      <section className="section categories-section" id="categories">
        <div className="section-inner">
          <div className="section-hd">
            <div className="section-kicker">Shop by Type</div>
            <h2 className="section-title">Browse Our <em>Jewellery</em> Categories</h2>
            <div className="divider-ornament">✦</div>
            <p className="section-desc">Explore our complete range of traditional Impon, Gold Covering and micro gold-plated jewellery pieces.</p>
          </div>
          <div className="categories-grid">
            {activeCategories.map((c) => {
              const n = products.filter((p) => p.category === c.name && p.status === "active").length;
              return (
                <div key={c.id} className="cat-card" onClick={() => { setActiveFilter(c.name); scrollTo("products"); }}>
                  <div className="cat-icon">{c.emoji}</div>
                  <div className="cat-name">{c.name}</div>
                  <div className="cat-count">{n} piece{n !== 1 ? "s" : ""}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section products-section" id="products">
        <div className="section-inner">
          <div className="section-hd">
            <div className="section-kicker">Latest Designs</div>
            <h2 className="section-title">Our <em>Collections</em></h2>
            <div className="divider-ornament">✦</div>
            <p className="section-desc">Handcrafted traditional jewellery with modern finishes. Every piece tells a story of heritage and elegance.</p>
          </div>
          <div className="products-controls">
            <input id="search-input" className="search-box" type="text" placeholder="Search jewellery..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["All", ...activeCategories.map((c) => c.name)].map((cat) => (
                <button key={cat} className={`filter-btn ${activeFilter === cat ? "active" : ""}`} onClick={() => setActiveFilter(cat)}>{cat}</button>
              ))}
            </div>
          </div>
          <div className="products-grid">
            {filteredProducts.length === 0 ? (
              <div className="no-products">No products found. Try adjusting your search or filter.</div>
            ) : (
              filteredProducts.map((p) => (
                <div key={p.id} className="product-card" onClick={() => setModalProduct(p)}>
                  <div className="product-img">
                    <span style={{ position: "relative", zIndex: 1 }}>{p.emoji}</span>
                    {p.badge && (
                      <div className={`product-badge badge-${p.badge}`}>
                        {p.badge === "bridal" ? "Bridal" : p.badge === "trending" ? "Trending" : p.badge === "new" ? "New Arrival" : "Sale"}
                      </div>
                    )}
                    <div className="product-wishlist" onClick={(e) => { e.stopPropagation(); showToast("❤️", "Added to wishlist!"); }}>♡</div>
                    <div className="product-overlay">
                      <button className="btn-add-cart" onClick={(e) => { e.stopPropagation(); addToCart(p.id); }}>Add to Cart</button>
                      <button className="btn-quick-view">Quick View</button>
                    </div>
                  </div>
                  <div className="product-info">
                    <div className="product-category">{p.category}</div>
                    <div className="product-name">{p.name}</div>
                    <div className="product-price-row">
                      <div className="product-price">{currency}{p.price.toLocaleString("en-IN")}</div>
                      {p.oldPrice && <div className="product-price-old">{currency}{p.oldPrice.toLocaleString("en-IN")}</div>}
                    </div>
                    <div className="product-rating"><span className="stars">★★★★★</span>&nbsp;4.9&nbsp;·&nbsp;{(p.id * 7 + 23) % 120 + 30} reviews</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="section collections-section" id="collections">
        <div className="section-inner">
          <div className="section-hd">
            <div className="section-kicker">Special Collections</div>
            <h2 className="section-title">Curated <em>Sets</em> &amp; Collections</h2>
            <div className="divider-ornament">✦</div>
          </div>
          <div className="collections-grid">
            <div className="coll-card coll-card-1">
              <div className="coll-bg-emoji">👑</div>
              <div className="coll-content">
                <div className="coll-kicker">Bridal Exclusive</div>
                <div className="coll-title">The Complete Bridal Impon Set</div>
                <div className="coll-desc">Full bridal coverage — Haram, Necklace, Bangles, Earrings, Maang Tikka &amp; more.</div>
                <div className="coll-link">Shop Bridal</div>
              </div>
            </div>
            <div className="coll-card coll-card-2">
              <div className="coll-bg-emoji">🪷</div>
              <div className="coll-content">
                <div className="coll-kicker">Festival Season</div>
                <div className="coll-title">Temple &amp; Festive Jewellery</div>
                <div className="coll-desc">Traditional kemp stone, ruby &amp; emerald designs. Perfect for Pongal, Diwali &amp; Navratri.</div>
                <div className="coll-link">View Collection</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section about-section" id="about">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-visual">💍</div>
            <div>
              <div className="about-kicker">Our Story</div>
              <h2 className="about-title">Shanthi Gold Covering —<br /><em>Trusted Since 1989</em></h2>
              <p className="about-desc">With over 35 years of dedicated craftsmanship, Shanthi Gold Covering has become a trusted name for authentic Impon jewellery in Tamil Nadu. Our pieces are made using traditional five-metal (Panchaloha) techniques combined with modern micro gold plating for lasting quality and brilliant shine.</p>
              <div className="about-highlights">
                <div className="hl-item"><div className="hl-icon">✅</div><div className="hl-text"><strong>Guaranteed Impon Quality</strong><span>All pieces made with genuine Panchaloha five-metal alloy, micro gold plated</span></div></div>
                <div className="hl-item"><div className="hl-icon">✨</div><div className="hl-text"><strong>Traditional South Indian Designs</strong><span>Temple motifs, Lakshmi, Peacock, Ruby-Emerald kemp stone designs</span></div></div>
                <div className="hl-item"><div className="hl-icon">👑</div><div className="hl-text"><strong>Complete Bridal Solutions</strong><span>Full bridal sets for weddings, engagements &amp; Seemantham ceremonies</span></div></div>
                <div className="hl-item"><div className="hl-icon">💬</div><div className="hl-text"><strong>50,000+ Happy Customers</strong><span>Trusted by families across Tamil Nadu and beyond for three generations</span></div></div>
              </div>
              <button className="btn-primary" onClick={() => scrollTo("products")}>View All Products</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section" id="testimonials">
        <div className="section-inner">
          <div className="section-hd">
            <div className="section-kicker">Customer Reviews</div>
            <h2 className="section-title">What Our <em>Customers Say</em></h2>
            <div className="divider-ornament">✦</div>
          </div>
          <div className="testimonials-grid">
            <div className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">&quot;Bought the full bridal Impon set for my daughter&apos;s wedding. The quality was exactly as described — shiny, sturdy and absolutely beautiful. Every guest asked where we got it!&quot;</p>
              <div className="testi-author"><div className="testi-avatar">👩</div><div><div className="testi-name">Meenakshi R.</div><div className="testi-role">Coimbatore</div></div></div>
            </div>
            <div className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">&quot;The Impon bangles I ordered are perfect for daily wear. Even after 6 months the gold plating is intact! Shanthi Gold Covering never disappoints. Fast delivery too.&quot;</p>
              <div className="testi-author"><div className="testi-avatar">👩</div><div><div className="testi-name">Kavitha S.</div><div className="testi-role">Chennai</div></div></div>
            </div>
            <div className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">&quot;Ordered the temple haram set for Navratri. The kemp stone work is so intricate and the finish is premium. Will definitely recommend Shanthi to all my friends and family.&quot;</p>
              <div className="testi-author"><div className="testi-avatar">👩</div><div><div className="testi-name">Priya M.</div><div className="testi-role">Madurai</div></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section" id="newsletter">
        <div className="newsletter-inner">
          <div className="newsletter-icon">💌</div>
          <h2 className="newsletter-title">Stay Updated</h2>
          <p className="newsletter-desc">Get first access to new Impon designs, festival offers &amp; exclusive bridal collections directly in your inbox.</p>
          <div className="newsletter-form">
            <input className="newsletter-input" type="email" placeholder="Your email address" />
            <button className="newsletter-btn" onClick={() => showToast("📧", "Subscribed! Welcome to Shanthi Gold.")}>Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-logo-wrap">
                <div className="footer-logo-icon">
                  <Image src="/logo.png" alt="Shanthi Gold Covering" width={40} height={40} className="footer-logo-img" />
                </div>
                <div><div className="footer-brand-name">Shanthi Gold Covering</div><div className="footer-brand-sub">Impon Jwellery</div></div>
              </div>
              <p className="footer-desc">Authentic Impon, Gold Covering &amp; micro gold-plated jewellery. Trusted craftsmanship since 1989. Serving 50,000+ families across Tamil Nadu.</p>
              <div className="footer-socials">
                <div className="social-icon" title="Instagram">📸</div>
                <div className="social-icon" title="WhatsApp">💬</div>
                <div className="social-icon" title="Facebook">📘</div>
                <div className="social-icon" title="YouTube">▶️</div>
              </div>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Collections</div>
              <ul>
                <li><a href="#">Impon Necklaces</a></li>
                <li><a href="#">Gold Covering Sets</a></li>
                <li><a href="#">Bridal Jewellery</a></li>
                <li><a href="#">Temple Jewellery</a></li>
                <li><a href="#">Festival Offers</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Help</div>
              <ul>
                <li><a href="#">Size Guide</a></li>
                <li><a href="#">Shipping &amp; COD</a></li>
                <li><a href="#">Returns Policy</a></li>
                <li><a href="#">Care Instructions</a></li>
                <li><a href="#">Bulk Orders</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Contact Us</div>
              <div className="footer-contact-item"><span className="footer-contact-icon">📍</span><span className="footer-contact-text">Coimbatore, Tamil Nadu, India</span></div>
              <div className="footer-contact-item"><span className="footer-contact-icon">📞</span><span className="footer-contact-text">+91 98XXX XXXXX</span></div>
              <div className="footer-contact-item"><span className="footer-contact-icon">💬</span><span className="footer-contact-text">WhatsApp: +91 98XXX XXXXX</span></div>
              <div className="footer-contact-item"><span className="footer-contact-icon">🕐</span><span className="footer-contact-text">Mon–Sat: 9am – 8pm IST</span></div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 Shanthi Gold Covering Impon Jwellery. All rights reserved.</div>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <div className={`cart-overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <div className="cart-title">Your Cart <small>{cartTotal > 0 ? `(${cartTotal} item${cartTotal !== 1 ? "s" : ""})` : ""}</small></div>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>Your cart is empty</p>
              <small style={{ color: "var(--color-gray)" }}>Add jewellery pieces to get started</small>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">{item.emoji}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cat">{item.category}</div>
                  <div className="cart-item-price">{currency}{(item.price * item.qty).toLocaleString("en-IN")}</div>
                  <div className="cart-item-controls">
                    <div className="qty-btn" onClick={() => changeQty(item.id, -1)}>−</div>
                    <div className="qty-num">{item.qty}</div>
                    <div className="qty-btn" onClick={() => changeQty(item.id, 1)}>+</div>
                  </div>
                </div>
                <div className="cart-item-remove" onClick={() => removeFromCart(item.id)}>🗑️</div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row"><span>Subtotal</span><span>{currency}{cartValue.toLocaleString("en-IN")}</span></div>
            <div className="cart-summary-row"><span>Shipping</span><span style={{ color: "var(--color-success)" }}>FREE</span></div>
            <div className="cart-summary-row total"><span>Total</span><span>{currency}{cartValue.toLocaleString("en-IN")}</span></div>
            <button className="btn-checkout" onClick={() => { showToast("📦", "Redirecting to checkout..."); setTimeout(() => setCartOpen(false), 800); }}>Proceed to Checkout</button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <div className={`modal-overlay ${modalProduct ? "open" : ""}`} onClick={() => setModalProduct(null)}>
        {modalProduct && (
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-img">{modalProduct.emoji}</div>
            <div className="modal-content">
              <div className="modal-category">{modalProduct.category}</div>
              <div className="modal-name">{modalProduct.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><span className="stars" style={{ fontSize: 16 }}>★★★★★</span><span style={{ color: "var(--color-gray)", fontSize: 13 }}>4.9 (verified buyers)</span></div>
              <div className="modal-price">{currency}{modalProduct.price.toLocaleString("en-IN")}{modalProduct.oldPrice ? ` · MRP: ${currency}${modalProduct.oldPrice.toLocaleString("en-IN")}` : ""}</div>
              <div className="modal-desc">{modalProduct.desc || "Premium quality Impon jewellery piece."}</div>
              <div className="modal-spec">
                {modalProduct.material && <div className="modal-spec-row"><span className="modal-spec-key">Material</span><span className="modal-spec-val">{modalProduct.material}</span></div>}
                {modalProduct.finish && <div className="modal-spec-row"><span className="modal-spec-key">Finish</span><span className="modal-spec-val">{modalProduct.finish}</span></div>}
                {modalProduct.weight && <div className="modal-spec-row"><span className="modal-spec-key">Weight</span><span className="modal-spec-val">{modalProduct.weight}</span></div>}
                {modalProduct.occasion && <div className="modal-spec-row"><span className="modal-spec-key">Occasion</span><span className="modal-spec-val">{modalProduct.occasion}</span></div>}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => { addToCart(modalProduct.id); setModalProduct(null); setCartOpen(true); }}>Add to Cart</button>
                <button className="btn-outline" onClick={() => setModalProduct(null)}>Continue Shopping</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Admin Panel */}
      <div className={`admin-panel ${adminOpen ? "open" : ""}`}>
        <div className="admin-sidebar">
          <div className="admin-logo">
            <div className="admin-logo-main">Shanthi Admin</div>
            <div className="admin-logo-sub">Dashboard</div>
          </div>
          <div className="admin-nav">
            {[
              { id: "dashboard", icon: "📊", label: "Dashboard" },
              { id: "products-admin", icon: "💎", label: "Products" },
              { id: "add-product", icon: "➕", label: "Add Product" },
              { id: "categories-admin", icon: "📿", label: "Categories" },
              { id: "add-category", icon: "📁", label: "Add Category" },
            ].map((item) => (
              <div key={item.id} className={`admin-nav-item ${adminSection === item.id ? "active" : ""}`} onClick={() => setAdminSection(item.id)}>
                <span className="admin-nav-icon">{item.icon}</span><span>{item.label}</span>
              </div>
            ))}
            <div className="admin-nav-divider"></div>
            <div className={`admin-nav-item ${adminSection === "settings" ? "active" : ""}`} onClick={() => setAdminSection("settings")}>
              <span className="admin-nav-icon">⚙️</span><span>Settings</span>
            </div>
          </div>
          <div className="admin-bottom">
            <button className="admin-close-btn" onClick={() => setAdminOpen(false)}><span>✕</span><span>Exit Admin</span></button>
          </div>
        </div>
        <div className="admin-main">
          <div className="admin-topbar">
            <div className="admin-page-title">{adminTitles[adminSection] || adminSection}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12, color: "var(--color-gray)" }}>Admin</span>
              <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, var(--color-maroon), var(--color-gold))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "var(--color-cream)", fontSize: 13 }}>S</div>
            </div>
          </div>
          <div className="admin-content">
            {/* Dashboard */}
            <div className={`admin-section ${adminSection === "dashboard" ? "active" : ""}`}>
              <div className="stats-grid">
                <div className="stat-card"><div className="stat-label">Total Products</div><div className="stat-value">{products.length}</div><div className="stat-change up">↑ {activeProductCount} active</div></div>
                <div className="stat-card"><div className="stat-label">Categories</div><div className="stat-value">{categories.length}</div><div className="stat-change up">All active</div></div>
                <div className="stat-card"><div className="stat-label">Cart Value</div><div className="stat-value">{currency}{cartValue.toLocaleString("en-IN")}</div><div className="stat-change up">Live</div></div>
              </div>
            </div>

            {/* Products List */}
            <div className={`admin-section ${adminSection === "products-admin" ? "active" : ""}`}>
              <div className="admin-table-wrap">
                <div className="admin-table-header"><div className="admin-table-title">All Jewellery Products</div><button className="btn-add" onClick={() => { clearProductForm(); setEditingProduct(null); setAdminSection("add-product"); }}>+ Add Product</button></div>
                <table>
                  <thead><tr><th>Icon</th><th>Name</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td className="td-emoji">{p.emoji}</td>
                        <td className="td-name">{p.name}</td>
                        <td>{p.category}</td>
                        <td className="td-price">{currency}{p.price.toLocaleString("en-IN")}</td>
                        <td><span className={`td-badge ${p.status}`}>{p.status}</span></td>
                        <td><div className="action-group"><button className="table-action-btn btn-edit" onClick={() => editProduct(p.id)}>Edit</button><button className="table-action-btn btn-delete" onClick={() => deleteProduct(p.id)}>Delete</button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Product */}
            <div className={`admin-section ${adminSection === "add-product" ? "active" : ""}`}>
              <div className="form-section">
                <div className="form-section-title">💎 <span>{editingProduct !== null ? "Edit Product" : "Add New Product"}</span></div>
                <div className="form-grid">
                  <div className="form-group"><label className="form-label">Product Name *</label><input className="form-input" type="text" placeholder="e.g. Impon Addigai Necklace Set" value={pName} onChange={(e) => setPName(e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Category *</label><select className="form-input form-select" value={pCategory} onChange={(e) => setPCategory(e.target.value)}><option value="">Select Category</option>{activeCategories.map((c) => <option key={c.id} value={c.name}>{c.emoji} {c.name}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">Price (₹) *</label><input className="form-input" type="number" placeholder="e.g. 2299" min="0" value={pPrice} onChange={(e) => setPPrice(e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Original Price ₹ (for sale)</label><input className="form-input" type="number" placeholder="e.g. 3500" min="0" value={pPriceOld} onChange={(e) => setPPriceOld(e.target.value)} /></div>
                  <div className="form-group full"><label className="form-label">Description</label><textarea className="form-input form-textarea" placeholder="Describe the jewellery piece..." value={pDesc} onChange={(e) => setPDesc(e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Badge</label><select className="form-input form-select" value={pBadge} onChange={(e) => setPBadge(e.target.value)}><option value="">None</option><option value="new">New Arrival</option><option value="sale">Sale</option><option value="trending">Trending</option><option value="bridal">Bridal</option></select></div>
                  <div className="form-group"><label className="form-label">Status</label><select className="form-input form-select" value={pStatus} onChange={(e) => setPStatus(e.target.value)}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
                  <div className="form-group full"><label className="form-label">Icon / Emoji</label>
                    <div className="emoji-picker">
                      {JEWEL_EMOJIS.map((e, i) => (
                        <div key={i} className={`emoji-option ${pEmoji === e ? "selected" : ""}`} onClick={() => setPEmoji(e)}>{e}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-btn-row" style={{ marginTop: 18 }}>
                  <button className="btn-save" onClick={saveProduct}>💾 Save Product</button>
                  <button className="btn-cancel" onClick={() => { clearProductForm(); setEditingProduct(null); setAdminSection("products-admin"); }}>Cancel</button>
                </div>
              </div>
            </div>

            {/* Categories List */}
            <div className={`admin-section ${adminSection === "categories-admin" ? "active" : ""}`}>
              <div className="admin-table-wrap">
                <div className="admin-table-header"><div className="admin-table-title">All Categories</div><button className="btn-add" onClick={() => { setCName(""); setCStatus("active"); setCEmoji(""); setEditingCategory(null); setAdminSection("add-category"); }}>+ Add Category</button></div>
                <table>
                  <thead><tr><th>Icon</th><th>Name</th><th>Products</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {categories.map((c) => {
                      const n = products.filter((p) => p.category === c.name).length;
                      return (
                        <tr key={c.id}>
                          <td className="td-emoji">{c.emoji}</td>
                          <td className="td-name">{c.name}</td>
                          <td>{n}</td>
                          <td><span className={`td-badge ${c.status}`}>{c.status}</span></td>
                          <td><div className="action-group"><button className="table-action-btn btn-edit" onClick={() => editCategory(c.id)}>Edit</button><button className="table-action-btn btn-delete" onClick={() => deleteCategory(c.id)}>Delete</button></div></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Category */}
            <div className={`admin-section ${adminSection === "add-category" ? "active" : ""}`}>
              <div className="form-section">
                <div className="form-section-title">📿 <span>{editingCategory !== null ? "Edit Category" : "Add New Category"}</span></div>
                <div className="form-grid">
                  <div className="form-group"><label className="form-label">Category Name *</label><input className="form-input" type="text" placeholder="e.g. Maang Tikka" value={cName} onChange={(e) => setCName(e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Status</label><select className="form-input form-select" value={cStatus} onChange={(e) => setCStatus(e.target.value)}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
                  <div className="form-group full"><label className="form-label">Icon</label>
                    <div className="emoji-picker">
                      {JEWEL_EMOJIS.map((e, i) => (
                        <div key={i} className={`emoji-option ${cEmoji === e ? "selected" : ""}`} onClick={() => setCEmoji(e)}>{e}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-btn-row" style={{ marginTop: 18 }}>
                  <button className="btn-save" onClick={saveCategory}>💾 Save Category</button>
                  <button className="btn-cancel" onClick={() => { setCName(""); setEditingCategory(null); setAdminSection("categories-admin"); }}>Cancel</button>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className={`admin-section ${adminSection === "settings" ? "active" : ""}`}>
              <div className="form-section">
                <div className="form-section-title">⚙️ Store Settings</div>
                <div className="form-grid">
                  <div className="form-group"><label className="form-label">Store Name</label><input className="form-input" type="text" value={settingsName} onChange={(e) => setSettingsName(e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Currency</label><select className="form-input form-select" value={settingsCurrency} onChange={(e) => setSettingsCurrency(e.target.value)}><option value="₹">INR (₹)</option><option value="$">USD ($)</option><option value="£">GBP (£)</option></select></div>
                  <div className="form-group full"><label className="form-label">Tagline</label><input className="form-input" type="text" value={settingsTagline} onChange={(e) => setSettingsTagline(e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Phone / WhatsApp</label><input className="form-input" type="text" value={settingsPhone} onChange={(e) => setSettingsPhone(e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Address</label><input className="form-input" type="text" value={settingsAddress} onChange={(e) => setSettingsAddress(e.target.value)} /></div>
                </div>
                <div className="form-btn-row" style={{ marginTop: 18 }}><button className="btn-save" onClick={saveSettings}>💾 Save Settings</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div className={`toast ${toastMsg ? "show" : ""}`}>
          <span>{toastMsg.icon}</span><span>{toastMsg.msg}</span>
        </div>
      )}
    </>
  );
}
