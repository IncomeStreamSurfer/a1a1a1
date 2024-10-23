import axios from 'axios'

const DATAFORSEO_USERNAME = process.env.DATAFORSEO_USERNAME
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD
const auth = Buffer.from(`${DATAFORSEO_USERNAME}:${DATAFORSEO_PASSWORD}`).toString('base64')

const API_BASE_URL = 'https://api.dataforseo.com/v3'

export interface SearchResult {
  id: string
  title: string
  description?: string
  address?: string
  phone?: string
  website?: string
  images: string[]
  category: string
  additionalCategories?: string[]
  region: string
  priceLevel?: string
  openingHours?: {
    weekday: string
    hours: string
  }[]
  features?: string[]
  latitude?: number
  longitude?: number
  isClaimed?: boolean
  currentStatus?: string
}

export interface SearchFilters {
  priceRange?: string
  features?: string[]
}

function processWorkHours(timetable: any) {
  if (!timetable) return undefined

  return Object.entries(timetable).map(([day, hours]: [string, any]) => {
    if (!hours || !hours[0]) {
      return {
        weekday: day,
        hours: 'Closed'
      }
    }

    const { open, close } = hours[0]
    return {
      weekday: day,
      hours: `${open.hour.toString().padStart(2, '0')}:${open.minute.toString().padStart(2, '0')} - ${close.hour.toString().padStart(2, '0')}:${close.minute.toString().padStart(2, '0')}`
    }
  })
}

export async function searchVendors(
  category: string,
  region: string,
  filters?: SearchFilters
): Promise<SearchResult[]> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/serp/google/maps/live/advanced`,
      [{
        keyword: `${category} wedding ${region} italy`,
        location_code: 2380,
        language_code: "en",
        device: "desktop",
        os: "windows",
        depth: 20
      }],
      {
        headers: { Authorization: `Basic ${auth}` }
      }
    )

    const results = response.data.tasks?.[0]?.result?.[0]?.items?.map((item: any) => ({
      id: item.place_id,
      title: item.title,
      description: item.snippet || '',
      address: item.address,
      phone: item.phone,
      website: item.url,
      images: [item.main_image, ...(item.photos?.map((p: any) => p.url) || [])].filter(Boolean),
      category: item.category,
      additionalCategories: item.additional_categories,
      region,
      priceLevel: item.price_level,
      openingHours: processWorkHours(item.work_hours?.timetable),
      features: item.attributes?.map((attr: any) => attr.name) || [],
      latitude: item.latitude,
      longitude: item.longitude,
      isClaimed: item.is_claimed,
      currentStatus: item.work_hours?.current_status
    })) || []

    // Apply filters
    if (filters) {
      return results.filter((result) => {
        if (filters.priceRange && result.priceLevel !== filters.priceRange) return false
        if (filters.features?.length && !filters.features.every(f => result.features?.includes(f))) return false
        return true
      })
    }

    return results
  } catch (error) {
    console.error('Error fetching vendors:', error)
    return []
  }
}

export async function getVendorDetails(placeId: string): Promise<SearchResult | null> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/serp/google/maps/live/place_details`,
      [{
        place_id: placeId,
        language_code: "en",
        device: "desktop"
      }],
      {
        headers: { Authorization: `Basic ${auth}` }
      }
    )

    const item = response.data.tasks?.[0]?.result?.[0]
    if (!item) return null

    return {
      id: item.place_id,
      title: item.title,
      description: item.snippet || '',
      address: item.address,
      phone: item.phone,
      website: item.url,
      images: [item.main_image, ...(item.photos?.map((p: any) => p.url) || [])].filter(Boolean),
      category: item.category,
      additionalCategories: item.additional_categories,
      region: item.address_info?.region || '',
      priceLevel: item.price_level,
      openingHours: processWorkHours(item.work_hours?.timetable),
      features: item.attributes?.map((attr: any) => attr.name) || [],
      latitude: item.latitude,
      longitude: item.longitude,
      isClaimed: item.is_claimed,
      currentStatus: item.work_hours?.current_status
    }
  } catch (error) {
    console.error('Error fetching vendor details:', error)
    return null
  }
}