"use client"

import { useState, useEffect } from "react"
import { fetchPlaylistVideos, type YouTubeVideo } from "@/lib/youtube-service"
import { YouTubeVideoCard } from "./youtube-video-card"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface YouTubeVideosSectionProps {
  regularPlaylistId: string
  shortsPlaylistId: string
  apiKey: string
}

export function YouTubeVideosSection({ regularPlaylistId, shortsPlaylistId, apiKey }: YouTubeVideosSectionProps) {
  const [regularVideos, setRegularVideos] = useState<YouTubeVideo[]>([])
  const [shortsVideos, setShortsVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true)
        setError(null)
        const [regular, shorts] = await Promise.all([
          fetchPlaylistVideos(regularPlaylistId, apiKey),
          fetchPlaylistVideos(shortsPlaylistId, apiKey),
        ])
        if (regular.length === 0 && shorts.length === 0) {
          setError("No se pudieron cargar los videos. Por favor, verifica los IDs de las playlists y la clave de API.")
        } else {
          setRegularVideos(regular)
          setShortsVideos(shorts)
        }
      } catch (err) {
        console.error("Error loading videos:", err)
        setError("Ocurrió un error al cargar los videos. Por favor, intenta más tarde.")
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [regularPlaylistId, shortsPlaylistId, apiKey])

  return (
    <section id="videos" className="w-full" aria-labelledby="videos-title">
      <div className="container px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2 sm:space-y-3">
            <h2 id="videos-title" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-white">
              NUESTROS VIDEOS
            </h2>
            <p className="mx-auto max-w-[700px] text-base sm:text-lg md:text-xl text-gray-400">
              Mira los últimos episodios y momentos destacados de Un Café con JJ.
            </p>
          </div>
        </motion.div>

        {error ? (
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <>
            <div className="mt-8 sm:mt-12">
              <h3 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-white">Últimos Episodios</h3>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {loading ? (
                  Array(4)
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

            <div className="mt-12 sm:mt-16">
              <h3 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-white">Shorts Destacados</h3>
              <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {loading ? (
                  Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="space-y-3">
                        <Skeleton className="aspect-[9/16] w-full rounded-lg bg-[#e9b11a]/10" />
                        <Skeleton className="h-4 w-3/4 bg-[#e9b11a]/10" />
                        />
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

