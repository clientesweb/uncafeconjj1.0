export interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
}

// Función para obtener videos de un canal
export async function fetchChannelVideos(
  channelId: string,
  apiKey: string,
  maxResults = 6,
  isShorts = false,
): Promise<YouTubeVideo[]> {
  try {
    // Verificar parámetros requeridos
    if (!channelId || !apiKey) {
      console.warn("Faltan parámetros requeridos para la API de YouTube", { channelId, apiKey })
      return []
    }

    // Construir la URL para la API de búsqueda de YouTube
    // Para shorts, usamos videoDuration=short (videos menores a 60 segundos)
    const videoDurationParam = isShorts ? "&videoDuration=short" : ""
    const orderParam = "order=date" // Ordenar por fecha (más recientes primero)

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&channelId=${channelId}&type=video${videoDurationParam}&${orderParam}&key=${apiKey}`,
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error(`Error en la API de YouTube: ${response.status}`, errorData)
      return []
    }

    const data = await response.json()

    if (!data.items || !Array.isArray(data.items)) {
      console.error("Formato de respuesta inválido de la API de YouTube", data)
      return []
    }

    return data.items.map((item: any) => {
      // Extraer el ID del video
      const videoId = item.id?.videoId || ""

      // Construir URLs de miniaturas directamente usando el ID del video
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
    console.error("Error al obtener videos de YouTube:", error)
    return []
  }
}

// Mantener la función original para compatibilidad con código existente
export async function fetchPlaylistVideos(playlistId: string, apiKey: string, maxResults = 6): Promise<YouTubeVideo[]> {
  try {
    // Verificar parámetros requeridos
    if (!playlistId || !apiKey) {
      console.warn("Faltan parámetros requeridos para la API de YouTube", { playlistId, apiKey })
      return []
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`,
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error(`Error en la API de YouTube: ${response.status}`, errorData)
      return []
    }

    const data = await response.json()

    if (!data.items || !Array.isArray(data.items)) {
      console.error("Formato de respuesta inválido de la API de YouTube", data)
      return []
    }

    return data.items.map((item: any) => {
      // Extraer el ID del video
      const videoId = item.snippet?.resourceId?.videoId || ""

      // Construir URLs de miniaturas directamente usando el ID del video
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
    console.error("Error al obtener videos de YouTube:", error)
    return []
  }
}

