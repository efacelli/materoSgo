// ============================================================
//  Arma el mensaje de pedido y el link de WhatsApp
// ============================================================

import { WHATSAPP_NUMBER, STORE_NAME } from "../config.js";
import { formatPrice } from "../data/products.js";

export function buildWhatsAppOrderUrl(items, totalPrice) {
  const lines = [
    `¡Hola ${STORE_NAME}! Quiero hacer este pedido:`,
    "",
    ...items.map((item) => {
      const colorText = item.color ? ` (${item.color})` : "";
      return `• ${item.qty}x ${item.name}${colorText} — ${formatPrice(
        item.price * item.qty
      )}`;
    }),
    "",
    `Total: ${formatPrice(totalPrice)}`,
  ];

  const message = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
