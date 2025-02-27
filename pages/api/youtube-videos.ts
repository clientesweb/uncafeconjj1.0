import type { NextApiRequest, NextApiResponse } from "next"

export interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<YouTubeVideo[] | { error: string }>) {
  const { playlistId } = req.query
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!playlistId || !apiKey) {
    return res.status(400).json({ error: "Missing playlistId or API key" })
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=6&playlistId=${playlistId}&key=${apiKey}`
    const response = await fetch(url)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`YouTube API error: ${response.status} - ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error("Invalid response format from YouTube API")
    }

    const videos: YouTubeVideo[] = data.items.map((item: any) => ({
      id: item.snippet?.resourceId?.videoId || "",
      title: item.snippet?.title || "Video sin título",
      thumbnail:
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.default?.url ||
        "/placeholder.svg?height=720&width=1280",
      publishedAt: item.snippet?.publishedAt || new Date().toISOString(),
    }))

    res.status(200).json(videos)
  } catch (error) {
    console.error("Error fetching YouTube videos:", error)
    res.status(500).json({ error: "Error fetching YouTube videos" })
  }
}

