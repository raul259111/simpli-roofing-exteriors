'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import ServiceQuickQuote from '@/components/ServiceQuickQuote'
import ServiceQuoteForm from '@/components/ServiceQuoteForm'
import PhoneLink from '@/components/PhoneLink'
import { Shield, Clock, Award, CheckCircle } from 'lucide-react'

export default function RoofingContent() {

  const roofingServices = [
    'New Roof Installation',
    'Roof Replacement',
    'Roof Repairs',
    'Storm Damage Repair',
    'Roof Inspections',
    'Gutter Integration',
    'Ventilation Systems',
    'Maintenance Services'
  ]

  const roofTypes = [
    'Asphalt Shingles',
    'Metal Roofing',
    'Tile Roofing',
    'Flat Roofing'
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
                Professional Roofing Services in Southern Utah
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Protect your home with expert roofing installation, repair, and maintenance. 
                30+ years of experience serving St George and Cedar City with quality craftsmanship.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#quote-form" className="btn-primary text-center">
                  Get Free Roofing Quote
                </a>
                <PhoneLink 
                  className="btn-secondary text-center"
                  source="roofing_hero"
                >
                  Call: 435-922-4340
                </PhoneLink>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <ServiceQuickQuote service="roofing" serviceName="Roofing" />
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">🏆</div>
                <p className="text-lg font-semibold text-gray-900">30+ Years Experience</p>
                <p className="text-gray-600">Licensed, Bonded & Insured</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Complete Roofing Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From new installations to repairs and maintenance, we handle all your roofing needs with professional expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {roofingServices.map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center hover:bg-primary-50 transition-colors">
                <CheckCircle className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">{service}</h3>
              </div>
            ))}
          </div>

          {/* Roof Types */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Roof Types We Work With</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {roofTypes.map((type, index) => (
                <div key={index} className="bg-white p-4 rounded-lg text-center shadow-sm">
                  <div className="font-semibold text-gray-900">{type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-16 bg-gray-50">
        <div className="container-padding">
          <div className="max-w-2xl mx-auto">
            <ServiceQuoteForm service="roofing" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}