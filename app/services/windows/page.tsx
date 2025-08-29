import { Metadata } from 'next'
import WindowsContent from './WindowsContent'

export const metadata: Metadata = {
  title: 'Window Installation | Simpli Roofing & Exteriors - Energy Efficient Windows Utah',
  description: 'Professional window replacement and installation in St. George and Cedar City. Energy-efficient windows that save money and improve comfort. Free estimates.',
  keywords: 'window installation St George, Cedar City windows, energy efficient windows Utah, window replacement, double-hung windows, bay windows, window repair Utah',
  openGraph: {
    title: 'Window Installation | Simpli Roofing & Exteriors - Energy Efficient Windows Utah',
    description: 'Professional window replacement and installation in St. George and Cedar City. Energy-efficient windows that save money and improve comfort. Free estimates.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Simpli Roofing & Exteriors',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Window Installation | Simpli Roofing & Exteriors',
    description: 'Professional window replacement and installation in St. George and Cedar City. Energy-efficient windows that save money and improve comfort.',
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

export default function WindowsServices() {
  return <WindowsContent />
}