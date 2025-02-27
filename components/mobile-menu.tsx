import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "EN VIVO", href: "#en-vivo" },
  { name: "PROGRAMA", href: "#programa" },
  { name: "NOTICIAS", href: "#twitter" },
  { name: "VIDEOS", href: "#videos" },
  { name: "CONTACTO", href: "#contacto" },
]

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-[#1a1a2e] border-[#e9b11a]/20">
        <nav className="flex flex-col gap-4 mt-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg font-medium text-white hover:text-[#e9b11a] transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Button className="mt-4 bg-[#e9b11a] text-[#1a1a2e] hover:bg-[#e9b11a]/80">ESCÚCHANOS EN VIVO</Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

