// Agregar caché para los videos
const CACHE_TIME = 3600 // 1 hora en segundos

export interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
}

async function getCachedData(key: string): Promise<any | null> {
  if (typeof window === "undefined") return null

  try {
    const item = localStorage.getItem(key)
    if (!item) return null

    const { value, timestamp } = JSON.parse(item)
    if (Date.now() - timestamp > CACHE_TIME * 1000) {
      localStorage.removeItem(key)
      return null
    }

    return value
  } catch (error) {
    console.error("Error reading from cache:", error)
    return null
  }
}

async function setCachedData(key: string, value: any): Promise<void> {
  if (typeof window === "undefined") return

  try {
    const item = {
      value,
      timestamp: Date.now(),
    }
    localStorage.setItem(key, JSON.stringify(item))
  } catch (error) {
    console.error("Error writing to cache:", error)
  }
}

export async function fetchPlaylistVideos(playlistId: string, apiKey: string, maxResults = 6): Promise<YouTubeVideo[]> {
  try {
    // Check cache first
    const cacheKey = `playlist_${playlistId}`
    const cachedVideos = await getCachedData(cacheKey)
    if (cachedVideos) {
      return cachedVideos
    }

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

    const videos = data.items.map((item: any) => ({
      id: item.snippet?.resourceId?.videoId || "",
      title: item.snippet?.title || "Video sin título",
      thumbnail:
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.default?.url ||
        "/placeholder.svg?height=720&width=1280",
      publishedAt: item.snippet?.publishedAt || new Date().toISOString(),
    }))

    // Cache the results
    await setCachedData(cacheKey, videos)

    return videos
  } catch (error) {
    console.error("Error fetching YouTube videos:", error)
    return []
  }
}

