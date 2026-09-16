import { CATEGORIES } from "../data/products.js";

export default function CategoryFilter({ active, onSelect }) {
  return (
    <div className="category-filter" role="tablist" aria-label="Filtrar por categoría">
      <button
        type="button"
        role="tab"
        aria-selected={active === "all"}
        className={`chip ${active === "all" ? "chip-active" : ""}`}
        onClick={() => onSelect("all")}
      >
        Todos
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c.slug}
          type="button"
          role="tab"
          aria-selected={active === c.slug}
          className={`chip ${active === c.slug ? "chip-active" : ""}`}
          onClick={() => onSelect(c.slug)}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
