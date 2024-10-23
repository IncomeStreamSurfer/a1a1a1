"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Menu, Heart, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-red-500" />
          <span className="text-2xl font-bold">Get Married in Italy</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link className="text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 px-2 py-1 rounded" href="/regions">
            Italian Regions
          </Link>
          <Link className="text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 px-2 py-1 rounded" href="/venues">
            Wedding Venues
          </Link>
          <Link className="text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 px-2 py-1 rounded" href="/vendors">
            Wedding Vendors
          </Link>
          <Link className="text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 px-2 py-1 rounded" href="/blog">
            Wedding Blog
          </Link>
          <Link className="text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 px-2 py-1 rounded" href="/contact">
            Contact
          </Link>
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <nav className="container py-4 flex flex-col space-y-4">
              <Link className="text-sm font-medium px-2 py-1 hover:bg-primary/10 rounded" href="/regions">
                Italian Regions
              </Link>
              <Link className="text-sm font-medium px-2 py-1 hover:bg-primary/10 rounded" href="/venues">
                Wedding Venues
              </Link>
              <Link className="text-sm font-medium px-2 py-1 hover:bg-primary/10 rounded" href="/vendors">
                Wedding Vendors
              </Link>
              <Link className="text-sm font-medium px-2 py-1 hover:bg-primary/10 rounded" href="/blog">
                Wedding Blog
              </Link>
              <Link className="text-sm font-medium px-2 py-1 hover:bg-primary/10 rounded" href="/contact">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}