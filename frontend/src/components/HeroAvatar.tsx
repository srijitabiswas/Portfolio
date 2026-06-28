import { useState } from "react";

export default function HeroAvatar() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="ha-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="ha-container">
        <img
          src="/images/avatar.png"
          alt="Srijita Biswas"
          className={`ha-img${hovered ? " ha-img-hov" : ""}`}
          draggable={false}
        />
      </div>

      <style>{`
        .ha-wrap {
          width: 100%;
          max-width: 760px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .ha-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }

        .ha-img {
width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center top;
  transform: translateY(-10px) scale(1.2);
  transform-origin: center top;
}

          animation: haFloat 4.5s ease-in-out infinite;
          transition:
            transform 0.35s ease,
            filter 0.35s ease;

          filter: drop-shadow(0 20px 60px rgba(139, 92, 246, 0.16));
        }

        .ha-img-hov {
          transform: translateY(-2px) rotate(-1deg);
          filter: drop-shadow(0 26px 72px rgba(139, 92, 246, 0.22));
        }

        @keyframes haFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @media (max-width: 900px) {
          .ha-wrap {
            max-width: 400px;
          }
        }

        @media (max-width: 480px) {
          .ha-wrap {
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
}