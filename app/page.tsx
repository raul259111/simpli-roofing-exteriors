'use client'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <CallToAction />
      <Footer />
    </main>
  )
}