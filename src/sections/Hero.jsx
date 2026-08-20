import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

import { MEDIA } from "../constants/media";

// Controla qué tan "zoomeada" empieza la máscara y a qué tamaño
// se reduce al hacer scroll (así aparecen las letras "CYBERLEEK"
// rellenas con el video de fondo)
const useMaskSettings = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  if (isMobile) {
    return {
      initialMaskPos: "50% -1500vh",
      initialMaskSize: "3100% 3100%",
      maskSize: "55% 55%",
    };
  }

  if (isTablet) {
    return {
      initialMaskPos: "50% -1700vh",
      initialMaskSize: "3500% 3500%",
      maskSize: "35% 35%",
    };
  }

  return {
    initialMaskPos: "50% 22%",
    initialMaskSize: "3500% 3500%",
    maskSize: "22% 22%",
  };
};

const Hero = () => {
  const { initialMaskPos, initialMaskSize, maskSize } = useMaskSettings();

  useGSAP(() => {
    gsap.set(".mask-wrapper", {
      maskPosition: initialMaskPos,
      maskSize: initialMaskSize,
    });

    // Recorrido corto (equivalente a 2-3 scrolls) y con easing suave,
    // sin logo duplicado: solo se anima la máscara una vez y listo.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        scrub: 1,
        end: "+=80%",
        pin: true,
      }
    });

    tl
      .to(".hero-tagline", { opacity: 0, duration: 0.2, ease: "power1.out" })
      .to(".hero-bg-video", { scale: 1, ease: "power2.out" }, "<")
      .to(".mask-wrapper", { maskSize, ease: "power2.out" }, "<");
  });

  return (
    <section className="hero-section">
      <div className="size-full mask-wrapper">
        <video
          src={MEDIA.heroBg}
          autoPlay
          muted
          loop
          playsInline
          className="hero-bg-video"
        />
      </div>

      <div className="hero-tagline">
        <p>Material recuperado &middot; acceso no autorizado</p>
        <span className="hero-scroll-hint">Desliza para ver el contenido ↓</span>
      </div>
    </section>
  );
};

export default Hero;
