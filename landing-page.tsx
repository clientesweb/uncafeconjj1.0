"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Instagram, Youtube, Twitter, Clock, Calendar, Radio, Mic2, Play, ExternalLink } from "lucide-react"
import { TikTok } from "./tiktok-icon"
import { YouTubeVideosSection } from "./components/youtube-videos-section"
import { MobileMenu } from "./components/mobile-menu"
import { WhatsAppButton } from "./components/whatsapp-button"
import { StructuredData } from "./components/structured-data"
import { TopBanner } from "./components/top-banner"
import { LiveStreamPlayer } from "./components/live-stream-player"
import { motion } from "framer-motion"

export default function LandingPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-gradient-to-b from-[#0f0f1e] to-[#1a1a2e]">
      <StructuredData />
      <TopBanner />

      {/* Header */}
      <header
        className="sticky top-0 z-50 w-full border-b border-[#e9b11a]/10 bg-[#0f0f1e]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f0f1e]/60"
        role="banner"
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <MobileMenu />
            <Link href="/" className="flex items-center gap-3" aria-label="Un Café con JJ - Inicio">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#e9b11a] p-0.5">
                <Image
                  src="/images/logo.png"
                  width={48}
                  height={48}
                  alt="Un Café con JJ Logo"
                  className="h-full w-full object-cover"
                  priority
                  quality={90}
                />
              </div>
              <span className="text-xl font-bold text-white">
                Un Café con <span className="text-[#e9b11a]">JJ</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex gap-8" role="navigation" aria-label="Navegación principal">
            <button
              onClick={() => scrollToSection("en-vivo")}
              className="text-sm font-medium text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] relative group"
            >
              EN VIVO
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e9b11a] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection("programa")}
              className="text-sm font-medium text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] relative group"
            >
              PROGRAMA
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e9b11a] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection("videos")}
              className="text-sm font-medium text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] relative group"
            >
              VIDEOS
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e9b11a] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-sm font-medium text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] relative group"
            >
              CONTACTO
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e9b11a] transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          <div className="hidden md:flex gap-4">
            <Button
              className="bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a2e] rounded-full"
              onClick={() => scrollToSection("en-vivo")}
            >
              <Play className="mr-2 h-4 w-4" />
              ESCÚCHANOS EN VIVO
            </Button>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1" role="main">
        {/* Hero Section with optimized image */}
        <section className="w-full border-b border-[#e9b11a]/10" aria-labelledby="hero-title">
          <div className="relative w-full h-[calc(100vh-4rem)] min-h-[600px]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FACEBOOK%20COVER%202025%20%281%29.png-VEqDybN3naytfynNcGkvNKgl6cbXqP.jpeg"
              alt="Jimmy Jairala presentando Un Café con JJ"
              priority
              quality={95}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPDY2ODYyTEhMR0BGRlNCRkJHYGFjYWM4OTtBV0VGUElGYWZYZFD/2wBDARUXFyAeIBogHh4gIiAyRzJHMkZGR0dGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkb/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0f0f1e]">
              <motion.div
                className="container h-full flex items-center px-4 md:px-6"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <div className="max-w-[600px]">
                  <motion.h1
                    id="hero-title"
                    className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none mb-4"
                    variants={fadeIn}
                  >
                    Un Café con <span className="text-[#e9b11a]">JJ</span>
                  </motion.h1>
                  <motion.p className="text-[#e9b11a] md:text-xl mb-2 font-semibold" variants={fadeIn}>
                    TRINCHERA DEL PENSAMIENTO LIBRE
                  </motion.p>
                  <motion.p className="text-gray-200 md:text-xl mb-8" variants={fadeIn}>
                    Noticias, análisis y opinión con Jimmy Jairala.
                  </motion.p>
                  <motion.div className="flex flex-col gap-3 sm:flex-row mb-8" variants={fadeIn}>
                    <Button
                      size="lg"
                      className="h-12 bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a2e] rounded-full"
                      onClick={() => scrollToSection("en-vivo")}
                    >
                      <Play className="mr-2 h-5 w-5" />
                      VER EN VIVO
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 text-white border-[#e9b11a] hover:bg-[#e9b11a]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a2e] rounded-full"
                      onClick={() => scrollToSection("programa")}
                    >
                      PROGRAMACIÓN
                    </Button>
                  </motion.div>
                  <motion.div
                    className="flex flex-wrap gap-5"
                    role="list"
                    aria-label="Redes sociales"
                    variants={fadeIn}
                  >
                    <Link
                      href="https://facebook.com/uncafeconjj"
                      className="text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-2 bg-[#1a1a2e]/50 hover:bg-[#1a1a2e] backdrop-blur-sm"
                      aria-label="Síguenos en Facebook"
                    >
                      <Facebook className="h-5 w-5" aria-hidden="true" />
                    </Link>
                    <Link
                      href="https://instagram.com/uncafeconjj"
                      className="text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-2 bg-[#1a1a2e]/50 hover:bg-[#1a1a2e] backdrop-blur-sm"
                      aria-label="Síguenos en Instagram"
                    >
                      <Instagram className="h-5 w-5" aria-hidden="true" />
                    </Link>
                    <Link
                      href="https://youtube.com/uncafeconjj"
                      className="text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-2 bg-[#1a1a2e]/50 hover:bg-[#1a1a2e] backdrop-blur-sm"
                      aria-label="Síguenos en YouTube"
                    >
                      <Youtube className="h-5 w-5" aria-hidden="true" />
                    </Link>
                    <Link
                      href="https://twitter.com/uncafeconjj"
                      className="text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-2 bg-[#1a1a2e]/50 hover:bg-[#1a1a2e] backdrop-blur-sm"
                      aria-label="Síguenos en Twitter"
                    >
                      <Twitter className="h-5 w-5" aria-hidden="true" />
                    </Link>
                    <Link
                      href="#"
                      className="text-white hover:text-[#e9b11a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-2 bg-[#1a1a2e]/50 hover:bg-[#1a1a2e] backdrop-blur-sm"
                      aria-label="Síguenos en TikTok"
                    >
                      <TikTok className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Live Stream Section */}
        <section id="en-vivo" className="w-full py-16 md:py-24 lg:py-32" aria-labelledby="live-title">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center rounded-full bg-[#e9b11a]/10 px-3 py-1 text-sm font-medium text-[#e9b11a] mb-2">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e9b11a] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e9b11a]"></span>
                </span>
                EN DIRECTO
              </div>
              <div className="space-y-2">
                <h2 id="live-title" className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">
                  TRANSMISIÓN EN VIVO
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Sintoniza nuestro programa en directo de lunes a viernes de 6:00 a 8:00 a.m.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="mx-auto w-full max-w-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LiveStreamPlayer streamUrl="https://player.castr.com/d_8aea6c10d99811efb5ebf7655896c5a7" />
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button
                  variant="outline"
                  className="text-white border-[#e9b11a] hover:bg-[#e9b11a]/10 rounded-full"
                  onClick={() => window.open("https://www.youtube.com/uncafeconjj", "_blank")}
                >
                  <Youtube className="mr-2 h-4 w-4" />
                  Ver en YouTube
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-[#e9b11a] hover:bg-[#e9b11a]/10 rounded-full"
                  onClick={() => window.open("https://www.facebook.com/uncafeconjj", "_blank")}
                >
                  <Facebook className="mr-2 h-4 w-4" />
                  Ver en Facebook
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Program Info Section */}
        <section
          id="programa"
          className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0f0f1e] to-[#111122]"
          aria-labelledby="program-title"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center rounded-full bg-[#e9b11a]/10 px-3 py-1 text-sm font-medium text-[#e9b11a] mb-2">
                INFORMACIÓN
              </div>
              <div className="space-y-2">
                <h2 id="program-title" className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">
                  SOBRE EL PROGRAMA
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Un espacio de análisis, opinión y debate sobre la actualidad nacional e internacional.
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                className="flex flex-col justify-center space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Nuestro Presentador</h3>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-5">
                      <div className="rounded-full bg-[#e9b11a]/20 p-3">
                        <Mic2 className="h-6 w-6 text-[#e9b11a]" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#e9b11a]">Jimmy Jairala</h4>
                        <p className="text-gray-400 mt-2">
                          Periodista y analista político con amplia experiencia en medios de comunicación y una visión
                          crítica de la realidad nacional e internacional.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="grid gap-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-[#1a1a2e]/50 border-[#e9b11a]/10 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-5">
                      <div className="rounded-full bg-[#e9b11a]/20 p-3">
                        <Calendar className="h-6 w-6 text-[#e9b11a]" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Días de Emisión</h4>
                        <p className="text-gray-400 mt-2">Lunes a Viernes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1a2e]/50 border-[#e9b11a]/10 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-5">
                      <div className="rounded-full bg-[#e9b11a]/20 p-3">
                        <Clock className="h-6 w-6 text-[#e9b11a]" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Horario</h4>
                        <p className="text-gray-400 mt-2">6:00 a 8:00 a.m.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1a2e]/50 border-[#e9b11a]/10 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-5">
                      <div className="rounded-full bg-[#e9b11a]/20 p-3">
                        <Radio className="h-6 w-6 text-[#e9b11a]" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Sintoniza</h4>
                        <p className="text-gray-400 mt-2">Kocodrilo Radio 94.5 FM</p>
                        <p className="text-gray-400">Café Radio 91.7 MHz</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* YouTube Videos Section */}
        <section
          id="videos"
          className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#111122] to-[#0f0f1e]"
          aria-labelledby="videos-title"
        >
          <div className="container px-4 md:px-6 mb-12">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center rounded-full bg-[#e9b11a]/10 px-3 py-1 text-sm font-medium text-[#e9b11a] mb-2">
                MULTIMEDIA
              </div>
              <div className="space-y-2">
                <h2 id="videos-title" className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">
                  NUESTROS VIDEOS
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Mira los últimos episodios y momentos destacados de Un Café con JJ.
                </p>
              </div>
            </motion.div>
          </div>
          <YouTubeVideosSection
            regularPlaylistId="PLSwBXxeopk-xySzecvVbfGTqnCTi8QhtE"
            shortsPlaylistId="PLSwBXxeopk-xUhmNW4jOBi8Olkr_4p2Rc"
            apiKey="AIzaSyBcNo4pMTbFhTs8RKujYFfNSo_HbIP9f7E"
          />
        </section>

        {/* CTA Section */}
        <section
          id="contacto"
          className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0f0f1e] to-[#111122]"
          aria-labelledby="contact-title"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center rounded-full bg-[#e9b11a]/10 px-3 py-1 text-sm font-medium text-[#e9b11a] mb-2">
                COMUNIDAD
              </div>
              <div className="space-y-2">
                <h2 id="contact-title" className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">
                  SÍGUENOS EN REDES SOCIALES
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Mantente informado y participa en nuestras conversaciones.
                </p>
              </div>
              <div className="flex gap-6 pt-6" role="list" aria-label="Redes sociales">
                <Link
                  href="https://facebook.com/uncafeconjj"
                  className="text-white hover:text-[#e9b11a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-3 bg-[#1a1a2e]/50 hover:bg-[#1a1a2e] transition-all duration-300 transform hover:scale-110"
                  aria-label="Síguenos en Facebook"
                >
                  <Facebook className="h-7 w-7" aria-hidden="true" />
                </Link>
                <Link
                  href="https://instagram.com/uncafeconjj"
                  className="text-white hover:text-[#e9b11a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-3 bg-[#1a1a2e]/50 hover:bg-[#1a1a2e] transition-all duration-300 transform hover  rounded-full p-3 bg-[#1a1a2e]/50 hover:bg-[#1a1a2e] transition-all duration-300 transform hover:scale-110"
                  aria-label="Síguenos en Instagram"
                >
                  <Instagram className="h-7 w-7" aria-hidden="true" />
                </Link>
                <Link
                  href="https://youtube.com/uncafeconjj"
                  className="text-white hover:text-[#e9b11a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-3 bg-[#1a1a2e]/50 hover:bg-[#1a1a2e] transition-all duration-300 transform hover:scale-110"
                  aria-label="Síguenos en YouTube"
                >
                  <Youtube className="h-7 w-7" aria-hidden="true" />
                </Link>
                <Link
                  href="https://twitter.com/uncafeconjj"
                  className="text-white hover:text-[#e9b11a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-3 bg-[#1a1a2e]/50 hover:bg-[#1a1a2e] transition-all duration-300 transform hover:scale-110"
                  aria-label="Síguenos en Twitter"
                >
                  <Twitter className="h-7 w-7" aria-hidden="true" />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-[#e9b11a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] rounded-full p-3 bg-[#1a1a2e]/50 hover:bg-[#1a1a2e] transition-all duration-300 transform hover:scale-110"
                  aria-label="Síguenos en TikTok"
                >
                  <TikTok className="h-7 w-7" aria-hidden="true" />
                </Link>
              </div>
              <div className="pt-6">
                <p className="text-gray-400">@UnCafeConJJ - @jimmyjairala</p>
              </div>
              <div className="mt-8">
                <Button
                  className="bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9b11a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a2e] rounded-full"
                  onClick={() => window.open("https://wa.me/593992282860", "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  CONTÁCTANOS
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        <WhatsAppButton />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#e9b11a]/10 bg-[#0f0f1e]" role="contentinfo">
        <div className="container flex flex-col gap-8 py-12 px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#e9b11a] p-0.5">
                <Image
                  src="/images/logo.png"
                  width={48}
                  height={48}
                  alt="Un Café con JJ Logo"
                  className="h-full w-full object-cover"
                  quality={90}
                />
              </div>
              <span className="text-xl font-bold text-white">
                Un Café con <span className="text-[#e9b11a]">JJ</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Image
                src="/images/altavoz.png"
                width={120}
                height={40}
                alt="ALTAVOZ Logo"
                className="h-10"
                quality={90}
              />
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

