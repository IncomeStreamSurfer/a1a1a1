import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { vendorCategories } from '@/lib/vendors'
import { MapPin, Camera, Flower2, UtensilsCrossed, Calendar, LucideIcon } from 'lucide-react'

// Define a type for the category IDs
type CategoryId = 'venues' | 'photographers' | 'florists' | 'caterers' | 'planners';

// Update the categoryIcons object with the correct type
const categoryIcons: Record<CategoryId, LucideIcon> = {
  venues: MapPin,
  photographers: Camera,
  florists: Flower2,
  caterers: UtensilsCrossed,
  planners: Calendar,
};

export const metadata = {
  title: 'Italian Wedding Vendors - Find Perfect Wedding Services in Italy',
  description: 'Discover top wedding vendors across Italy. From photographers to caterers, find all the services you need for your Italian wedding.',
  keywords: 'Italian wedding vendors, wedding services Italy, Italian wedding photographers, Italian wedding planners, Italian wedding catering',
}

export default function VendorsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed"
            alt="Italian Wedding Vendors"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Italian Wedding Vendors
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Find the perfect vendors for your Italian wedding
          </p>
        </div>
      </section>

      {/* Vendor Categories */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorCategories.map((category) => {
              // Use type assertion to ensure category.id is of type CategoryId
              const Icon = categoryIcons[category.id as CategoryId] || MapPin;
              return (
                <Link key={category.id} href={`/vendors/${category.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Icon className="h-6 w-6 text-primary" />
                        <CardTitle>{category.name}</CardTitle>
                      </div>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Professional {category.name.toLowerCase()} across Italy</li>
                        <li>• Experienced in destination weddings</li>
                        <li>• Multilingual services available</li>
                        <li>• Customized packages for your needs</li>
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Search By Region */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Find Vendors by Region
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Tuscany', 'Amalfi Coast', 'Venice', 'Lake Como', 'Sicily', 'Rome', 'Florence', 'Milan'].map((region) => (
              <Link
                key={region}
                href={`/vendors?region=${region.toLowerCase().replace(' ', '-')}`}
                className="text-center p-4 rounded-lg hover:bg-white hover:shadow-md transition-all"
              >
                {region}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
