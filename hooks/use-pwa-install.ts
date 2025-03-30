"use client"

import { useState, useEffect } from "react"

export function usePWAInstall() {
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if the device is iOS
    const checkIsIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    }

    setIsIOS(checkIsIOS())

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const install = async () => {
    if (!installPrompt) return

    const result = await installPrompt.prompt()
    console.log(`Install prompt was: ${result.outcome}`)

    setInstallPrompt(null)
    setIsInstallable(false)
  }

  return { isInstallable, isIOS, install }
}

