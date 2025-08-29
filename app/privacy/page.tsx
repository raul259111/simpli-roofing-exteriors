import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Shield, Mail, Phone, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Simpli Services of Southern Utah LLC',
  description: 'Privacy policy for Simpli Roofing & Exteriors. Learn how we collect, use, and protect your personal information in compliance with Utah state law.',
  robots: 'index, follow',
}

export default function PrivacyPolicy() {
  const effectiveDate = 'January 1, 2025'
  const lastUpdated = 'January 1, 2025'

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-8 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Effective Date: {effectiveDate} | Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-12">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto prose prose-gray max-w-none">
            
            {/* Introduction */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 mb-4">
                Simpli Services of Southern Utah LLC, doing business as Simpli Roofing & Exteriors 
                ("we," "us," or "our"), respects your privacy and is committed to protecting your 
                personal information. This Privacy Policy explains how we collect, use, disclose, 
                and safeguard your information when you visit our website or use our services.
              </p>
              <p className="text-gray-600 mb-4">
                By using our website or services, you agree to the collection and use of information 
                in accordance with this Privacy Policy. If you do not agree with the terms of this 
                policy, please do not access our website or use our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information You Provide</h3>
              <p className="text-gray-600 mb-4">
                When you submit a contact form, request a quote, or otherwise interact with our website, 
                we may collect:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Service address</li>
                <li>Service preferences and project details</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Information Automatically Collected</h3>
              <p className="text-gray-600 mb-4">
                When you visit our website, we automatically collect certain information about your 
                device and usage, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website</li>
                <li>Date and time of visit</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Send you quotes and project information</li>
                <li>Communicate about your projects and appointments</li>
                <li>Improve our website and services</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
                <li>Protect our rights and prevent fraud</li>
              </ul>
            </div>

            {/* Data Storage and Security */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Storage and Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational security measures to protect 
                your personal information against unauthorized access, alteration, disclosure, or 
                destruction. Your information is stored on secure servers and accessed only by 
                authorized personnel on a need-to-know basis.
              </p>
              <p className="text-gray-600 mb-4">
                While we strive to protect your personal information, no method of transmission over 
                the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* Cookies and Tracking */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-600 mb-4">
                Our website uses cookies and similar tracking technologies to enhance your browsing 
                experience and analyze website traffic. Cookies are small data files stored on your 
                device that help us remember your preferences and understand how you use our website.
              </p>
              <p className="text-gray-600 mb-4">
                We use the following types of cookies:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li><strong>Essential cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics cookies:</strong> Help us understand website usage (Google Analytics)</li>
                <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
              <p className="text-gray-600 mb-4">
                You can control cookie settings through your browser preferences. Note that disabling 
                cookies may affect website functionality.
              </p>
            </div>

            {/* Third-Party Services */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-600 mb-4">
                We may share your information with trusted third-party service providers who assist 
                us in operating our website and conducting our business, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li><strong>Email service providers:</strong> For sending communications</li>
                <li><strong>Analytics providers:</strong> Google Analytics for website analytics</li>
                <li><strong>Payment processors:</strong> For processing payments securely</li>
                <li><strong>Marketing platforms:</strong> For advertising and promotional activities</li>
              </ul>
              <p className="text-gray-600 mb-4">
                These providers are contractually obligated to protect your information and use it 
                only for the purposes we specify.
              </p>
            </div>

            {/* Your Rights Under Utah Law */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights Under Utah Law</h2>
              <p className="text-gray-600 mb-4">
                Under Utah state law and applicable federal regulations, you have certain rights 
                regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li><strong>Right to Access:</strong> Request a copy of your personal information</li>
                <li><strong>Right to Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Right to Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Right to Opt-Out:</strong> Opt-out of marketing communications</li>
                <li><strong>Right to Non-Discrimination:</strong> Not be discriminated against for exercising your rights</li>
              </ul>
              <p className="text-gray-600 mb-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-600 mb-4">
                Our website and services are not directed to children under 18 years of age. We do 
                not knowingly collect personal information from children. If we become aware that we 
                have collected information from a child under 18, we will take steps to delete that 
                information promptly.
              </p>
            </div>

            {/* Changes to This Policy */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or legal requirements. We will notify you of any material changes by posting the updated 
                policy on this page with a new "Last Updated" date. Your continued use of our website 
                after changes are posted constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about this Privacy Policy, your personal information, or would 
                like to exercise your privacy rights, please contact us at:
              </p>
              
              <div className="space-y-3">
                <p className="font-semibold text-gray-900">
                  Simpli Services of Southern Utah LLC
                </p>
                <p className="text-gray-600">
                  DBA: Simpli Roofing & Exteriors
                </p>
                
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2 text-primary-600" />
                  <a href="mailto:info@gosimpliut.com" className="hover:text-primary-600">
                    info@gosimpliut.com
                  </a>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-2 text-primary-600" />
                  <a href="tel:4359224340" className="hover:text-primary-600">
                    435-922-4340
                  </a>
                </div>
                
                <div className="flex items-start text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-primary-600 mt-1" />
                  <div>
                    Southern Utah<br />
                    Service Areas: St. George, Cedar City, and surrounding communities
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Compliance */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal Compliance</h2>
              <p className="text-gray-600 mb-4">
                This Privacy Policy is designed to comply with:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>Utah Consumer Privacy Act (if applicable)</li>
                <li>CAN-SPAM Act</li>
                <li>General Data Protection Regulation (GDPR) for EU visitors</li>
                <li>California Consumer Privacy Act (CCPA) for California residents</li>
                <li>Other applicable state and federal privacy laws</li>
              </ul>
            </div>

            {/* Back to Top */}
            <div className="text-center pt-8 border-t">
              <Link href="/" className="text-primary-600 hover:text-primary-700 font-semibold">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}