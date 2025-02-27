"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export function TwitterTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scriptId = "twitter-widget-script"
    const timelineHref = "https://twitter.com/UnCafeConJJ"

    // Remover script previo para evitar recargas innecesarias
    const existingScript = document.getElementById(scriptId)
    if (existingScript) {
      existingScript.remove()
    }

    // Crear el elemento del timeline
    if (containerRef.current) {
      containerRef.current.innerHTML = ""

      const timeline = document.createElement("a")
      timeline.className = "twitter-timeline"
      timeline.setAttribute("data-theme", "dark")
      timeline.setAttribute("data-chrome", "noheader nofooter noscrollbar transparent")
      timeline.setAttribute("data-height", "500")
      timeline.setAttribute("data-tweet-limit", "5")
      timeline.setAttribute("data-link-color", "#e9b11a")
      timeline.setAttribute("data-border-color", "#e9b11a20")
      timeline.setAttribute("href", timelineHref)

      containerRef.current.appendChild(timeline)
    }

    // Cargar el script solo si no existe
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.id = scriptId
      script.src = "https://platform.twitter.com/widgets.js"
      script.async = true
      document.body.appendChild(script)
    }

    return () => {
      const script = document.getElementById(scriptId)
      if (script) {
        script.remove()
      }
    }
  }, [])

  return (
    <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
      <div ref={containerRef} className="w-full max-w-[550px] mx-auto h-[500px] overflow-hidden twitter-dark-theme" />
    </Card>
  )
}