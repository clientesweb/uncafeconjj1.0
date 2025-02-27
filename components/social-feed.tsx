"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { useEffect, useRef } from "react"

interface InstagramPost {
  imageUrl: string
  alt: string
}

const instagramPosts: InstagramPost[] = [
  {
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SaveInsta.to_481595485_17973008360830014_6421756810266299319_n.jpg-ngW31rVx2kMexXzNHb9axVZcxXQm1w.jpeg",
    alt: "Ilustración sobre elección voto a voto con balanza de la justicia",
  },
  {
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SaveInsta.to_481864705_17973001067830014_2046411398698055790_n.jpg-uF1RIfvk0hxfFyBNyxVzWS7j9UOOwr.jpeg",
    alt: "Ferdinand Álvarez hablando sobre cooperación y la bandera tricolor",
  },
]

export function SocialFeed() {
  const twitterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Configurar Twitter Timeline
    const timeline = document.createElement("a")
    timeline.className = "twitter-timeline"
    timeline.setAttribute("data-theme", "dark")
    timeline.setAttribute("data-chrome", "noheader nofooter noscrollbar transparent")
    timeline.setAttribute("data-height", "10")
    timeline.setAttribute("data-tweet-limit", "5")
    timeline.setAttribute("data-link-color", "#e9b11a")
    timeline.setAttribute("data-border-color", "#e9b11a20")
    timeline.setAttribute("href", "https://twitter.com/UnCafeConJJ")

    if (twitterRef.current) {
      twitterRef.current.innerHTML = ""
      twitterRef.current.appendChild(timeline)
    }

    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      {/* Twitter Section */}
      <section className="w-full py-12 md:py-24 bg-[#111122]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">ÚLTIMOS TWEETS</h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
              Mantente al día con las últimas actualizaciones
            </p>
          </div>
          <Card className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20">
            <div
              ref={twitterRef}
              className="w-full max-w-[550px] mx-auto h-[500px] overflow-hidden twitter-dark-theme"
            />
          </Card>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="w-full py-12 md:py-24 bg-[#1a1a2e]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">INSTAGRAM</h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">Síguenos para más contenido</p>
          </div>
          <div className="mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1100px] place-items-center">
            {instagramPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden bg-[#1a1a2e] border-[#e9b11a]/20 w-full max-w-[540px]">
                <div className="relative aspect-square">
                  <Image
                    src={post.imageUrl || "/placeholder.svg"}
                    alt={post.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

