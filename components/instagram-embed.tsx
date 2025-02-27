"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Script from "next/script"

interface InstagramEmbedProps {
  postId: string
}

export function InstagramEmbed({ postId }: InstagramEmbedProps) {
  useEffect(() => {
    // Reinitialize Instagram embeds when component mounts
    if ((window as any).instgrm) {
      ;(window as any).instgrm.Embeds.process()
    }
  }, [])

  return (
    <div className="relative min-h-[400px] w-full">
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          // Process embeds after script loads
          ;(window as any).instgrm.Embeds.process()
        }}
      />
      <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
        <div className="relative">
          {/* Skeleton loader */}
          <div className="absolute inset-0 flex flex-col gap-4 p-4 animate-pulse">
            <Skeleton className="h-12 w-full bg-[#e9b11a]/10" />
            <Skeleton className="aspect-square w-full bg-[#e9b11a]/10" />
            <Skeleton className="h-16 w-full bg-[#e9b11a]/10" />
          </div>
          {/* Instagram Post */}
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={`https://www.instagram.com/p/${postId}/`}
            data-instgrm-version="14"
            style={{
              background: "#1a1a2e",
              border: "1px solid rgba(233, 177, 26, 0.2)",
              borderRadius: "8px",
              boxShadow: "none",
              margin: "0",
              minWidth: "326px",
              padding: "0",
            }}
            onClick={() => window.open(`https://www.instagram.com/p/${postId}/`, "_blank")}
            role="link"
            aria-label="Ver publicación en Instagram"
          />
        </div>
      </Card>
    </div>
  )
}

