"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export function TwitterTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Remover cualquier script previo de Twitter
    const existingScript = document.getElementById("twitter-widget-script")
    if (existingScript) {
      existingScript.remove()
    }

    // Crear el timeline
    const timeline = document.createElement("a")
    timeline.className = "twitter-timeline"
    timeline.setAttribute("data-theme", "dark")
    timeline.setAttribute("data-chrome", "noheader nofooter noscrollbar transparent")
    timeline.setAttribute("data-height", "500")
    timeline.setAttribute("data-tweet-limit", "5")
    timeline.setAttribute("href", "https://twitter.com/UnCafeConJJ")

    // Limpiar y agregar el timeline
    if (containerRef.current) {
      containerRef.current.innerHTML = ""
      containerRef.current.appendChild(timeline)
    }

    // Cargar el script de Twitter de forma controlada
    const script = document.createElement("script")
    script.id = "twitter-widget-script"
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
      <div ref={containerRef} className="w-full max-w-[550px] mx-auto h-[500px] overflow-hidden" />
    </Card>
  )
}

