"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface InstagramEmbedProps {
  postUrl: string
}

export function InstagramEmbed({ postUrl }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.instagram.com/embed.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
      <div ref={containerRef} className="instagram-media-wrapper">
        <blockquote
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink={postUrl}
          data-instgrm-version="14"
        >
          <a href={postUrl}>Ver publicación en Instagram</a>
        </blockquote>
      </div>
    </Card>
  )
}

