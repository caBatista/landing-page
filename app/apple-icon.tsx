import { ImageResponse } from "next/og";
import { colors } from "@/lib/colors";
import { monogramImage } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const logo = monogramImage(colors.accent, 80);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: colors.ink,
      }}
    >
      <img src={logo.src} width={logo.width} height={logo.height} alt="" />
    </div>,
    size,
  );
}
