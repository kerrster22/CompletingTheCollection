"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Play, Clock, Calendar, Search, ArrowRight } from "lucide-react"

const episodes = [
  {
    id: 12,
    title: "The Seventh Seal",
    director: "Ingmar Bergman",
    year: 1957,
    runtime: "96 min",
    date: "2024-01-08",
    description: "Bergman's masterpiece gets the wheel treatment. Death, chess, and existential dread.",
    slug: "the-seventh-seal",
  },
  {
    id: 11,
    title: "Mulholland Drive",
    director: "David Lynch",
    year: 2001,
    runtime: "147 min",
    date: "2024-01-01",
    description: "Lynch's puzzle box of Hollywood dreams and nightmares.",
    slug: "mulholland-drive",
  },
  {
    id: 10,
    title: "2001: A Space Odyssey",
    director: "Stanley Kubrick",
    year: 1968,
    runtime: "149 min",
    date: "2023-12-25",
    description: "Kubrick's cosmic journey through evolution and technology.",
    slug: "2001-a-space-odyssey",
  },
  {
    id: 9,
    title: "Persona",
    director: "Ingmar Bergman",
    year: 1966,
    runtime: "83 min",
    date: "2023-12-18",
    description: "Two women, one identity crisis, infinite interpretations.",
    slug: "persona",
  },
  {
    id: 8,
    title: "Vertigo",
    director: "Alfred Hitchcock",
    year: 1958,
    runtime: "128 min",
    date: "2023-12-11",
    description: "Hitchcock's obsessive masterpiece about love and manipulation.",
    slug: "vertigo",
  },
  {
    id: 7,
    title: "8½",
    director: "Federico Fellini",
    year: 1963,
    runtime: "138 min",
    date: "2023-12-04",
    description: "Fellini's meta-cinematic exploration of creative block.",
    slug: "8-and-a-half",
  },
]

export default function EpisodesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [filteredEpisodes, setFilteredEpisodes] = useState(episodes)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = episodes.filter(
      (episode) =>
        episode.title.toLowerCase().includes(term.toLowerCase()) ||
        episode.director.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredEpisodes(filtered)
  }

  const handleSort = (value: string) => {
    setSortBy(value)
    const sorted = [...filteredEpisodes].sort((a, b) => {
      switch (value) {
        case "title":
          return a.title.localeCompare(b.title)
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "runtime":
          return Number.parseInt(a.runtime) - Number.parseInt(b.runtime)
        default:
          return 0
      }
    })
    setFilteredEpisodes(sorted)
  }

  return (
    <div className="min-h-screen bg-criterion-bg text-criterion-text">
      <Navigation />

      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">All Episodes</h1>
            <div className="criterion-divider w-16 mx-auto mb-6"></div>
            <p className="text-xl text-criterion-text/80">
              Every film that's come up on the wheel, in order of completion
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-criterion-accent w-4 h-4" />
              <Input
                placeholder="Search episodes by title or director..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-criterion-card border-criterion-blue text-criterion-text placeholder:text-criterion-accent/60"
              />
            </div>
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-full md:w-48 bg-criterion-card border-criterion-blue text-criterion-text">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent className="bg-criterion-card border-criterion-blue">
                <SelectItem value="date">Latest First</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="runtime">Runtime</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Episodes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEpisodes.map((episode) => (
              <Card
                key={episode.id}
                className="criterion-border bg-criterion-card hover:bg-criterion-card/80 transition-all duration-300 group"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=200&width=300`}
                      alt={`${episode.title} poster`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        size="icon"
                        className="w-12 h-12 rounded-full bg-criterion-red hover:bg-criterion-blue text-white border-0"
                      >
                        <Play className="w-5 h-5 ml-0.5" />
                      </Button>
                    </div>
                    <div className="absolute top-3 left-3 bg-criterion-blue text-white text-xs px-2 py-1">
                      Episode {episode.id}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-medium text-xl mb-2 text-criterion-red group-hover:text-criterion-red transition-colors">
                      {episode.title}
                    </h3>
                    <p className="text-criterion-accent text-sm mb-3">
                      {episode.director} • {episode.year}
                    </p>
                    <p className="text-criterion-text/70 text-sm mb-6 leading-relaxed">{episode.description}</p>

                    <div className="flex items-center justify-between text-xs text-criterion-accent mb-6">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {episode.runtime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(episode.date).toLocaleDateString()}
                      </div>
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full criterion-button border-criterion-accent text-criterion-accent hover:bg-criterion-accent hover:text-criterion-bg"
                    >
                      <Link href={`/episodes/${episode.slug}`} className="flex items-center justify-center gap-2">
                        View Episode Details
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEpisodes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-criterion-accent text-lg">No episodes found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
