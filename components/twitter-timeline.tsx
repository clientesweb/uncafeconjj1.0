"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export function TwitterTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
      <div ref={containerRef} className="twitter-timeline-wrapper">
        <a
          className="twitter-timeline"
          data-theme="dark"
          data-chrome="noheader nofooter transparent"
          data-tweet-limit="5"
          data-height="500"
          href="https://twitter.com/UnCafeConJJ"
        >
          Tweets by UnCafeConJJ
        </a>
      </div>
    </Card>
  )
}

