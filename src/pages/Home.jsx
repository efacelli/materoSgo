import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import InstagramReels from "../components/InstagramReels.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import { products } from "../data/products.js";

const HOME_PREVIEW_COUNT = 8;

export default function Home() {
  const navigate = useNavigate();
  const preview = products.slice(0, HOME_PREVIEW_COUNT);

  return (
    <>
      {/* HERO: la animación principal va en este componente */}
      <Hero />

      <InstagramReels />

      <section className="container section" id="stock">
        <div className="section-head">
          <h2 className="section-title">Stock disponible</h2>
          <p className="section-sub">
            Mostrando {preview.length} de {products.length} productos
          </p>
        </div>

        <ProductGrid products={preview} />

        <div className="ver-mas-wrap">
          <button className="btn-primary" onClick={() => navigate("/stock")}>
            Ver más
          </button>
        </div>
      </section>
    </>
  );
}
