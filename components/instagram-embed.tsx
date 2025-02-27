"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Instagram } from "lucide-react"

interface InstagramEmbedProps {
  postUrl: string
}

export function InstagramEmbed({ postUrl }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isReel, setIsReel] = useState(false)

  useEffect(() => {
    // Check if it's a Reel based on the URL
    setIsReel(postUrl.includes("/reel/"))

    const loadInstagramEmbed = () => {
      try {
        // Remove any existing embeds
        if (containerRef.current?.querySelector(".instagram-media")) {
          containerRef.current.querySelector(".instagram-media")?.remove()
        }

        // Create new embed
        const embed = document.createElement("blockquote")
        embed.className = "instagram-media"
        embed.setAttribute("data-instgrm-permalink", postUrl)
        embed.setAttribute("data-instgrm-version", "14")
        embed.style.background = "#1a1a2e"
        embed.style.border = "1px solid rgba(233, 177, 26, 0.2)"
        embed.style.borderRadius = "8px"
        embed.style.boxShadow = "none"
        embed.style.margin = "0"
        embed.style.padding = "0"
        embed.style.width = "100%"

        if (containerRef.current) {
          containerRef.current.appendChild(embed)
        }

        // Load Instagram embed script
        if (!window.instgrm) {
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
        } else {
          window.instgrm.Embeds.process()
          setTimeout(() => setIsLoading(false), 1000)
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
      { threshold: 0.1, rootMargin: "50px" },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
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
    <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
      <div
        ref={containerRef}
        className={`instagram-media-wrapper ${isReel ? "reel-container" : ""}`}
        aria-live="polite"
      >
        {isLoading && (
          <div className="p-4">
            <Skeleton className={`w-full ${isReel ? "h-[400px]" : "aspect-square"} bg-[#e9b11a]/10`} />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-3/4 bg-[#e9b11a]/10" />
              <Skeleton className="h-4 w-1/2 bg-[#e9b11a]/10" />
            </div>
          </div>
        )}
      </div>
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

