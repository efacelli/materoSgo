import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">🧉</span>
        <p>No encontramos productos que coincidan con tu búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
