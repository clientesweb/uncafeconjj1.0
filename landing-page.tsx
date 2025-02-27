"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Instagram, Youtube, Twitter, Clock, Calendar, Radio, Mic2 } from "lucide-react"
import { TikTok } from "./tiktok-icon"
import { YouTubeVideosSection } from "./components/youtube-videos-section"
import { MobileMenu } from "./components/mobile-menu"
import { WhatsAppButton } from "./components/whatsapp-button"
import { StructuredData } from "./components/structured-data"
import { TopBanner } from "./components/top-banner"
import { InstallButton } from "./components/install-button"
import { TwitterTimeline } from "./components/twitter-timeline"
import { InstagramPosts } from "./components/instagram-posts"
import { SkipLink } from "./components/skip-link"
import { Suspense } from "react"
import { LiveStreamPlayer } from "./components/live-stream-player"

export default function LandingPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#1a1a2e]">
      <SkipLink />
      <StructuredData />
      <TopBanner />
      {/* Header */}
      <header
        className="sticky top-0 z-50 w-full border-b border-[#e9b11a]/20 bg-[#1a1a2e]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a2e]/60"
        role="banner"
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <MobileMenu />
            <Link href="/" className="flex items-center gap-2" aria-label="Un Café con JJ - Inicio">
              <Image
                src="/images/logo.png"
                width={48}
                height={48}
                alt="Un Café con JJ Logo"
                className="h-10 w-10 rounded-full"
                priority
              />
              <span className="text-xl font-bold text-white">Un Café con JJ</span>
            </Link>
          </div>

          <nav className="hidden md:flex gap-6" role="navigation" aria-label="Navegación principal">
            <button
              onClick={() => scrollToSection("en-vivo")}
              className="text-sm font-medium text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a]"
            >
              EN VIVO
            </button>
            <button
              onClick={() => scrollToSection("programa")}
              className="text-sm font-medium text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a]"
            >
              PROGRAMA
            </button>
            <button
              onClick={() => scrollToSection("twitter")}
              className="text-sm font-medium text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a]"
            >
              NOTICIAS
            </button>
            <button
              onClick={() => scrollToSection("videos")}
              className="text-sm font-medium text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a]"
            >
              VIDEOS
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-sm font-medium text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a]"
            >
              CONTACTO
            </button>
          </nav>

          <div className="hidden md:flex gap-4">
            <Button
              className="bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a2e]"
              onClick={() => scrollToSection("en-vivo")}
            >
              ESCÚCHANOS EN VIVO
            </Button>
            <InstallButton />
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1" role="main">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-b border-[#e9b11a]/20" aria-labelledby="hero-title">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1
                    id="hero-title"
                    className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none"
                  >
                    Un Café con <span className="text-[#e9b11a]">JJ</span>
                  </h1>
                  <p className="max-w-[600px] text-[#e9b11a] md:text-xl">TRINCHERA DEL PENSAMIENTO LIBRE</p>
                  <p className="max-w-[600px] text-gray-400 md:text-xl">
                    Noticias, análisis y opinión con Jimmy Jairala.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    size="lg"
                    className="h-12 bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a2e]"
                    onClick={() => scrollToSection("en-vivo")}
                  >
                    VER EN VIVO
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 text-white border-[#e9b11a] hover:bg-[#e9b11a]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a2e]"
                    onClick={() => scrollToSection("programa")}
                  >
                    PROGRAMACIÓN
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4 pt-4" role="list" aria-label="Redes sociales">
                  <Link
                    href="https://facebook.com/uncafeconjj"
                    className="text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-1"
                    aria-label="Síguenos en Facebook"
                  >
                    <Facebook className="h-6 w-6" aria-hidden="true" />
                  </Link>
                  <Link
                    href="https://instagram.com/uncafeconjj"
                    className="text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-1"
                    aria-label="Síguenos en Instagram"
                  >
                    <Instagram className="h-6 w-6" aria-hidden="true" />
                  </Link>
                  <Link
                    href="https://youtube.com/uncafeconjj"
                    className="text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-1"
                    aria-label="Síguenos en YouTube"
                  >
                    <Youtube className="h-6 w-6" aria-hidden="true" />
                  </Link>
                  <Link
                    href="https://twitter.com/uncafeconjj"
                    className="text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-1"
                    aria-label="Síguenos en Twitter"
                  >
                    <Twitter className="h-6 w-6" aria-hidden="true" />
                  </Link>
                  <Link
                    href="#"
                    className="text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-1"
                    aria-label="Síguenos en TikTok"
                  >
                    <TikTok className="h-6 w-6" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FACEBOOK%20COVER%202025%20%281%29.png-VEqDybN3naytfynNcGkvNKgl6cbXqP.jpeg"
                  width={600}
                  height={400}
                  alt="Jimmy Jairala presentando Un Café con JJ"
                  className="rounded-lg object-cover w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Live Stream Section */}
        <section id="en-vivo" className="w-full py-12 md:py-24 lg:py-32" aria-labelledby="live-title">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 id="live-title" className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">
                  EN VIVO
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Sintoniza nuestro programa en directo de lunes a viernes de 6:00 a 8:00 a.m.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl mt-8">
              <LiveStreamPlayer streamUrl="https://player.castr.com/d_8aea6c10d99811efb5ebf7655896c5a7" />
            </div>
          </div>
        </section>

        {/* Social Media Sections with Suspense */}
        <Suspense fallback={<div className="w-full h-[400px] bg-[#1a1a2e] animate-pulse" />}>
          <section id="twitter" className="w-full py-12 md:py-24 lg:py-32" aria-labelledby="twitter-title">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 id="twitter-title" className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">
                    ÚLTIMAS NOTICIAS
                  </h2>
                  <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                    Mantente al día con las últimas actualizaciones de Un Café con JJ.
                  </p>
                </div>
              </div>
              <div className="mx-auto max-w-3xl mt-8">
                <TwitterTimeline />
              </div>
            </div>
          </section>
        </Suspense>

        <Suspense fallback={<div className="w-full h-[400px] bg-[#1a1a2e] animate-pulse" />}>
          <InstagramPosts />
        </Suspense>

        {/* Program Info Section */}
        <section id="programa" className="w-full py-12 md:py-24 lg:py-32 bg-[#111122]" aria-labelledby="program-title">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 id="program-title" className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">
                  SOBRE EL PROGRAMA
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Un espacio de análisis, opinión y debate sobre la actualidad nacional e internacional.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Nuestro Presentador</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#e9b11a]/20 p-2">
                        <Mic2 className="h-6 w-6 text-[#e9b11a]" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#e9b11a]">Jimmy Jairala</h4>
                        <p className="text-gray-400">
                          Periodista y analista político con amplia experiencia en medios de comunicación.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <Card className="bg-[#1a1a2e] border-[#e9b11a]/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#e9b11a]/20 p-2">
                        <Calendar className="h-6 w-6 text-[#e9b11a]" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Días de Emisión</h4>
                        <p className="text-gray-400">Lunes a Viernes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1a2e] border-[#e9b11a]/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#e9b11a]/20 p-2">
                        <Clock className="h-6 w-6 text-[#e9b11a]" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Horario</h4>
                        <p className="text-gray-400">6:00 a 8:00 a.m.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1a2e] border-[#e9b11a]/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#e9b11a]/20 p-2">
                        <Radio className="h-6 w-6 text-[#e9b11a]" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Sintoniza</h4>
                        <p className="text-gray-400">Kocodrilo Radio 94.5 FM</p>
                        <p className="text-gray-400">Café Radio 91.7 MHz</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* YouTube Videos Section */}
        <section id="videos" className="w-full py-12 md:py-24 lg:py-32" aria-labelledby="videos-title">
          <YouTubeVideosSection
            regularPlaylistId="PLSwBXxeopk-xySzecvVbfGTqnCTi8QhtE"
            shortsPlaylistId="PLSwBXxeopk-xUhmNW4jOBi8Olkr_4p2Rc"
            apiKey={process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || ""}
          />
        </section>

        {/* CTA Section */}
        <section id="contacto" className="w-full py-12 md:py-24 lg:py-32 bg-[#111122]" aria-labelledby="contact-title">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 id="contact-title" className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">
                  SÍGUENOS EN REDES SOCIALES
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Mantente informado y participa en nuestras conversaciones.
                </p>
              </div>
              <div className="flex gap-6 pt-4" role="list" aria-label="Redes sociales">
                <Link
                  href="https://facebook.com/uncafeconjj"
                  className="text-white hover:text-[#e9b11a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-1"
                  aria-label="Síguenos en Facebook"
                >
                  <Facebook className="h-8 w-8" aria-hidden="true" />
                </Link>
                <Link
                  href="https://instagram.com/uncafeconjj"
                  className="text-white hover:text-[#e9b11a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-1"
                  aria-label="Síguenos en Instagram"
                >
                  <Instagram className="h-8 w-8" aria-hidden="true" />
                </Link>
                <Link
                  href="https://youtube.com/uncafeconjj"
                  className="text-white hover:text-[#e9b11a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-1"
                  aria-label="Síguenos en YouTube"
                >
                  <Youtube className="h-8 w-8" aria-hidden="true" />
                </Link>
                <Link
                  href="https://twitter.com/uncafeconjj"
                  className="text-white hover:text-[#e9b11a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-1"
                  aria-label="Síguenos en Twitter"
                >
                  <Twitter className="h-8 w-8" aria-hidden="true" />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-[#e9b11a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-1"
                  aria-label="Síguenos en TikTok"
                >
                  <TikTok className="h-8 w-8" aria-hidden="true" />
                </Link>
              </div>
              <div className="pt-6">
                <p className="text-gray-400">@UnCafeConJJ - @jimmyjairala</p>
              </div>
            </div>
          </div>
        </section>
        <WhatsAppButton />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#e9b11a]/20 bg-[#1a1a2e]" role="contentinfo">
        <div className="container flex flex-col gap-8 py-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                width={40}
                height={40}
                alt="Un Café con JJ Logo"
                className="h-10 w-10 rounded-full"
              />
              <span className="text-lg font-bold text-white">Un Café con JJ</span>
            </div>
            <div className="flex items-center gap-4">
              <Image src="/images/altavoz.png" width={120} height={40} alt="ALTAVOZ Logo" className="h-10" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#e9b11a]">Kocodrilo Radio 94.5 FM</span>
                <span className="text-sm font-bold text-[#e9b11a]">Café Radio 91.7 MHz</span>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-1">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Un Café con JJ. Todos los derechos reservados.
              </p>
              <p className="text-sm text-gray-400">
                Desarrollado por{" "}
                <a
                  href="https://dualitydomain.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e9b11a] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-sm"
                >
                  Duality Domain
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

