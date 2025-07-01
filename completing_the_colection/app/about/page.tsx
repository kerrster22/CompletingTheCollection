import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Film, Gamepad2, BookOpen, Music, Shuffle, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-criterion-bg text-criterion-text">
      <Navigation />

      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">About the Show</h1>
            <div className="criterion-divider w-16 mx-auto mb-6"></div>
            <p className="text-xl text-criterion-text/80">
              The story behind the wheel, the collection, and the journey
            </p>
          </div>

          {/* Host Bio */}
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="md:col-span-1">
              <div className="relative aspect-square criterion-border overflow-hidden">
                <Image src="/placeholder.svg?height=400&width=400" alt="Host photo" fill className="object-cover" />
              </div>
            </div>

            <div className="md:col-span-2">
              <h2 className="text-3xl font-light mb-6 text-criterion-red">Meet Your Host</h2>
              <div className="space-y-6 text-criterion-text/80 leading-relaxed">
                <p>
                  Hi, I'm [Your Name], and I have a problem. Not with substances or gambling, but with collecting. Over
                  the years, I've amassed a substantial collection of films, books, games, and music that I've always
                  meant to experience "someday."
                </p>
                <p>That someday never came. Until now.</p>
                <p>
                  "Completing the Collection" started as a personal challenge to finally engage with the media I've been
                  hoarding. But rather than tackle it systematically (boring!), I decided to let fate decide through the
                  ancient art of wheel spinning.
                </p>
                <p>
                  What began as a solo journey has evolved into a community experience, with listeners contributing
                  their own recommendations to monthly community spins. Because apparently, I needed even more things to
                  add to my ever-growing collection.
                </p>
              </div>
            </div>
          </div>

          {/* The Wheel Format */}
          <Card className="criterion-border bg-criterion-card mb-20">
            <CardContent className="p-12">
              <div className="flex items-center gap-4 mb-8">
                <Shuffle className="w-8 h-8 text-criterion-red" />
                <h2 className="text-3xl font-light text-criterion-red">How the Wheel Works</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-medium mb-6 text-criterion-accent">The Process</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 criterion-border bg-criterion-red text-white text-sm font-bold flex items-center justify-center">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-criterion-text">Load the Wheel</p>
                        <p className="text-criterion-text/70 text-sm mt-1">
                          Add films from my collection to a digital wheel
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 criterion-border bg-criterion-red text-white text-sm font-bold flex items-center justify-center">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-criterion-text">Spin & Accept</p>
                        <p className="text-criterion-text/70 text-sm mt-1">
                          Whatever comes up, I watch - no skips, no excuses
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 criterion-border bg-criterion-red text-white text-sm font-bold flex items-center justify-center">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-criterion-text">Experience & Discuss</p>
                        <p className="text-criterion-text/70 text-sm mt-1">
                          Watch the film and share my thoughts in an episode
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 criterion-border bg-criterion-red text-white text-sm font-bold flex items-center justify-center">
                        4
                      </div>
                      <div>
                        <p className="font-medium text-criterion-text">Remove & Repeat</p>
                        <p className="text-criterion-text/70 text-sm mt-1">
                          Film gets removed from the wheel - one step closer to completion
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-6 text-criterion-accent">The Rules</h3>
                  <ul className="space-y-3 text-criterion-text/80">
                    <li className="flex items-start gap-3">
                      <Target className="w-4 h-4 text-criterion-red mt-0.5 flex-shrink-0" />
                      No skipping - whatever the wheel chooses, I watch
                    </li>
                    <li className="flex items-start gap-3">
                      <Target className="w-4 h-4 text-criterion-red mt-0.5 flex-shrink-0" />
                      No researching beforehand - go in blind
                    </li>
                    <li className="flex items-start gap-3">
                      <Target className="w-4 h-4 text-criterion-red mt-0.5 flex-shrink-0" />
                      Watch the entire film, no matter how painful
                    </li>
                    <li className="flex items-start gap-3">
                      <Target className="w-4 h-4 text-criterion-red mt-0.5 flex-shrink-0" />
                      Give every film a fair chance and honest review
                    </li>
                    <li className="flex items-start gap-3">
                      <Target className="w-4 h-4 text-criterion-red mt-0.5 flex-shrink-0" />
                      Community submissions get their own monthly wheel
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Plans */}
          <Card className="criterion-border bg-criterion-card">
            <CardContent className="p-12">
              <h2 className="text-3xl font-light mb-8 text-criterion-red text-center">The Future of the Collection</h2>
              <p className="text-criterion-text/80 mb-12 leading-relaxed text-center max-w-2xl mx-auto">
                While we're starting with films, the collection doesn't end there. The plan is to eventually expand to
                other media that's been gathering dust in my collection:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 criterion-border bg-criterion-red/20 flex items-center justify-center mx-auto mb-4">
                    <Film className="w-10 h-10 text-criterion-red" />
                  </div>
                  <h3 className="font-medium text-criterion-red mb-2 text-lg">Films</h3>
                  <p className="text-sm text-criterion-accent">Currently spinning</p>
                </div>

                <div className="text-center opacity-60">
                  <div className="w-20 h-20 criterion-border bg-criterion-blue/20 flex items-center justify-center mx-auto mb-4">
                    <Gamepad2 className="w-10 h-10 text-criterion-accent" />
                  </div>
                  <h3 className="font-medium text-criterion-accent mb-2 text-lg">Games</h3>
                  <p className="text-sm text-criterion-accent/70">Coming eventually</p>
                </div>

                <div className="text-center opacity-60">
                  <div className="w-20 h-20 criterion-border bg-criterion-blue/20 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-10 h-10 text-criterion-accent" />
                  </div>
                  <h3 className="font-medium text-criterion-accent mb-2 text-lg">Books</h3>
                  <p className="text-sm text-criterion-accent/70">Future plans</p>
                </div>

                <div className="text-center opacity-60">
                  <div className="w-20 h-20 criterion-border bg-criterion-blue/20 flex items-center justify-center mx-auto mb-4">
                    <Music className="w-10 h-10 text-criterion-accent" />
                  </div>
                  <h3 className="font-medium text-criterion-accent mb-2 text-lg">Music</h3>
                  <p className="text-sm text-criterion-accent/70">Someday maybe</p>
                </div>
              </div>

              <p className="text-criterion-accent text-center mt-12 italic">
                One wheel at a time, one collection at a time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
