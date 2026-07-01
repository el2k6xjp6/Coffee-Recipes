import { ImageResponse } from "next/og";
import { recipes } from "@/data/recipes";

export const alt = "Coffee Recipe";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const recipe = recipes.find((r) => r.id === params.id);
  const isZh = params.locale === "zh-TW";

  const title = recipe
    ? isZh
      ? `${recipe.method} 手沖食譜`
      : `${recipe.method} Recipe`
    : "Coffee Recipe";

  const meta = recipe
    ? `${recipe.defaultCoffee}g · 1:${recipe.ratio} · ${recipe.temp}°C`
    : "";

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
              "radial-gradient(ellipse at center top, rgba(245,158,11,0.2) 0%, transparent 70%)",
          }}
        />
        {/* Badge */}
        <div
          style={{
            fontSize: 18,
            color: "#f59e0b",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Coffee Brew Timer
        </div>
        {/* Recipe title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginBottom: 20,
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          {title}
        </div>
        {/* Recipe meta */}
        {meta ? (
          <div
            style={{
              fontSize: 24,
              color: "#71717a",
              letterSpacing: "2px",
            }}
          >
            {meta}
          </div>
        ) : null}
      </div>
    ),
    { ...size },
  );
}
