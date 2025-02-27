"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Twitter } from "lucide-react"

export function TwitterTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const loadTwitterWidget = () => {
      try {
        // Limpiar cualquier timeline existente
        if (containerRef.current) {
          containerRef.current.innerHTML = ""
        }

        // Crear nuevo elemento de timeline
        const timeline = document.createElement("a")
        timeline.className = "twitter-timeline"
        timeline.setAttribute("data-theme", "dark")
        timeline.setAttribute("data-chrome", "noheader nofooter transparent")
        timeline.setAttribute("data-height", "600")
        timeline.setAttribute("data-tweet-limit", "5")
        timeline.setAttribute("href", "https://twitter.com/UnCafeConJJ")

        if (containerRef.current) {
          containerRef.current.appendChild(timeline)
        }

        // Cargar el script de Twitter
        if (window.twttr) {
          window.twttr.widgets.load(containerRef.current)
          setTimeout(() => setIsLoading(false), 1000)
        } else {
          const script = document.createElement("script")
          script.src = "https://platform.twitter.com/widgets.js"
          script.async = true
          script.onload = () => {
            if (window.twttr) {
              window.twttr.widgets.load(containerRef.current)
              setTimeout(() => setIsLoading(false), 1000)
            }
          }
          document.head.appendChild(script)
        }
      } catch (error) {
        console.error("Error loading Twitter timeline:", error)
        setHasError(true)
        setIsLoading(false)
      }
    }

    // Usar Intersection Observer para lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadTwitterWidget()
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (hasError) {
    return (
      <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
        <div className="p-6 text-center">
          <Twitter className="h-12 w-12 mx-auto mb-4 text-[#e9b11a]" />
          <p className="text-white mb-2">No se pudieron cargar los tweets</p>
          <a
            href="https://twitter.com/UnCafeConJJ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e9b11a] hover:underline inline-block"
          >
            Ver en Twitter
          </a>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
      <div ref={containerRef} className="twitter-timeline-wrapper" aria-live="polite">
        {isLoading && (
          <div className="p-4 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <Skeleton className="h-12 w-12 rounded-full bg-[#e9b11a]/10" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4 bg-[#e9b11a]/10" />
                  <Skeleton className="h-4 w-full bg-[#e9b11a]/10" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement | null) => void
      }
    }
  }
}

