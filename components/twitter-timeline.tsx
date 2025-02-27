"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Script from "next/script"

export function TwitterTimeline() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isScriptError, setIsScriptError] = useState(false)

  useEffect(() => {
    if ((window as any).twttr) {
      try {
        ;(window as any).twttr.widgets.load()
      } catch (error) {
        console.error("Error loading Twitter widgets:", error)
      }
    }

    const timeoutId = setTimeout(() => {
      if (!(window as any).twttr?.widgets) {
        setIsScriptError(true)
      }
    }, 10000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="relative w-full">
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onLoad={() => {
          setIsScriptLoaded(true)
          try {
            if ((window as any).twttr?.widgets) {
              ;(window as any).twttr.widgets.load()
            }
          } catch (error) {
            console.error("Error loading Twitter widgets after script load:", error)
            setIsScriptError(true)
          }
        }}
        onError={() => {
          console.error("Error loading Twitter script")
          setIsScriptError(true)
        }}
      />
      <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
        <div className="relative min-h-[600px]">
          {/* Skeleton loader */}
          <div className="absolute inset-0 flex flex-col gap-4 p-4 animate-pulse">
            <Skeleton className="h-12 w-full bg-[#e9b11a]/10" />
            <Skeleton className="h-20 w-full bg-[#e9b11a]/10" />
            <Skeleton className="h-20 w-full bg-[#e9b11a]/10" />
            <Skeleton className="h-20 w-full bg-[#e9b11a]/10" />
          </div>

          {isScriptError && (
            <div className="absolute inset-0 flex items-center justify-center p-4 bg-[#1a1a2e]/90 z-10">
              <p className="text-center text-red-400">
                No se pudo cargar el timeline de Twitter. Por favor, verifica tu conexión e intenta nuevamente.
              </p>
            </div>
          )}

          {/* Twitter Timeline */}
          <a
            className="twitter-timeline"
            data-theme="dark"
            data-chrome="noheader nofooter noborders transparent"
            data-height="600"
            data-width="100%"
            href="https://twitter.com/uncafeconjj"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tweets by UnCafeConJJ
          </a>
        </div>
      </Card>
    </div>
  )
}

