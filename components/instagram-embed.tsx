"use client"

import { useEffect, useRef } from "react"

interface InstagramEmbedProps {
  postUrl: string
}

export function InstagramEmbed({ postUrl }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Crear el elemento del embed
    const embed = document.createElement("blockquote")
    embed.className = "instagram-media"
    embed.setAttribute("data-instgrm-permalink", postUrl)
    embed.style.width = "100%"
    embed.style.maxWidth = "540px"
    embed.style.margin = "0 auto"

    // Limpiar el contenedor y agregar el nuevo embed
    if (containerRef.current) {
      containerRef.current.innerHTML = ""
      containerRef.current.appendChild(embed)
    }

    // Cargar el script de Instagram
    const script = document.createElement("script")
    script.src = "https://www.instagram.com/embed.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [postUrl])

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: "540px",
        margin: "0 auto",
        minHeight: "540px",
      }}
    />
  )
}

