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
  // ---- MATES ----
  {
    id: 1,
    name: "Mate Imperial Premium",
    category: "mates",
    price: 25000,
    image: "/images/productos/mate-imperial.jpg",
    description: "Calabaza forrada en cuero con virola de alpaca.",
  },
  {
    id: 2,
    name: "Mate Camionero Clásico",
    category: "mates",
    price: 18000,
    image: "/images/productos/mate-camionero.jpg",
    description: "Calabaza grande, cuero suave y base reforzada.",
  },
  {
    id: 3,
    name: "Mate Torpedo Grabado",
    category: "mates",
    price: 21000,
    image: "/images/productos/mate-torpedo.jpg",
    description: "Calabaza torpedo con grabado artesanal único.",
  },
  {
    id: 4,
    name: "Mate de Vidrio Templado",
    category: "mates",
    price: 9500,
    image: "/images/productos/mate-vidrio.jpg",
    description: "Vidrio doble pared, ligero y fácil de curar.",
  },
  {
    id: 5,
    name: "Mate Cerámica Artesanal",
    category: "mates",
    price: 12000,
    image: "/images/productos/mate-ceramica.jpg",
    description: "Cerámica esmaltada a mano, edición limitada.",
  },

  // ---- BOMBILLAS ----
  {
    id: 6,
    name: "Bombilla de Alpaca Lisa",
    category: "bombillas",
    price: 8000,
    image: "/images/productos/bombilla-alpaca.jpg",
    description: "Alpaca maciza con filtro desmontable.",
  },
  {
    id: 7,
    name: "Bombilla Alpaca Grabada",
    category: "bombillas",
    price: 13500,
    image: "/images/productos/bombilla-grabada.jpg",
    description: "Grabado artesanal, punta dorada, caño ancho.",
  },
  {
    id: 8,
    name: "Bombilla Pico de Loro",
    category: "bombillas",
    price: 6000,
    image: "/images/productos/bombilla-pico-loro.jpg",
    description: "Acero inoxidable cincelado, resistente.",
  },
  {
    id: 9,
    name: "Bombilla de Acero Premium",
    category: "bombillas",
    price: 4500,
    image: "/images/productos/bombilla-acero.jpg",
    description: "Acero quirúrgico 18/8, fácil limpieza.",
  },
  {
    id: 10,
    name: "Bombilla Doble Filtro",
    category: "bombillas",
    price: 7200,
    image: "/images/productos/bombilla-doble-filtro.jpg",
    description: "Doble filtro extraíble, ideal yerbas finas.",
  },

  // ---- TERMOS ----
  {
    id: 11,
    name: "Termo Acero 1L Clásico",
    category: "termos",
    price: 32000,
    image: "/images/productos/termo-1l.jpg",
    description: "Acero inoxidable, pico cebador, 24 h de calor.",
  },
  {
    id: 12,
    name: "Termo Media Manija 1.3L",
    category: "termos",
    price: 38000,
    image: "/images/productos/termo-media-manija.jpg",
    description: "Media manija reforzada, base antideslizante.",
  },
  {
    id: 13,
    name: "Termo Matero Compacto 750ml",
    category: "termos",
    price: 26500,
    image: "/images/productos/termo-compacto.jpg",
    description: "Formato compacto para llevar a todas partes.",
  },
  {
    id: 14,
    name: "Termo con Manija Completa 1.5L",
    category: "termos",
    price: 42000,
    image: "/images/productos/termo-manija.jpg",
    description: "Gran capacidad, manija ergonómica y asa plegable.",
  },

  // ---- YERBAS ----
  {
    id: 15,
    name: "Yerba Mate Tradicional 1kg",
    category: "yerbas",
    price: 6500,
    image: "/images/productos/yerba-tradicional.jpg",
    description: "Estacionamiento natural de 24 meses.",
  },
  {
    id: 16,
    name: "Yerba Mate Suave 1kg",
    category: "yerbas",
    price: 6800,
    image: "/images/productos/yerba-suave.jpg",
    description: "Bajo contenido de polvo, cebado suave.",
  },
  {
    id: 17,
    name: "Yerba Mate Orgánica 500g",
    category: "yerbas",
    price: 5900,
    image: "/images/productos/yerba-organica.jpg",
    description: "Sin agroquímicos, certificación orgánica.",
  },
  {
    id: 18,
    name: "Yerba Mate Compuesta 1kg",
    category: "yerbas",
    price: 7400,
    image: "/images/productos/yerba-compuesta.jpg",
    description: "Con hierbas naturales: menta, burro y carqueja.",
  },

  // ---- ACCESORIOS ----
  {
    id: 19,
    name: "Matera de Cuero",
    category: "accesorios",
    price: 22000,
    image: "/images/productos/matera-cuero.jpg",
    description: "Cuero vacuno legítimo, guarda mate + termo.",
  },
  {
    id: 20,
    name: "Yerbera + Azucarera",
    category: "accesorios",
    price: 8500,
    image: "/images/productos/yerbera-azucarera.jpg",
    description: "Set de acero inoxidable con tapa hermética.",
  },
  {
    id: 21,
    name: "Canasta Matera",
    category: "accesorios",
    price: 15500,
    image: "/images/productos/canasta-matera.jpg",
    description: "Mimbre tejido a mano, asa reforzada.",
  },
  {
    id: 22,
    name: "Limpia Bombillas",
    category: "accesorios",
    price: 2500,
    image: "/images/productos/limpia-bombillas.jpg",
    description: "Cepillo de limpieza, mango flexible.",
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
