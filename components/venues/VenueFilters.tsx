"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'

export function VenueFilters() {
  const [priceRange, setPriceRange] = useState<string>('')
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [capacity, setCapacity] = useState<number>(100)

  const features = [
    'Outdoor Ceremony',
    'Indoor Ceremony',
    'Accommodation',
    'Catering',
    'Parking',
    'Wheelchair Access'
  ]

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
          <h3 className="text-sm font-medium">Guest Capacity</h3>
          <Slider
            value={[capacity]}
            min={20}
            max={500}
            step={10}
            onValueChange={([value]) => setCapacity(value)}
          />
          <div className="text-sm text-muted-foreground">
            Up to {capacity} guests
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
          <Button className="flex-1">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={() => {
            setPriceRange('')
            setSelectedFeatures([])
            setCapacity(100)
          }}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}