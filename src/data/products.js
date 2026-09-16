// ============================================================
//  MATEROS.SGO — Catálogo de productos
// ------------------------------------------------------------
//  PRODUCTO SIN VARIANTES (un solo color / sin stock por color):
//
//    {
//      id: 21,                              // id único (número)
//      name: "Nuevo Mate",
//      category: "mates",                   // ver CATEGORIES abajo
//      price: 30000,                        // precio en pesos (número, sin $ ni puntos)
//      image: "/images/productos/nuevo-mate.jpg",
//      description: "Descripción corta opcional",
//      stock: 5,                            // opcional: cantidad disponible.
//                                            // si no se pone, el producto se
//                                            // muestra siempre disponible
//                                            // (no se controla el stock).
//    }
//
//  PRODUCTO CON VARIANTES DE COLOR (stock distinto por color):
//  en vez de crear un producto por cada color, se agrega UN solo
//  producto con un array "variants". Cada variante tiene su propio
//  color, su propio stock y, si la foto cambia según el color, su
//  propia imagen (si no se pone, se usa la "image" del producto).
//
//    {
//      id: 22,
//      name: "Mate Torpedo Grabado",
//      category: "mates",
//      price: 21000,                        // precio si es igual en todos los colores
//      image: "/images/productos/mate-torpedo.jpg",  // imagen por defecto
//      description: "Calabaza torpedo con grabado artesanal único.",
//      variants: [
//        { color: "Negro", stock: 3 },
//        { color: "Bordó", stock: 1, image: "/images/productos/mate-torpedo-bordo.jpg" },
//        { color: "Verde", stock: 0 },       // stock 0 = se muestra tachado/deshabilitado
//      ],
//    }
//
//  Si un color cuesta distinto, poné "price" adentro de esa
//  variante en vez de (o además de) en el producto:
//      { color: "Cuero premium", stock: 2, price: 24000 }
//
//  Las imágenes se colocan en:  public/images/productos/
//  La ruta pública es:          /images/productos/archivo.jpg
// ============================================================

export const CATEGORIES = [
  { slug: "mates",       label: "Mates" },
  { slug: "bombillas",   label: "Bombillas" },
  { slug: "bombillones", label: "Bombillones" },
  { slug: "materas",     label: "Materas" },
  { slug: "termos",      label: "Termos" },
  { slug: "yerbas",      label: "Yerbas" },
  { slug: "accesorios",  label: "Accesorios" },
];

// Stock total de un producto: suma el stock de sus variantes si las
// tiene, o usa "stock" si es un producto simple. Si no se definió
// ninguno de los dos, devuelve null (stock no gestionado = siempre
// disponible).
export const getProductStock = (product) => {
  if (Array.isArray(product.variants)) {
    return product.variants.reduce((sum, v) => sum + (v.stock || 0), 0);
  }
  if (typeof product.stock === "number") return product.stock;
  return null;
};

export const isOutOfStock = (product) => getProductStock(product) === 0;

// Precio efectivo de un producto para una variante puntual
// (usa el price de la variante si lo tiene, si no el del producto).
export const getVariantPrice = (product, variant) =>
  variant?.price ?? product.price;

export const products = [
  // ---- MATES (49) ----
  {
    id: 1,
    name: "Mate Imperial Premium",
    category: "mates",
    price: 45000,
    image: "/images/productos/mate-1.jpg",
    description: "Calabaza forrada en cuero con virola de alpaca.",
  },
  {
    id: 2,
    name: "Mate Camionero Clásico",
    category: "mates",
    price: 48000,
    image: "/images/productos/mate-2.jpeg",
    description: "Calabaza grande, cuero suave y base reforzada.",
  },
  {
    id: 3,
    name: "Mate Torpedo Grabado",
    category: "mates",
    price: 61500,
    image: "/images/productos/mate-3.jpeg",
    description: "Calabaza torpedo con grabado artesanal único.",
  },
  {
    id: 4,
    name: "Mate de Vidrio Templado",
    category: "mates",
    price: 22000,
    image: "/images/productos/mate-4.jpeg",
    description: "Vidrio doble pared, ligero y fácil de curar.",
  },
  {
    id: 5,
    name: "Mate Cerámica Artesanal",
    category: "mates",
    price: 34500,
    image: "/images/productos/mate-5.jpeg",
    description: "Cerámica esmaltada a mano, edición limitada.",
  },
  // Placeholder: falta cargar nombre y foto real de cada uno (precio ya cargado)
  {
    id: 6,
    name: "Mate #6",
    category: "mates",
    price: 31500,
    image: "/images/productos/mate-6.jpeg",
  },
  {
    id: 7,
    name: "Mate #7",
    category: "mates",
    price: 41900,
    image: "/images/productos/mate-7.jpeg",
  },
  {
    id: 8,
    name: "Mate #8",
    category: "mates",
    price: 54500,
    image: "/images/productos/mate-8.jpeg",
  },
  {
    id: 9,
    name: "Mate #9",
    category: "mates",
    price: 59900,
    image: "/images/productos/mate-9.jpeg",
  },
  {
    id: 10,
    name: "Mate #10",
    category: "mates",
    price: 19900,
    image: "/images/productos/mate-10.jpeg",
  },
  {
    id: 11,
    name: "Mate #11",
    category: "mates",
    price: 15000,
    image: "/images/productos/mate-11.jpeg",
  },
  {
    id: 12,
    name: "Mate #12",
    category: "mates",
    price: 40000,
    image: "/images/productos/mate-12.jpeg",
  },
  {
    id: 13,
    name: "Mate #13",
    category: "mates",
    price: 47500,
    image: "/images/productos/mate-13.jpeg",
  },
  {
    id: 14,
    name: "Mate #14",
    category: "mates",
    price: 45000,
    image: "/images/productos/mate-14.jpeg",
  },
  {
    id: 15,
    name: "Mate #15",
    category: "mates",
    price: 13000,
    image: "/images/productos/mate-15.jpeg",
  },
  {
    id: 16,
    name: "Mate #16",
    category: "mates",
    price: 59900,
    image: "/images/productos/mate-16.jpeg",
  },
  {
    id: 17,
    name: "Mate #17",
    category: "mates",
    price: 75900,
    image: "/images/productos/mate-17.jpeg",
  },
  {
    id: 18,
    name: "Mate #18",
    category: "mates",
    price: 123900,
    image: "/images/productos/mate-18.jpeg",
  },
  {
    id: 19,
    name: "Mate #19",
    category: "mates",
    price: 51000,
    image: "/images/productos/mate-19.jpeg",
  },
  {
    id: 20,
    name: "Mate #20",
    category: "mates",
    price: 74900,
    image: "/images/productos/mate-20.jpeg",
  },
  {
    id: 21,
    name: "Mate #21",
    category: "mates",
    price: 62000,
    image: "/images/productos/mate-21.jpeg",
  },
  {
    id: 22,
    name: "Mate #22",
    category: "mates",
    price: 98500,
    image: "/images/productos/mate-22.jpeg",
  },
  {
    id: 23,
    name: "Mate #23",
    category: "mates",
    price: 79500,
    image: "/images/productos/mate-23.jpeg",
  },
  {
    id: 24,
    name: "Mate #24",
    category: "mates",
    price: 89000,
    image: "/images/productos/mate-24.jpeg",
  },
  {
    id: 25,
    name: "Mate #25",
    category: "mates",
    price: 74900,
    image: "/images/productos/mate-25.jpeg",
  },
  {
    id: 26,
    name: "Mate #26",
    category: "mates",
    price: 75900,
    image: "/images/productos/mate-26.jpeg",
  },
  {
    id: 27,
    name: "Mate #27",
    category: "mates",
    price: 49000,
    image: "/images/productos/mate-27.jpeg",
  },
  {
    id: 28,
    name: "Mate #28",
    category: "mates",
    price: 82900,
    image: "/images/productos/mate-28.jpeg",
  },
  {
    id: 29,
    name: "Mate #29",
    category: "mates",
    price: 114900,
    image: "/images/productos/mate-29.jpeg",
  },
  {
    id: 30,
    name: "Mate #30",
    category: "mates",
    price: 62000,
    image: "/images/productos/mate-30.jpeg",
  },
  {
    id: 31,
    name: "Mate #31",
    category: "mates",
    price: 72500,
    image: "/images/productos/mate-31.jpeg",
  },
  {
    id: 32,
    name: "Mate #32",
    category: "mates",
    price: 49500,
    image: "/images/productos/mate-32.jpeg",
  },
  {
    id: 33,
    name: "Mate #33",
    category: "mates",
    price: 89900,
    image: "/images/productos/mate-33.jpeg",
  },
  {
    id: 34,
    name: "Mate #34",
    category: "mates",
    price: 125900,
    image: "/images/productos/mate-34.jpeg",
  },
  {
    id: 35,
    name: "Mate #35",
    category: "mates",
    price: 56500,
    image: "/images/productos/mate-35.jpeg",
  },
  {
    id: 36,
    name: "Mate #36",
    category: "mates",
    price: 48000,
    image: "/images/productos/mate-36.jpeg",
  },
  {
    id: 37,
    name: "Mate #37",
    category: "mates",
    price: 47500,
    image: "/images/productos/mate-37.jpeg",
  },
  {
    id: 38,
    name: "Mate #38",
    category: "mates",
    price: 59500,
    image: "/images/productos/mate-38.jpeg",
  },
  {
    id: 39,
    name: "Mate #39",
    category: "mates",
    price: 49500,
    image: "/images/productos/mate-39.jpeg",
  },
  {
    id: 40,
    name: "Mate #40",
    category: "mates",
    price: 52500,
    image: "/images/productos/mate-40.jpeg",
  },
  {
    id: 41,
    name: "Mate #41",
    category: "mates",
    price: 77000,
    image: "/images/productos/mate-41.jpeg",
  },
  {
    id: 42,
    name: "Mate #42",
    category: "mates",
    price: 131000,
    image: "/images/productos/mate-42.jpeg",
  },
  {
    id: 43,
    name: "Mate #43",
    category: "mates",
    price: 168900,
    image: "/images/productos/mate-43.jpeg",
  },
  {
    id: 44,
    name: "Mate #44",
    category: "mates",
    price: 65000,
    image: "/images/productos/mate-44.jpeg",
  },
  {
    id: 45,
    name: "Mate #45",
    category: "mates",
    price: 129900,
    image: "/images/productos/mate-45.jpeg",
  },
  {
    id: 46,
    name: "Mate #46",
    category: "mates",
    price: 75900,
    image: "/images/productos/mate-46.jpeg",
  },
  {
    id: 47,
    name: "Mate #47",
    category: "mates",
    price: 75900,
    image: "/images/productos/mate-47.jpeg",
  },
  {
    id: 48,
    name: "Mate #48",
    category: "mates",
    price: 187900,
    image: "/images/productos/mate-48.jpeg",
  },
  {
    id: 49,
    name: "Mate #49",
    category: "mates",
    price: 142000,
    image: "/images/productos/mate-49.jpeg",
  },

  // ---- BOMBILLAS (1) ----
  {
    id: 50,
    name: "Bombilla de Alpaca Lisa",
    category: "bombillas",
    price: 8000,
    image: "/images/productos/bombilla-1.jpeg",
    description: "Alpaca maciza con filtro desmontable.",
  },

  // ---- BOMBILLONES (15) ----
  // Placeholder: falta cargar nombre y foto real de cada uno (precios ya cargados)
  {
    id: 51,
    name: "Bombillón #1",
    category: "bombillones",
    price: 77500,
    image: "/images/productos/bombillon.jpg",
  },
  {
    id: 52,
    name: "Bombillón #2",
    category: "bombillones",
    price: 37900,
    image: "/images/productos/bombillon.jpg",
  },
  {
    id: 53,
    name: "Bombillón #3",
    category: "bombillones",
    price: 24900,
    image: "/images/productos/bombillon.jpg",
  },
  {
    id: 54,
    name: "Bombillón #4",
    category: "bombillones",
    price: 48500,
    image: "/images/productos/bombillon.jpg",
  },
  {
    id: 55,
    name: "Bombillón #5",
    category: "bombillones",
    price: 34000,
    image: "/images/productos/bombillon.jpg",
  },
  {
    id: 56,
    name: "Bombillón #6",
    category: "bombillones",
    price: 32000,
    image: "/images/productos/bombillon.jpg",
  },
  {
    id: 57,
    name: "Bombillón #7",
    category: "bombillones",
    price: 39500,
    image: "/images/productos/bombillon.jpg",
  },
  {
    id: 58,
    name: "Bombillón #8",
    category: "bombillones",
    price: 36500,
    image: "/images/productos/bombillon.jpg",
  },
  {
    id: 59,
    name: "Bombillón #9",
    category: "bombillones",
    price: 46900,
    image: "/images/productos/bombillon.jpg",
  },
  {
    id: 60,
    name: "Bombillón #10",
    category: "bombillones",
    price: 36500,
    image: "/images/productos/bombillon.jpg",
  },
  {
    id: 61,
    name: "Bombillón #11",
    category: "bombillones",
    price: 38500,
    image: "/images/productos/bombillon.jpg",
  },
  {
    id: 62,
    name: "Bombillón #12",
    category: "bombillones",
    price: 38500,
    image: "/images/productos/bombillon.jpg",
  },
  {
    id: 63,
    name: "Bombillón #13",
    category: "bombillones",
    price: 34000,
    image: "/images/productos/bombillon.jpg",
  },
  {
    id: 64,
    name: "Bombillón #14",
    category: "bombillones",
    price: 35000,
    image: "/images/productos/bombillon.jpg",
  },
  {
    id: 65,
    name: "Bombillón De Oro 18k",
    category: "bombillones",
    price: 0,
    image: "/images/productos/bombillon.jpg",
    description: "PENDIENTE: falta confirmar el precio de este.",
  },

  // ---- MATERAS (7) ----
  {
    id: 66,
    name: "Matera de Cuero",
    category: "materas",
    price: 72900,
    image: "/images/productos/matera-1.jpeg",
    description: "Cuero vacuno legítimo, guarda mate + termo.",
  },
  // Placeholder: falta cargar nombre y foto real de cada una (precio ya cargado)
  {
    id: 67,
    name: "Matera #2",
    category: "materas",
    price: 43000,
    image: "/images/productos/matera-2.jpeg",
  },
  {
    id: 68,
    name: "Matera #3",
    category: "materas",
    price: 51900,
    image: "/images/productos/matera-3.jpeg",
  },
  {
    id: 69,
    name: "Matera #4",
    category: "materas",
    price: 72500,
    image: "/images/productos/matera-4.jpeg",
  },
  {
    id: 70,
    name: "Matera #5",
    category: "materas",
    price: 42000,
    image: "/images/productos/matera-5.jpeg",
  },
  {
    id: 71,
    name: "Matera #6",
    category: "materas",
    price: 41000,
    image: "/images/productos/matera-6.jpeg",
  },
  {
    id: 72,
    name: "Matera #7",
    category: "materas",
    price: 45000,
    image: "/images/productos/matera-7.jpeg",
  },

  // ---- TERMOS (4) ----
  {
    id: 73,
    name: "Termo Acero 1L Clásico",
    category: "termos",
    price: 32000,
    image: "/images/productos/termo-1l.jpg",
    description: "Acero inoxidable, pico cebador, 24 h de calor.",
  },
  {
    id: 74,
    name: "Termo Media Manija 1.3L",
    category: "termos",
    price: 38000,
    image: "/images/productos/termo-media-manija.jpg",
    description: "Media manija reforzada, base antideslizante.",
  },
  {
    id: 75,
    name: "Termo Matero Compacto 750ml",
    category: "termos",
    price: 26500,
    image: "/images/productos/termo-compacto.jpg",
    description: "Formato compacto para llevar a todas partes.",
  },
  {
    id: 76,
    name: "Termo con Manija Completa 1.5L",
    category: "termos",
    price: 42000,
    image: "/images/productos/termo-manija.jpg",
    description: "Gran capacidad, manija ergonómica y asa plegable.",
  },

  // ---- YERBAS (6) ----
  {
    id: 77,
    name: "Yerba Mate Verdecita 1kg",
    category: "yerbas",
    price: 7000,
    image: "/images/productos/verdecita-1.jpeg",
  },
  {
    id: 78,
    name: "Yerba Mate Pindare 1kg",
    category: "yerbas",
    price: 7000,
    image: "/images/productos/pindare-1.jpeg",
  },
  {
    id: 79,
    name: "Yerba Mate Barao 1kg",
    category: "yerbas",
    price: 7000,
    image: "/images/productos/barao-1.webp",
  },
  {
    id: 80,
    name: "Yerba Mate Canarias 1kg",
    category: "yerbas",
    price: 7000,
    image: "/images/productos/canarias-1.webp",
  },
  {
    id: 81,
    name: "Yerba Mate Baldo 1kg",
    category: "yerbas",
    price: 7000,
    image: "/images/productos/baldo-1.jpeg",
  },
  {
    id: 82,
    name: "Yerba Mate Sara 1kg",
    category: "yerbas",
    price: 7000,
    image: "/images/productos/sara-1.webp",
  },

  // ---- ACCESORIOS (1) ----
  {
    id: 83,
    name: "Lata de Baldo",
    category: "accesorios",
    price: 26000,
    image: "/images/productos/accesorio-lata-baldo.jpeg",
    description: "Lata metálica de colección de Yerba Baldo.",
  },
];

export const getProductsByCategory = (slug) =>
  products.filter((p) => p.category === slug);

export const searchProducts = (query, list = products) => {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
};

export const formatPrice = (n) =>
  "$" + n.toLocaleString("es-AR", { maximumFractionDigits: 0 });
