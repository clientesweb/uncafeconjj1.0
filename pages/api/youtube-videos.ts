import type { NextApiRequest, NextApiResponse } from "next"
import { fetchPlaylistVideos, type YouTubeVideo } from "@/lib/youtube-service"

export default async function handler(req: NextApiRequest, res: NextApiResponse<YouTubeVideo[] | { error: string }>) {
  const { playlistId } = req.query
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!playlistId || !apiKey) {
    console.warn("Missing playlistId or API key", { playlistId: !!playlistId, apiKey: !!apiKey })
    return res.status(400).json({ error: "Missing playlistId or API key" })
  }

  try {
    const videos = await fetchPlaylistVideos(playlistId as string, apiKey)
    res.status(200).json(videos)
  } catch (error) {
    console.error("Error in YouTube API handler:", error)
    res.status(500).json({ error: "Error fetching YouTube videos" })
  }
}

