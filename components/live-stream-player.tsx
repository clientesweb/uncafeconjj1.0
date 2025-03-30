"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play } from "lucide-react"

interface LiveStreamPlayerProps {
  streamUrl: string
}

export function LiveStreamPlayer({ streamUrl }: LiveStreamPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setHasError(!streamUrl)
    }, 2000)

    return () => clearTimeout(timer)
  }, [streamUrl])

  if (hasError) {
    return (
      <div
        className="rounded-xl overflow-hidden border border-[#e9b11a]/20 bg-gradient-to-br from-[#1a1a2e] to-[#1a1a2e]/70 flex flex-col items-center justify-center p-8 sm:p-12 w-full mx-auto shadow-lg shadow-black/20"
        style={{ aspectRatio: "16/9", minHeight: "250px" }}
      >
        <h3 className="text-xl font-bold text-white mb-4">Transmisión no disponible</h3>
        <p className="text-gray-400 text-center mb-8 max-w-md">
          La transmisión en vivo no está disponible en este momento. Por favor, intenta más tarde o escúchanos en la
          radio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            className="bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80 rounded-full"
            onClick={() => window.open("https://www.youtube.com/uncafeconjj", "_blank")}
          >
            <Play className="mr-2 h-4 w-4" />
            Ver en YouTube
          </Button>
          <Button
            variant="outline"
            className="text-white border-[#e9b11a] hover:bg-[#e9b11a]/10 rounded-full"
            onClick={() => window.open("https://www.facebook.com/uncafeconjj", "_blank")}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver en Facebook
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div
        className="rounded-xl overflow-hidden border border-[#e9b11a]/20 bg-[#1a1a2e] w-full mx-auto shadow-lg shadow-black/20"
        style={{ aspectRatio: "16/9", minHeight: "250px" }}
      >
        <Skeleton className="w-full h-full bg-[#e9b11a]/5">
          <div className="h-full w-full flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-[#e9b11a]/20 p-4">
                <Play className="h-8 w-8 text-[#e9b11a]/40" />
              </div>
              <div className="mt-4 h-2 w-24 bg-[#e9b11a]/20 rounded"></div>
            </div>
          </div>
        </Skeleton>
      </div>
    )
  }

  return (
    <div className="rounded-xl overflow-hidden border border-[#e9b11a]/20 w-full mx-auto relative shadow-lg shadow-black/20">
      <div className="w-full" style={{ aspectRatio: "16/9" }}>
        <iframe
          src={streamUrl}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          scrolling="no"
          allow="autoplay"
          allowFullScreen
          title="Transmisión en vivo de Un Café con JJ"
          aria-label="Reproductor de video en vivo"
        ></iframe>
      </div>
    </div>
  )
}

