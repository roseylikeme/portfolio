import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfaf9",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 30,
              color: "#55555c",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 24,
              // Sized for the current headline. If you shorten it, bump this up.
              fontSize: 64,
              fontWeight: 700,
              color: "#1a1a1c",
              lineHeight: 1.1,
              maxWidth: 940,
            }}
          >
            {profile.headline}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 30,
              color: "#55555c",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            {profile.subhead}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 26, color: "#75757e" }}>
            {profile.availability}
          </div>
          <div
            style={{
              display: "flex",
              height: 12,
              width: "100%",
              borderRadius: 999,
              background:
                "linear-gradient(to right, #0038A8, #FF7F7F 55%, #FBE792)",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
