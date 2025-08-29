import { Metadata } from 'next'
import SidingContent from './SidingContent'

export const metadata: Metadata = {
  title: 'Siding & Stucco Services | Simpli Roofing & Exteriors - Southern Utah Siding Experts',
  description: 'Professional siding and stucco installation in St. George and Cedar City, Utah. Vinyl, fiber cement, wood siding, and stucco services. Free estimates available.',
  keywords: 'siding St George Utah, Cedar City siding, stucco installation, vinyl siding, fiber cement siding, wood siding, Utah siding contractors, home exteriors',
  openGraph: {
    title: 'Siding & Stucco Services | Simpli Roofing & Exteriors - Southern Utah Siding Experts',
    description: 'Professional siding and stucco installation in St. George and Cedar City, Utah. Vinyl, fiber cement, wood siding, and stucco services. Free estimates available.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Simpli Roofing & Exteriors',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siding & Stucco Services | Simpli Roofing & Exteriors',
    description: 'Professional siding and stucco installation in St. George and Cedar City, Utah. Vinyl, fiber cement, wood siding, and stucco services.',
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
}

export default function SidingServices() {
  return <SidingContent />
}