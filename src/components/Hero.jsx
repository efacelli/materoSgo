// ============================================================
//  HERO — ANIMACIÓN PRINCIPAL
// ------------------------------------------------------------
//  Escena: termo, paquete de yerba y mate se asientan sobre la
//  mesa, agrupados y superpuestos (no apilados uno arriba del
//  otro). La animación queda "pineada" y atada al scroll, igual
//  que en Stacked: a medida que el usuario desliza, la escena
//  se arma; cuando termina, la página sigue su curso normal.
//  Cuando el paquete de yerba termina de asentarse, levanta una
//  breve nube de polvo característico de la yerba.
//
//  Assets esperados (agregalos en public/images/hero/):
//    - termo.png   (fondo transparente)
//    - yerba.png   (paquete de yerba Baldo 1kg, fondo transparente)
//    - mate.png    (mate con bombilla, fondo transparente)
// ============================================================

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_COUNT = 12;
const particles = Array.from({ length: PARTICLE_COUNT });

export default function Hero() {
  const heroRef = useRef(null);
  const sceneRef = useRef(null);
  const termoRef = useRef(null);
  const yerbaRef = useRef(null);
  const mateRef = useRef(null);
  const particleRefs = useRef([]);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set([termoRef.current, yerbaRef.current, mateRef.current], {
        opacity: 0,
      });
      gsap.set(particleRefs.current, { opacity: 0, scale: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // El termo llega desde atrás-izquierda y se asienta
      tl.fromTo(
        termoRef.current,
        { x: -110, y: -30, opacity: 0, rotate: -10, scale: 0.9 },
        { x: 0, y: 0, opacity: 1, rotate: 0, scale: 1, duration: 0.9 }
      )
        // El mate llega desde adelante-derecha
        .fromTo(
          mateRef.current,
          { x: 130, y: 50, opacity: 0, rotate: 8, scale: 0.85 },
          { x: 0, y: 0, opacity: 1, rotate: 0, scale: 1, duration: 0.8 },
          "-=0.55"
        )
        // Rebote corto de asentamiento para ambos
        .to([termoRef.current, mateRef.current], {
          y: "+=5",
          duration: 0.16,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        })
        // El paquete de yerba cae desde arriba y aterriza al centro
        .fromTo(
          yerbaRef.current,
          { y: -150, opacity: 0, rotate: -14, scale: 0.85 },
          { y: 0, opacity: 1, rotate: 0, scale: 1, duration: 0.5, ease: "power2.in" },
          "+=0.05"
        )
        // Rebote de aterrizaje del paquete
        .to(yerbaRef.current, {
          y: "+=7",
          duration: 0.14,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        })
        // Recién ahí: nube de polvo de yerba en la base del paquete
        .to(
          particleRefs.current,
          {
            opacity: 0.85,
            scale: 1,
            x: () => gsap.utils.random(-26, 26),
            y: () => gsap.utils.random(-22, -4),
            rotate: () => gsap.utils.random(-90, 90),
            duration: 0.35,
            ease: "power2.out",
            stagger: 0.012,
          },
          "-=0.02"
        )
        // El polvo se dispersa hacia arriba y se desvanece
        .to(particleRefs.current, {
          opacity: 0,
          y: "-=18",
          duration: 0.55,
          stagger: 0.01,
        });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" aria-label="Presentación" ref={heroRef}>
      <div className="container hero-inner">
        <span className="hero-eyebrow">Tienda matera · Santiago del Estero</span>
        <h1 className="hero-title">Matero</h1>
        <p className="hero-sub">
          𝑷𝒂𝒔𝒊ó𝒏 𝒑𝒐𝒓 𝒆𝒍 𝒎𝒂𝒕𝒆. 𝑪𝒂𝒍𝒊𝒅𝒂𝒅 𝒆𝒏 𝒄𝒂𝒅𝒂 𝒅𝒆𝒕𝒂𝒍𝒍𝒆.
        </p>

        <div className="hero-scene" ref={sceneRef}>
          <img
            ref={termoRef}
            src="/images/hero/termo.png"
            alt="Termo matero"
            className="hero-item hero-item--termo"
          />
          <img
            ref={yerbaRef}
            src="/images/hero/yerba.png"
            alt="Paquete de yerba mate Baldo 1kg"
            className="hero-item hero-item--yerba"
          />
          <img
            ref={mateRef}
            src="/images/hero/mate.png"
            alt="Mate con bombilla"
            className="hero-item hero-item--mate"
          />
          <div className="hero-particles" aria-hidden="true">
            {particles.map((_, i) => (
              <span
                key={i}
                ref={(el) => (particleRefs.current[i] = el)}
                className="hero-particle"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
