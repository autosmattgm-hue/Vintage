import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Paris Fashion Vintage luxury boutique";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #070707, #2b2015)",
          color: "#f6f0e6",
          padding: 72,
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div style={{ letterSpacing: 8, color: "#d7b46c", fontSize: 26 }}>PARIS FASHION VINTAGE</div>
          <div style={{ marginTop: 36, fontSize: 94, lineHeight: 0.9 }}>Curated Vintage Luxury</div>
          <div style={{ marginTop: 32, fontSize: 28, color: "rgba(246,240,230,.72)" }}>
            Designer bags, jewelry, shoes, Saint Laurent pieces
          </div>
        </div>
        <div
          style={{
            width: 260,
            height: 420,
            border: "1px solid rgba(215,180,108,.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 110,
            color: "#d7b46c"
          }}
        >
          PFV
        </div>
      </div>
    ),
    size
  );
}
