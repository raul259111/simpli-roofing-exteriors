'use client'
import { Phone } from 'lucide-react'
import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="section-padding bg-primary-600">
      <div className="container-padding text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Home?
        </h2>
        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Get your free, no-obligation estimate today. Our experts will assess your needs and provide transparent pricing.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            Schedule Consultation
          </Link>
          <a href="tel:4359224340" className="flex items-center text-white hover:text-primary-100 transition-colors">
            <Phone className="h-5 w-5 mr-2" />
            <span className="text-lg font-semibold">Call 435-922-4340</span>
          </a>
        </div>
      </div>
    </section>
  )
}