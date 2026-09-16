import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import {
  products,
  CATEGORIES,
  getProductsByCategory,
  searchProducts,
} from "../data/products.js";

export default function Stock() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const activeCategory = searchParams.get("category") || "all";

  // Si llega una búsqueda desde el buscador del navbar (?q=...), reflejarla acá
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const updateParams = (next) => {
    const params = {};
    if (next.q) params.q = next.q;
    if (next.category && next.category !== "all") params.category = next.category;
    setSearchParams(params, { replace: true });
  };

  const handleQueryChange = (value) => {
    setQuery(value);
    updateParams({ q: value, category: activeCategory });
  };

  const handleCategoryChange = (slug) => {
    updateParams({ q: query, category: slug });
  };

  const filtered = useMemo(() => {
    const base =
      activeCategory === "all" ? products : getProductsByCategory(activeCategory);
    return searchProducts(query, base);
  }, [query, activeCategory]);

  const activeLabel = CATEGORIES.find((c) => c.slug === activeCategory)?.label;

  return (
    <section className="container section">
      <div className="category-banner fade-in">
        <h1 className="category-title">Stock</h1>
        <p className="section-sub">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
          {activeLabel ? ` en ${activeLabel}` : ""}
        </p>
      </div>

      <SearchBar
        value={query}
        onChange={handleQueryChange}
        placeholder="Buscar por nombre o categoría…"
      />

      <CategoryFilter active={activeCategory} onSelect={handleCategoryChange} />

      <ProductGrid products={filtered} />
    </section>
  );
}
