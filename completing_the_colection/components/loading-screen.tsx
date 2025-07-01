"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FilmGrainOverlay } from "./film-grain-overlay"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(3)
  const [showAction, setShowAction] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev > 1) {
          return prev - 1
        } else {
          setShowAction(true)
          clearInterval(timer)
          return 0
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (showAction) {
      const actionTimer = setTimeout(() => {
        setIsComplete(true)
        setTimeout(onComplete, 500)
      }, 1500)

      return () => clearTimeout(actionTimer)
    }
  }, [showAction, onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-gray-200 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background:
              "linear-gradient(45deg, #f0f0f0 25%, #e8e8e8 25%, #e8e8e8 50%, #f0f0f0 50%, #f0f0f0 75%, #e8e8e8 75%)",
            backgroundSize: "20px 20px",
          }}
        >
          {/* Film grain overlay */}
          <FilmGrainOverlay className="opacity-40" />

          {/* Vintage film scratches */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gray-600 opacity-30"></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gray-600 opacity-20"></div>
            <div className="absolute top-1/4 left-0 w-full h-px bg-gray-600 opacity-25"></div>
            <div className="absolute top-2/3 left-0 w-full h-px bg-gray-600 opacity-15"></div>
          </div>

          <div className="relative z-10 text-center">
            <AnimatePresence mode="wait">
              {!showAction ? (
                <motion.div
                  key="countdown"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  {/* Countdown Circle */}
                  <div className="relative w-80 h-80 mx-auto">
                    {/* Outer circles */}
                    <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                    <div className="absolute inset-4 border-2 border-gray-700 rounded-full"></div>
                    <div className="absolute inset-8 border border-gray-600 rounded-full"></div>

                    {/* Crosshairs */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gray-800 transform -translate-y-0.5"></div>
                    <div className="absolute left-1/2 top-0 h-full w-px bg-gray-800 transform -translate-x-0.5"></div>

                    {/* Corner markers */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gray-800"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gray-800"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gray-800"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gray-800"></div>

                    {/* Number */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-9xl font-bold text-gray-900 font-mono tracking-wider">{count}</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="action"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="relative w-80 h-80 mx-auto">
                    <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                    <div className="absolute inset-4 border-2 border-gray-700 rounded-full"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-900 tracking-wider">FILMS!</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.p
              className="text-gray-700 mt-8 text-xl tracking-wide font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              COMPLETING THE COLLECTION
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
