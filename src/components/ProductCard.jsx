import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import {
  formatPrice,
  CATEGORIES,
  getVariantPrice,
} from "../data/products.js";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;

  // Por defecto, elegir la primera variante que tenga stock (si ninguna
  // tiene, se queda en la primera igual, para poder mostrarla tachada)
  const [selectedColor, setSelectedColor] = useState(() => {
    if (!hasVariants) return null;
    const firstAvailable = product.variants.find((v) => v.stock > 0);
    return (firstAvailable || product.variants[0]).color;
  });

  const selectedVariant = hasVariants
    ? product.variants.find((v) => v.color === selectedColor)
    : null;

  const categoryLabel =
    CATEGORIES.find((c) => c.slug === product.category)?.label ||
    product.category;

  const currentImage = selectedVariant?.image || product.image;
  const currentPrice = getVariantPrice(product, selectedVariant);

  const outOfStock = useMemo(() => {
    if (hasVariants) return !selectedVariant || selectedVariant.stock <= 0;
    if (typeof product.stock === "number") return product.stock <= 0;
    return false; // stock no gestionado: siempre disponible
  }, [hasVariants, selectedVariant, product.stock]);

  const handleAdd = () => {
    if (outOfStock) return;
    addToCart(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="product-card fade-in">
      <div className="product-image-wrap">
        <img
          src={currentImage}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <span className="product-category-tag">{categoryLabel}</span>
        {outOfStock && <span className="product-stock-tag">Sin stock</span>}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <p className="product-desc">{product.description}</p>
        )}

        {hasVariants && (
          <div className="variant-swatches" role="radiogroup" aria-label="Elegir color">
            {product.variants.map((v) => {
              const disabled = v.stock <= 0;
              return (
                <button
                  key={v.color}
                  type="button"
                  role="radio"
                  aria-checked={selectedColor === v.color}
                  disabled={disabled}
                  className={
                    "variant-swatch" +
                    (selectedColor === v.color ? " variant-swatch-active" : "") +
                    (disabled ? " variant-swatch-disabled" : "")
                  }
                  title={disabled ? `${v.color} — sin stock` : v.color}
                  onClick={() => setSelectedColor(v.color)}
                >
                  {v.color}
                </button>
              );
            })}
          </div>
        )}

        <div className="product-footer">
          <span className="product-price">{formatPrice(currentPrice)}</span>
          <button
            className={`btn-add ${added ? "added" : ""}`}
            onClick={handleAdd}
            disabled={outOfStock}
          >
            {outOfStock ? "Sin stock" : added ? "✓ Agregado" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </article>
  );
}
