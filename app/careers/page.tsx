'use client'
import { useState } from 'react'
import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Users, Upload, Send, CheckCircle, AlertCircle, Briefcase, Mail, User, Phone, FileText } from 'lucide-react'

// Note: Metadata doesn't work in client components, but we'll keep the structure
// export const metadata: Metadata = {
//   title: 'Careers | Join Our Team - Simpli Roofing & Exteriors',
//   description: 'Join the Simpli Roofing & Exteriors team. We\'re always looking for skilled professionals in roofing, windows, siding, and gutters.',
// }

export default function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: ''
  })
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      // Limit file size to 5MB
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      // Accept only PDF and DOC files
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Please upload a PDF or Word document')
        return
      }
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // In a real implementation, you would:
      // 1. Upload the file to a storage service
      // 2. Send the form data and file URL via email
      
      // For now, we'll just send the form data to the contact API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: 'career-inquiry',
          message: `Career Inquiry - Position: ${formData.position || 'General Application'}\nExperience: ${formData.experience}\n\nMessage: ${formData.message}\n\nNote: Resume attachment submitted (${file?.name || 'No file'})`
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          message: ''
        })
        setFile(null)
        // Reset file input
        const fileInput = document.getElementById('resume') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <Briefcase className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Build your career with Southern Utah's premier exterior specialists
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Left Column - Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Work at Simpli Roofing & Exteriors?
                </h2>
                <p className="text-gray-600 mb-4">
                  At Simpli Roofing & Exteriors, we're more than just a construction company – 
                  we're a team of dedicated professionals committed to excellence. With over 30 
                  years serving Southern Utah, we've built our reputation on quality workmanship 
                  and outstanding customer service.
                </p>
                <p className="text-gray-600">
                  We're always looking for skilled professionals who share our values of integrity, 
                  craftsmanship, and customer satisfaction.
                </p>
              </div>

              {/* What We Offer */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What We Offer</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Competitive compensation packages</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Opportunities for professional growth</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Supportive team environment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Work with industry-leading materials and tools</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Serve the beautiful Southern Utah community</span>
                  </li>
                </ul>
              </div>

              {/* Positions We're Looking For */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Positions We Typically Hire</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 text-primary-600 mr-2" />
                    <span>Roofing Technicians</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 text-primary-600 mr-2" />
                    <span>Window Installers</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 text-primary-600 mr-2" />
                    <span>Siding Specialists</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 text-primary-600 mr-2" />
                    <span>Gutter Installers</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 text-primary-600 mr-2" />
                    <span>Project Managers</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 text-primary-600 mr-2" />
                    <span>Sales Representatives</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Application Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Submit Your Application
              </h2>
              <p className="text-gray-600 mb-6">
                Interested in working with us? Send us your resume and we'll be in touch.
              </p>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-green-800 font-semibold">Application Submitted!</p>
                      <p className="text-green-700 text-sm mt-1">
                        Thank you for your interest. We'll review your application and contact you if there's a good fit.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-red-800 font-semibold">Submission Error</p>
                      <p className="text-red-700 text-sm mt-1">
                        Something went wrong. Please email your resume directly to info@gosimpliut.com
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="inline h-4 w-4 mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="John Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="435-922-4340"
                  />
                </div>

                {/* Position Interest */}
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                    <Briefcase className="inline h-4 w-4 mr-1" />
                    Position of Interest
                  </label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">General Application</option>
                    <option value="roofing">Roofing Technician</option>
                    <option value="windows">Window Installer</option>
                    <option value="siding">Siding Specialist</option>
                    <option value="gutters">Gutter Installer</option>
                    <option value="management">Project Manager</option>
                    <option value="sales">Sales Representative</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Years of Experience */}
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select experience level</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (3-5 years)</option>
                    <option value="senior">Senior Level (6-10 years)</option>
                    <option value="expert">Expert (10+ years)</option>
                  </select>
                </div>

                {/* Resume Upload */}
                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                    <FileText className="inline h-4 w-4 mr-1" />
                    Resume (PDF or Word, max 5MB)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 truncate">
                          {file ? file.name : 'Choose file...'}
                        </span>
                        <Upload className="h-5 w-5 text-gray-400" />
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Accepted formats: PDF, DOC, DOCX
                  </p>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Letter / Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Tell us about yourself, your experience, and why you'd like to join our team..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Note: Due to file upload limitations, please email your resume directly to{' '}
                  <a href="mailto:info@gosimpliut.com" className="text-primary-600 hover:underline">
                    info@gosimpliut.com
                  </a>{' '}
                  for best results.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Prefer to Apply Directly?
            </h2>
            <p className="text-gray-600 mb-6">
              You can also send your resume and cover letter directly to our HR team.
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm inline-block">
              <a
                href="mailto:info@gosimpliut.com?subject=Career%20Application%20-%20Simpli%20Roofing%20%26%20Exteriors"
                className="flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                <Mail className="h-5 w-5 mr-2" />
                info@gosimpliut.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}