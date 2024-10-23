"use client"

import { Star } from 'lucide-react'

interface RatingProps {
  value: number
  votesCount?: number
  showCount?: boolean
  className?: string
}

export function Rating({ value, votesCount, showCount = true, className = "" }: RatingProps) {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <span>{value.toFixed(1)}</span>
      {showCount && votesCount && (
        <span className="text-muted-foreground text-sm">
          ({votesCount})
        </span>
      )}
    </div>
  )
}