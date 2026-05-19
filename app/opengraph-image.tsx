import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Ntuthuko Smith — Software Engineer Portfolio";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(120, 113, 108, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(120, 113, 108, 0.08) 0%, transparent 40%)",
          padding: "80px"
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Name */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 400,
              color: "#e7e5e4",
              letterSpacing: "-0.02em",
              fontFamily: "Georgia, serif"
            }}
          >
            Ntuthuko Smith
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: "28px",
              color: "#a8a29e",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "monospace"
            }}
          >
            Software Engineer
          </div>

          {/* Divider */}
          <div
            style={{
              width: "80px",
              height: "2px",
              backgroundColor: "#d97706",
              marginTop: "24px",
              marginBottom: "24px"
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: "22px",
              color: "#78716c",
              maxWidth: "800px",
              lineHeight: 1.5
            }}
          >
            Building technically sound and meaningfully crafted digital products.
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "80px",
            fontSize: "16px",
            color: "#57534e",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "monospace"
          }}
        >
          ntuthukosmith.com
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
