// components/ui/circular-progress.tsx
'use client'
import React from "react"
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

interface CircularProgressProps {
  value: number
  text?: string
  color?: string
}

export function CircularProgress({
  value,
  text,
  color = "#4f46e5", // Default to indigo-600
}: CircularProgressProps) {
  return (
    <div className="w-24 h-24">
      <CircularProgressbar
        value={value}
        text={text || `${value}%`}
        styles={buildStyles({
          textColor: "#111",
          pathColor: color,
          trailColor: "#e5e7eb", // Tailwind gray-200
        })}
      />
    </div>
  )
}
