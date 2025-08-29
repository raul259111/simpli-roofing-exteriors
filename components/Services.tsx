'use client'
import Link from 'next/link'

const services = [
  { 
    name: 'Roofing', 
    icon: '🏠', 
    description: 'Professional roof installation and repair',
    href: '/services/roofing'
  },
  { 
    name: 'Windows', 
    icon: '🪟', 
    description: 'Energy-efficient window replacement',
    href: '/services/windows'
  },
  { 
    name: 'Siding', 
    icon: '🏡', 
    description: 'Durable siding and stucco installation',
    href: '/services/siding'
  },
  { 
    name: 'Aluminum Gutters', 
    icon: '🌧️', 
    description: 'Seamless aluminum gutter systems',
    href: '/services/gutters'
  }
]

export default function Services() {
  return (
    <section className="section-padding bg-white">
      <div className="container-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Complete Exterior Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From roof to foundation, we provide comprehensive exterior services to protect and enhance your Southern Utah home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group p-6 bg-gray-50 rounded-xl hover:bg-primary-50 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
              <div className="text-primary-600 font-semibold text-sm group-hover:text-primary-700">
                Learn More →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}