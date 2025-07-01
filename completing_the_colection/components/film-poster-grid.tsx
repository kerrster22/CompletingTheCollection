"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Star } from "lucide-react"
import { motion } from "framer-motion"

// Film data with Letterboxd links
const films = [
  {
    title: "The Seventh Seal",
    director: "Ingmar Bergman",
    year: 1957,
    poster: "/placeholder.svg?height=450&width=300",
    letterboxdUrl: "https://letterboxd.com/film/the-seventh-seal/",
    rating: 4.5,
    episodeNumber: 12,
  },
  {
    title: "Mulholland Drive",
    director: "David Lynch",
    year: 2001,
    poster: "/placeholder.svg?height=450&width=300",
    letterboxdUrl: "https://letterboxd.com/film/mulholland-drive/",
    rating: 4.8,
    episodeNumber: 11,
  },
  {
    title: "2001: A Space Odyssey",
    director: "Stanley Kubrick",
    year: 1968,
    poster: "/placeholder.svg?height=450&width=300",
    letterboxdUrl: "https://letterboxd.com/film/2001-a-space-odyssey/",
    rating: 5.0,
    episodeNumber: 10,
  },
  {
    title: "Persona",
    director: "Ingmar Bergman",
    year: 1966,
    poster: "/placeholder.svg?height=450&width=300",
    letterboxdUrl: "https://letterboxd.com/film/persona/",
    rating: 4.7,
    episodeNumber: 9,
  },
  {
    title: "Vertigo",
    director: "Alfred Hitchcock",
    year: 1958,
    poster: "/placeholder.svg?height=450&width=300",
    letterboxdUrl: "https://letterboxd.com/film/vertigo/",
    rating: 4.6,
    episodeNumber: 8,
  },
  {
    title: "8½",
    director: "Federico Fellini",
    year: 1963,
    poster: "/placeholder.svg?height=450&width=300",
    letterboxdUrl: "https://letterboxd.com/film/8/",
    rating: 4.9,
    episodeNumber: 7,
  },
  {
    title: "Tokyo Story",
    director: "Yasujirō Ozu",
    year: 1953,
    poster: "/placeholder.svg?height=450&width=300",
    letterboxdUrl: "https://letterboxd.com/film/tokyo-story/",
    rating: 4.8,
    episodeNumber: 6,
  },
  {
    title: "In the Mood for Love",
    director: "Wong Kar-wai",
    year: 2000,
    poster: "/placeholder.svg?height=450&width=300",
    letterboxdUrl: "https://letterboxd.com/film/in-the-mood-for-love/",
    rating: 4.7,
    episodeNumber: 5,
  },
  {
    title: "Stalker",
    director: "Andrei Tarkovsky",
    year: 1979,
    poster: "/placeholder.svg?height=450&width=300",
    letterboxdUrl: "https://letterboxd.com/film/stalker/",
    rating: 4.8,
    episodeNumber: 4,
  },
  {
    title: "Breathless",
    director: "Jean-Luc Godard",
    year: 1960,
    poster: "/placeholder.svg?height=450&width=300",
    letterboxdUrl: "https://letterboxd.com/film/breathless-1960/",
    rating: 4.5,
    episodeNumber: 3,
  },
  {
    title: "Seven Samurai",
    director: "Akira Kurosawa",
    year: 1954,
    poster: "/placeholder.svg?height=450&width=300",
    letterboxdUrl: "https://letterboxd.com/film/seven-samurai/",
    rating: 4.9,
    episodeNumber: 2,
  },
  {
    title: "Bicycle Thieves",
    director: "Vittorio De Sica",
    year: 1948,
    poster: "/placeholder.svg?height=450&width=300",
    letterboxdUrl: "https://letterboxd.com/film/bicycle-thieves/",
    rating: 4.6,
    episodeNumber: 1,
  },
]

export function FilmPosterGrid() {
  const [hoveredFilm, setHoveredFilm] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
      {films.map((film, index) => (
        <motion.div
          key={index}
          className="relative group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onMouseEnter={() => setHoveredFilm(index)}
          onMouseLeave={() => setHoveredFilm(null)}
        >
          <div className="relative aspect-[2/3] criterion-border overflow-hidden">
            <Image src={film.poster || "/placeholder.svg"} alt={film.title} fill className="object-cover" />

            {/* Episode number badge */}
            <div className="absolute top-2 left-2 bg-criterion-red text-white text-xs px-2 py-1 rounded-sm">
              EP {film.episodeNumber}
            </div>

            {/* Hover overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex flex-col justify-end transform transition-all duration-300 ${
                hoveredFilm === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <h3 className="text-white font-medium text-sm md:text-base">{film.title}</h3>
              <p className="text-white/70 text-xs">
                {film.director}, {film.year}
              </p>

              <div className="flex items-center mt-2 mb-3">
                {[...Array(Math.floor(film.rating))].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-criterion-red fill-criterion-red" />
                ))}
                {film.rating % 1 !== 0 && <Star className="w-3 h-3 text-criterion-red fill-criterion-red opacity-50" />}
              </div>

              <Link
                href={film.letterboxdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs bg-criterion-red hover:bg-criterion-red/80 text-white py-1.5 px-3 rounded-sm transition-colors mt-auto"
              >
                <ExternalLink className="w-3 h-3" />
                Letterboxd
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
