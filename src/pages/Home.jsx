import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import InstagramReels from "../components/InstagramReels.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import { products, searchProducts } from "../data/products.js";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Si llega una búsqueda desde el buscador del navbar (?q=...), reflejarla acá
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleQueryChange = (value) => {
    setQuery(value);
    setSearchParams(value ? { q: value } : {}, { replace: true });
  };

  const filtered = useMemo(() => searchProducts(query, products), [query]);

  return (
    <>
      {/* HERO: la animación principal va en este componente */}
      <Hero />

      <InstagramReels />

      <section className="container section" id="stock">
        <div className="section-head">
          <h2 className="section-title">Stock disponible</h2>
          <p className="section-sub">
            {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
          </p>
        </div>

        <SearchBar
          value={query}
          onChange={handleQueryChange}
          placeholder="Buscar por nombre o categoría…"
        />

        <CategoryFilter active="all" />

        <ProductGrid products={filtered} />
      </section>
    </>
  );
}
