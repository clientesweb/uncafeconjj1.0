"use client"

import { useState, useEffect } from "react"

export function SkipLink() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setIsVisible(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <a
      href="#main-content"
      className={`fixed top-4 left-4 z-50 bg-[#e9b11a] text-[#1a1a2e] px-4 py-2 rounded-md transform transition-transform duration-200 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#e9b11a] focus:ring-offset-2 focus:ring-offset-[#1a1a2e]`}
    >
      Saltar al contenido principal
    </a>
  )
}

