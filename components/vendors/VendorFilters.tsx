"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { SearchFilters } from '@/lib/api'

interface VendorFiltersProps {
  onFilterChange: (filters: SearchFilters) => void
}

export function VendorFilters({ onFilterChange }: VendorFiltersProps) {
  const handleReset = () => {
    onFilterChange({})
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="outline" onClick={handleReset} className="w-full">
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  )
}