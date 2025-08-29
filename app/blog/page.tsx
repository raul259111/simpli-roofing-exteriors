import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogContent from './BlogContent'

export const metadata: Metadata = {
  title: 'Blog | Exterior Home Tips & Insights | Simpli Roofing & Exteriors',
  description: 'Expert advice on roofing, windows, siding, gutters, and home maintenance in Southern Utah. Learn from 30+ years of experience.',
  openGraph: {
    title: 'Blog | Simpli Roofing & Exteriors',
    description: 'Expert tips and insights for maintaining your home\'s exterior in Southern Utah',
    images: ['/og-image.jpg'],
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <BlogContent />
      <Footer />
    </main>
  )
}