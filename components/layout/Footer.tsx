import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-800 text-white mt-auto">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">About</h4>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-primary/90 transition-colors" href="/about">
                  Our Story
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary/90 transition-colors" href="/team">
                  Our Team
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary/90 transition-colors" href="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-primary/90 transition-colors" href="/venues">
                  Wedding Venues
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary/90 transition-colors" href="/vendors">
                  Wedding Vendors
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary/90 transition-colors" href="/planning">
                  Wedding Planning
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-primary/90 transition-colors" href="/blog">
                  Wedding Blog
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary/90 transition-colors" href="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary/90 transition-colors" href="/testimonials">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-primary">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-primary">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-primary">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Get Married in Italy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}