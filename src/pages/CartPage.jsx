import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../data/products.js";
import { buildWhatsAppOrderUrl } from "../utils/whatsapp.js";

export default function CartPage() {
  const { items, totalItems, totalPrice, setQty, removeFromCart, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <section className="container section">
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">🧉</span>
          <h1 className="section-title">Tu carrito está vacío</h1>
          <p>Agregá mates, bombillas, termos o yerbas para empezar tu pedido.</p>
          <Link to="/" className="btn-primary">
            Ver productos
          </Link>
        </div>
      </section>
    );
  }

  const whatsappUrl = buildWhatsAppOrderUrl(items, totalPrice);

  return (
    <section className="container section">
      <div className="section-head">
        <h1 className="section-title">Tu carrito</h1>
        <p className="section-sub">{totalItems} artículos</p>
      </div>

      <div className="cart-layout">
        <div className="cart-table fade-in">
          <div className="cart-row cart-row-head">
            <span>Producto</span>
            <span>Cantidad</span>
            <span>Precio</span>
            <span>Subtotal</span>
            <span aria-label="Acciones"></span>
          </div>

          {items.map((item) => (
            <div className="cart-row" key={item.id}>
              <div className="cart-product">
                <img src={item.image} alt={item.name} className="cart-thumb" />
                <span className="cart-name">
                  {item.name}
                  {item.color && (
                    <span className="cart-item-color"> — {item.color}</span>
                  )}
                </span>
              </div>

              <div className="qty-control">
                <button
                  onClick={() => setQty(item.id, item.qty - 1)}
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <span className="qty-value">{item.qty}</span>
                <button
                  onClick={() => setQty(item.id, item.qty + 1)}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>

              <span className="cart-price">{formatPrice(item.price)}</span>
              <span className="cart-subtotal">
                {formatPrice(item.price * item.qty)}
              </span>

              <button
                className="cart-remove"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Eliminar ${item.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary fade-in">
          <h2 className="summary-title">Resumen</h2>
          <div className="summary-row">
            <span>Total ({totalItems} artículos)</span>
            <span className="summary-total">{formatPrice(totalPrice)}</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.34zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.82 9.82 0 0 1 9.88 9.9c0 5.44-4.44 9.87-9.89 9.87zm8.42-18.3A11.82 11.82 0 0 0 12.04 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L.05 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.44h.01c6.55 0 11.89-5.33 11.89-11.9 0-3.18-1.24-6.16-3.46-8.4z" />
            </svg>
            Comprar por WhatsApp
          </a>

          <button className="btn-outline" onClick={clearCart}>
            Vaciar carrito
          </button>

          <Link to="/" className="btn-link">
            ← Seguir comprando
          </Link>
        </aside>
      </div>
    </section>
  );
}
