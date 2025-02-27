export function StructuredData() {
  const radioShow = {
    "@context": "https://schema.org",
    "@type": "RadioSeries",
    name: "Un Café con JJ",
    description: "Programa de análisis político y actualidad nacional e internacional con Jimmy Jairala",
    broadcaster: [
      {
        "@type": "RadioStation",
        name: "Kocodrilo Radio 94.5 FM",
      },
      {
        "@type": "RadioStation",
        name: "Café Radio 91.7 MHz",
      },
    ],
    timeRequired: "PT2H",
    frequency: "P1D",
    actor: [
      {
        "@type": "Person",
        name: "Jimmy Jairala",
        jobTitle: "Presentador",
      },
    ],
    inLanguage: "es",
    genre: ["News", "Politics", "Talk Show"],
    publication: {
      "@type": "BroadcastEvent",
      isLiveBroadcast: true,
      startDate: "T06:00:00-05:00",
      endDate: "T08:00:00-05:00",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(radioShow),
      }}
    />
  )
}

