import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Elunari Studio - Web Development That Converts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0c0a09 0%, #1c1917 50%, #292524 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #10b981, #059669)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: 900,
            }}
          >
            E
          </div>
          <span
            style={{
              color: "#a8a29e",
              fontSize: "20px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
            }}
          >
            Elunari Studio
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            color: "#fafaf9",
            fontSize: "56px",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.1,
            margin: "0 60px",
            maxWidth: "900px",
          }}
        >
          Web Development
          <br />
          <span style={{ color: "#10b981" }}>That Converts</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: "#a8a29e",
            fontSize: "22px",
            marginTop: "20px",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          Tell us your vision via text, voice, video, or sketch.
        </p>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            color: "#57534e",
            fontSize: "16px",
            letterSpacing: "0.05em",
            display: "flex",
          }}
        >
          studio.elunari.uk
        </div>
      </div>
    ),
    { ...size }
  );
}
