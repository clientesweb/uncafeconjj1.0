import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { YouTubeVideo } from "@/lib/youtube-service"

interface VideoPlayerDialogProps {
  video: YouTubeVideo | null
  isOpen: boolean
  onClose: () => void
  isShort?: boolean
}

export function VideoPlayerDialog({ video, isOpen, onClose, isShort = false }: VideoPlayerDialogProps) {
  if (!video) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 bg-black border-[#e9b11a]/20">
        <div className={`relative ${isShort ? "aspect-[9/16]" : "aspect-video"}`}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

