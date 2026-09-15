import { useMemo, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import {
  CATEGORIES,
  getProductsByCategory,
  searchProducts,
} from "../data/products.js";

export default function Category() {
  const { category } = useParams();
  const [query, setQuery] = useState("");

  const cat = CATEGORIES.find((c) => c.slug === category);

  const filtered = useMemo(() => {
    if (!cat) return [];
    return searchProducts(query, getProductsByCategory(cat.slug));
  }, [cat, query]);

  // Ruta de categoría inexistente → 404
  if (!cat) return <Navigate to="/404" replace />;

  return (
    <section className="container section">
      <div className="category-banner fade-in">
        <h1 className="category-title">{cat.label}</h1>
        <p className="section-sub">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder={`Buscar en ${cat.label.toLowerCase()}…`}
      />

      <ProductGrid products={filtered} />
    </section>
  );
}
