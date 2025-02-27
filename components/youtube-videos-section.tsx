"use client"

import { useState, useEffect, useCallback } from "react"
import { fetchPlaylistVideos, type YouTubeVideo } from "@/lib/youtube-service"
import { YouTubeVideoCard } from "./youtube-video-card"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

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

  const loadVideos = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("Fetching videos with playlist IDs:", { regularPlaylistId, shortsPlaylistId })

      const [regular, shorts] = await Promise.all([
        fetchPlaylistVideos(regularPlaylistId, apiKey),
        fetchPlaylistVideos(shortsPlaylistId, apiKey),
      ])

      console.log("Fetched videos:", {
        regularCount: regular.length,
        shortsCount: shorts.length,
        regularSample: regular.length > 0 ? regular[0] : null,
        shortsSample: shorts.length > 0 ? shorts[0] : null,
      })

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
  }, [regularPlaylistId, shortsPlaylistId, apiKey])

  useEffect(() => {
    loadVideos()
  }, [loadVideos])

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
          <div className="mt-12 text-center flex flex-col items-center">
            <p className="text-red-400 mb-4">{error}</p>
            <Button
              onClick={loadVideos}
              variant="outline"
              className="text-white border-[#e9b11a] hover:bg-[#e9b11a]/10"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reintentar
            </Button>
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

