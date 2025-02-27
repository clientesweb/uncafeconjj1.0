"use client"

import { useEffect, useRef } from "react"

export function TwitterTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Crear el elemento del timeline
    const timeline = document.createElement("a")
    timeline.className = "twitter-timeline"
    timeline.setAttribute("data-theme", "dark")
    timeline.setAttribute("data-tweet-limit", "5")
    timeline.setAttribute("href", "https://twitter.com/UnCafeConJJ")

    // Limpiar el contenedor y agregar el nuevo timeline
    if (containerRef.current) {
      containerRef.current.innerHTML = ""
      containerRef.current.appendChild(timeline)
    }

    // Cargar el script de Twitter
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: "550px",
        margin: "0 auto",
        minHeight: "600px",
      }}
    />
  )
}

