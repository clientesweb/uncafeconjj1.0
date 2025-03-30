"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { X } from "lucide-react"
import { useState } from "react"

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert className="relative border-none bg-[#e9b11a] text-[#1a1a2e] rounded-none py-1">
      <div className="container mx-auto flex items-center">
        <div className="flex-shrink-0 mr-3">
          <div className="relative w-2 h-2 bg-[#1a1a2e] rounded-full">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1a1a2e] opacity-75"></span>
          </div>
        </div>
        <AlertDescription className="flex items-center justify-center text-xs sm:text-sm font-medium">
          Sintonízanos de lunes a viernes de 6:00 a 8:00 a.m. por Kocodrilo Radio 94.5 FM y Café Radio 91.7 MHz
        </AlertDescription>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/30 rounded-full"
      >
        <X className="h-3 w-3" />
        <span className="sr-only">Cerrar</span>
      </button>
    </Alert>
  )
}

