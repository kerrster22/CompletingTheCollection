import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AudioPlayer } from "@/components/audio-player"
import { ArrowLeft, ExternalLink, Clock, Calendar, Star } from "lucide-react"

// This would typically come from a database or API
const getEpisode = (slug: string) => {
  const episodes = {
    "the-seventh-seal": {
      id: 12,
      title: "The Seventh Seal",
      director: "Ingmar Bergman",
      year: 1957,
      runtime: "96 min",
      date: "2024-01-08",
      description:
        "Bergman's masterpiece gets the wheel treatment. Death, chess, and existential dread - everything you need for a cozy Sunday afternoon film.",
      rating: 4.5,
      letterboxdUrl: "https://letterboxd.com/film/the-seventh-seal/",
      audioSrc: "https://example.com/podcast/ep12.mp3", // Placeholder URL
      showNotes: [
        "The famous chess game with Death scene and its cultural impact",
        "Bergman's exploration of faith and mortality in post-war Sweden",
        "The film's influence on everything from Bill & Ted to The Tree of Life",
        "Why this was perfect for a random wheel spin (spoiler: it wasn't)",
        "The surprising amount of humor in this 'serious' art film",
      ],
      quotes: [
        "Faith is a torment. It is like loving someone who is out there in the darkness but never appears.",
        "I want knowledge, not faith, not suppositions, but knowledge.",
      ],
      trivia: [
        "Shot in just 35 days during the summer of 1956",
        "The chess game was Bergman's addition - not in the original play",
        "Max von Sydow was only 27 when he played the knight",
      ],
    },
  }

  return episodes[slug as keyof typeof episodes] || null
}

export default function EpisodePage({ params }: { params: { slug: string } }) {
  const episode = getEpisode(params.slug)

  if (!episode) {
    return (
      <div className="min-h-screen bg-criterion-bg text-criterion-text flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Episode Not Found</h1>
          <Button asChild>
            <Link href="/episodes">Back to Episodes</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-criterion-bg text-criterion-text">
      <Navigation />

      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8 text-criterion-accent hover:text-criterion-red">
            <Link href="/episodes">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Episodes
            </Link>
          </Button>

          {/* Episode Header */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="relative aspect-[3/4] criterion-border overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=400"
                  alt={`${episode.title} poster`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-criterion-red text-criterion-red">
                  Episode {episode.id}
                </Badge>
                <div className="flex items-center gap-1 text-criterion-red">
                  {[...Array(Math.floor(episode.rating))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  {episode.rating % 1 !== 0 && <Star className="w-4 h-4 fill-current opacity-50" />}
                  <span className="ml-1 text-sm">{episode.rating}/5</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-2 text-criterion-red">{episode.title}</h1>
              <p className="text-xl text-criterion-text mb-4">
                {episode.director} • {episode.year}
              </p>

              <div className="flex items-center gap-6 text-criterion-accent mb-6">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {episode.runtime}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(episode.date).toLocaleDateString()}
                </div>
              </div>

              <p className="text-criterion-text/80 mb-6 leading-relaxed">{episode.description}</p>

              <Button
                asChild
                variant="outline"
                className="border-criterion-accent text-criterion-accent hover:bg-criterion-accent hover:text-criterion-bg"
              >
                <Link href={episode.letterboxdUrl} target="_blank">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Letterboxd
                </Link>
              </Button>
            </div>
          </div>

          {/* Audio Player */}
          <div className="mb-12">
            <AudioPlayer src={episode.audioSrc} title={episode.title} episodeNumber={episode.id} />
          </div>

          {/* Show Notes */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-criterion-card border-criterion-blue">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-criterion-red">Show Notes</h2>
                <ul className="space-y-3">
                  {episode.showNotes.map((note, index) => (
                    <li key={index} className="flex items-start gap-3 text-criterion-text/80">
                      <div className="w-2 h-2 bg-criterion-red rounded-full mt-2 flex-shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-criterion-card border-criterion-blue">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-criterion-red">Memorable Quotes</h3>
                  <div className="space-y-4">
                    {episode.quotes.map((quote, index) => (
                      <blockquote
                        key={index}
                        className="border-l-4 border-criterion-red pl-4 italic text-criterion-text/80"
                      >
                        "{quote}"
                      </blockquote>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-criterion-card border-criterion-blue">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-criterion-red">Film Trivia</h3>
                  <ul className="space-y-2">
                    {episode.trivia.map((fact, index) => (
                      <li key={index} className="text-criterion-text/80 text-sm">
                        • {fact}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
