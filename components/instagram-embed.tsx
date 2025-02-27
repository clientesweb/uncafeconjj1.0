"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface InstagramEmbedProps {
  postUrl: string
}

export function InstagramEmbed({ postUrl }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Function to load Instagram embed script
    const loadInstagramEmbed = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process()
        setIsLoading(false)
        return
      }

      const script = document.createElement("script")
      script.src = "https://www.instagram.com/embed.js"
      script.async = true
      script.defer = true

      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process()
          setIsLoading(false)
        }
      }

      script.onerror = () => {
        setHasError(true)
        setIsLoading(false)
      }

      document.body.appendChild(script)
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

    return () => {
      observer.disconnect()
    }
  }, [])

  if (hasError) {
    return (
      <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
        <div className="p-6 text-center">
          <p className="text-white">No se pudo cargar la publicación de Instagram</p>
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e9b11a] hover:underline mt-2 inline-block"
          >
            Ver en Instagram
          </a>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
      <div ref={containerRef} className="instagram-media-wrapper" aria-live="polite">
        {isLoading && (
          <div className="p-4">
            <Skeleton className="w-full h-[500px] bg-[#e9b11a]/10" />
          </div>
        )}
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
            opacity: isLoading ? 0 : 1,
          }}
        >
          <div style={{ padding: "16px" }}>
            <a
              href={postUrl}
              style={{ background: "#1a1a2e", lineHeight: 0, padding: 0, margin: 0, textAlign: "center" }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver publicación de Instagram"
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
      </div>
    </Card>
  )
}

// Add TypeScript interface for window.instgrm
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

