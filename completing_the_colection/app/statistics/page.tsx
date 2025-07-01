import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FilmStatistics } from "@/components/film-statistics"
import { FilmGrainOverlay } from "@/components/film-grain-overlay"

export default function StatisticsPage() {
  return (
    <div className="min-h-screen bg-criterion-bg text-criterion-text">
      <Navigation />

      <div className="relative py-16 px-4 overflow-hidden">
        <FilmGrainOverlay />

        <div className="relative z-10 max-w-6xl mx-auto">
          <FilmStatistics />
        </div>
      </div>

      <Footer />
    </div>
  )
}
