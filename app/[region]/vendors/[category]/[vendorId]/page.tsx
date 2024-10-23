import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Globe, MapPin, Clock, Mail } from 'lucide-react'
import { italianRegions } from '@/lib/regions'
import { vendorCategories } from '@/lib/vendors'
import { getVendorDetails } from '@/lib/api'

interface VendorPageProps {
  params: {
    region: string
    category: string
    vendorId: string
  }
}

export async function generateMetadata({ params }: VendorPageProps) {
  const vendor = await getVendorDetails(params.vendorId)
  const region = italianRegions.find((r) => r.id === params.region)
  const category = vendorCategories.find((c) => c.id === params.category)
  
  if (!vendor || !region || !category) {
    return {
      title: 'Vendor Not Found',
      description: 'The requested vendor could not be found.',
    }
  }

  return {
    title: `${vendor.title} - ${category.name} in ${region.name}, Italy`,
    description: `${vendor.description || `Book ${vendor.title} for your wedding in ${region.name}, Italy. Professional ${category.name.toLowerCase()} services for your special day.`}`,
    keywords: `${vendor.title}, ${category.name.toLowerCase()} ${region.name}, Italian wedding vendor, ${category.searchTerm}, wedding ${category.name.toLowerCase()} ${region.name}`,
  }
}

export default async function VendorPage({ params }: VendorPageProps) {
  const vendor = await getVendorDetails(params.vendorId)
  const region = italianRegions.find((r) => r.id === params.region)
  const category = vendorCategories.find((c) => c.id === params.category)

  if (!vendor || !region || !category) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh]">
        {vendor.images[0] ? (
          <Image
            src={vendor.images[0]}
            alt={vendor.title}
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
                {vendor.title}
              </h1>
              {vendor.address && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{vendor.address}</span>
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
                  <CardTitle>About {vendor.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {vendor.description || `Professional ${category.name.toLowerCase()} services for weddings in ${region.name}, Italy.`}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              {vendor.features && vendor.features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Features & Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {vendor.features.map((feature, index) => (
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
              {vendor.images.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {vendor.images.slice(1).map((image, index) => (
                        <div key={index} className="relative aspect-square">
                          <Image
                            src={image}
                            alt={`${vendor.title} - Image ${index + 2}`}
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
                  {vendor.phone && (
                    <Button className="w-full" asChild>
                      <a href={`tel:${vendor.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  )}
                  {vendor.website && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={vendor.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Opening Hours */}
              {vendor.openingHours && (
                <Card>
                  <CardHeader>
                    <CardTitle>Opening Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {vendor.openingHours.map((schedule) => (
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
                    Contact {vendor.title} about your wedding
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form name="vendor-inquiry" method="POST" data-netlify="true" className="space-y-4">
                    <input type="hidden" name="form-name" value="vendor-inquiry" />
                    <input type="hidden" name="vendor" value={vendor.title} />
                    <input type="hidden" name="category" value={category.name} />
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