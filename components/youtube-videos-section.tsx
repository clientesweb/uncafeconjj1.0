"use client"

import { useState, useEffect } from "react"
import { YouTubeVideoCard } from "./youtube-video-card"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
}

interface YouTubeVideosSectionProps {
  regularPlaylistId: string
  shortsPlaylistId: string
}

export function YouTubeVideosSection({ regularPlaylistId, shortsPlaylistId }: YouTubeVideosSectionProps) {
  const [regularVideos, setRegularVideos] = useState<YouTubeVideo[]>([])
  const [shortsVideos, setShortsVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true)
        setError(null)

        const [regularResponse, shortsResponse] = await Promise.all([
          fetch(`/api/youtube-videos?playlistId=${regularPlaylistId}`),
          fetch(`/api/youtube-videos?playlistId=${shortsPlaylistId}`),
        ])

        if (!regularResponse.ok || !shortsResponse.ok) {
          throw new Error("Error fetching videos")
        }

        const [regularData, shortsData] = await Promise.all([regularResponse.json(), shortsResponse.json()])

        setRegularVideos(regularData)
        setShortsVideos(shortsData)
      } catch (err) {
        console.error("Error loading videos:", err)
        setError("Ocurrió un error al cargar los videos. Por favor, intenta más tarde.")
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [regularPlaylistId, shortsPlaylistId])

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

        {error ? (
          <div className="mt-12 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <>
            <div className="mt-12">
              <h3 className="mb-6 text-2xl font-bold text-white">Últimos Episodios</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="space-y-3">
                        <Skeleton className="aspect-video w-full rounded-lg bg-[#e9b11a]/10" />
                        <Skeleton className="h-4 w-3/4 bg-[#e9b11a]/10" />
                        <Skeleton className="h-3 w-1/2 bg-[#e9b11a]/10" />
                      </div>
                    ))
                ) : regularVideos.length > 0 ? (
                  regularVideos.map((video) => <YouTubeVideoCard key={video.id} video={video} />)
                ) : (
                  <p className="text-white col-span-full">No se encontraron videos regulares.</p>
                )}
              </div>
            </div>

            <div className="mt-16">
              <h3 className="mb-6 text-2xl font-bold text-white">Shorts Destacados</h3>
              <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="space-y-3">
                        <Skeleton className="aspect-[9/16] w-full rounded-lg bg-[#e9b11a]/10" />
                        <Skeleton className="h-4 w-3/4 bg-[#e9b11a]/10" />
                        <Skeleton className="h-3 w-1/2 bg-[#e9b11a]/10" />
                      </div>
                    ))
                ) : shortsVideos.length > 0 ? (
                  shortsVideos.map((video) => <YouTubeVideoCard key={video.id} video={video} isShort={true} />)
                ) : (
                  <p className="text-white col-span-full">No se encontraron shorts.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

