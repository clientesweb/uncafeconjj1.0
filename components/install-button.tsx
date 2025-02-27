"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { usePWAInstall } from "@/hooks/use-pwa-install"

export function InstallButton() {
  const { isInstallable, install } = usePWAInstall()

  if (!isInstallable) return null

  return (
    <Button
      onClick={install}
      variant="outline"
      size="sm"
      className="hidden md:inline-flex text-white border-[#e9b11a] hover:bg-[#e9b11a]/10"
    >
      <Download className="mr-2 h-4 w-4" />
      Instalar App
    </Button>
  )
}

