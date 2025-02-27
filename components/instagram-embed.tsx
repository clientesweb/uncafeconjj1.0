"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface InstagramEmbedProps {
  postId: string
}

export function InstagramEmbed({ postId }: InstagramEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const loadEmbed = () => {
      if (iframeRef.current) {
        iframeRef.current.src = `https://www.instagram.com/p/${postId}/embed/captioned/`
      }
    }

    loadEmbed()
  }, [postId])

  return (
    <Card className="instagram-card bg-[#1a1a2e] border-[#e9b11a]/20 overflow-hidden">
      <div className="instagram-container">
        <iframe ref={iframeRef} className="instagram-iframe" loading="lazy" allowFullScreen />
      </div>
    </Card>
  )
}

