import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { italianRegions } from '@/lib/regions'
import { venueTypes } from '@/lib/venues'

interface VenueTypePageProps {
  params: {
    type: string
  }
}

import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const popularPages = await getPopularVenuePages(); // Implement this function
  const paths = popularPages.map(({ region, type }) => ({
    params: { region, type },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const region = italianRegions.find((r) => r.id === params?.region)
  const venueType = venueTypes[params?.type as keyof typeof venueTypes]
  
  if (!region || !venueType) {
    return { notFound: true }
  }

  const venues = await searchVendors(venueType.searchTerm, region.name)

  return {
    props: {
      region,
      venueType,
      venues,
    },
    revalidate: 86400, // Revalidate every 24 hours
  }
}

export async function generateMetadata({ params }: VenueTypePageProps) {
  const venueType = venueTypes[params.type as keyof typeof venueTypes]
  
  if (!venueType) {
    return {
      title: 'Venue Type Not Found',
      description: 'The requested venue type could not be found.',
    }
  }

  return {
    title: `${venueType.title} Wedding Venues in Italy - Complete Guide`,
    description: `Discover perfect ${venueType.title.toLowerCase()} wedding venues across Italy. Find your dream ${venueType.title.toLowerCase()} with ${venueType.features.join(', ').toLowerCase()} for an unforgettable Italian wedding celebration.`,
    keywords: `${venueType.title} wedding venues Italy, Italian ${venueType.title.toLowerCase()} weddings, get married in Italy, Italian wedding venues, ${venueType.features.join(', ').toLowerCase()}`,
  }
}

export default function VenueTypePage({ params }: VenueTypePageProps) {
  const venueType = venueTypes[params.type as keyof typeof venueTypes]

  if (!venueType) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={venueType.image}
            alt={`${venueType.title} Wedding Venues in Italy`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {venueType.title} Wedding Venues in Italy
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            {venueType.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Get Married in a {venueType.title} in Italy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg">
                <p>
                  Discover the perfect {venueType.title.toLowerCase()} for your wedding in Italy. 
                  Our carefully curated selection of {venueType.title.toLowerCase()} venues offers {venueType.features.join(', ').toLowerCase()}.
                  Each venue has been chosen for its unique character, stunning location, and exceptional service.
                </p>
                <p>
                  Italy's {venueType.title.toLowerCase()} venues offer couples the perfect blend of Italian charm, 
                  historic elegance, and modern amenities. Whether you're planning an intimate celebration or a 
                  grand wedding, you'll find the perfect setting for your special day.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {venueType.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Regions Grid */}
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore {venueType.title} Venues by Region
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {italianRegions.map((region) => (
              <Link key={region.id} href={`/${region.id}/venues/${params.type}`} className="block">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={region.image}
                      alt={`${venueType.title} in ${region.name}`}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{region.name}</CardTitle>
                    <CardDescription>
                      {venueType.title} venues in {region.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Discover {venueType.title.toLowerCase()} wedding venues in {region.name}, 
                      known for {region.specialties[0].toLowerCase()} and {region.specialties[1].toLowerCase()}.
                    </p>
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
