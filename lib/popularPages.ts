import { italianRegions } from './regions'
import { vendorCategories } from './vendors'
import { venueTypes } from './venues'

// This is a placeholder implementation. In a real-world scenario,
// you would fetch this data from your analytics or database.
export async function getPopularVendorPages() {
  return [
    { region: 'tuscany', category: 'photographers' },
    { region: 'amalfi-coast', category: 'venues' },
    { region: 'venice', category: 'planners' },
    // Add more popular vendor pages here
  ]
}

export async function getPopularVenuePages() {
  return [
    { region: 'tuscany', type: 'historic-villas' },
    { region: 'amalfi-coast', type: 'coastal-venues' },
    { region: 'venice', type: 'palazzos' },
    // Add more popular venue pages here
  ]
}
