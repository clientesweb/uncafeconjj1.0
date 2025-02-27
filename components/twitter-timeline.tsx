"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Script from "next/script"

export function TwitterTimeline() {
  useEffect(() => {
    // Reinitialize Twitter widgets when component mounts
    if ((window as any).twttr) {
      ;(window as any).twttr.widgets.load()
    }
  }, [])

  return (
    <div className="relative min-h-[600px] w-full">
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onLoad={() => {
          // Reload widgets after script loads
          ;(window as any).twttr.widgets.load()
        }}
      />
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
          <a
            className="twitter-timeline"
            data-theme="dark"
            data-chrome="noheader nofooter noborders transparent"
            data-height="600"
            href="https://twitter.com/uncafeconjj"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tweets by UnCafeConJJ
          </a>
        </div>
      </Card>
    </div>
  )
}

