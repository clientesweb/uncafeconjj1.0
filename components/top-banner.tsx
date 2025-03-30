"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { X } from "lucide-react"
import { useState } from "react"

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert className="relative border-none bg-[#e9b11a] text-[#1a1a2e] rounded-none">
      <div className="flex items-center py-2">
        <div className="flex-shrink-0 mr-3">
          <div className="w-3 h-3 bg-[#1a1a2e] rounded-full"></div>
        </div>
        <AlertDescription className="flex items-center justify-center py-1 text-center text-sm sm:text-base font-medium">
          Sintonízanos de lunes a viernes de 6:00 a 8:00 a.m. por Kocodrilo Radio 94.5 FM y Café Radio 91.7 MHz
        </AlertDescription>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/30 rounded-full"
      >
        <X className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="sr-only">Cerrar</span>
      </button>
    </Alert>
  )
}

