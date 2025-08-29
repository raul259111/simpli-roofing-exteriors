'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight, Shield, Award, Clock, Users } from 'lucide-react'

const services = [
  {
    name: 'Roofing',
    icon: '🏠',
    description: 'Complete roofing solutions including installation, repair, and maintenance for residential properties.',
    features: ['New Roof Installation', 'Roof Repairs', 'Storm Damage', 'Roof Inspections', 'Maintenance Services'],
    href: '/services/roofing',
    image: 'roofing-bg'
  },
  {
    name: 'Windows',
    icon: '🪟',
    description: 'Energy-efficient window replacement and installation to improve your home\'s comfort and value.',
    features: ['Window Replacement', 'Energy Efficient Options', 'Custom Sizing', 'Professional Installation', 'Warranty Included'],
    href: '/services/windows',
    image: 'windows-bg'
  },
  {
    name: 'Siding',
    icon: '🏡',
    description: 'Durable siding and stucco installation to protect and beautify your home\'s exterior.',
    features: ['Vinyl Siding', 'Fiber Cement', 'Stucco', 'Wood Siding', 'Color Matching'],
    href: '/services/siding',
    image: 'siding-bg'
  },
  {
    name: 'Aluminum Gutters',
    icon: '🌧️',
    description: 'Seamless aluminum gutter systems to protect your home from water damage.',
    features: ['Seamless Aluminum', 'Gutter Guards', 'Downspouts', 'Gutter Cleaning', 'Repair Services'],
    href: '/services/gutters',
    image: 'gutters-bg'
  }
]

const whyChooseUs = [
  { icon: Shield, title: 'Licensed & Insured', description: 'Fully licensed and insured for your protection' },
  { icon: Award, title: '30+ Years Experience', description: 'Three decades serving Southern Utah' },
  { icon: Clock, title: 'Prompt Response', description: 'Quick response to all service requests' },
  { icon: Users, title: 'Quality Workmanship', description: 'Professional service with attention to detail' }
]

export default function ServicesContent() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Complete Exterior Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From roof to foundation, we provide comprehensive exterior solutions to protect and enhance your Southern Utah home. 
              30+ years of experience, licensed and insured.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-shadow">
                {/* Service Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">{service.icon}</div>
                    <div className="text-lg font-medium text-gray-600">{service.name} Services</div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Services Include:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    href={service.href}
                    className="btn-primary w-full text-center flex items-center justify-center"
                  >
                    Learn More About {service.name}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Simpli Roofing & Exteriors?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're Southern Utah's trusted exterior specialists, committed to quality workmanship and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container-padding text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contact us today for your free estimate. We'll assess your needs and provide transparent, competitive pricing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              Get Free Estimate
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