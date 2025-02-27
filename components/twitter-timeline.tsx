"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TwitterTimeline() {
  const twitterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Remove any existing script
    const existingScript = document.getElementById("twitter-widget-script")
    if (existingScript) {
      existingScript.remove()
    }

    // Create a new script element
    const script = document.createElement("script")
    script.id = "twitter-widget-script"
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    script.charset = "utf-8"
    document.body.appendChild(script)

    // Wait for the script to load and then create the timeline
    script.onload = () => {
      if (window.twttr && twitterRef.current) {
        window.twttr.widgets.createTimeline(
          {
            sourceType: "profile",
            screenName: "uncafeconjj",
          },
          twitterRef.current,
          {
            height: 600,
            chrome: "noheader, nofooter, noborders, transparent",
            theme: "dark",
            dnt: true,
            tweetLimit: 5,
          },
        )
      }
    }

    return () => {
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return (
    <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
      <div className="relative min-h-[600px]">
        {/* Skeleton loader */}
        <div className="absolute inset-0 flex flex-col gap-4 p-4 animate-pulse">
          <Skeleton className="h-12 w-full bg-[#e9b11a]/10" />
          <Skeleton className="h-20 w-full bg-[#e9b11a]/10" />
          <Skeleton className="h-20 w-full bg-[#e9b11a]/10" />
          <Skeleton className="h-20 w-full bg-[#e9b11a]/10" />
        </div>

        {/* Twitter Timeline */}
        <div ref={twitterRef} className="min-h-[600px]" />
      </div>
    </Card>
  )
}

