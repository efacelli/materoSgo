import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/products.js";

export default function CategoryFilter({ active }) {
  return (
    <div className="category-filter" role="tablist" aria-label="Filtrar por categoría">
      <Link
        to="/"
        className={`chip ${active === "all" ? "chip-active" : ""}`}
      >
        Todos
      </Link>
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          to={`/${c.slug}`}
          className={`chip ${active === c.slug ? "chip-active" : ""}`}
        >
          {c.label}
        </Link>
      ))}
    </div>
  );
}
