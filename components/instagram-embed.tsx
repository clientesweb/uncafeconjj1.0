"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Script from "next/script"

interface InstagramEmbedProps {
  postId: string
}

export function InstagramEmbed({ postId }: InstagramEmbedProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isScriptError, setIsScriptError] = useState(false)

  useEffect(() => {
    // Reinitialize Instagram embeds when component mounts
    if ((window as any).instgrm) {
      try {
        ;(window as any).instgrm.Embeds.process()
      } catch (error) {
        console.error("Error processing Instagram embeds:", error)
      }
    }

    // Set a timeout to show an error message if Instagram doesn't load
    const timeoutId = setTimeout(() => {
      if (!(window as any).instgrm?.Embeds) {
        setIsScriptError(true)
      }
    }, 10000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="relative min-h-[400px] w-full">
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          setIsScriptLoaded(true)
          // Process embeds after script loads
          try {
            if ((window as any).instgrm?.Embeds) {
              ;(window as any).instgrm.Embeds.process()
            }
          } catch (error) {
            console.error("Error processing Instagram embeds after script load:", error)
            setIsScriptError(true)
          }
        }}
        onError={() => {
          console.error("Error loading Instagram script")
          setIsScriptError(true)
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

          {isScriptError && (
            <div className="absolute inset-0 flex items-center justify-center p-4 bg-[#1a1a2e]/90 z-10">
              <p className="text-center text-red-400">
                No se pudo cargar la publicación de Instagram. Por favor, verifica tu conexión e intenta nuevamente.
              </p>
            </div>
          )}

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
              minHeight: "400px",
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

