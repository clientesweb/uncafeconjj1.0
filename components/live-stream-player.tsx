"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

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
        className="rounded-lg overflow-hidden border border-[#e9b11a]/20 bg-[#1a1a2e] flex flex-col items-center justify-center p-4 sm:p-8 w-full mx-auto"
        style={{ aspectRatio: "16/9", minHeight: "250px" }}
      >
        <h3 className="text-xl font-bold text-white mb-4">Transmisión no disponible</h3>
        <p className="text-gray-400 text-center mb-6">
          La transmisión en vivo no está disponible en este momento. Por favor, intenta más tarde o escúchanos en la
          radio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            className="bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80"
            onClick={() => window.open("https://www.youtube.com/uncafeconjj", "_blank")}
          >
            Ver en YouTube <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="text-white border-[#e9b11a] hover:bg-[#e9b11a]/10"
            onClick={() => window.open("https://www.facebook.com/uncafeconjj", "_blank")}
          >
            Ver en Facebook <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div
        className="rounded-lg overflow-hidden border border-[#e9b11a]/20 bg-[#1a1a2e] w-full mx-auto"
        style={{ aspectRatio: "16/9", minHeight: "250px" }}
      >
        <Skeleton className="w-full h-full bg-[#e9b11a]/10" />
      </div>
    )
  }

  return (
    <div className="rounded-lg overflow-hidden border border-[#e9b11a]/20 w-full mx-auto relative">
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

