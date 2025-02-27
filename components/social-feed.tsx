"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Instagram, Twitter } from "lucide-react"

export function SocialFeed() {
  const twitterRef = useRef<HTMLDivElement>(null)
  const instagramRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Cargar Twitter Widget
    const twitterScript = document.createElement("script")
    twitterScript.src = "https://platform.twitter.com/widgets.js"
    twitterScript.async = true
    document.head.appendChild(twitterScript)

    // Cargar Instagram Embed
    const instagramScript = document.createElement("script")
    instagramScript.src = "https://www.instagram.com/embed.js"
    instagramScript.async = true
    document.head.appendChild(instagramScript)

    return () => {
      document.head.removeChild(twitterScript)
      document.head.removeChild(instagramScript)
    }
  }, [])

  return (
    <>
      {/* Twitter Section */}
      <section className="w-full py-12 md:py-24 bg-[#111122]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <Twitter className="h-8 w-8 text-[#e9b11a]" />
            <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">ÚLTIMOS TWEETS</h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
              Mantente al día con las últimas actualizaciones
            </p>
          </div>
          <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20 max-w-2xl mx-auto">
            <div ref={twitterRef} className="twitter-feed-container">
              <a
                className="twitter-timeline"
                data-theme="dark"
                data-chrome="noheader nofooter transparent"
                data-tweet-limit="5"
                data-height="600"
                href="https://twitter.com/UnCafeConJJ"
              >
                Tweets by UnCafeConJJ
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="w-full py-12 md:py-24 bg-[#1a1a2e]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <Instagram className="h-8 w-8 text-[#e9b11a]" />
            <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">INSTAGRAM</h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">Síguenos para más contenido</p>
          </div>
          <div className="grid gap-8 max-w-5xl mx-auto">
            <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
              <div ref={instagramRef} className="instagram-post-container">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink="https://www.instagram.com/p/DGigXykR13T/"
                  data-instgrm-version="14"
                  style={{
                    margin: "0",
                    width: "100%",
                    backgroundColor: "#1a1a2e",
                    borderRadius: "8px",
                    border: "1px solid rgba(233, 177, 26, 0.2)",
                  }}
                >
                  <div style={{ padding: "16px" }}>
                    <a
                      href="https://www.instagram.com/p/DGigXykR13T/"
                      style={{
                        color: "#e9b11a",
                        textDecoration: "none",
                        display: "block",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver publicación en Instagram
                    </a>
                  </div>
                </blockquote>
              </div>
            </Card>
            <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
              <div className="instagram-post-container">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink="https://www.instagram.com/p/DGiY18vxPB7/"
                  data-instgrm-version="14"
                  style={{
                    margin: "0",
                    width: "100%",
                    backgroundColor: "#1a1a2e",
                    borderRadius: "8px",
                    border: "1px solid rgba(233, 177, 26, 0.2)",
                  }}
                >
                  <div style={{ padding: "16px" }}>
                    <a
                      href="https://www.instagram.com/p/DGiY18vxPB7/"
                      style={{
                        color: "#e9b11a",
                        textDecoration: "none",
                        display: "block",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver publicación en Instagram
                    </a>
                  </div>
                </blockquote>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

