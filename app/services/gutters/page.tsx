import { Metadata } from 'next'
import GuttersContent from './GuttersContent'

export const metadata: Metadata = {
  title: 'Aluminum Gutter Installation | Simpli Roofing & Exteriors - Utah Seamless Gutters',
  description: 'Professional aluminum gutter installation in St. George and Cedar City. Seamless gutters, repairs, and gutter guards. Protect your home from water damage. Free estimates.',
  keywords: 'aluminum gutters St George, Cedar City gutters, seamless gutters Utah, gutter installation, gutter repair, gutter guards, water damage prevention',
  openGraph: {
    title: 'Aluminum Gutter Installation | Simpli Roofing & Exteriors - Utah Seamless Gutters',
    description: 'Professional aluminum gutter installation in St. George and Cedar City. Seamless gutters, repairs, and gutter guards. Protect your home from water damage. Free estimates.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Simpli Roofing & Exteriors',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aluminum Gutter Installation | Simpli Roofing & Exteriors',
    description: 'Professional aluminum gutter installation in St. George and Cedar City. Seamless gutters, repairs, and gutter guards.',
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

export default function GuttersServices() {
  return <GuttersContent />
}