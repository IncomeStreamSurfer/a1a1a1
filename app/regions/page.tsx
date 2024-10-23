import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { italianRegions } from '@/lib/regions'

export const metadata = {
  title: 'Italian Wedding Regions - Complete Guide | Get Married in Italy',
  description: 'Explore all 20 regions of Italy for your dream wedding. Discover unique traditions, venues, and wedding experiences in each Italian region.',
  keywords: 'Italian wedding regions, get married in Italy, Italian destination wedding, Italian wedding locations, wedding in Italy regions',
}

export default function RegionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1518156677180-95a2893f3e9f"
            alt="Italian Regions"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Italian Wedding Regions
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover the perfect Italian region for your dream wedding
          </p>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {italianRegions.map((region) => (
              <Link key={region.id} href={`/${region.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={region.image}
                      alt={region.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{region.name}</CardTitle>
                    <CardDescription>{region.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Known for:</p>
                      <ul className="text-sm list-disc list-inside space-y-1">
                        {region.specialties.slice(0, 3).map((specialty, index) => (
                          <li key={index}>{specialty}</li>
                        ))}
                      </ul>
                    </div>
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