import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/products.js";
import { STORE_NAME, WHATSAPP_NUMBER } from "../config.js";

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand-col">
          <span className="footer-brand">{STORE_NAME}</span>
          <p className="footer-tagline">
            Mates, bombillas, termos y yerbas seleccionados con criterio.
            Envíos a todo el país.
          </p>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Tienda</span>
          <Link to="/stock" className="footer-link">
            Todo el catálogo
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/stock?category=${c.slug}`}
              className="footer-link"
            >
              {c.label}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Ayuda</span>
          <p className="footer-text">Envíos a todo el país.</p>
          <p className="footer-text">
            Coordinamos el pedido y el envío por WhatsApp, sin pagos online.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link footer-link-strong"
          >
            Escribinos por WhatsApp
          </a>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Seguinos</span>
          <a
            href="https://www.instagram.com/matero.sgo"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link footer-link-strong"
          >
            Instagram @matero.sgo
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link footer-link-strong"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="footer-copy">© EFACELLI — Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
