"use client";

const platforms = [
  {
    name: "GitHub",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: "Lovable",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
  },
  {
    name: "Replit",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5a7.5 7.5 0 110 15 7.5 7.5 0 010-15z"/>
      </svg>
    ),
  },
  {
    name: "Vercel",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M24 22.525H0l12-21.05 12 21.05z"/>
      </svg>
    ),
  },
  {
    name: "Supabase",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M21.36 9.44c-.09-.34-.32-.61-.62-.76l-8.05-4.05a1.07 1.07 0 00-.96 0L3.68 8.68c-.3.15-.53.42-.62.76-.09.34-.03.7.17.99l6.14 9.04c.25.37.66.59 1.1.59h3.06c.44 0 .85-.22 1.1-.59l6.14-9.04c.2-.29.26-.65.17-.99zM12 4.93l6.08 3.06-2.5 3.68-1.5-2.93a1.07 1.07 0 00-.96-.6h-2.24l-1.5 2.93-2.5-3.68L12 4.93z"/>
      </svg>
    ),
  },
  {
    name: "Cursor",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    name: "Bolt.new",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    name: "Claude",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  {
    name: "Railway",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M12 2c-4 0-8 .5-8 4v9.5A3.5 3.5 0 007.5 19L6 20.5v.5h2.2l1.4-1.5h4.8l1.4 1.5H18v-.5L16.5 19a3.5 3.5 0 003.5-3.5V6c0-3.5-4-4-8-4zM7.5 17A1.5 1.5 0 116 15.5 1.5 1.5 0 017.5 17zm9 0a1.5 1.5 0 10-1.5-1.5 1.5 1.5 0 001.5 1.5zm1.5-7H6V6h12z"/>
      </svg>
    ),
  },
  {
    name: "PlanetScale",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.22.22-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.1A2.99 2.99 0 0015 15h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V6h2c1.1 0 2-.9 2-2v-.41C17.92 4.77 20 8.14 20 12c0 2.24-.73 4.31-1.97 5.97l-.13-.14z"/>
      </svg>
    ),
  },
];

// Duplicate for seamless loop
const items = [...platforms, ...platforms];

export function LogoStrip() {
  return (
    <section
      style={{
        position: "relative",
        height: 64,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backgroundColor: "#080808",
        overflow: "hidden",
      }}
    >
      {/* Main container */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          height: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 60,
        }}
      >
        {/* Fixed label */}
        <div
          style={{
            width: 280,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 24,
            paddingLeft: 24,
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 10,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Feito para quem constrói com:
          </span>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: 1,
            height: 40,
            backgroundColor: "rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}
        />

        {/* Marquee container */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Marquee track */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "max-content",
              animation: "marquee 30s linear infinite",
            }}
          >
            {items.map((platform, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  paddingLeft: 40,
                  paddingRight: 40,
                  opacity: 0.35,
                  filter: "grayscale(1) brightness(2)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.85";
                  e.currentTarget.style.filter = "grayscale(0) brightness(1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.35";
                  e.currentTarget.style.filter = "grayscale(1) brightness(2)";
                }}
              >
                {platform.logo}
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "white",
                  }}
                >
                  {platform.name}
                </span>
              </div>
            ))}
          </div>

          {/* Left fade overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: 48,
              background: "linear-gradient(to right, #080808, transparent)",
              pointerEvents: "none",
              zIndex: 5,
            }}
          />
          {/* Right fade overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: 80,
              background: "linear-gradient(to left, #080808, transparent)",
              pointerEvents: "none",
              zIndex: 5,
            }}
          />
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
