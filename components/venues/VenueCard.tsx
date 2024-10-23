"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Euro, Clock, Globe, Phone } from 'lucide-react'
import type { SearchResult } from '@/lib/api'

interface VenueCardProps {
  venue: SearchResult
  regionId: string
  venueType: string
}

export function VenueCard({ venue, regionId, venueType }: VenueCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        {venue.images[0] && (
          <Image
            src={venue.images[0]}
            alt={venue.title}
            fill
            className="object-cover rounded-t-lg"
          />
        )}
        {venue.priceLevel && (
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
            {'€'.repeat(venue.priceLevel.length)}
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{venue.title}</CardTitle>
        {venue.address && (
          <CardDescription className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {venue.address}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {venue.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {venue.description}
          </p>
        )}

        {venue.features && venue.features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {venue.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {venue.phone && (
            <Button variant="outline" size="sm" asChild>
              <a href={`tel:${venue.phone}`}>
                <Phone className="h-4 w-4 mr-2" />
                Call
              </a>
            </Button>
          )}
          {venue.website && (
            <Button variant="outline" size="sm" asChild>
              <a href={venue.website} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                Website
              </a>
            </Button>
          )}
        </div>

        <Button className="w-full" asChild>
          <Link href={`/${regionId}/venues/${venueType}/${venue.id}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}