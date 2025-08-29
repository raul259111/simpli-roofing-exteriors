import { Metadata } from 'next'
import RoofingContent from './RoofingContent'

export const metadata: Metadata = {
  title: 'Roofing Services | Simpli Roofing & Exteriors - Southern Utah Roofing Experts',
  description: 'Professional roofing installation, repair, and replacement in St. George and Cedar City, Utah. Licensed, insured, 30+ years experience. Free estimates available.',
  keywords: 'roofing St George Utah, Cedar City roofers, roof repair, roof replacement, asphalt shingles, metal roofing, tile roofing, Utah roofing contractors',
  openGraph: {
    title: 'Roofing Services | Simpli Roofing & Exteriors - Southern Utah Roofing Experts',
    description: 'Professional roofing installation, repair, and replacement in St. George and Cedar City, Utah. Licensed, insured, 30+ years experience. Free estimates available.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Simpli Roofing & Exteriors',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roofing Services | Simpli Roofing & Exteriors',
    description: 'Professional roofing installation, repair, and replacement in St. George and Cedar City, Utah. Licensed, insured, 30+ years experience.',
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

export default function RoofingServices() {
  return <RoofingContent />
}