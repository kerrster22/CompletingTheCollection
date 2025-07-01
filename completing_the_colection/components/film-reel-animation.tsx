"use client"

interface FilmReelAnimationProps {
  size?: number
  className?: string
}

export function FilmReelAnimation({ size = 100, className = "" }: FilmReelAnimationProps) {
  return (
    <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
      <div
        className="relative inline-block align-middle text-center animate-spin"
        style={{
          width: size,
          height: size,
          animationDuration: "4s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
        }}
      >
        {/* Film Reel SVG */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rounded-full"
        >
          {/* Outer ring */}
          <circle cx="50" cy="50" r="48" fill="#D7443E" stroke="#1A1C1E" strokeWidth="2" />

          {/* Inner circle */}
          <circle cx="50" cy="50" r="15" fill="#1A1C1E" stroke="#D7443E" strokeWidth="2" />

          {/* Film holes around the outer edge */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, index) => {
            const x = 50 + 35 * Math.cos((angle * Math.PI) / 180)
            const y = 50 + 35 * Math.sin((angle * Math.PI) / 180)
            return <circle key={index} cx={x} cy={y} r="3" fill="#1A1C1E" stroke="#ACB4BF" strokeWidth="1" />
          })}

          {/* Spokes */}
          <g stroke="#1A1C1E" strokeWidth="2">
            <line x1="50" y1="20" x2="50" y2="35" />
            <line x1="50" y1="65" x2="50" y2="80" />
            <line x1="20" y1="50" x2="35" y2="50" />
            <line x1="65" y1="50" x2="80" y2="50" />
            <line x1="29.3" y1="29.3" x2="39.3" y2="39.3" />
            <line x1="60.7" y1="60.7" x2="70.7" y2="70.7" />
            <line x1="70.7" y1="29.3" x2="60.7" y2="39.3" />
            <line x1="39.3" y1="60.7" x2="29.3" y2="70.7" />
          </g>

          {/* Center hole */}
          <circle cx="50" cy="50" r="6" fill="#1A1C1E" />
        </svg>

        {/* Inner rotating element */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: "spin 2s linear infinite reverse",
          }}
        >
          <div className="w-3 h-3 bg-criterion-red rounded-full" />
        </div>
      </div>
    </div>
  )
}
