import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { monogramImage, ogFonts } from "@/lib/og";

export const alt = `${site.name} — ${site.role.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = monogramImage("#F4B400", 100);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: "#111112",
        color: "#F4F2EC",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -120,
          bottom: -160,
          width: 620,
          height: 620,
          borderRadius: "46% 54% 42% 58% / 52% 44% 56% 48%",
          background: "linear-gradient(135deg, #F4B400, #E08A00)",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src={logo.src} width={logo.width} height={logo.height} alt="" />
        <div style={{ fontFamily: "Mono", fontSize: 22, letterSpacing: 2, color: "#8A8A8F" }}>
          CAIOBATISTA.DEV
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: "Display",
            fontWeight: 900,
            fontSize: 180,
            lineHeight: 0.82,
            textTransform: "uppercase",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>{site.firstName}</span>
          <span>{site.lastName}</span>
        </div>
        <div style={{ fontFamily: "Mono", fontSize: 30, marginTop: 36, letterSpacing: 1 }}>
          {`${site.role.en} · ${site.location.en}`.toUpperCase()}
        </div>
      </div>
    </div>,
    { ...size, fonts: await ogFonts() },
  );
}
