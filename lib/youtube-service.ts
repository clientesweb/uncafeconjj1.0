export interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
}

export async function fetchPlaylistVideos(playlistId: string, apiKey: string, maxResults = 6): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`,
    )

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`)
    }

    const data = await response.json()

    return data.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      publishedAt: item.snippet.publishedAt,
    }))
  } catch (error) {
    console.error("Error fetching YouTube videos:", error)
    return []
  }
}

