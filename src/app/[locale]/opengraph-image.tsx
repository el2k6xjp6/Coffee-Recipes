import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Coffee Brew Timer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { locale: string };
}) {
  const isZh = params.locale === "zh-TW";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 400,
            background:
              "radial-gradient(ellipse at center top, rgba(245,158,11,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Coffee cup icon */}
        <div style={{ fontSize: 80, marginBottom: 24 }}>☕</div>
        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginBottom: 16,
          }}
        >
          Coffee Brew Timer
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#71717a",
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          {isZh ? "開源手沖咖啡計時器與食譜" : "Your open-source brewing companion"}
        </div>
      </div>
    ),
    { ...size },
  );
}
