"use client"

import Image from "next/image"
import type { YouTubeVideo } from "@/lib/youtube-service"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { useState } from "react"
import { VideoPlayerDialog } from "./video-player-dialog"
import { motion } from "framer-motion"
import { Play } from "lucide-react"

interface YouTubeVideoCardProps {
  video: YouTubeVideo
  isShort?: boolean
}

export function YouTubeVideoCard({ video, isShort = false }: YouTubeVideoCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  const timeAgo = formatDistanceToNow(new Date(video.publishedAt), {
    addSuffix: true,
    locale: es,
  })

  // Placeholder blur data URL (gris claro)
  const blurDataURL =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPDY2ODYyTEhMR0BGRlNCRkJHYGFjYWM4OTtBV0VGUElGYWZYZFD/2wBDARUXFyAeIBogHh4gIiAyRzJHMkZGR0dGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkb/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="

  // Función para manejar errores de carga de imagen
  const handleImageError = () => {
    setImageError(true)
  }

  // URL de imagen de respaldo si la original falla
  const fallbackImageUrl = `/placeholder.svg?height=${isShort ? 720 : 480}&width=${isShort ? 405 : 720}`

  // Determinar qué URL de imagen usar
  const imageUrl = imageError ? fallbackImageUrl : video.thumbnail || fallbackImageUrl

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
      >
        <button
          onClick={() => setIsDialogOpen(true)}
          className="group block w-full text-left"
          aria-label={`Ver ${video.title}`}
        >
          <div className="relative overflow-hidden rounded-xl shadow-lg shadow-black/20">
            <div className={`relative ${isShort ? "aspect-[9/16]" : "aspect-video"}`}>
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={video.title}
                fill
                sizes={
                  isShort ? "(max-width: 640px) 50vw, 33vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                quality={85}
                loading="lazy"
                placeholder="blur"
                blurDataURL={blurDataURL}
                onError={handleImageError}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {isShort && (
              <div className="absolute top-2 right-2 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                SHORT
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-[#e9b11a] rounded-full p-4 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                <Play className="h-6 w-6 text-[#1a1a2e]" />
              </div>
            </div>
          </div>
          <h3 className="mt-3 line-clamp-2 text-sm font-medium text-white group-hover:text-[#e9b11a] transition-colors duration-300">
            {video.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1">{timeAgo}</p>
        </button>
      </motion.div>

      <VideoPlayerDialog video={video} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} isShort={isShort} />
    </>
  )
}

