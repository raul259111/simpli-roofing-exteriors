'use client'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import PhoneLink from '@/components/PhoneLink'

export default function Contact() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get Your Free Estimate
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your home? Contact us today for a free, no-obligation estimate. 
              We'll assess your needs and provide transparent, competitive pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Your Free Quote</h2>
              <ContactForm source="Contact Page" />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">Call us for immediate assistance</p>
                      <PhoneLink 
                        number="4359224340"
                        displayNumber="435-922-4340"
                        className="text-primary-600 font-semibold text-lg hover:text-primary-700"
                        source="contact_page"
                        showIcon={false}
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">Send us your questions</p>
                      <a href="mailto:info@gosimpliut.com" className="text-primary-600 font-semibold hover:text-primary-700">
                        info@gosimpliut.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Service Areas</h3>
                      <p className="text-gray-600">We proudly serve Southern Utah</p>
                      <div className="text-primary-600 font-semibold">
                        <div>St. George, UT</div>
                        <div>Cedar City, UT</div>
                        <div>Washington County</div>
                        <div>Iron County</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Business Hours</h3>
                      <div className="text-gray-600">
                        <div>Monday - Friday: 7:00 AM - 6:00 PM</div>
                        <div>Saturday: 8:00 AM - 4:00 PM</div>
                        <div>Sunday: Closed</div>
                        <div className="text-primary-600 font-semibold mt-2">
                          Free estimates by appointment
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Simpli Roofing & Exteriors?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    30+ years of experience in Southern Utah
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    Free estimates with transparent pricing
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    Quality workmanship guaranteed
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    Local family-owned business
                  </li>
                </ul>
              </div>

              {/* Response Time Guarantee */}
              <div className="bg-primary-50 p-6 rounded-xl border border-primary-200">
                <h3 className="text-xl font-bold text-primary-900 mb-3">Fast Response Guarantee</h3>
                <p className="text-primary-800">
                  We respond to all inquiries within 1 business day. For urgent matters, 
                  please call us directly at <PhoneLink 
                    number="4359224340"
                    displayNumber="435-922-4340"
                    className="font-semibold underline hover:no-underline"
                    source="contact_page_urgent"
                    showIcon={false}
                  />.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </main>
  )
}