'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, US_STATES } from '@/lib/validations'
import { z } from 'zod'
import { Loader2, CheckCircle, AlertCircle, Phone, Mail, User, MapPin, Briefcase, FileText } from 'lucide-react'
import { GAEvent } from '@/components/GoogleAnalytics'
import { ClarityTracking } from '@/components/MicrosoftClarity'

type ServiceFormData = z.infer<typeof contactFormSchema>

interface ServiceQuoteFormProps {
  service: 'roofing' | 'windows' | 'siding' | 'gutters'
  title?: string
}

const SERVICE_OPTIONS = [
  { value: 'roofing', label: 'Roofing' },
  { value: 'windows', label: 'Windows' },
  { value: 'siding', label: 'Siding' },
  { value: 'gutters', label: 'Gutters' },
  { value: 'multiple', label: 'Multiple Services' },
  { value: 'assessment', label: 'Not Sure - Need Assessment' }
]

export default function ServiceQuoteForm({ service, title }: ServiceQuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const [hasStartedForm, setHasStartedForm] = useState(false)

  const formTitle = title || `Get Your Free ${service.charAt(0).toUpperCase() + service.slice(1)} Quote`

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ServiceFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      service: service as any,
      state: 'UT'
    }
  })

  // Track form start
  const handleFormInteraction = () => {
    if (!hasStartedForm) {
      setHasStartedForm(true)
      GAEvent.custom('form_start', { form: `${service}_quote_form` })
      ClarityTracking.formStart(`${service}_quote_form`)
    }
  }

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...data, 
          source: `${service.charAt(0).toUpperCase() + service.slice(1)} Service Page`
        })
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Track successful submission with Google Analytics
        GAEvent.formSubmit(`${service}_quote_form`, {
          service: data.service,
          leadId: result.leadId
        })
        
        // Track conversion
        GAEvent.conversion('quote_request', 100)
        
        // Track with Microsoft Clarity
        ClarityTracking.formSubmit(`${service}_quote_form`, true)
        ClarityTracking.quoteRequest(data.service || service)
        ClarityTracking.leadGenerated(`${service}_service_page`)

        setSubmitStatus({
          type: 'success',
          message: result.message || `Thank you! We'll contact you within 1 business day with your quote.`
        })
        
        // Reset form after successful submission
        reset()
        
        // Clear success message after 10 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' })
        }, 10000)
      } else {
        // Track form error
        GAEvent.custom('form_error', {
          form: `${service}_quote_form`,
          error: result.message
        })
        ClarityTracking.formError(`${service}_quote_form`, result.message || 'submission_failed')
        
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Something went wrong. Please try again.'
        })
      }
    } catch (error) {
      // Track form error
      ClarityTracking.formError(`${service}_quote_form`, 'network_error')
      
      setSubmitStatus({
        type: 'error',
        message: 'Unable to submit form. Please try calling us at 435-922-4340.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{formTitle}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              <User className="inline h-4 w-4 mr-1" />
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('firstName')}
              type="text"
              id="firstName"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter first name"
              disabled={isSubmitting}
              onFocus={handleFormInteraction}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('lastName')}
              type="text"
              id="lastName"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter last name"
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            <Mail className="inline h-4 w-4 mr-1" />
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            <Phone className="inline h-4 w-4 mr-1" />
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="435-922-4340"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Address Fields */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="inline h-4 w-4 mr-1" />
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register('address')}
            type="text"
            id="address"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123 Main Street"
            disabled={isSubmitting}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        {/* City, State, Postal Code Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              {...register('city')}
              type="text"
              id="city"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="St. George"
              disabled={isSubmitting}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div className="md:col-span-1">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <select
              {...register('state')}
              id="state"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            >
              {US_STATES.map(state => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
            )}
          </div>

          <div className="md:col-span-1">
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              {...register('postalCode')}
              type="text"
              id="postalCode"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.postalCode ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="84770"
              disabled={isSubmitting}
            />
            {errors.postalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
            )}
          </div>
        </div>

        {/* Service Needed Dropdown */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
            <Briefcase className="inline h-4 w-4 mr-1" />
            Service Needed <span className="text-red-500">*</span>
          </label>
          <select
            {...register('service')}
            id="service"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.service ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          >
            <option value="">Select a service...</option>
            {SERVICE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
          )}
        </div>

        {/* Project Details Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            <FileText className="inline h-4 w-4 mr-1" />
            Project Details (Optional)
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Tell us about your project, timeline, or any specific requirements..."
            disabled={isSubmitting}
          />
        </div>

        {/* Status Messages */}
        {submitStatus.type && (
          <div
            className={`p-4 rounded-lg flex items-start space-x-3 ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {submitStatus.type === 'success' ? (
              <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            )}
            <p className="text-sm">{submitStatus.message}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="inline h-5 w-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Get Your Free Quote'
          )}
        </button>

        {/* Trust Indicators */}
        <div className="text-xs text-gray-500 text-center space-y-1">
          <p>✓ Free Consultation ✓ Professional Service ✓ No Obligation</p>
          <p>We respect your privacy and will never share your information.</p>
        </div>
      </form>
    </div>
  )
}