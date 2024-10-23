"use client"

import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { italianRegions } from '@/lib/regions'
import { vendorCategories } from '@/lib/vendors'
import { venueTypes } from '@/lib/venues'
import { useRouter } from 'next/navigation'

export function SearchForm() {
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const service = formData.get('service') as string
    const region = formData.get('region') as string

    if (service && region) {
      // Check if it's a venue type
      if (service in venueTypes) {
        router.push(`/${region}/venues/${service}`)
      }
      // Check if it's a vendor category
      else if (vendorCategories.some(cat => cat.id === service)) {
        router.push(`/${region}/vendors/${service}`)
      }
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <select 
        name="service"
        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
        required
      >
        <option value="">Select Service</option>
        <optgroup label="Venues">
          {Object.entries(venueTypes).map(([id, venue]) => (
            <option key={id} value={id}>{venue.title}</option>
          ))}
        </optgroup>
        <optgroup label="Vendors">
          {vendorCategories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </optgroup>
      </select>
      <select 
        name="region"
        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
        required
      >
        <option value="">Select Region</option>
        {italianRegions.map(region => (
          <option key={region.id} value={region.id}>{region.name}</option>
        ))}
      </select>
      <Button type="submit">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  )
}