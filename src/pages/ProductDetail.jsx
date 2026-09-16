import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import {
  products,
  CATEGORIES,
  formatPrice,
  getVariantPrice,
} from "../data/products.js";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const product = products.find((p) => String(p.id) === id);

  const hasVariants = Array.isArray(product?.variants) && product.variants.length > 0;

  const [selectedColor, setSelectedColor] = useState(() => {
    if (!hasVariants) return null;
    const firstAvailable = product.variants.find((v) => v.stock > 0);
    return (firstAvailable || product.variants[0]).color;
  });

  const selectedVariant = hasVariants
    ? product.variants.find((v) => v.color === selectedColor)
    : null;

  const outOfStock = useMemo(() => {
    if (!product) return false;
    if (hasVariants) return !selectedVariant || selectedVariant.stock <= 0;
    if (typeof product.stock === "number") return product.stock <= 0;
    return false;
  }, [product, hasVariants, selectedVariant]);

  if (!product) {
    return (
      <section className="container section">
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">🧉</span>
          <h1 className="section-title">No encontramos ese producto</h1>
          <Link to="/" className="btn-primary">
            Volver a la tienda
          </Link>
        </div>
      </section>
    );
  }

  const categoryLabel =
    CATEGORIES.find((c) => c.slug === product.category)?.label ||
    product.category;

  // Fotos a mostrar a la izquierda: la imagen del producto y, si la
  // variante elegida tiene su propia foto, también esa.
  const photos = [
    product.image,
    ...(selectedVariant?.image && selectedVariant.image !== product.image
      ? [selectedVariant.image]
      : []),
  ];
  const [activePhoto, setActivePhoto] = useState(0);
  const mainPhoto = photos[Math.min(activePhoto, photos.length - 1)];

  const currentPrice = getVariantPrice(product, selectedVariant);

  const handleAdd = () => {
    if (outOfStock) return;
    addToCart(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <section className="container section product-detail">
      <Link to={`/stock?category=${product.category}`} className="btn-link back-link">
        ← Volver a {categoryLabel}
      </Link>

      <div className="product-detail-layout">
        {/* FOTOS a la izquierda */}
        <div className="product-detail-gallery">
          <div className="product-detail-main-photo">
            <img src={mainPhoto} alt={product.name} />
            {outOfStock && <span className="product-stock-tag">Sin stock</span>}
          </div>
          {photos.length > 1 && (
            <div className="product-detail-thumbs">
              {photos.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  className={
                    "product-detail-thumb" +
                    (activePhoto === i ? " product-detail-thumb-active" : "")
                  }
                  onClick={() => setActivePhoto(i)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* NOMBRE, precio, color y acción a la derecha */}
        <div className="product-detail-info">
          <span className="product-category-tag product-detail-category">
            {categoryLabel}
          </span>
          <h1 className="product-detail-name">{product.name}</h1>
          {product.description && (
            <p className="product-detail-desc">{product.description}</p>
          )}

          {hasVariants && (
            <div className="product-detail-variants">
              <span className="product-detail-variants-label">Color</span>
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
                      onClick={() => {
                        setSelectedColor(v.color);
                        setActivePhoto(0);
                      }}
                    >
                      {v.color}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <span className="product-detail-price">{formatPrice(currentPrice)}</span>

          <button
            className={`btn-add product-detail-add ${added ? "added" : ""}`}
            onClick={handleAdd}
            disabled={outOfStock}
          >
            {outOfStock ? "Sin stock" : added ? "✓ Agregado al carrito" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </section>
  );
}
