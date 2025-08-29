import { Metadata } from 'next'
import ServicesContent from '@/app/services/ServicesContent'

export const metadata: Metadata = {
  title: 'Our Services | Simpli Roofing & Exteriors - Roofing, Windows, Siding & Gutters',
  description: 'Complete exterior services in Southern Utah. Professional roofing, window installation, siding, and aluminum gutters. 30+ years experience. Free estimates.',
  keywords: 'exterior services Utah, roofing windows siding gutters, St George contractors, Cedar City home improvement',
}

export default function Services() {
  return <ServicesContent />
}