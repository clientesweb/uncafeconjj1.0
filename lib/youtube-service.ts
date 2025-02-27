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

    return data.items.map((item: any) => ({
      id: item.snippet?.resourceId?.videoId || "",
      title: item.snippet?.title || "Video sin título",
      thumbnail:
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.default?.url ||
        "/placeholder.svg?height=720&width=1280",
      publishedAt: item.snippet?.publishedAt || new Date().toISOString(),
    }))
  } catch (error) {
    console.error("Error fetching YouTube videos:", error)
    return []
  }
}

