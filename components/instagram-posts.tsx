import { InstagramEmbed } from "./instagram-embed"

export function InstagramPosts() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#111122]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">SÍGUENOS EN INSTAGRAM</h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
              Mantente conectado con las últimas publicaciones de Un Café con JJ.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1100px] place-items-center">
          <InstagramEmbed postUrl="https://www.instagram.com/p/DGigXykR13T/" />
          <InstagramEmbed postUrl="https://www.instagram.com/p/DGiY18vxPB7/" />
        </div>
      </div>
    </section>
  )
}

