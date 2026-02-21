"use client"

import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play } from "lucide-react"

interface LiveStreamPlayerProps {
  streamUrl?: string
}

export function LiveStreamPlayer({
  streamUrl = "https://player.castr.com/live_e107bf80faa311f0b44e934a5cbacff6",
}: LiveStreamPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (!streamUrl) {
    return (
      <div
        className="rounded-xl overflow-hidden border border-[#e9b11a]/20 bg-[#1a1a2e] flex flex-col items-center justify-center p-8 w-full"
        style={{ aspectRatio: "16/9", minHeight: "250px" }}
      >
        <h3 className="text-xl font-bold text-white mb-4">
          Transmisión no disponible
        </h3>

        <div className="flex gap-4">
          <Button
            className="bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80 rounded-full"
            onClick={() =>
              window.open("https://www.youtube.com/uncafeconjj", "_blank")
            }
          >
            <Play className="mr-2 h-4 w-4" />
            Ver en YouTube
          </Button>

          <Button
            variant="outline"
            className="text-white border-[#e9b11a] hover:bg-[#e9b11a]/10 rounded-full"
            onClick={() =>
              window.open("https://www.facebook.com/uncafeconjj", "_blank")
            }
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver en Facebook
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl overflow-hidden border border-[#e9b11a]/20 w-full relative shadow-lg shadow-black/20">
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        {isLoading && (
          <Skeleton className="absolute inset-0 z-10 bg-[#1a1a2e]">
            <div className="h-full w-full flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="rounded-full bg-[#e9b11a]/20 p-4">
                  <Play className="h-8 w-8 text-[#e9b11a]/40" />
                </div>
              </div>
            </div>
          </Skeleton>
        )}

        <iframe
          src={streamUrl}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          scrolling="no"
          allow="autoplay; fullscreen"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true)
            setIsLoading(false)
          }}
          title="Transmisión en vivo"
        />
      </div>
    </div>
  )
}
