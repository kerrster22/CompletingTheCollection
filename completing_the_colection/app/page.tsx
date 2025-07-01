"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FilmReelAnimation } from "@/components/film-reel-animation"
import { AudioPlayer } from "@/components/audio-player"
import { LoadingScreen } from "@/components/loading-screen"
import { FilmGrainOverlay } from "@/components/film-grain-overlay"

export default function HomePage() {
  const [showLoading, setShowLoading] = useState(true)

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  return (
    <>
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div className="min-h-screen bg-criterion-bg text-criterion-text">
        <Navigation />

        {/* Hero Section with Film Grain */}
        <section className="relative py-20 px-4 overflow-hidden">
          <FilmGrainOverlay />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <FilmReelAnimation className="mx-auto mb-6" />
              <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-tight">Completing the Collection</h1>
              <div className="criterion-divider w-24 mx-auto mb-6"></div>
              <p className="text-xl md:text-2xl font-light text-criterion-accent tracking-wide">
                Watch. Read. Play. Listen. Complete.
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-lg leading-relaxed text-criterion-text/80">
                A podcast where I finally experience the films in my collection, chosen at random via a wheel spin. Join
                me on this journey through cinema as I discover hidden gems, revisit classics, and complete my
                collection one film at a time.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="criterion-button bg-criterion-red hover:bg-criterion-blue text-white font-medium px-8 py-3 text-lg border-0"
            >
              <Link href="/submit">Submit a Film to the Community Spin</Link>
            </Button>
          </div>
        </section>

        {/* Latest Episode */}
        <section className="py-16 px-4 border-t-2 border-criterion-blue">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light mb-4">Latest Episode</h2>
              <div className="criterion-divider w-16 mx-auto"></div>
            </div>

            <Card className="criterion-border bg-criterion-card mb-8">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-medium mb-3 text-criterion-red">Episode 12: The Seventh Seal</h3>
                    <p className="text-criterion-text/80 mb-6 leading-relaxed">
                      Bergman's masterpiece gets the wheel treatment. Death, chess, and existential dread — everything
                      you need for a cozy Sunday afternoon film.
                    </p>
                    <div className="flex gap-4">
                      <Button className="criterion-button bg-criterion-red hover:bg-criterion-blue text-white border-0">
                        <Play className="w-4 h-4 mr-2" />
                        Listen Now
                      </Button>
                      <Button
                        variant="outline"
                        className="criterion-button border-criterion-accent text-criterion-accent hover:bg-criterion-accent hover:text-criterion-bg"
                      >
                        Watch on YouTube
                      </Button>
                    </div>
                  </div>
                  <div className="relative aspect-video criterion-border overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="The Seventh Seal episode thumbnail"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button
                        size="icon"
                        className="w-16 h-16 rounded-full bg-criterion-red hover:bg-criterion-blue text-white border-0"
                      >
                        <Play className="w-6 h-6 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AudioPlayer src="https://example.com/podcast/ep12.mp3" title="The Seventh Seal" episodeNumber={12} />
          </div>
        </section>

        {/* Film Collection Preview with Film Grain */}
        <section className="relative py-16 px-4 border-t-2 border-criterion-blue overflow-hidden">
          <FilmGrainOverlay />
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-light mb-4">Film Collection</h2>
                <div className="criterion-divider w-16"></div>
              </div>
              <Button
                asChild
                variant="outline"
                className="criterion-button border-criterion-accent text-criterion-accent hover:bg-criterion-accent hover:text-criterion-bg"
              >
                <Link href="/films" className="flex items-center gap-2">
                  View All Films
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { title: "The Seventh Seal", director: "Ingmar Bergman", year: 1957 },
                { title: "Mulholland Drive", director: "David Lynch", year: 2001 },
                { title: "2001: A Space Odyssey", director: "Stanley Kubrick", year: 1968 },
                { title: "Persona", director: "Ingmar Bergman", year: 1966 },
                { title: "Vertigo", director: "Alfred Hitchcock", year: 1958 },
                { title: "8½", director: "Federico Fellini", year: 1963 },
              ].map((film, index) => (
                <div key={index} className="relative aspect-[2/3] criterion-border overflow-hidden group">
                  <Image src={`/placeholder.svg?height=450&width=300`} alt={film.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-white text-sm font-medium">{film.title}</h3>
                    <p className="text-white/70 text-xs">
                      {film.director}, {film.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Community Submissions */}
        <section className="py-16 px-4 border-t-2 border-criterion-blue">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-light mb-4">Recent Community Submissions</h2>
                <div className="criterion-divider w-16"></div>
              </div>
              <Button
                asChild
                variant="outline"
                className="criterion-button border-criterion-accent text-criterion-accent hover:bg-criterion-accent hover:text-criterion-bg"
              >
                <Link href="/submit" className="flex items-center gap-2">
                  View All & Submit
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Mulholland Drive", submittedBy: "CinemaLover92", comment: "Lynch's puzzle box masterpiece" },
                {
                  title: "The Cook, the Thief, His Wife & Her Lover",
                  submittedBy: "ArtHouseFan",
                  comment: "Greenaway's visual feast",
                },
                { title: "Stalker", submittedBy: "TarkovskyTime", comment: "Philosophical sci-fi at its finest" },
              ].map((submission, index) => (
                <Card
                  key={index}
                  className="criterion-border bg-criterion-card hover:bg-criterion-card/80 transition-colors"
                >
                  <CardContent className="p-6">
                    <h3 className="font-medium text-criterion-red mb-2 text-lg">{submission.title}</h3>
                    <p className="text-sm text-criterion-accent mb-3">Submitted by {submission.submittedBy}</p>
                    <p className="text-sm text-criterion-text/70">{submission.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* New to the Collection */}
        <section className="py-16 px-4 border-t-2 border-criterion-blue">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-4">New to the Collection</h2>
            <div className="criterion-divider w-16 mx-auto mb-8"></div>
            <p className="text-criterion-text/80 mb-8">Recently added films that could come up on the wheel</p>

            <div className="grid md:grid-cols-4 gap-4">
              {["Persona", "8½", "The Rules of the Game", "Tokyo Story"].map((film, index) => (
                <div key={index} className="criterion-border bg-criterion-card p-4 text-center">
                  <p className="font-medium text-criterion-text">{film}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
