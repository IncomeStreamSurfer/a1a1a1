import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import { vendorCategories } from '@/lib/vendors'
import { italianRegions } from '@/lib/regions'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  return vendorCategories.map((category) => ({
    category: category.id,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = vendorCategories.find((c) => c.id === params.category)
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested vendor category could not be found.',
    }
  }

  return {
    title: `Italian Wedding ${category.name} - Find Your Perfect Match`,
    description: `Discover the best wedding ${category.name.toLowerCase()} across Italy. Browse portfolios, reviews, and book your perfect Italian wedding ${category.name.toLowerCase()}.`,
    keywords: `Italian wedding ${category.name.toLowerCase()}, ${category.name.toLowerCase()} Italy, Italian wedding vendors, ${category.searchTerm}`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = vendorCategories.find((c) => c.id === params.category)

  if (!category) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed"
            alt={`Italian Wedding ${category.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Italian Wedding {category.name}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>
      </section>

      {/* Region Selection */}
      <section className="py-12 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Find {category.name} by Region
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {italianRegions.map((region) => (
              <Link
                key={region.id}
                href={`/${region.id}/vendors/${category.id}`}
                className="block"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={region.image}
                      alt={`${category.name} in ${region.name}`}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <CardTitle>{region.name}</CardTitle>
                    </div>
                    <CardDescription>
                      Find {category.name} in {region.name}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Need help finding the perfect {category.name.toLowerCase()}?
                </CardTitle>
                <CardDescription className="text-center">
                  Let our wedding planners help you find the best {category.name.toLowerCase()} for your Italian wedding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form name="category-inquiry" method="POST" data-netlify="true" className="space-y-6">
                  <input type="hidden" name="form-name" value="category-inquiry" />
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