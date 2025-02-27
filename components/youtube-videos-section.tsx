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

// Mock data for videos in case the API fails
const mockRegularVideos: YouTubeVideo[] = [
  {
    id: "Ks-_Mh1QhMc",
    title: "Un Café con JJ - Análisis de la situación política actual",
    thumbnail: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "C0DPdy98e4c",
    title: "Entrevista exclusiva con el Ministro de Economía",
    thumbnail: "https://i.ytimg.com/vi/C0DPdy98e4c/hqdefault.jpg",
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "7wtfhZwyrcc",
    title: "Debate sobre la reforma tributaria - Un Café con JJ",
    thumbnail: "https://i.ytimg.com/vi/7wtfhZwyrcc/hqdefault.jpg",
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: "4q1dgn_C0AU",
    title: "Las elecciones 2025: Análisis de candidatos",
    thumbnail: "https://i.ytimg.com/vi/4q1dgn_C0AU/hqdefault.jpg",
    publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
  {
    id: "xUEB-pF4oVY",
    title: "Crisis económica: Perspectivas para Ecuador",
    thumbnail: "https://i.ytimg.com/vi/xUEB-pF4oVY/hqdefault.jpg",
    publishedAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
  },
]

const mockShortsVideos: YouTubeVideo[] = [
  {
    id: "QH2-TGUlwu4",
    title: "Jimmy Jairala responde a críticas sobre su postura política",
    thumbnail: "https://i.ytimg.com/vi/QH2-TGUlwu4/hqdefault.jpg",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "4q1dgn_C0AU",
    title: "Momento destacado: Debate sobre seguridad",
    thumbnail: "https://i.ytimg.com/vi/4q1dgn_C0AU/hqdefault.jpg",
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "7wtfhZwyrcc",
    title: "Análisis rápido: Inflación en Ecuador",
    thumbnail: "https://i.ytimg.com/vi/7wtfhZwyrcc/hqdefault.jpg",
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: "C0DPdy98e4c",
    title: "Resumen: Entrevista con líder indígena",
    thumbnail: "https://i.ytimg.com/vi/C0DPdy98e4c/hqdefault.jpg",
    publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
  {
    id: "Ks-_Mh1QhMc",
    title: "Opinión: Nuevas medidas económicas",
    thumbnail: "https://i.ytimg.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
    publishedAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
  },
]

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

        // Try to fetch from API first
        try {
          const [regularResponse, shortsResponse] = await Promise.all([
            fetch(`/api/youtube-videos?playlistId=${regularPlaylistId}`),
            fetch(`/api/youtube-videos?playlistId=${shortsPlaylistId}`),
          ])

          if (regularResponse.ok && shortsResponse.ok) {
            const [regularData, shortsData] = await Promise.all([regularResponse.json(), shortsResponse.json()])
            setRegularVideos(regularData)
            setShortsVideos(shortsData)
          } else {
            // If API fails, use mock data
            console.log("Using mock data due to API failure")
            setRegularVideos(mockRegularVideos)
            setShortsVideos(mockShortsVideos)
          }
        } catch (err) {
          console.error("Error fetching from API, using mock data:", err)
          setRegularVideos(mockRegularVideos)
          setShortsVideos(mockShortsVideos)
        }
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

