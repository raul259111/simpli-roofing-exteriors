'use client'
import { Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              Simpli<span className="text-primary-400">Roofing & Exteriors</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Southern Utah's premier exterior specialists, providing quality roofing, windows, siding, 
              and aluminum gutter services with 30+ years of experience.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
              <a href="tel:4359224340" className="flex items-center hover:text-primary-400 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                <span>435-922-4340</span>
              </a>
              <a href="mailto:info@gosimpliut.com" className="flex items-center hover:text-primary-400 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@gosimpliut.com</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/services/roofing" className="hover:text-white transition-colors">Roofing</Link></li>
              <li><Link href="/services/windows" className="hover:text-white transition-colors">Windows</Link></li>
              <li><Link href="/services/siding" className="hover:text-white transition-colors">Siding & Stucco</Link></li>
              <li><Link href="/services/gutters" className="hover:text-white transition-colors">Aluminum Gutters</Link></li>
            </ul>
          </div>

          {/* Service Areas & Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>St George</li>
              <li>Cedar City</li>
            </ul>
            
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <p>&copy; 2025 Simpli Roofing & Exteriors. All rights reserved.</p>
            <div className="flex space-x-4 text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}