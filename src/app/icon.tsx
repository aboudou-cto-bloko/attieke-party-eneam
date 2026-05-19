import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0C0B07",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* "AP" lettres en or avec point feu */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0px",
          }}
        >
          <span
            style={{
              fontFamily: "sans-serif",
              fontWeight: 900,
              fontSize: "15px",
              color: "#F0C040",
              letterSpacing: "-1px",
              lineHeight: 1,
            }}
          >
            AP
          </span>
          <span style={{ fontSize: "10px", lineHeight: 1, marginLeft: "1px" }}>
            🔥
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
