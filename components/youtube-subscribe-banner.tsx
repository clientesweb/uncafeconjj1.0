"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Youtube } from "lucide-react"
import { motion } from "framer-motion"

interface YouTubeSubscribeBannerProps {
  channelUrl: string
}

export function YouTubeSubscribeBanner({ channelUrl }: YouTubeSubscribeBannerProps) {
  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-r from-[#0f0f1e] to-[#111122]">
      <div className="container px-4 md:px-6">
        <motion.div
          className="relative overflow-hidden rounded-xl border-2 border-[#e9b11a] shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Banner de suscripción */}
          <div className="flex flex-col md:flex-row">
            {/* Imagen del banner */}
            <div className="relative w-full md:w-3/4 h-[200px] sm:h-[250px] md:h-[300px]">
              <Image
                src="/images/youtube-banner.png"
                alt="Un Café con JJ - Suscríbete a nuestro canal de YouTube"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </div>

            {/* Contenido de suscripción */}
            <div className="w-full md:w-1/4 bg-[#1a1a2e] p-6 md:p-8 flex flex-col justify-center">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">¿Te perdiste algún programa?</h3>
                <p className="text-gray-200">Suscríbete a nuestro canal y mira todos los programas completos.</p>
                <Button
                  onClick={() => window.open(channelUrl, "_blank")}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full w-full"
                >
                  <Youtube className="mr-2 h-5 w-5" />
                  Suscribirse
                </Button>
              </div>
            </div>
          </div>

          {/* Franja inferior con información adicional */}
          <div className="bg-[#e9b11a] py-3 px-4 md:px-6 flex justify-between items-center">
            <p className="text-[#1a1a2e] font-medium text-sm md:text-base">
              Canal oficial: <span className="font-bold">@jimmyjairala</span>
            </p>
            <p className="text-[#1a1a2e] font-medium text-sm md:text-base">Programas completos y exclusivos</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

