import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MainLayout } from '@/components/layout/MainLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://getmarriedinitaly.co'),
  title: {
    default: 'Get Married in Italy - Your Dream Italian Wedding',
    template: '%s | Get Married in Italy'
  },
  description: 'Plan your perfect Italian wedding with our expert guidance. Discover stunning venues, local vendors, and authentic Italian traditions across all 20 regions of Italy.',
  keywords: ['Italian wedding', 'destination wedding Italy', 'wedding venues Italy', 'Italian wedding vendors', 'get married in Italy'],
  authors: [{ name: 'Get Married in Italy' }],
  creator: 'Get Married in Italy',
  publisher: 'Get Married in Italy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Get Married in Italy',
    title: 'Get Married in Italy - Your Dream Italian Wedding',
    description: 'Plan your perfect Italian wedding with our expert guidance. Discover stunning venues, local vendors, and authentic Italian traditions across all 20 regions of Italy.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Get Married in Italy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Married in Italy - Your Dream Italian Wedding',
    description: 'Plan your perfect Italian wedding with our expert guidance. Discover stunning venues, local vendors, and authentic Italian traditions across all 20 regions of Italy.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
