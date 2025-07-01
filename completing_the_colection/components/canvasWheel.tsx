"use client"

// @ts-ignore
import { createWheel } from "spin-wheel"



import { useEffect, useRef } from "react"
import type { Film } from "@/data/films"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

interface CanvasWheelProps {
  films: Film[]
  onSpinResult?: (film: Film) => void
}

export function CanvasWheel({ films, onSpinResult }: CanvasWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wheelRef = useRef<any>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const wheel = createWheel(canvasRef.current, {
      items: films.map((film) => ({
        label: film.title,
        backgroundColor: film.color || "#888",
      })),
      onSpinDone: (index: number) => {
        onSpinResult?.(films[index])
      },
      radius: 270,
      centerX: 300,
      centerY: 300,
      thickness: 60,
      fontSize: 12,
      textColor: "#fff",
    })

    wheelRef.current = wheel

    return () => {
      wheel.dispose()
    }
  }, [films])

  const spin = () => {
    wheelRef.current?.spin()
  }

  return (
    <Card className="bg-criterion-card border-criterion-blue">
      <CardContent className="p-8 text-center">
        <h2 className="text-2xl font-light mb-4 text-criterion-red">Spin the Wheel</h2>
        <div className="criterion-divider w-16 mx-auto mb-6"></div>
        <p className="text-sm text-criterion-accent mb-6">{films.length} films in this wheel</p>

        <div className="relative mx-auto mb-6" style={{ width: 600, height: 600 }}>
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="rounded-full border-4 border-criterion-accent"
          />

          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-criterion-red rounded-full border-4 border-criterion-bg transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            <Zap className="w-6 h-6 text-white" />
          </div>

          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
            <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-criterion-red shadow" />
          </div>
        </div>

        <Button
          onClick={spin}
          className="bg-criterion-red hover:bg-criterion-blue text-white font-medium px-8 py-3 text-lg"
        >
          Spin the Wheel!
        </Button>
      </CardContent>
    </Card>
  )
}
