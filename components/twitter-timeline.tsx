"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export function TwitterTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadTwitterWidget = () => {
      // Limpiar cualquier timeline existente
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }

      // Crear nuevo elemento de timeline
      const timeline = document.createElement("a")
      timeline.className = "twitter-timeline"
      timeline.setAttribute("data-theme", "dark")
      timeline.setAttribute("data-chrome", "noheader nofooter noscrollbar transparent")
      timeline.setAttribute("data-tweet-limit", "5")
      timeline.setAttribute("href", "https://twitter.com/UnCafeConJJ")

      if (containerRef.current) {
        containerRef.current.appendChild(timeline)
      }

      // Cargar el script de Twitter
      const script = document.createElement("script")
      script.src = "https://platform.twitter.com/widgets.js"
      script.async = true
      document.head.appendChild(script)
    }

    loadTwitterWidget()
  }, [])

  return (
    <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
      <div ref={containerRef} className="w-full max-w-[550px] mx-auto h-[500px] overflow-hidden" />
    </Card>
  )
}

