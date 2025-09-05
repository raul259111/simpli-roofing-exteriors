'use client'
import { useState, useEffect } from 'react'
import { X, Send, Phone, CheckCircle } from 'lucide-react'
import { GAEvent } from '@/components/GoogleAnalytics'

interface QuickQuoteModalProps {
  isOpen: boolean
  onClose: () => void
  service?: string
}

export default function QuickQuoteModal({ isOpen, onClose, service = '' }: QuickQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: service,
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (service) {
      setFormData(prev => ({ ...prev, service }))
    }
  }, [service])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Track quick quote submission
    if (typeof window !== 'undefined' && (window as any).clarity) {
      (window as any).clarity('event', 'quick_quote_submit', {
        service: formData.service,
        source: 'popup_modal'
      })
    }

    try {
      const response = await fetch('/api/quick-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Track successful submission
        GAEvent.formSubmit('quick_quote_modal', {
          service: formData.service || 'not_specified'
        })
        
        // Track Google Ads conversion
        GAEvent.adsConversionFormSubmission(
          formData.service || 'general',
          'quick_quote_modal',
          75 // Assign value to modal quotes if needed
        )
        
        setSubmitStatus('success')
        setTimeout(() => {
          onClose()
          setSubmitStatus('idle')
          setFormData({ name: '', phone: '', email: '', service: '', message: '' })
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up">
          {/* Header */}
          <div className="bg-primary-600 text-white p-6 rounded-t-2xl relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold mb-2">Get Your Free Quote</h2>
            <p className="text-primary-100">
              Quick 60-second form • No obligation • Free estimate
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  We'll contact you within 1 hour during business hours.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Or call us now at{' '}
                  <a href="tel:8015550123" className="text-primary-600 font-semibold">
                    (801) 555-0123
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Needed *
                  </label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="roofing">Roofing</option>
                    <option value="windows">Windows</option>
                    <option value="siding">Siding & Stucco</option>
                    <option value="gutters">Aluminum Gutters</option>
                    <option value="multiple">Multiple Services</option>
                    <option value="not-sure">Not Sure - Need Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quick Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Brief description of your project..."
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      Something went wrong. Please call us at{' '}
                      <a href="tel:8015550123" className="font-semibold">
                        (801) 555-0123
                      </a>
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Get My Free Quote
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Or call us directly</p>
                  <a
                    href="tel:8015550123"
                    className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    (801) 555-0123
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <span>✓ Licensed & Insured</span>
              <span>✓ 30+ Years</span>
              <span>✓ Free Estimates</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}