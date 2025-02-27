"use client"

import { Card } from "@/components/ui/card"

export function TwitterTimeline() {
  return (
    <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
      <div className="relative">
        <a
          className="twitter-timeline"
          data-theme="dark"
          data-chrome="noheader nofooter transparent"
          data-height="800"
          data-dnt="true"
          href="https://twitter.com/UnCafeConJJ"
        >
          Tweets by UnCafeConJJ
        </a>
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      </div>
    </Card>
  )
}

