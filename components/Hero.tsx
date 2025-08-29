'use client'
import { ArrowRight, Shield, Users, Clock, Award, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const trustIndicators = [
  { icon: Shield, label: 'Quality', value: 'Guaranteed' },
  { icon: Users, label: 'Local', value: 'Experts' },
  { icon: Clock, label: 'Years Experience', value: '30+' },
  { icon: Award, label: 'Professional', value: 'Service' }
]

export default function Hero() {
  return (
    <section className="pt-24 lg:pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Utah's Most Trusted
                <span className="text-primary-600 block">Exterior Specialists</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your home with professional roofing, windows, siding, and aluminum gutter services. 
                Committed to excellence with 30+ years of experience.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              {trustIndicators.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <IconComponent className="h-8 w-8 text-primary-600" />
                    <div>
                      <div className="font-bold text-gray-900">{item.value}</div>
                      <div className="text-sm text-gray-600">{item.label}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/contact" className="btn-primary flex items-center justify-center text-lg px-8 py-4">
                Get Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/services" className="btn-secondary text-lg px-8 py-4 text-center">
                Our Services
              </Link>
            </div>

            {/* Professional Service */}
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>Prompt, professional service guaranteed</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative w-full h-96 lg:h-[500px]">
                <Image
                  src="/images/homepage-hero.jpg"
                  alt="Beautiful Southern Utah home with quality exterior work by Simpli Roofing & Exteriors"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
            </div>
            
            {/* Floating review card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border">
              <div className="flex items-center space-x-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600">"Excellent work and service!"</p>
              <p className="text-xs text-gray-500 mt-1">- Sarah M., St George</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}