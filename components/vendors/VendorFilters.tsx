"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import type { SearchFilters } from '@/lib/api'

interface VendorFiltersProps {
  onFilterChange: (filters: SearchFilters) => void
}

export function VendorFilters({ onFilterChange }: VendorFiltersProps) {
  const [priceRange, setPriceRange] = useState<string>('')
  const [minRating, setMinRating] = useState<number>(0)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const features = [
    'Free Parking',
    'Wheelchair Accessible',
    'Free WiFi',
    'Air Conditioning',
    'Outdoor Space'
  ]

  const handleFilterChange = () => {
    onFilterChange({
      priceRange: priceRange || undefined,
      rating: minRating || undefined,
      features: selectedFeatures.length ? selectedFeatures : undefined
    })
  }

  const handleReset = () => {
    setPriceRange('')
    setMinRating(0)
    setSelectedFeatures([])
    onFilterChange({})
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Price Range</h3>
          <div className="flex gap-2">
            {['€', '€€', '€€€', '€€€€'].map((price) => (
              <Button
                key={price}
                variant={priceRange === price ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceRange(price === priceRange ? '' : price)}
              >
                {price}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Minimum Rating</h3>
          <Slider
            value={[minRating]}
            min={0}
            max={5}
            step={0.5}
            onValueChange={([value]) => setMinRating(value)}
          />
          <div className="text-sm text-muted-foreground">
            {minRating} stars and above
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Features</h3>
          <div className="space-y-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={selectedFeatures.includes(feature)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedFeatures([...selectedFeatures, feature])
                    } else {
                      setSelectedFeatures(selectedFeatures.filter(f => f !== feature))
                    }
                  }}
                />
                <label
                  htmlFor={feature}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleFilterChange} className="flex-1">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}