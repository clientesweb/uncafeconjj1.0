import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ServiceWorkerRegister } from "./sw-register"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://uncafeconjj.com"),
  title: {
    default: "Un Café con JJ - ALTAVOZ",
    template: "%s | Un Café con JJ",
  },
  description:
    "Un Café con JJ, programa de análisis político y actualidad con Jimmy Jairala. Transmitido por Kocodrilo Radio 94.5 FM y Café Radio 91.7 MHz, de lunes a viernes de 6:00 a 8:00 am.",
  keywords: [
    "Un Café con JJ",
    "Jimmy Jairala",
    "Kocodrilo Radio",
    "Café Radio",
    "ALTAVOZ",
    "análisis político",
    "noticias Ecuador",
    "política Ecuador",
    "radio en vivo",
    "streaming radio",
  ],
  authors: [{ name: "Jimmy Jairala" }],
  creator: "Un Café con JJ",
  publisher: "ALTAVOZ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://uncafeconjj.com",
    title: "Un Café con JJ - ALTAVOZ",
    description: "Programa de análisis político y actualidad con Jimmy Jairala",
    siteName: "Un Café con JJ",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FACEBOOK%20COVER%202025%20%281%29.png-VEqDybN3naytfynNcGkvNKgl6cbXqP.jpeg",
        width: 2048,
        height: 819,
        alt: "Un Café con JJ - Jimmy Jairala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Un Café con JJ - ALTAVOZ",
    description: "Programa de análisis político y actualidad con Jimmy Jairala",
    creator: "@jimmyjairala",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FACEBOOK%20COVER%202025%20%281%29.png-VEqDybN3naytfynNcGkvNKgl6cbXqP.jpeg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logo.png", type: "image/png" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/images/logo.png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/images/logo.png",
      },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: "google-site-verification=YOUR_CODE",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://platform.twitter.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.instagram.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#1a1a2e" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={inter.className}>
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}

