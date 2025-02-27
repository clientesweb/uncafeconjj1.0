import { InstagramEmbed } from "./instagram-embed"

export function InstagramPosts() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "540px", margin: "0 auto" }}>
      <InstagramEmbed postUrl="https://www.instagram.com/p/DGigXykR13T/" />
      <InstagramEmbed postUrl="https://www.instagram.com/p/DGiY18vxPB7/" />
    </div>
  )
}

