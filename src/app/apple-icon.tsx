import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0C0B07",
          borderRadius: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        <span style={{ fontSize: "72px", lineHeight: 1 }}>🔥</span>
        <span
          style={{
            fontFamily: "sans-serif",
            fontWeight: 900,
            fontSize: "42px",
            color: "#F0C040",
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          AP
        </span>
      </div>
    ),
    { ...size }
  );
}
