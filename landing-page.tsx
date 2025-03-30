"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Clock,
  Calendar,
  Radio,
  Mic2,
  Play,
  ExternalLink,
  ArrowRight,
  Menu,
  Download,
} from "lucide-react"
import { TikTok } from "./tiktok-icon"
import { YouTubeVideosSection } from "./components/youtube-videos-section"
import { WhatsAppButton } from "./components/whatsapp-button"
import { StructuredData } from "./components/structured-data"
import { TopBanner } from "./components/top-banner"
import { LiveStreamPlayer } from "./components/live-stream-player"
import { YouTubeSubscribeBanner } from "./components/youtube-subscribe-banner"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePWAInstall } from "@/hooks/use-pwa-install"

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const liveRef = useRef<HTMLDivElement>(null)
  const programRef = useRef<HTMLDivElement>(null)
  const videosRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Parallax effect for hero section
  const { scrollY } = useScroll()
  const heroImageY = useTransform(scrollY, [0, 500], [0, 150])
  const heroTextY = useTransform(scrollY, [0, 500], [0, -50])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  // Channel info
  const channelId = "UCc4fHgV3zRgjHxYZJkQdxhw"
  const channelUrl = "https://youtube.com/@jimmyjairala?si=MdNCk5wxBTHMeLOF"

  // PWA Install Hook
  const { isInstallable, install } = usePWAInstall()

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // Update header background
      if (scrollPosition > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Update active section
      const sections = [
        { ref: heroRef, id: "hero" },
        { ref: liveRef, id: "en-vivo" },
        { ref: programRef, id: "programa" },
        { ref: videosRef, id: "videos" },
        { ref: contactRef, id: "contacto" },
      ]

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setIsMenuOpen(false)
    }
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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

  const navItems = [
    { id: "en-vivo", label: "EN VIVO" },
    { id: "programa", label: "PROGRAMA" },
    { id: "videos", label: "VIDEOS" },
    { id: "contacto", label: "CONTACTO" },
  ]

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#0f0f1e]">
      <StructuredData />
      <TopBanner />

      {/* Header - Modern Sticky with Glassmorphism */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-[#0f0f1e]/80 backdrop-blur-md border-b border-[#e9b11a]/10" : "bg-[#0f0f1e]"
        }`}
        role="banner"
      >
        <div className="container flex h-20 items-center justify-between">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] bg-gradient-to-b from-[#0f0f1e] to-[#1a1a2e] border-[#e9b11a]/10"
              >
                <div className="flex items-center gap-3 mt-4 mb-8">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#e9b11a] p-0.5">
                    <Image
                      src="/images/logo.png"
                      width={40}
                      height={40}
                      alt="Un Café con JJ Logo"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-lg font-bold text-white">
                    Un Café con <span className="text-[#e9b11a]">JJ</span>
                  </span>
                </div>
                <nav className="flex flex-col gap-6 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-lg font-medium transition-colors relative group ${
                        activeSection === item.id ? "text-[#e9b11a]" : "text-white hover:text-[#e9b11a]"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-[#e9b11a] transition-all duration-300 ${
                          activeSection === item.id ? "w-1/4" : "w-0 group-hover:w-1/4"
                        }`}
                      ></span>
                    </button>
                  ))}
                  <Button
                    className="mt-6 bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80 rounded-full"
                    onClick={() => scrollToSection("en-vivo")}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    ESCÚCHANOS EN VIVO
                  </Button>

                  {/* Install button for mobile */}
                  {isInstallable && (
                    <Button
                      onClick={install}
                      variant="outline"
                      className="mt-4 text-white border-[#e9b11a] hover:bg-[#e9b11a]/10 rounded-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Instalar App
                    </Button>
                  )}
                </nav>
                <div className="absolute bottom-8 left-6 right-6">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      <Link
                        href="https://facebook.com/uncafeconjj"
                        className="text-white hover:text-[#e9b11a] transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://instagram.com/uncafeconjj"
                        className="text-white hover:text-[#e9b11a] transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://youtube.com/uncafeconjj"
                        className="text-white hover:text-[#e9b11a] transition-colors"
                        aria-label="YouTube"
                      >
                        <Youtube className="h-5 w-5" />
                      </Link>
                    </div>
                    <p className="text-xs text-gray-400">@UnCafeConJJ</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3" aria-label="Un Café con JJ - Inicio">
              <motion.div
                className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#e9b11a] p-0.5"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/images/logo.png"
                  width={48}
                  height={48}
                  alt="Un Café con JJ Logo"
                  className="h-full w-full object-cover"
                  priority
                  quality={90}
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  Un Café con <span className="text-[#e9b11a]">JJ</span>
                </span>
                <span className="text-xs text-gray-300">TRINCHERA DEL PENSAMIENTO LIBRE</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8" role="navigation" aria-label="Navegación principal">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors relative group ${
                  activeSection === item.id ? "text-[#e9b11a]" : "text-white hover:text-[#e9b11a]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#e9b11a] transition-all duration-300 ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80 rounded-full"
                onClick={() => scrollToSection("en-vivo")}
              >
                <Play className="mr-2 h-4 w-4" />
                ESCÚCHANOS EN VIVO
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1" role="main">
        {/* Hero Section - Modern with Parallax */}
        <section
          id="hero"
          ref={heroRef}
          className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden"
          aria-labelledby="hero-title"
        >
          <motion.div className="absolute inset-0 z-0" style={{ y: heroImageY }}>
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
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADc/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPDY2ODYyTEhMR0BGRlNCRkJHYGFjYWM4OTtBV0VGUElGYWZYZFD/2wBDARUXFyAeIBogHh4gIiAyRzJHMkZGR0dGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkb/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0f0f1e] z-10"></div>

          {/* Hero Content */}
          <motion.div
            className="container relative z-20 px-4 md:px-6 flex flex-col items-start"
            style={{ y: heroTextY, opacity: heroOpacity }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="max-w-[600px]" variants={fadeInUp}>
              {/* Live badge */}
              <motion.div
                className="inline-flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white mb-6"
                variants={fadeInUp}
              >
                <span className="w-2 h-2 bg-[#e9b11a] rounded-full mr-2"></span>
                Transmisión en vivo de lunes a viernes
              </motion.div>

              <motion.h1
                id="hero-title"
                className="text-5xl font-bold tracking-tighter text-white sm:text-6xl xl:text-7xl/none mb-4"
                variants={fadeInUp}
              >
                Un Café con <span className="text-[#e9b11a]">JJ</span>
              </motion.h1>

              <motion.p className="text-gray-200 md:text-xl mb-8 leading-relaxed" variants={fadeInUp}>
                Análisis político, noticias y opinión con Jimmy Jairala. El espacio donde la actualidad se discute con
                profundidad y sin censura.
              </motion.p>

              <motion.div className="flex flex-col gap-3 sm:flex-row mb-8" variants={fadeInUp}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="h-12 bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80 rounded-full"
                    onClick={() => scrollToSection("en-vivo")}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    VER EN VIVO
                  </Button>
                </motion.div>
              </motion.div>

              {/* About program link */}
              <motion.div className="mt-16" variants={fadeInUp}>
                <Button
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 rounded-full group"
                  onClick={() => scrollToSection("programa")}
                >
                  SOBRE EL PROGRAMA
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Live Stream Section - Modern with Floating Elements */}
        <section
          id="en-vivo"
          ref={liveRef}
          className="w-full py-20 md:py-28 relative overflow-hidden"
          aria-labelledby="live-title"
        >
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#e9b11a]/5 blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 15, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-[#e9b11a]/10 blur-3xl"
              animate={{
                x: [0, -30, 0],
                y: [0, 50, 0],
              }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "easeInOut" }}
            />
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center justify-center rounded-full bg-[#e9b11a]/10 px-3 py-1 text-sm font-medium text-[#e9b11a] mb-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e9b11a] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e9b11a]"></span>
                </span>
                EN DIRECTO
              </motion.div>
              <div className="space-y-2">
                <motion.h2
                  id="live-title"
                  className="text-4xl font-bold tracking-tighter text-white md:text-5xl/tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  TRANSMISIÓN EN VIVO
                </motion.h2>
                <motion.p
                  className="mx-auto max-w-[700px] text-gray-400 md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Sintoniza nuestro programa en directo de lunes a viernes de 6:00 a 8:00 a.m.
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              className="mx-auto w-full max-w-5xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <LiveStreamPlayer streamUrl="https://player.castr.com/d_8aea6c10d99811efb5ebf7655896c5a7" />
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {[
                  { icon: Youtube, label: "Ver en YouTube", url: "https://www.youtube.com/uncafeconjj" },
                  { icon: Facebook, label: "Ver en Facebook", url: "https://www.facebook.com/uncafeconjj" },
                ].map((platform) => (
                  <motion.div key={platform.label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="text-white border-[#e9b11a] hover:bg-[#e9b11a]/10 rounded-full"
                      onClick={() => window.open(platform.url, "_blank")}
                    >
                      <platform.icon className="mr-2 h-4 w-4" />
                      {platform.label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Program Info Section - Modern with Cards */}
        <section
          id="programa"
          ref={programRef}
          className="w-full py-20 md:py-28 bg-gradient-to-b from-[#0f0f1e] to-[#111122] relative overflow-hidden"
          aria-labelledby="program-title"
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#e9b11a]/5 to-transparent opacity-50 pointer-events-none" />

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center justify-center rounded-full bg-[#e9b11a]/10 px-3 py-1 text-sm font-medium text-[#e9b11a] mb-2"
                whileHover={{ scale: 1.05 }}
              >
                INFORMACIÓN
              </motion.div>
              <div className="space-y-2">
                <motion.h2
                  id="program-title"
                  className="text-4xl font-bold tracking-tighter text-white md:text-5xl/tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  SOBRE EL PROGRAMA
                </motion.h2>
                <motion.p
                  className="mx-auto max-w-[700px] text-gray-400 md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Un espacio de análisis, opinión y debate sobre la actualidad nacional e internacional.
                </motion.p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Left Column - Host Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-8"
              >
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#e9b11a]/20 rounded-full blur-xl" />
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-6">Nuestro Presentador</h3>
                    <div className="flex items-start gap-6 bg-[#1a1a2e]/50 backdrop-blur-sm p-6 rounded-2xl border border-[#e9b11a]/10">
                      <div className="rounded-full bg-[#e9b11a]/20 p-4 shrink-0">
                        <Mic2 className="h-8 w-8 text-[#e9b11a]" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-[#e9b11a]">Jimmy Jairala</h4>
                        <p className="text-gray-300 mt-3 leading-relaxed">
                          Periodista y analista político con amplia experiencia en medios de comunicación y una visión
                          crítica de la realidad nacional e internacional. Conductor de Un Café con JJ, un espacio para
                          el análisis profundo y el debate constructivo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="mt-6 flex flex-col gap-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    className="bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80 rounded-full flex items-center justify-center w-full md:w-auto"
                    onClick={() => scrollToSection("en-vivo")}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    ESCUCHAR AHORA
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Column - Program Details */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid gap-6"
              >
                {[
                  {
                    icon: Calendar,
                    title: "Días de Emisión",
                    content: "Lunes a Viernes",
                    delay: 0.1,
                  },
                  {
                    icon: Clock,
                    title: "Horario",
                    content: "6:00 a 8:00 a.m.",
                    delay: 0.2,
                  },
                  {
                    icon: Radio,
                    title: "Sintoniza",
                    content: "Kocodrilo Radio 94.5 FM\nCafé Radio 91.7 MHz",
                    delay: 0.3,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: item.delay }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#1a1a2e]/50 border-[#e9b11a]/10 backdrop-blur-sm overflow-hidden shadow-lg shadow-black/20 hover:shadow-[#e9b11a]/5">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-5">
                          <div className="rounded-full bg-[#e9b11a]/20 p-4">
                            <item.icon className="h-7 w-7 text-[#e9b11a]" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white">{item.title}</h4>
                            {item.content.split("\n").map((line, i) => (
                              <p key={i} className="text-gray-300 mt-2">
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* YouTube Subscribe Banner - Modern with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <YouTubeSubscribeBanner channelUrl={channelUrl} />
        </motion.div>

        {/* YouTube Videos Section - Modern with Tabs */}
        <section
          id="videos"
          ref={videosRef}
          className="w-full py-20 md:py-28 bg-gradient-to-b from-[#111122] to-[#0f0f1e] relative overflow-hidden"
          aria-labelledby="videos-title"
        >
          {/* Background Elements */}
          <div className="absolute top-1/4 left-0 w-full h-1/2 bg-[#e9b11a]/5 skew-y-6 -z-10" />

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center justify-center rounded-full bg-[#e9b11a]/10 px-3 py-1 text-sm font-medium text-[#e9b11a] mb-2"
                whileHover={{ scale: 1.05 }}
              >
                MULTIMEDIA
              </motion.div>
              <div className="space-y-2">
                <motion.h2
                  id="videos-title"
                  className="text-4xl font-bold tracking-tighter text-white md:text-5xl/tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  NUESTROS VIDEOS
                </motion.h2>
                <motion.p
                  className="mx-auto max-w-[700px] text-gray-400 md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Mira los últimos episodios y momentos destacados de Un Café con JJ.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <YouTubeVideosSection
                channelId={channelId}
                apiKey="AIzaSyBcNo4pMTbFhTs8RKujYFfNSo_HbIP9f7E"
                hideTitle={true}
              />
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Modern with Gradient */}
        <section
          id="contacto"
          ref={contactRef}
          className="w-full py-20 md:py-28 bg-gradient-to-b from-[#0f0f1e] to-[#111122] relative overflow-hidden"
          aria-labelledby="contact-title"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0f0f1e] to-transparent pointer-events-none" />

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center justify-center rounded-full bg-[#e9b11a]/10 px-3 py-1 text-sm font-medium text-[#e9b11a] mb-2"
                whileHover={{ scale: 1.05 }}
              >
                COMUNIDAD
              </motion.div>
              <div className="space-y-2">
                <motion.h2
                  id="contact-title"
                  className="text-4xl font-bold tracking-tighter text-white md:text-5xl/tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  SÍGUENOS EN REDES SOCIALES
                </motion.h2>
                <motion.p
                  className="mx-auto max-w-[700px] text-gray-400 md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Mantente informado y participa en nuestras conversaciones.
                </motion.p>
              </div>

              <motion.div
                className="flex gap-6 pt-8"
                role="list"
                aria-label="Redes sociales"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {[
                  { icon: Facebook, href: "https://facebook.com/uncafeconjj", label: "Facebook", color: "bg-blue-600" },
                  {
                    icon: Instagram,
                    href: "https://instagram.com/uncafeconjj",
                    label: "Instagram",
                    color: "bg-pink-600",
                  },
                  { icon: Youtube, href: "https://youtube.com/uncafeconjj", label: "YouTube", color: "bg-red-600" },
                  { icon: Twitter, href: "https://twitter.com/uncafeconjj", label: "Twitter", color: "bg-blue-400" },
                  { icon: TikTok, href: "#", label: "TikTok", color: "bg-black" },
                ].map((social, index) => (
                  <motion.div
                    key={social.label}
                    whileHover={{
                      scale: 1.2,
                      rotate: 5,
                      boxShadow: "0 0 15px rgba(233, 177, 26, 0.5)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      href={social.href}
                      className={`flex items-center justify-center h-14 w-14 text-white rounded-full p-3 bg-[#1a1a2e] hover:bg-[#e9b11a] hover:text-[#1a1a2e] transition-all duration-300 shadow-lg`}
                      aria-label={`Síguenos en ${social.label}`}
                    >
                      <social.icon className="h-7 w-7" aria-hidden="true" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-gray-400">@UnCafeConJJ - @jimmyjairala</p>
              </motion.div>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80 rounded-full px-8 py-6 text-lg"
                  onClick={() => window.open("https://wa.me/593992282860", "_blank")}
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  CONTÁCTANOS
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <WhatsAppButton />
      </main>

      {/* Footer - Modern with Animation */}
      <footer className="w-full border-t border-[#e9b11a]/10 bg-[#0f0f1e]" role="contentinfo">
        <div className="container flex flex-col gap-8 py-12 px-4 md:px-6">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#e9b11a] p-0.5"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image
                  src="/images/logo.png"
                  width={48}
                  height={48}
                  alt="Un Café con JJ Logo"
                  className="h-full w-full object-cover"
                  quality={90}
                />
              </motion.div>
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
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

