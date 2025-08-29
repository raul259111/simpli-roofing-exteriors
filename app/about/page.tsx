import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Award, Users, CheckCircle, MapPin, Star, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Simpli Roofing & Exteriors - 30+ Years Serving Southern Utah',
  description: 'Learn about Simpli Roofing & Exteriors, Southern Utah\'s trusted exterior specialists with over 30 years of experience in roofing, windows, siding, and gutters.',
  keywords: 'about Simpli Roofing & Exteriors, Utah contractors, St George roofing company, Cedar City exteriors, licensed contractors Utah',
}

const stats = [
  { number: '30+', label: 'Years Experience' },
  { number: 'Southern Utah', label: 'Specialists' },
  { number: 'Quality', label: 'Workmanship' },
  { number: 'Trusted', label: 'Professionals' }
]

const credentials = [
  { icon: Award, title: 'Certified Professionals', description: 'Factory-trained and certified installation experts' },
  { icon: Wrench, title: 'Quality Workmanship', description: 'Meticulous attention to detail on every project' },
  { icon: Users, title: 'Local & Trusted', description: 'Family-owned business serving our neighbors' }
]

const values = [
  'Integrity in every interaction',
  'Quality that exceeds expectations',
  'Transparent and fair pricing',
  'Respect for your home and time',
  'Standing behind our work',
  'Community-focused service'
]

const serviceAreas = [
  'St. George',
  'Cedar City',
  'Washington',
  'Hurricane',
  'Ivins',
  'Santa Clara',
  'Leeds',
  'La Verkin'
]

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About Simpli Roofing & Exteriors
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              For over 30 years, we've been Southern Utah's trusted exterior specialists, 
              protecting and beautifying homes throughout St. George, Cedar City, and surrounding communities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600">
        <div className="container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Simpli Roofing & Exteriors is built on a simple mission: provide honest, quality exterior services 
                  to our Southern Utah neighbors. We specialize in roofing, windows, siding, and aluminum gutters, 
                  bringing expertise and dedication to every project.
                </p>
                <p>
                  Through our extensive experience, we've adapted to new technologies 
                  and consistently delivered exceptional results. Our growth comes not from aggressive marketing, 
                  but from satisfied customers who recommend us to their friends and family.
                </p>
                <p>
                  Today, we're proud to be a family-owned business, combining time-tested 
                  craftsmanship with modern techniques and materials. Every project receives the same 
                  attention to detail that built our reputation over 30+ years of service.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center text-gray-500 p-8">
                <div className="text-6xl mb-4">🏆</div>
                <div className="text-xl font-medium">30+ Years of Excellence</div>
                <div className="text-lg mt-2">Serving Southern Utah with Pride</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 bg-gray-50">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Credentials
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain the highest standards of professionalism and expertise in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {credentials.map((item, index) => {
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

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Core Values</h3>
                <ul className="space-y-4">
                  {values.map((value, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Simpli Roofing & Exteriors?
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  When you choose Simpli Roofing & Exteriors, you're not just hiring a contractor – you're partnering 
                  with a team that treats your home like our own. Our commitment to excellence has earned us 
                  the trust of hundreds of Southern Utah homeowners.
                </p>
                <p>
                  We understand Utah's unique climate challenges, from scorching summers to winter storms. 
                  Our solutions are specifically designed to withstand these conditions while maintaining 
                  beautiful aesthetics.
                </p>
                <p>
                  Every team member is background-checked, trained, and committed to our standards of 
                  excellence. We respect your property, time, and investment, ensuring a smooth experience 
                  from consultation to completion.
                </p>
              </div>
              
              {/* Customer Review */}
              <div className="mt-8 bg-primary-50 rounded-lg p-6 border-l-4 border-primary-600">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-2">
                  "Simpli Roofing & Exteriors transformed our home with new siding and gutters. Professional, 
                  honest, and the quality is outstanding. Highly recommend!"
                </p>
                <p className="text-sm text-gray-600">- The Johnson Family, St. George</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Proudly Serving Southern Utah
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're your local exterior specialists, serving communities throughout Washington and Iron Counties.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary-600 mr-2" />
              Service Areas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {serviceAreas.map((area, index) => (
                <div key={index} className="flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-gray-700">{area}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-gray-600 text-center">
              <strong>And surrounding areas.</strong> Contact us to confirm service to your location.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container-padding text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Work with Southern Utah's Best?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Experience the Simpli Roofing & Exteriors difference. Quality work, honest pricing, and exceptional service.
          </p>
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