export interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
}

export async function fetchPlaylistVideos(playlistId: string, apiKey: string, maxResults = 6): Promise<YouTubeVideo[]> {
  try {
    // Check if we have the required parameters
    if (!playlistId || !apiKey) {
      console.warn("Missing required parameters for YouTube API", { playlistId, apiKey })
      return []
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`,
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error(`YouTube API error: ${response.status}`, errorData)
      return []
    }

    const data = await response.json()

    if (!data.items || !Array.isArray(data.items)) {
      console.error("Invalid response format from YouTube API", data)
      return []
    }

    return data.items.map((item: any) => {
      // Extraer el ID del video
      const videoId = item.snippet?.resourceId?.videoId || ""

      // Construir URLs de miniaturas directamente usando el ID del video
      // Esto garantiza que siempre tengamos una URL válida
      const thumbnailUrl = videoId
        ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        : "/placeholder.svg?height=720&width=1280"

      return {
        id: videoId,
        title: item.snippet?.title || "Video sin título",
        thumbnail: thumbnailUrl,
        publishedAt: item.snippet?.publishedAt || new Date().toISOString(),
      }
    })
  } catch (error) {
    console.error("Error fetching YouTube videos:", error)
    return []
  }
}

