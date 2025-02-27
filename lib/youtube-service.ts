export interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
}

export async function fetchPlaylistVideos(playlistId: string, apiKey: string, maxResults = 6): Promise<YouTubeVideo[]> {
  try {
    if (!playlistId || !apiKey) {
      console.warn("Missing required parameters for YouTube API", { playlistId, apiKey })
      return []
    }

    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`
    console.log("Fetching from URL:", url)

    const response = await fetch(url)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error(`YouTube API error: ${response.status}`, errorData)
      throw new Error(`YouTube API error: ${response.status} - ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    console.log("API Response:", data)

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
    if (error instanceof Error) {
      throw new Error(`Error fetching YouTube videos: ${error.message}`)
    } else {
      throw new Error("An unknown error occurred while fetching YouTube videos")
    }
  }
}

