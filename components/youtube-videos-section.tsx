"use client"

import { fetchPlaylistVideos } from "@/lib/youtube-service"
import { YouTubeVideoCard } from "./youtube-video-card"
import { motion } from "framer-motion"

interface YouTubeVideosSectionProps {
  regularPlaylistId: string
  shortsPlaylistId: string
  apiKey: string
}

export async function YouTubeVideosSection({ regularPlaylistId, shortsPlaylistId, apiKey }: YouTubeVideosSectionProps) {
  const [regularVideos, shortsVideos] = await Promise.all([
    fetchPlaylistVideos(regularPlaylistId, apiKey),
    fetchPlaylistVideos(shortsPlaylistId, apiKey),
  ])

  return (
    <section id="videos" className="w-full py-12 md:py-24 lg:py-32 bg-[#111122]">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">NUESTROS VIDEOS</h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
              Mira los últimos episodios y momentos destacados de Un Café con JJ.
            </p>
          </div>
        </motion.div>

        <div className="mt-12">
          <h3 className="mb-6 text-2xl font-bold text-white">Últimos Episodios</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {regularVideos.map((video) => (
              <YouTubeVideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mb-6 text-2xl font-bold text-white">Shorts Destacados</h3>
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {shortsVideos.map((video) => (
              <YouTubeVideoCard key={video.id} video={video} isShort={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

