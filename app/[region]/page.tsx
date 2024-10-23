import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { italianRegions } from '@/lib/regions'
import { vendorCategories } from '@/lib/vendors'

interface RegionPageProps {
  params: {
    region: string
  }
}

export async function generateStaticParams() {
  return italianRegions.map((region) => ({
    region: region.id,
  }))
}

export async function generateMetadata({ params }: RegionPageProps) {
  const region = italianRegions.find((r) => r.id === params.region)
  
  if (!region) {
    return {
      title: 'Region Not Found',
      description: 'The requested region could not be found.',
    }
  }

  return {
    title: `Get Married in ${region.name}, Italy - Wedding Guide`,
    description: `Plan your dream wedding in ${region.name}, Italy. Discover local venues, vendors, traditions, and everything you need for your Italian destination wedding.`,
    keywords: `${region.name} wedding, get married in ${region.name}, ${region.name} wedding venues, ${region.name} wedding vendors, Italian wedding ${region.name}`,
  }
}

export default function RegionPage({ params }: RegionPageProps) {
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
            alt={`${region.name} Wedding`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Get Married in {region.name}
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            {region.description}
          </p>
        </div>
      </section>

      {/* Region Information */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Local Traditions */}
            <Card>
              <CardHeader>
                <CardTitle>Local Wedding Traditions</CardTitle>
                <CardDescription>Authentic {region.name} customs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {region.traditions.map((tradition, index) => (
                    <li key={index}>{tradition}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Regional Specialties */}
            <Card>
              <CardHeader>
                <CardTitle>Regional Specialties</CardTitle>
                <CardDescription>Local flavors and delicacies</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {region.specialties.map((specialty, index) => (
                    <li key={index}>{specialty}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Wedding Services */}
            <Card>
              <CardHeader>
                <CardTitle>Wedding Services</CardTitle>
                <CardDescription>Find local vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendorCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href={`/${region.id}/vendors/${category.id}`}>
                        {category.name} in {region.name}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Plan Your {region.name} Wedding
            </h2>
            <p className="text-lg mb-8">
              Let us help you create your perfect wedding in {region.name}
            </p>
            <Button size="lg" asChild>
              <a href="/contact">Contact Our Wedding Planners</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}