import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { getVariantPrice } from "../data/products.js";

const CartContext = createContext(null);

const STORAGE_KEY = "materosgo_cart";

const initialState = {
  items: [], // [{ id, productId, name, image, price, color, qty }]
};

// Id de línea de carrito: si el producto tiene variante de color,
// cada color es una línea aparte (mismo producto, distinto stock).
const cartLineId = (product, variant) =>
  variant ? `${product.id}__${variant.color}` : String(product.id);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, variant } = action;
      const lineId = cartLineId(product, variant);
      const existing = state.items.find((i) => i.id === lineId);

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === lineId ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            id: lineId,
            productId: product.id,
            name: product.name,
            image: variant?.image || product.image,
            price: getVariantPrice(product, variant),
            color: variant?.color || null,
            qty: 1,
          },
        ],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QTY": {
      if (action.qty <= 0) {
        return { items: state.items.filter((i) => i.id !== action.id) };
      }
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: action.qty } : i
        ),
      };
    }
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.items)) return parsed;
    return initialState;
  } catch {
    return initialState;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  // Persistir en localStorage en cada cambio
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => {
    const totalItems = state.items.reduce((acc, i) => acc + i.qty, 0);
    const totalPrice = state.items.reduce((acc, i) => acc + i.qty * i.price, 0);

    return {
      items: state.items,
      totalItems,
      totalPrice,
      // variant es opcional: si el producto no tiene colores, se omite
      addToCart: (product, variant) => dispatch({ type: "ADD", product, variant }),
      removeFromCart: (id) => dispatch({ type: "REMOVE", id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      clearCart: () => dispatch({ type: "CLEAR" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
