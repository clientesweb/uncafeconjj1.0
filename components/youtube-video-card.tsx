"use client"

import Image from "next/image"
import type { YouTubeVideo } from "@/lib/youtube-service"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { useState } from "react"
import { VideoPlayerDialog } from "./video-player-dialog"
import { motion } from "framer-motion"

interface YouTubeVideoCardProps {
  video: YouTubeVideo
  isShort?: boolean
}

export function YouTubeVideoCard({ video, isShort = false }: YouTubeVideoCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const timeAgo = formatDistanceToNow(new Date(video.publishedAt), {
    addSuffix: true,
    locale: es,
  })

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => {
            if (isDialogOpen) return
            window.open(`https://www.youtube.com/watch?v=${video.id}`, "_blank")
          }}
          className="group block w-full text-left"
          aria-label={`Ver ${video.title}`}
        >
          <div className="relative overflow-hidden rounded-lg">
            <div className={`relative ${isShort ? "aspect-[9/16]" : "aspect-video"}`}>
              <Image
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {isShort && (
              <div className="absolute bottom-2 right-2 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                SHORT
              </div>
            )}
          </div>
          <h3 className="mt-2 line-clamp-2 text-sm font-medium text-white group-hover:text-[#e9b11a]">{video.title}</h3>
          <p className="text-xs text-gray-400">{timeAgo}</p>
        </button>
      </motion.div>

      <VideoPlayerDialog video={video} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} isShort={isShort} />
    </>
  )
}

