# Matero.sgo

Tienda online de productos materos — **React JS + Vite**.

## Instalación

```bash
npm install
npm run dev
```

## Despliegue

El proyecto es 100% frontend. Se despliega directamente en **Vercel**
(la configuración de Vite ya está incluida).

## Estructura

```
src/
├── components/   Navbar, Footer, Hero, ProductCard, ProductGrid, SearchBar, CategoryFilter
├── pages/        Home, Category, CartPage, NotFound
├── data/         products.js   ← catálogo (editar acá para agregar productos)
├── context/      CartContext.jsx (carrito + localStorage)
├── utils/        whatsapp.js   ← generación del pedido por WhatsApp
├── config.js     ← número de WhatsApp y nombre de la tienda
└── ...
public/images/productos/  ← colocar las fotos reales acá
```

## Categorías

Están definidas en `src/data/products.js` (array `CATEGORIES`). Hoy son:

`mates` · `bombillas` · `bombillones` · `materas` · `termos` · `yerbas` · `accesorios`

Para agregar una categoría nueva, sumá un objeto `{ slug: "...", label: "..." }`
a ese array — el menú de arriba y los filtros se actualizan solos, no hay
que tocar nada más.

## Agregar un producto

Editar `src/data/products.js` y agregar un objeto al array `products`.

**Producto simple** (un solo color, o no se controla el stock):

```js
{
  id: 23,
  name: "Nuevo Mate",
  category: "mates",
  price: 30000,
  image: "/images/productos/nuevo-mate.jpg",
  description: "Opcional",
  stock: 5,          // opcional. Si no lo ponés, se muestra siempre disponible.
}
```

**Producto con variantes de color** (stock distinto por color — por
ejemplo 3 unidades en negro y 1 en bordó): en vez de crear un producto
por cada color, se agrega UN solo producto con un array `variants`.
Cada variante tiene su propio color y su propio stock, y opcionalmente
su propia imagen y su propio precio si cambian según el color:

```js
{
  id: 24,
  name: "Mate Torpedo Grabado",
  category: "mates",
  price: 21000,                 // precio si es igual en todos los colores
  image: "/images/productos/mate-torpedo.jpg",   // imagen por defecto
  description: "Calabaza torpedo con grabado artesanal único.",
  variants: [
    { color: "Negro", stock: 3 },
    { color: "Bordó", stock: 1, image: "/images/productos/mate-torpedo-bordo.jpg" },
    { color: "Verde", stock: 0 },   // stock 0 = queda tachado y sin poder agregarlo
  ],
}
```

- Si un color cuesta distinto, agregá `price` adentro de esa variante puntual
  (por ejemplo `{ color: "Cuero premium", stock: 2, price: 24000 }`).
- No hace falta tocar nada más: la tarjeta del producto arma el selector de
  color sola, oculta/tacha los colores sin stock, y el mensaje de WhatsApp
  incluye el color elegido en cada línea del pedido.

## Reemplazar la animación del Hero

La sección principal está aislada en `src/components/Hero.jsx`,
marcada con comentarios `==== REEMPLAZAR POR TU ANIMACIÓN ====`.

## WhatsApp

El número está en `src/config.js`:

```js
export const WHATSAPP_NUMBER = "5493855968559";
```

## Créditos

© EFACELLI — Todos los derechos reservados.
