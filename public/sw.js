const CACHE_NAME = "un-cafe-con-jj-v1"

// Agregar más assets estáticos para cachear
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/favicon.ico",
  "/images/logo.png",
  "/images/altavoz.png",
]

// Agregar estrategia de caché para imágenes
const IMAGE_CACHE_NAME = "images-cache-v1"
const VIDEO_CACHE_NAME = "videos-cache-v1"

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)),
      caches.open(IMAGE_CACHE_NAME),
      caches.open(VIDEO_CACHE_NAME),
    ]),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== IMAGE_CACHE_NAME && name !== VIDEO_CACHE_NAME)
          .map((name) => caches.delete(name)),
      )
    }),
  )
})

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url)

  // Estrategia para imágenes
  if (event.request.destination === "image") {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone())
            return networkResponse
          })
          return response || fetchPromise
        })
      }),
    )
    return
  }

  // Estrategia para videos
  if (url.pathname.includes("/youtube/") || url.hostname.includes("youtube.com")) {
    event.respondWith(
      caches.open(VIDEO_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            // Solo cachear respuestas exitosas
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone())
            }
            return networkResponse
          })
          return response || fetchPromise
        })
      }),
    )
    return
  }

  // Estrategia por defecto
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((networkResponse) => {
          if (networkResponse.ok && event.request.method === "GET") {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone())
              return networkResponse
            })
          }
          return networkResponse
        })
      )
    }),
  )
})

// Limpieza periódica de caché
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "clean-caches") {
    event.waitUntil(
      Promise.all([
        cleanCache(IMAGE_CACHE_NAME, 7), // 7 días para imágenes
        cleanCache(VIDEO_CACHE_NAME, 1), // 1 día para videos
      ]),
    )
  }
})

async function cleanCache(cacheName, maxAgeDays) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  const now = Date.now()

  for (const request of keys) {
    const response = await cache.match(request)
    if (response) {
      const date = new Date(response.headers.get("date"))
      if (now - date.getTime() > maxAgeDays * 24 * 60 * 60 * 1000) {
        await cache.delete(request)
      }
    }
  }
}

