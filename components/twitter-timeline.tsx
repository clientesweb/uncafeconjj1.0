"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TwitterTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Function to load Twitter widget script
    const loadTwitterWidget = () => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load(containerRef.current)
        setIsLoading(false)
        return
      }

      const script = document.createElement("script")
      script.src = "https://platform.twitter.com/widgets.js"
      script.async = true
      script.defer = true

      script.onload = () => {
        if (window.twttr && window.twttr.widgets) {
          window.twttr.widgets.load(containerRef.current)
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
          loadTwitterWidget()
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
          <p className="text-white">No se pudieron cargar los tweets</p>
          <a
            href="https://twitter.com/UnCafeConJJ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e9b11a] hover:underline mt-2 inline-block"
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
          <div className="p-4">
            <Skeleton className="w-full h-[500px] bg-[#e9b11a]/10" />
          </div>
        )}
        <a
          className="twitter-timeline"
          data-theme="dark"
          data-chrome="noheader nofooter transparent"
          data-tweet-limit="5"
          data-height="600"
          data-dnt="true"
          href="https://twitter.com/UnCafeConJJ"
          aria-label="Tweets de Un Café con JJ"
        >
          Tweets by UnCafeConJJ
        </a>
      </div>
    </Card>
  )
}

// Add TypeScript interface for window.twttr
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement | null) => void
      }
    }
  }
}

