"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FilmPosterGrid } from "@/components/film-poster-grid"
import { FilmReelAnimation } from "@/components/film-reel-animation"
import { FilmGrainOverlay } from "@/components/film-grain-overlay"

export default function FilmsPage() {
  return (
    <div className="min-h-screen bg-criterion-bg text-criterion-text">
      <Navigation />

      <div className="relative py-16 px-4 overflow-hidden">
        <FilmGrainOverlay />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">Film Collection</h1>
              <div className="criterion-divider w-16 mx-auto md:mx-0 mb-6"></div>
              <p className="text-xl text-criterion-text/80">All the films that have come up on the wheel so far</p>
            </div>

            <FilmReelAnimation className="hidden md:block" />
          </div>

          <FilmPosterGrid />
        </div>
      </div>

      <Footer />
    </div>
  )
}
