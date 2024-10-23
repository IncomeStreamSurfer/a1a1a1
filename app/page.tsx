import { Search, MapPin, Camera, Flower2, UtensilsCrossed, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { italianRegions } from '@/lib/regions'
import { vendorCategories } from '@/lib/vendors'
import { SearchForm } from '@/components/search/SearchForm'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e"
            alt="Italian Wedding Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 w-full max-w-[2000px] mx-auto px-4">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Your Dream Italian Wedding Awaits
              </h1>
              <p className="mx-auto max-w-[700px] text-white md:text-xl">
                Discover the perfect blend of romance, tradition, and Italian elegance for your special day
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <SearchForm />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Regions Grid */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="w-full max-w-[2000px] mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            Discover Italian Wedding Regions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {italianRegions.slice(0, 8).map((region) => (
              <Card key={region.id} className="flex flex-col overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={region.image}
                    alt={region.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{region.name}</CardTitle>
                  <CardDescription>{region.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Known for:</p>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      {region.specialties.map((specialty, index) => (
                        <li key={index}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/regions">Explore All Regions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="w-full max-w-[2000px] mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            Wedding Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vendorCategories.map((category) => (
              <Card key={category.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {category.id === 'venues' && <MapPin className="h-5 w-5" />}
                    {category.id === 'photographers' && <Camera className="h-5 w-5" />}
                    {category.id === 'florists' && <Flower2 className="h-5 w-5" />}
                    {category.id === 'caterers' && <UtensilsCrossed className="h-5 w-5" />}
                    {category.id === 'planners' && <Calendar className="h-5 w-5" />}
                    {category.name}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/vendors/${category.id}`}>Find {category.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of the page content... */}
    </div>
  )
}