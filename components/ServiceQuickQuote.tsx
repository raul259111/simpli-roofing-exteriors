'use client'
import { useState } from 'react'
import { Send, Phone, Clock } from 'lucide-react'
import { GAEvent } from '@/components/GoogleAnalytics'

interface ServiceQuickQuoteProps {
  service: string
  serviceName: string
}

export default function ServiceQuickQuote({ service, serviceName }: ServiceQuickQuoteProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    timeframe: 'flexible'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Track service quick quote submission
    if (typeof window !== 'undefined' && (window as any).clarity) {
      (window as any).clarity('event', 'service_quick_quote_submit', {
        service: service,
        timeframe: formData.timeframe,
        source: 'service_widget'
      })
    }

    try {
      const response = await fetch('/api/quick-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: service,
          message: `Service: ${serviceName}, Timeframe: ${formData.timeframe}`
        }),
      })

      if (response.ok) {
        // Track successful submission
        GAEvent.formSubmit('quick_quote_form', {
          service: service,
          timeframe: formData.timeframe
        })
        
        // Track Google Ads conversion
        GAEvent.adsConversionFormSubmission(
          service,
          'service_quick_quote_widget',
          50 // Assign value to quick quotes if needed
        )
        
        setSubmitStatus('success')
        setFormData({ name: '', phone: '', email: '', timeframe: 'flexible' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center mb-4">
        <Clock className="h-6 w-6 mr-2" />
        <h3 className="text-xl font-bold">Quick {serviceName} Quote</h3>
      </div>
      
      <p className="text-primary-100 mb-6">
        Request your free professional estimate
      </p>

      {submitStatus === 'success' ? (
        <div className="bg-green-500 bg-opacity-20 rounded-lg p-4 text-center">
          <p className="font-semibold mb-2">✓ Quote Request Received!</p>
          <p className="text-sm text-primary-100">
            We'll call you within 1 hour during business hours
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg placeholder-primary-200 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
          
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg placeholder-primary-200 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
          
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email (optional)"
            className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg placeholder-primary-200 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
          
          <select
            name="timeframe"
            value={formData.timeframe}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            <option value="urgent" className="text-gray-900">Urgent - This week</option>
            <option value="week" className="text-gray-900">Within a week</option>
            <option value="month" className="text-gray-900">Within a month</option>
            <option value="flexible" className="text-gray-900">I'm flexible</option>
          </select>

          {submitStatus === 'error' && (
            <p className="text-sm text-red-200">
              Error submitting. Please call (801) 555-0123
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-primary-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                Get Free Estimate
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>
      )}

      <div className="mt-4 pt-4 border-t border-white border-opacity-20">
        <p className="text-sm text-primary-100 mb-2 text-center">Or call us now</p>
        <a
          href="tel:8015550123"
          className="flex items-center justify-center bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors"
        >
          <Phone className="h-4 w-4 mr-2" />
          <span className="font-semibold">(801) 555-0123</span>
        </a>
      </div>
    </div>
  )
}