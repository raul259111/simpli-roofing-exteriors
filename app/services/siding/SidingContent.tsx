'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import ServiceQuoteForm from '@/components/ServiceQuoteForm'
import { Shield, Clock, Award, CheckCircle, Sun, Droplets, Palette, Home } from 'lucide-react'

export default function SidingContent() {

  const sidingServices = [
    'New Siding Installation',
    'Siding Replacement',
    'Siding Repair',
    'Color Matching',
    'Trim & Accent Work',
    'Insulation Upgrades',
    'Maintenance Services',
    'Weatherproofing'
  ]

  const sidingTypes = [
    'Vinyl Siding',
    'Fiber Cement',
    'Wood Siding',
    'Metal Siding',
    'Engineered Wood',
    'Composite Siding',
    'Stucco',
    'Stone Veneer'
  ]

  const benefits = [
    { icon: Shield, title: 'Weather Protection', description: 'Protect your home from Utah\'s extreme weather conditions' },
    { icon: Sun, title: 'UV Resistance', description: 'Modern siding withstands intense Southern Utah sun exposure' },
    { icon: Droplets, title: 'Moisture Control', description: 'Prevent water damage with proper siding installation' },
    { icon: Palette, title: 'Curb Appeal', description: 'Transform your home\'s appearance with beautiful siding options' }
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
                Professional Siding & Stucco Services in Southern Utah
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Protect and beautify your home with professional siding installation. 
                Built to withstand Utah's harsh climate while enhancing your home's curb appeal and value.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#quote-form" className="btn-primary text-center">
                  Get Free Siding Quote
                </a>
                <a href="tel:4359224340" className="btn-secondary text-center">
                  Call: 435-922-4340
                </a>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative w-full h-96 lg:h-[500px]">
                <Image
                  src="/images/siding-service.jpg"
                  alt="Professional siding and stucco installation by Simpli Roofing & Exteriors"
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
              Why Quality Siding Matters in Southern Utah
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your home's exterior faces extreme conditions - from scorching summer heat to winter storms. 
              Quality siding provides essential protection while beautifying your property.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              )
            })}
          </div>

          {/* Climate Considerations */}
          <div className="bg-accent-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Built for Utah's Extreme Climate</h3>
            <p className="text-red-100 text-lg mb-4">
              Southern Utah's temperature swings from 100°F+ summers to freezing winters, plus intense UV exposure and sudden storms.
            </p>
            <p className="text-red-100">
              Our siding materials and installation methods are specifically chosen to handle these challenging conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Complete Siding Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From new installations to repairs and maintenance, we handle all aspects of siding work with expert craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sidingServices.map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center hover:bg-primary-50 transition-colors">
                <CheckCircle className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">{service}</h3>
              </div>
            ))}
          </div>

          {/* Siding Materials */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Siding Materials We Work With</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sidingTypes.map((type, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">{type}</h4>
                  <div className="text-sm text-gray-600">
                    {type === 'Vinyl Siding' && 'Low maintenance, affordable, variety of colors'}
                    {type === 'Fiber Cement' && 'Extremely durable, fire-resistant, paintable'}
                    {type === 'Wood Siding' && 'Natural beauty, customizable, classic appeal'}
                    {type === 'Metal Siding' && 'Long-lasting, modern look, energy efficient'}
                    {type === 'Engineered Wood' && 'Wood look with enhanced durability'}
                    {type === 'Composite Siding' && 'Low maintenance composite materials'}
                    {type === 'Stucco' && 'Classic southwestern style, durable and fire-resistant'}
                    {type === 'Stone Veneer' && 'Premium appearance, excellent insulation'}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-600">All materials selected for optimal performance in Southern Utah's climate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-16 bg-gray-50">
        <div className="container-padding">
          <div className="max-w-2xl mx-auto">
            <ServiceQuoteForm service="siding" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container-padding text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Transform Your Home's Appearance</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Quality siding makes a dramatic difference. Professional installation with attention to every detail.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-primary-100 mb-8">
            <div>
              <div className="text-3xl font-bold mb-2">Expert</div>
              <div>Installation</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">30+</div>
              <div>Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Quality</div>
              <div>Workmanship Guaranteed</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              Get Your Free Estimate
            </Link>
            <a href="tel:4359224340" className="text-white text-lg font-semibold hover:text-primary-100 transition-colors">
              Call 435-922-4340
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}