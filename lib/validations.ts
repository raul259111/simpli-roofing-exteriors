import { z } from 'zod'

// Phone number validation regex (US format)
const phoneRegex = /^(\+1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/

// Postal code validation regex (US format)
const postalCodeRegex = /^\d{5}(-\d{4})?$/

// US States for dropdown
export const US_STATES = [
  { value: 'UT', label: 'Utah' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'NV', label: 'Nevada' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'ID', label: 'Idaho' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'NM', label: 'New Mexico' }
]

// Contact form validation schema
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  
  address: z
    .string()
    .min(5, 'Please enter a valid street address')
    .max(200, 'Address must be less than 200 characters')
    .regex(/^[a-zA-Z0-9\s,.-]+$/, 'Please enter a valid street address'),
  
  city: z
    .string()
    .min(2, 'Please enter a valid city')
    .max(50, 'City must be less than 50 characters')
    .regex(/^[a-zA-Z\s.-]+$/, 'City can only contain letters, spaces, periods, and hyphens'),
  
  state: z
    .string()
    .length(2, 'Please select a state'),
  
  postalCode: z
    .string()
    .regex(postalCodeRegex, 'Please enter a valid postal code (e.g., 84770 or 84770-1234)'),
  
  phone: z
    .string()
    .regex(phoneRegex, 'Please enter a valid phone number')
    .transform((val) => {
      // Format phone number consistently
      const digits = val.replace(/\D/g, '')
      if (digits.length === 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
      }
      if (digits.length === 11 && digits[0] === '1') {
        return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
      }
      return val
    }),
  
  service: z
    .enum(['roofing', 'windows', 'siding', 'gutters', 'multiple', 'assessment', 'other'])
    .optional(),
  
  message: z
    .string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional()
})

// Quick quote form validation schema
export const quickQuoteSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  phone: z
    .string()
    .regex(phoneRegex, 'Please enter a valid phone number')
    .transform((val) => {
      const digits = val.replace(/\D/g, '')
      if (digits.length === 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
      }
      if (digits.length === 11 && digits[0] === '1') {
        return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
      }
      return val
    }),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional(),
  
  service: z
    .enum(['roofing', 'windows', 'siding', 'gutters'])
    .optional()
})

// Types exported from schemas
export type ContactFormData = z.infer<typeof contactFormSchema>
export type QuickQuoteData = z.infer<typeof quickQuoteSchema>

// Validation error helper
export function getErrorMessage(error: unknown): string {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message || 'Validation error'
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}