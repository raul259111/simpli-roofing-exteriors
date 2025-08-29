'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import ServiceQuoteForm from '@/components/ServiceQuoteForm'
import { Shield, CheckCircle, Droplets, Home, AlertTriangle, Wrench } from 'lucide-react'

export default function GuttersContent() {

  const gutterServices = [
    'Seamless Aluminum Installation',
    'Aluminum Gutter Replacement',
    'Gutter Repair',
    'Downspout Installation',
    'Gutter Guards',
    'Gutter Cleaning',
    'Ice Dam Prevention',
    'Drainage Solutions'
  ]

  const gutterTypes = [
    'Seamless Aluminum',
    'K-Style Aluminum',
    'Half-Round Aluminum',
    'Box Style Aluminum'
  ]

  const benefits = [
    { icon: Home, title: 'Foundation Protection', description: 'Prevent costly foundation damage from improper drainage' },
    { icon: Droplets, title: 'Water Management', description: 'Direct rainwater safely away from your home' },
    { icon: Shield, title: 'Prevent Erosion', description: 'Protect landscaping and prevent soil erosion' },
    { icon: Wrench, title: 'Low Maintenance', description: 'Quality installation means fewer repairs and cleaning' }
  ]

  const warningSigns = [
    'Water pooling around foundation',
    'Gutters pulling away from house',
    'Rust, cracks, or holes in gutters',
    'Water damage on siding or fascia',
    'Basement flooding or moisture',
    'Gutters overflowing during rain'
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
                Professional Aluminum Gutter Installation in Southern Utah
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Protect your home's foundation and structure with seamless aluminum gutters and professional drainage solutions. 
                Essential protection for Southern Utah's intense monsoon seasons and winter weather.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#quote-form" className="btn-primary text-center">
                  Get Free Gutter Quote
                </a>
                <a href="tel:4359224340" className="btn-secondary text-center">
                  Call: 435-922-4340
                </a>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative w-full h-96 lg:h-[500px]">
                <Image
                  src="/images/gutters-service.jpg"
                  alt="Seamless aluminum gutter installation by Simpli Roofing & Exteriors"
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

      {/* Warning Signs Section */}
      <section className="py-16 bg-accent-50 border-l-4 border-accent-600">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-8 w-8 text-accent-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Don't Ignore These Warning Signs</h2>
              </div>
              <p className="text-xl text-gray-600 mb-6">
                Damaged or inadequate gutters can cause thousands of dollars in foundation and structural damage. 
                Contact us if you notice any of these issues:
              </p>
              <ul className="space-y-3">
                {warningSigns.map((sign, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-accent-600 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Professional Gutter Services</h3>
              <p className="text-accent-100 mb-6">
                Storm damage? Gutter failure during monsoon season? We provide professional gutter repairs 
                to prevent water damage to your home.
              </p>
              <a href="tel:4359224340" className="bg-white text-accent-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Call Today: 435-922-4340
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Quality Gutters Are Essential in Southern Utah
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Southern Utah's unique climate brings intense monsoons, flash floods, and rapid temperature changes. 
              Your gutters are your first line of defense against water damage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              )
            })}
          </div>

          {/* Monsoon Season Callout */}
          <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Built for Utah's Monsoon Season</h3>
            <p className="text-blue-100 text-lg">
              Southern Utah's monsoon season brings sudden, intense rainfall that can overwhelm inadequate gutter systems. 
              Our seamless gutters are sized and installed to handle these extreme weather events.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Complete Gutter Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From seamless installations to maintenance and repairs, we provide comprehensive gutter services 
              to keep your home protected year-round.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {gutterServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl text-center hover:bg-primary-50 transition-colors shadow-sm">
                <CheckCircle className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">{service}</h3>
              </div>
            ))}
          </div>

          {/* Gutter Types */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Aluminum Gutter Styles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gutterTypes.map((type, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">{type}</h4>
                  <div className="text-sm text-gray-600">
                    {type === 'Seamless Aluminum' && 'Most popular, durable, available in many colors'}
                    {type === 'K-Style Aluminum' && 'Traditional style, excellent water capacity'}
                    {type === 'Half-Round Aluminum' && 'Classic style, smooth water flow'}
                    {type === 'Box Style Aluminum' && 'Modern look, high capacity for commercial'}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-600">All installations include proper sizing calculations for Utah's rainfall patterns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-16 bg-gray-50">
        <div className="container-padding">
          <div className="max-w-2xl mx-auto">
            <ServiceQuoteForm service="gutters" />
          </div>
        </div>
      </section>

      {/* Maintenance Program */}
      <section className="py-16 bg-primary-600">
        <div className="container-padding text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Gutter Maintenance Program</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Keep your gutters working properly year-round with our maintenance program. 
            Regular cleaning and inspection prevents costly repairs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-primary-100 mb-8">
            <div>
              <div className="text-3xl font-bold mb-2">2x</div>
              <div>Annual Cleanings</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Free</div>
              <div>Inspections</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Priority</div>
              <div>Repair Service</div>
            </div>
          </div>
          <a href="tel:4359224340" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            Learn About Maintenance Plans
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}