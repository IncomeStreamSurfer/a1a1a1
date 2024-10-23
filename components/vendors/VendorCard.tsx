"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Globe, MapPin, Clock } from 'lucide-react'
import { Rating } from '@/components/ui/Rating'
import type { SearchResult } from '@/lib/api'
import { useState } from 'react'

interface VendorCardProps {
  vendor: SearchResult
  categoryId: string
  regionId: string
}

export function VendorCard({ vendor, categoryId, regionId }: VendorCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      {vendor.images[0] && (
        <div className="relative h-48">
          <Image
            src={vendor.images[0]}
            alt={vendor.title}
            fill
            className="object-cover rounded-t-lg"
          />
          {vendor.priceLevel && (
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {'€'.repeat(vendor.priceLevel.length)}
            </div>
          )}
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{vendor.title}</CardTitle>
          {vendor.rating && (
            <Rating 
              value={vendor.rating.value} 
              votesCount={vendor.rating.votesCount} 
            />
          )}
        </div>
        {vendor.address && (
          <CardDescription className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {vendor.address}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {vendor.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {vendor.description}
          </p>
        )}
        
        {showDetails && vendor.openingHours && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-1">
              <Clock className="h-4 w-4" /> Opening Hours
            </h4>
            <div className="text-sm space-y-1">
              {vendor.openingHours.map((schedule) => (
                <div key={schedule.weekday} className="flex justify-between">
                  <span className="capitalize">{schedule.weekday}</span>
                  <span>{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {vendor.features && vendor.features.length > 0 && showDetails && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Features</h4>
            <div className="flex flex-wrap gap-1">
              {vendor.features.map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {vendor.phone && (
            <Button variant="outline" size="sm" asChild>
              <a href={`tel:${vendor.phone}`}>
                <Phone className="h-4 w-4 mr-2" />
                Call
              </a>
            </Button>
          )}
          {vendor.website && (
            <Button variant="outline" size="sm" asChild>
              <a href={vendor.website} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                Website
              </a>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Show Less' : 'Show More'}
          </Button>
        </div>

        <Button className="w-full mt-4" asChild>
          <Link href={`/${regionId}/vendors/${categoryId}/${vendor.id}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}