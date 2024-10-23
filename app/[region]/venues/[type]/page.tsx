import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { italianRegions } from '@/lib/regions'
import { venueTypes } from '@/lib/venues'
import { searchVendors } from '@/lib/api'
import { VenueCard } from '@/components/venues/VenueCard'


interface RegionVenueTypePageProps {
  params: {
    region: string
    type: string
  }
}

export async function generateStaticParams() {
  const paths = []
  for (const region of italianRegions) {
    for (const type of Object.keys(venueTypes)) {
      paths.push({
        region: region.id,
        type: type,
      })
    }
  }
  return paths
}

export async function generateMetadata({ params }: RegionVenueTypePageProps) {
  const region = italianRegions.find((r) => r.id === params.region)
  const venueType = venueTypes[params.type as keyof typeof venueTypes]
  
  if (!region || !venueType) {
    return {
      title: 'Not Found',
      description: 'The requested page could not be found.',
    }
  }

  return {
    title: `${venueType.title} Wedding Venues in ${region.name}, Italy - Complete Guide`,
    description: `Discover perfect ${venueType.title.toLowerCase()} wedding venues in ${region.name}, Italy. Find your dream ${venueType.title.toLowerCase()} with ${venueType.features.join(', ').toLowerCase()} for an unforgettable Italian wedding celebration.`,
    keywords: `${venueType.title} wedding venues ${region.name}, Italian ${venueType.title.toLowerCase()} weddings ${region.name}, get married in ${region.name}, ${region.name} wedding venues, ${venueType.features.join(', ').toLowerCase()}`,
  }
}

export default async function RegionVenueTypePage({ params }: RegionVenueTypePageProps) {
  const region = italianRegions.find((r) => r.id === params.region)
  const venueType = venueTypes[params.type as keyof typeof venueTypes]

  if (!region || !venueType) {
    notFound()
  }

  const venues = await searchVendors(venueType.searchTerm, region.name)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={region.image}
            alt={`${venueType.title} Wedding Venues in ${region.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {venueType.title} Wedding Venues in {region.name}
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Discover the perfect {venueType.title.toLowerCase()} for your wedding in {region.name}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Get Married in a {venueType.title} in {region.name}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg">
                <p>
                  {region.name} offers some of Italy's most stunning {venueType.title.toLowerCase()} venues for your wedding celebration. 
                  Known for {region.specialties.join(', ').toLowerCase()}, {region.name}'s {venueType.title.toLowerCase()} venues combine 
                  local traditions with exceptional beauty and service.
                </p>
                <p>
                  Each {venueType.title.toLowerCase()} in {region.name} offers unique features including {venueType.features.join(', ').toLowerCase()}.
                  Whether you're planning an intimate celebration or a grand wedding, you'll find the perfect setting for your special day.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {region.specialties.map((specialty, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      <span>{specialty}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Venues Grid */}
          <h2 className="text-3xl font-bold text-center mb-12">
            {venueType.title} Venues in {region.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <Card key={venue.id} className="h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={venue.images[0] || venueType.image}
                    alt={venue.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                
                <CardHeader>
                  <CardTitle>{venue.title}</CardTitle>
                  <CardDescription>{venue.address}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {venue.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
