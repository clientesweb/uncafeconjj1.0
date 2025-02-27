"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Instagram } from "lucide-react"

interface InstagramEmbedProps {
  postUrl: string
}

export function InstagramEmbed({ postUrl }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const loadInstagramEmbed = () => {
      try {
        // Create new embed
        const embed = document.createElement("blockquote")
        embed.className = "instagram-media"
        embed.setAttribute("data-instgrm-captioned", "")
        embed.setAttribute("data-instgrm-permalink", postUrl)
        embed.setAttribute("data-instgrm-version", "14")

        if (containerRef.current) {
          containerRef.current.innerHTML = ""
          containerRef.current.appendChild(embed)
        }

        // Load Instagram embed script
        if (window.instgrm) {
          window.instgrm.Embeds.process()
          setTimeout(() => setIsLoading(false), 1000)
        } else {
          const script = document.createElement("script")
          script.src = "https://www.instagram.com/embed.js"
          script.async = true
          script.onload = () => {
            if (window.instgrm) {
              window.instgrm.Embeds.process()
              setTimeout(() => setIsLoading(false), 1000)
            }
          }
          document.head.appendChild(script)
        }
      } catch (error) {
        console.error("Error loading Instagram embed:", error)
        setHasError(true)
        setIsLoading(false)
      }
    }

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadInstagramEmbed()
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [postUrl])

  if (hasError) {
    return (
      <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
        <div className="p-6 text-center">
          <Instagram className="h-12 w-12 mx-auto mb-4 text-[#e9b11a]" />
          <p className="text-white mb-2">No se pudo cargar la publicación</p>
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e9b11a] hover:underline inline-block"
          >
            Ver en Instagram
          </a>
        </div>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div ref={containerRef} className="instagram-media-wrapper" aria-live="polite">
        {isLoading && <div className="aspect-square w-full bg-[#e9b11a]/10 rounded-lg" />}
      </div>
    </div>
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

