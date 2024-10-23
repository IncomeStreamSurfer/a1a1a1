import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { italianRegions } from '@/lib/regions'
import { venueTypes } from '@/lib/venues'

export const metadata = {
  title: 'Get Married in Italy - Find Your Perfect Wedding Venue',
  description: 'Plan your dream Italian wedding at the perfect venue. From historic villas and coastal retreats to castles and vineyards, discover stunning locations for your destination wedding in Italy.',
  keywords: 'get married in Italy, Italian wedding venues, wedding locations Italy, Italian wedding locations, wedding venues Italy, destination wedding venues Italy, Italian destination wedding',
}

export default function VenuesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1464146072230-91cabc968266"
            alt="Italian Wedding Venues"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Italian Wedding Venues
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover the perfect setting for your dream Italian wedding
          </p>
        </div>
      </section>

      {/* Venue Types Grid */}
      <section className="py-12 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Find Your Perfect Venue Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(venueTypes).map(([id, venue]) => (
              <Link key={id} href={`/venues/${id}`} className="block">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={venue.image}
                      alt={venue.title}
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

      {/* Regions Section */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Venues by Region
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {italianRegions.map((region) => (
              <Link
                key={region.id}
                href={`/${region.id}/venues`}
                className="text-center p-4 rounded-lg hover:bg-white hover:shadow-md transition-all"
              >
                {region.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}