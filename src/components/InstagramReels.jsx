// ============================================================
//  SECCIÓN: últimos videos de la concentración matera
// ------------------------------------------------------------
//  Usa el embed oficial de Instagram (blockquote + embed.js).
//  Reemplazá las 2 URLs de REELS por los permalinks reales de
//  los reels/posts (el link completo del reel alcanza, no hace
//  falta pegar el <blockquote> completo que da Instagram).
// ============================================================

import { useEffect } from "react";

const REELS = [
  "https://www.instagram.com/reel/REEMPLAZAR_1/",
  "https://www.instagram.com/reel/REEMPLAZAR_2/",
];

export default function InstagramReels() {
  useEffect(() => {
    const processEmbeds = () => window.instgrm?.Embeds.process();

    const existing = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]'
    );

    if (existing) {
      processEmbeds();
      existing.addEventListener("load", processEmbeds);
      return () => existing.removeEventListener("load", processEmbeds);
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = processEmbeds;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="container section" id="concentracion">
      <div className="section-head">
        <h2 className="section-title">Nuestros últimos videos</h2>
        <p className="section-sub">Así se vivió el último encuentro</p>
      </div>

      <div className="reels-grid">
        {REELS.map((url) => (
          <blockquote
            key={url}
            className="instagram-media"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: 0,
              borderRadius: "12px",
              margin: "0 auto",
              maxWidth: "540px",
              width: "100%",
            }}
          />
        ))}
      </div>
    </section>
  );
}
