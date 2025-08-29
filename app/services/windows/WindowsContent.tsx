'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import ServiceQuoteForm from '@/components/ServiceQuoteForm'
import { Shield, Clock, Award, CheckCircle, Thermometer, DollarSign, Home } from 'lucide-react'

export default function WindowsContent() {

  const windowServices = [
    'Window Replacement',
    'New Window Installation',
    'Energy Efficient Upgrades',
    'Custom Window Sizing',
    'Window Repair',
    'Glass Replacement',
    'Frame Restoration',
    'Window Weatherproofing'
  ]

  const windowTypes = [
    'Double-Hung Windows',
    'Casement Windows',
    'Sliding Windows',
    'Picture Windows',
    'Bay & Bow Windows',
    'Awning Windows',
    'Custom Windows'
  ]

  const benefits = [
    { icon: Thermometer, title: 'Energy Efficiency', description: 'Reduce heating and cooling costs with modern insulated windows' },
    { icon: DollarSign, title: 'Increase Home Value', description: 'Quality windows provide excellent return on investment' },
    { icon: Home, title: 'Improved Comfort', description: 'Better temperature control and noise reduction' }
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Energy-Efficient Window Installation in Southern Utah
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Transform your home with professional window replacement and installation. 
                Improve energy efficiency, comfort, and curb appeal with quality windows designed for Utah's climate.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#quote-form" className="btn-primary text-center">
                  Get Free Window Quote
                </a>
                <a href="tel:4359224340" className="btn-secondary text-center">
                  Call: 435-922-4340
                </a>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative w-full h-96 lg:h-[500px]">
                <Image
                  src="/images/windows-service.jpg"
                  alt="Energy-efficient window installation by Simpli Roofing & Exteriors"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Replace Your Windows?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern windows provide significant benefits for Southern Utah homeowners, from energy savings to increased comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm text-center">
                  <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>

          {/* Energy Savings Callout */}
          <div className="bg-primary-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Save Up to 30% on Energy Bills</h3>
            <p className="text-primary-100 text-lg">
              Energy-efficient windows can significantly reduce your heating and cooling costs, 
              especially important in Utah's extreme temperature variations.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Complete Window Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From single window replacements to whole-home installations, we handle all your window needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {windowServices.map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center hover:bg-primary-50 transition-colors">
                <CheckCircle className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">{service}</h3>
              </div>
            ))}
          </div>

          {/* Window Types */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Window Types We Install</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {windowTypes.map((type, index) => (
                <div key={index} className="bg-white p-4 rounded-lg text-center shadow-sm">
                  <div className="font-semibold text-gray-900 text-sm">{type}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-600">All windows are energy-efficient and designed for Utah's climate conditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-16 bg-gray-50">
        <div className="container-padding">
          <div className="max-w-2xl mx-auto">
            <ServiceQuoteForm service="windows" />
          </div>
        </div>
      </section>

      {/* Warranty & Quality */}
      <section className="py-16 bg-primary-600">
        <div className="container-padding text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Quality Windows, Guaranteed</h2>
          <p className="text-xl text-primary-100 mb-6 max-w-2xl mx-auto">
            All our window installations come with comprehensive warranties and are performed by certified professionals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-primary-100">
            <div>
              <div className="text-2xl font-bold mb-2">Lifetime</div>
              <div>Window Warranty</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">Professional</div>
              <div>Installation</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">30+ Years</div>
              <div>Experience</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}