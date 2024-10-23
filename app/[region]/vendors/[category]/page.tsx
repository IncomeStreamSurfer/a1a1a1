import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { italianRegions } from '@/lib/regions'
import { vendorCategories } from '@/lib/vendors'
import { searchVendors, type SearchResult } from '@/lib/api'
import { Star, Phone, Globe, MapPin } from 'lucide-react'
import { VendorCard } from '@/components/vendors/VendorCard'
import { VendorFilters } from '@/components/vendors/VendorFilters'

interface VendorPageProps {
  params: {
    region: string
    category: string
  }
}

export async function generateStaticParams() {
  return italianRegions.flatMap((region) =>
    vendorCategories.map((category) => ({
      region: region.id,
      category: category.id,
    }))
  )
}

export async function generateMetadata({ params }: VendorPageProps) {
  const region = italianRegions.find((r) => r.id === params.region)
  const category = vendorCategories.find((c) => c.id === params.category)
  
  if (!region || !category) {
    return {
      title: 'Not Found',
      description: 'The requested page could not be found.',
    }
  }

  return {
    title: `${category.name} in ${region.name}, Italy - Wedding Vendors`,
    description: `Find the best ${category.name.toLowerCase()} for your wedding in ${region.name}, Italy. Browse trusted local vendors, reviews, and portfolios.`,
    keywords: `${region.name} ${category.name.toLowerCase()}, Italian wedding ${category.name.toLowerCase()}, ${region.name} wedding vendors, ${category.searchTerm}`,
  }
}

export default async function VendorPage({ params }: VendorPageProps) {
  const region = italianRegions.find((r) => r.id === params.region)
  const category = vendorCategories.find((c) => c.id === params.category)

  if (!region || !category) {
    notFound()
  }

  const vendors: SearchResult[] = await searchVendors(category.searchTerm, region.name)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={region.image}
            alt={`${category.name} in ${region.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.name} in {region.name}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <Card key={vendor.id} className="flex flex-col">
                {vendor.images[0] && (
                  <div className="relative h-48">
                    <Image
                      src={vendor.images[0]}
                      alt={vendor.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{vendor.title}</CardTitle>
                  {vendor.rating !== undefined && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{vendor.rating}</span>
                      {vendor.reviews !== undefined && (
                        <span className="text-muted-foreground">
                          ({vendor.reviews} reviews)
                        </span>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  {vendor.description && (
                    <p className="text-muted-foreground">{vendor.description}</p>
                  )}
                  {vendor.address && (
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 mt-1" />
                      <span>{vendor.address}</span>
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Need help finding the perfect {category.name.toLowerCase()}?
                </CardTitle>
                <CardDescription className="text-center">
                  Let our wedding planners help you find the best vendors in {region.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form name="vendor-inquiry" method="POST" data-netlify="true" className="space-y-6">
                  <input type="hidden" name="form-name" value="vendor-inquiry" />
                  <input type="hidden" name="region" value={region.name} />
                  <input type="hidden" name="category" value={category.name} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                      <input
                        id="firstName"
                        name="firstName"
                        className="w-full rounded-md border border-input px-3 py-2"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                      <input
                        id="lastName"
                        name="lastName"
                        className="w-full rounded-md border border-input px-3 py-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full rounded-md border border-input px-3 py-2"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full rounded-md border border-input px-3 py-2"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Send Inquiry</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
