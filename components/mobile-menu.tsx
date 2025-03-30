"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Download, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePWAInstall } from "@/hooks/use-pwa-install"

const navigation = [
  { name: "EN VIVO", href: "#en-vivo" },
  { name: "PROGRAMA", href: "#programa" },
  { name: "VIDEOS", href: "#videos" },
  { name: "CONTACTO", href: "#contacto" },
]

export function MobileMenu() {
  const { isInstallable, install } = usePWAInstall()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-gradient-to-b from-[#0f0f1e] to-[#1a1a2e] border-[#e9b11a]/10">
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
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg font-medium text-white hover:text-[#e9b11a] transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e9b11a] transition-all duration-300 group-hover:w-1/4"></span>
            </Link>
          ))}
          <Button className="mt-6 bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80 rounded-full">
            <Play className="mr-2 h-4 w-4" />
            ESCÚCHANOS EN VIVO
          </Button>

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link
                href="https://instagram.com/uncafeconjj"
                className="text-white hover:text-[#e9b11a] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link
                href="https://youtube.com/uncafeconjj"
                className="text-white hover:text-[#e9b11a] transition-colors"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </Link>
            </div>
            <p className="text-xs text-gray-400">@UnCafeConJJ</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

