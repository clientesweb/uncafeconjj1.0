"use client"

import { Card } from "@/components/ui/card"

interface InstagramEmbedProps {
  postUrl: string
}

export function InstagramEmbed({ postUrl }: InstagramEmbedProps) {
  return (
    <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
      <div className="instagram-media-wrapper" style={{ maxWidth: "540px", margin: "0 auto" }}>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={postUrl}
          data-instgrm-version="14"
          style={{
            background: "#1a1a2e",
            border: "1px solid rgba(233, 177, 26, 0.2)",
            borderRadius: "8px",
            boxShadow: "none",
            margin: "0",
            padding: "0",
            width: "100%",
          }}
        >
          <div style={{ padding: "16px" }}>
            <a
              href={postUrl}
              style={{ background: "#1a1a2e", lineHeight: 0, padding: 0, margin: 0, textAlign: "center" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ backgroundColor: "#1a1a2e", borderRadius: "50%", height: "40px", width: "40px" }}></div>
                <div style={{ marginLeft: "8px", flex: 1 }}>
                  <div style={{ backgroundColor: "#1a1a2e", height: "20px", width: "100%" }}></div>
                </div>
              </div>
            </a>
          </div>
        </blockquote>
        <script async src="//www.instagram.com/embed.js"></script>
      </div>
    </Card>
  )
}

