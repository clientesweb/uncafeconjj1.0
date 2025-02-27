import type React from "react"
import type { YoutubeVideo } from "@/types"
import YoutubeVideoCard from "./youtube-video-card"
import { Skeleton } from "@/components/ui/skeleton"

interface YoutubeVideosSectionProps {
  videos: YoutubeVideo[]
  title: string
}

const YoutubeVideosSection: React.FC<YoutubeVideosSectionProps> = ({ videos, title }) => {
  return (
    <section className="container py-12">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      {videos ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <YoutubeVideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Skeleton Loading State */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-md bg-[#e9b11a]/10" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4 bg-[#e9b11a]/10" />
                <Skeleton className="h-4 w-3/4 bg-[#e9b11a]/10" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default YoutubeVideosSection

