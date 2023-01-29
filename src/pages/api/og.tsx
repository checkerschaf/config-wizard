/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og"

export const config = {
  runtime: "edge",
}

const appUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 80,
          color: "black",
          background: "#fff",
          width: "100%",
          height: "100%",
          paddingTop: 0,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={`${appUrl}/images/og-logo.png`}
          style={{ marginBottom: "60px" }}
        />
        <img src={`${appUrl}/images/og-hero.png`} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: "fluent",
    }
  )
}
