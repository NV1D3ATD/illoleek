import { useEffect, useState } from "react";
import { MEDIA } from "../constants/media";

const Portal = () => {
  // { type: "video" | "image", src, title } | null
  const [activeMedia, setActiveMedia] = useState(null);

  // Cierra el modal con la tecla Escape
  useEffect(() => {
    if (!activeMedia) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveMedia(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeMedia]);

  return (
    <section className="portal">
      <div className="portal-header">
        <h2 className="gradient-title">Material Filtrado</h2>
        <p className="portal-subtitle">Videos e imágenes recuperados del servidor</p>
      </div>

      <div className="portal-grid">
        {MEDIA.videos.map((item, i) => (
          <button
            type="button"
            className="portal-card portal-card-video"
            key={`video-${i}`}
            onClick={() => setActiveMedia({ type: "video", ...item })}
          >
            <video src={item.src} muted playsInline preload="metadata" />
            <span className="portal-play-icon">▶</span>
            <p>{item.title}</p>
          </button>
        ))}

        {MEDIA.images.map((item, i) => (
          <button
            type="button"
            className="portal-card portal-card-image"
            key={`image-${i}`}
            onClick={() => setActiveMedia({ type: "image", ...item })}
          >
            <img src={item.src} alt={item.title} loading="lazy" />
            <span className="portal-play-icon portal-zoom-icon">⤢</span>
            <p>{item.title}</p>
          </button>
        ))}
      </div>

      {activeMedia && (
        <div className="video-modal-backdrop" onClick={() => setActiveMedia(null)}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setActiveMedia(null)}
              aria-label="Cerrar"
            >
              ✕
            </button>

            {activeMedia.type === "video" ? (
              <video
                src={activeMedia.src}
                controls
                autoPlay
                playsInline
                className="video-modal-player"
              />
            ) : (
              <img
                src={activeMedia.src}
                alt={activeMedia.title}
                className="video-modal-player"
              />
            )}

            <p className="video-modal-title">{activeMedia.title}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portal;
