import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container section">
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">🧉</span>
        <h1 className="section-title">404 — Página no encontrada</h1>
        <p>La ruta que buscás no existe o fue movida.</p>
        <Link to="/" className="btn-primary">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
