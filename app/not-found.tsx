import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Home, ArrowLeft, Search, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Simpli Roofing & Exteriors',
  description: 'The page you are looking for could not be found. Return to Simpli Roofing & Exteriors homepage for roofing, windows, siding, and gutter services in Southern Utah.',
}

const quickLinks = [
  { name: 'Roofing Services', href: '/services/roofing', icon: '🏠' },
  { name: 'Window Installation', href: '/services/windows', icon: '🪟' },
  { name: 'Siding & Stucco', href: '/services/siding', icon: '🏡' },
  { name: 'Aluminum Gutters', href: '/services/gutters', icon: '🌧️' },
]

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* 404 Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-padding">
          <div className="max-w-3xl mx-auto text-center">
            {/* 404 Visual */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-primary-100 rounded-full mb-6">
                <AlertCircle className="h-16 w-16 text-primary-600" />
              </div>
              <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 mb-4">404</h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-4">
                Page Not Found
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Sorry, we couldn't find the page you're looking for. 
                It may have been moved or no longer exists.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Link 
                href="/" 
                className="btn-primary flex items-center justify-center px-6 py-3"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
              <Link 
                href="/contact" 
                className="btn-secondary px-6 py-3"
              >
                Contact Us
              </Link>
            </div>

            {/* Search Suggestion */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-3">
                <Search className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700 font-medium">Looking for something specific?</span>
              </div>
              <p className="text-gray-600">
                Try one of our main service pages below or call us at{' '}
                <a href="tel:4359224340" className="text-primary-600 font-semibold hover:underline">
                  435-922-4340
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Popular Services
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow group"
                >
                  <div className="text-4xl mb-3">{link.icon}</div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {link.name}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16">
        <div className="container-padding">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-primary-600 text-white rounded-2xl p-8">
              <Home className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                Need Help Finding What You're Looking For?
              </h3>
              <p className="text-primary-100 mb-6">
                Our team is here to help you with all your exterior home improvement needs. 
                Whether it's roofing, windows, siding, or gutters, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href="tel:4359224340" 
                  className="bg-white text-primary-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Call 435-922-4340
                </a>
                <Link 
                  href="/about" 
                  className="text-white font-semibold hover:text-primary-100 transition-colors"
                >
                  Learn About Us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}