import { ImageResponse } from "next/og";
import { site } from "@/lib/site.config";

/**
 * The card shown when the link is pasted into Facebook, Instagram, WhatsApp,
 * iMessage or a Google Business post. It carries the same three proofs the
 * hero leads with, because a shared link is often the first impression the
 * paid traffic gets.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.legalName}: interior and exterior painting in Greater Boston`;

export default function OpengraphImage() {
  const proofs = [
    `${site.yearsExperience} years experience`,
    site.credentials.licensed ? "Licensed & fully insured" : "Fully insured",
    `${site.responseHours}-hour estimate`,
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1C3D25",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              height: 68,
              background: "#3A7B4B",
              color: "#FFFFFF",
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              borderRadius: 18,
            }}
          >
            WC
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              color: "#BED4C3",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {site.address.city}, {site.address.state}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Quality painting
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 800,
              color: "#61A047",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            for Greater Boston
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {proofs.map((proof) => (
            <div
              key={proof}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 26,
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: "#61A047",
                }}
              />
              {proof}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
