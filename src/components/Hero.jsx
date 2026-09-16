// ============================================================
//  HERO — inspirado en la referencia "Altina"
// ------------------------------------------------------------
//  Barra superior con el isologo de Matero + link de contacto,
//  título con palabra en cursiva, bajada en dos bloques, botón
//  y una foto de producto que sangra en el borde inferior y se
//  desvanece hacia los costados/arriba (con CSS mask, no depende
//  de que la imagen generada traiga el degradé perfecto).
//
//  Falta agregar: public/images/hero/yerba-horizontal.jpg
//  (paquete de yerba acostado — ver el prompt sugerido en el chat)
// ============================================================

import { WHATSAPP_NUMBER } from "../config.js";

export default function Hero() {
  return (
    <section className="hero-v2" aria-label="Presentación">
      <div className="hero-v2-topbar">
        <img
          src="/images/logo/matero-logo-compact.png"
          alt="Matero"
          className="hero-v2-logo"
        />
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-v2-pill"
        >
          Contacto
        </a>
      </div>

      <div className="hero-v2-copy">
        <h1 className="hero-v2-title">
          Hecho para <em>compartir</em>.
        </h1>
        <p className="hero-v2-line">
          Pasión argentina por el mate, en cada detalle.
        </p>
        <p className="hero-v2-sub">
          Mates, bombillas, termos y yerbas elegidas con criterio.
          <br />
          Envíos a todo el país — coordinamos por WhatsApp.
        </p>
        <a href="#stock" className="hero-v2-cta">
          Ver catálogo
          <span className="hero-v2-cta-arrow" aria-hidden="true">→</span>
        </a>
      </div>

      <div className="hero-v2-photo" aria-hidden="true">
        <img src="/images/hero/yerba-horizontal.png" alt="" />
      </div>
    </section>
  );
}
