"use client"

import { useEffect } from "react"

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then(
            (registration) => {
              console.log("ServiceWorker registration successful with scope:", registration.scope)
            },
            (err) => {
              console.error("ServiceWorker registration failed: ", err)
            },
          )
          .catch((error) => {
            console.error("Error during service worker registration:", error)
          })
      })
    }
  }, [])

  return null
}

