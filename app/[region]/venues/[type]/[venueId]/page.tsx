import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Globe, MapPin, Clock, Mail } from 'lucide-react'
import { italianRegions } from '@/lib/regions'
import { venueTypes } from '@/lib/venues'
import { getVendorDetails } from '@/lib/api'

interface VenuePageProps {
  params: {
    region: string
    type: string
    venueId: string
  }
}

export async function generateMetadata({ params }: VenuePageProps) {
  const venue = await getVendorDetails(params.venueId)
  const region = italianRegions.find((r) => r.id === params.region)
  const venueType = venueTypes[params.type as keyof typeof venueTypes]
  
  if (!venue || !region || !venueType) {
    return {
      title: 'Venue Not Found',
      description: 'The requested venue could not be found.',
    }
  }

  return {
    title: `${venue.title} - ${venueType.title} Wedding Venue in ${region.name}, Italy`,
    description: `${venue.description || `Book ${venue.title} for your wedding in ${region.name}, Italy. A stunning ${venueType.title.toLowerCase()} venue offering the perfect setting for your special day.`}`,
    keywords: `${venue.title}, ${venueType.title.toLowerCase()} ${region.name}, Italian wedding venue, ${venueType.searchTerm}, wedding venue ${region.name}`,
  }
}

export default async function VenuePage({ params }: VenuePageProps) {
  const venue = await getVendorDetails(params.venueId)
  const region = italianRegions.find((r) => r.id === params.region)
  const venueType = venueTypes[params.type as keyof typeof venueTypes]

  if (!venue || !region || !venueType) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh]">
        {venue.images[0] ? (
          <Image
            src={venue.images[0]}
            alt={venue.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {venue.title}
              </h1>
              {venue.address && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{venue.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About {venue.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {venue.description || `A stunning ${venueType.title.toLowerCase()} wedding venue in ${region.name}, Italy, offering ${venueType.features.join(', ').toLowerCase()}.`}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              {venue.features && venue.features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Features & Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {venue.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <div className="h-2 w-2 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Gallery */}
              {venue.images.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {venue.images.slice(1).map((image, index) => (
                        <div key={index} className="relative aspect-square">
                          <Image
                            src={image}
                            alt={`${venue.title} - Image ${index + 2}`}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {venue.phone && (
                    <Button className="w-full" asChild>
                      <a href={`tel:${venue.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        {venue.phone}
                      </a>
                    </Button>
                  )}
                  {venue.website && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={venue.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Opening Hours */}
              {venue.openingHours && (
                <Card>
                  <CardHeader>
                    <CardTitle>Opening Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {venue.openingHours.map((schedule) => (
                        <div
                          key={schedule.weekday}
                          className="flex justify-between text-sm"
                        >
                          <span className="capitalize">{schedule.weekday}</span>
                          <span>{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Inquiry Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send Inquiry</CardTitle>
                  <CardDescription>
                    Contact {venue.title} about your wedding
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form name="venue-inquiry" method="POST" data-netlify="true" className="space-y-4">
                    <input type="hidden" name="form-name" value="venue-inquiry" />
                    <input type="hidden" name="venue" value={venue.title} />
                    <input type="hidden" name="type" value={venueType.title} />
                    <input type="hidden" name="region" value={region.name} />
                    
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        className="w-full rounded-md border border-input px-3 py-2"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full rounded-md border border-input px-3 py-2"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full rounded-md border border-input px-3 py-2"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}