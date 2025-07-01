"use client"

import { useEffect, useRef, useState } from "react"
import type { Film } from "@/data/films"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { Wheel } from "spin-wheel-ts"
import { motion, AnimatePresence } from "framer-motion"

interface FilmWheelSpinnerProps {
  films: Film[]
  title: string
  themeName?: string
  onResult?: (film: Film) => void
}

export function FilmWheelSpinner({ films, title, themeName, onResult }: FilmWheelSpinnerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wheelRef = useRef<Wheel | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const items = films.map((film) => ({
      label: film.title,
      backgroundColor: film.color || "#888",
      // Stash only the title, then map back by index
    }))

    const wheel = new Wheel(containerRef.current, {
      items,
      pointerAngle: 0,
      itemLabelFont: "sans-serif",
      itemLabelFontSizeMax: 16,
      itemLabelColors: ["#fff"],
      itemLabelRadius: 0.8,
      itemLabelRadiusMax: 0.2,
      itemBackgroundColors: items.map((s) => s.backgroundColor || "#888"),
      lineColor: "#222",
      lineWidth: 1,
      onRest: (e: any) => {
        const winnerFilm = films[e.currentIndex] // Use index directly
        setSpinning(false)
        setSelectedFilm(winnerFilm)
        onResult?.(winnerFilm)
      },
    })

    wheelRef.current = wheel

    return () => {
      wheel.remove()
    }
  }, [films, onResult])

  const spin = () => {
    if (!wheelRef.current || spinning) return

    setSpinning(true)
    setSelectedFilm(null)

    const winningIndex = Math.floor(Math.random() * films.length)
    wheelRef.current.spinToItem(winningIndex, 4000, true, 3)
  }

  return (
    <Card className="bg-criterion-card border-criterion-blue">
      <CardContent className="p-8 text-center">
        <h2 className="text-2xl font-light mb-2 text-criterion-red">{title}</h2>
        {themeName && <p className="text-lg text-criterion-accent mb-2">{themeName}</p>}
        <div className="criterion-divider w-16 mx-auto mb-6"></div>
        <p className="text-sm text-criterion-accent mb-6">{films.length} films in this wheel</p>

        <div
          ref={containerRef}
          className="relative mx-auto mb-6"
          style={{ width: 600, height: 600 }}
        >
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-criterion-red rounded-full border-4 border-criterion-bg transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            <Zap className="w-6 h-6 text-white" />
          </div>

          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
            <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-criterion-red shadow" />
          </div>
        </div>

        <Button
          onClick={spin}
          disabled={spinning}
          className="bg-criterion-red hover:bg-criterion-blue text-white font-medium px-8 py-3 text-lg"
        >
          {spinning ? "Spinning..." : "Spin the Wheel!"}
        </Button>

        <AnimatePresence>
          {selectedFilm && !spinning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 p-4 border border-criterion-red bg-criterion-red/10 rounded text-center"
            >
              <h3 className="text-xl font-bold text-criterion-red mb-1">🎬 Selected Film!</h3>
              <p className="text-lg text-criterion-text">{selectedFilm.title}</p>
              <p className="text-sm text-criterion-accent">
                {selectedFilm.director} ({selectedFilm.year})
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
