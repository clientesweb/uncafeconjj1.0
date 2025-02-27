"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface InstagramEmbedProps {
  postUrl: string
}

export function InstagramEmbed({ postUrl }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadInstagramEmbed = () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }

      const embed = document.createElement("blockquote")
      embed.className = "instagram-media"
      embed.setAttribute("data-instgrm-permalink", postUrl)
      embed.setAttribute("data-instgrm-version", "14")

      if (containerRef.current) {
        containerRef.current.appendChild(embed)
      }

      if (window.instgrm) {
        window.instgrm.Embeds.process()
      } else {
        const script = document.createElement("script")
        script.src = "https://www.instagram.com/embed.js"
        script.async = true
        document.head.appendChild(script)
      }
    }

    loadInstagramEmbed()
  }, [postUrl])

  return (
    <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20 w-full max-w-[540px]">
      <div ref={containerRef} className="instagram-embed-container" />
    </Card>
  )
}

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

