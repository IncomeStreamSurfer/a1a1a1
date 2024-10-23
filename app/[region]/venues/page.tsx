import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { italianRegions } from '@/lib/regions'
import { venueTypes } from '@/lib/venues'

interface RegionVenuesPageProps {
  params: {
    region: string
  }
}

export async function generateStaticParams() {
  return italianRegions.map((region) => ({
    region: region.id,
  }))
}

export async function generateMetadata({ params }: RegionVenuesPageProps) {
  const region = italianRegions.find((r) => r.id === params.region)
  
  if (!region) {
    return {
      title: 'Region Not Found',
      description: 'The requested region could not be found.',
    }
  }

  return {
    title: `Wedding Venues in ${region.name}, Italy - Complete Guide`,
    description: `Discover perfect wedding venues in ${region.name}, Italy. From historic villas to coastal retreats, find your dream location for an unforgettable Italian wedding celebration.`,
    keywords: `wedding venues ${region.name}, get married in ${region.name}, Italian wedding venues, ${region.name} wedding locations, destination wedding ${region.name}`,
  }
}

export default function RegionVenuesPage({ params }: RegionVenuesPageProps) {
  const region = italianRegions.find((r) => r.id === params.region)

  if (!region) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={region.image}
            alt={`Wedding Venues in ${region.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Wedding Venues in {region.name}
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            {region.description}
          </p>
        </div>
      </section>

      {/* Region Information */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Get Married in {region.name}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg">
                <p>
                  {region.name} offers an incredible variety of wedding venues, each capturing the unique charm 
                  and character of this beautiful Italian region. From {region.specialties.join(', ').toLowerCase()}, 
                  every aspect of your wedding can be infused with local traditions and flavors.
                </p>
                <p>
                  Local wedding traditions include {region.traditions.join(' and ')}, making your celebration 
                  truly authentic and memorable. Whether you're dreaming of an intimate gathering or a grand 
                  celebration, {region.name} provides the perfect backdrop for your special day.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Specialties</CardTitle>
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

          {/* Venue Types Grid */}
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Venue Types in {region.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(venueTypes).map(([id, venue]) => (
              <Link key={id} href={`/${region.id}/venues/${id}`} className="block">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={venue.image}
                      alt={`${venue.title} in ${region.name}`}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{venue.title}</CardTitle>
                    <CardDescription>{venue.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1">
                      {venue.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}