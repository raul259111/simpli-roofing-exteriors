interface GHLContactData {
  first_name: string
  last_name?: string
  email: string
  phone: string
  full_address?: string
  city?: string
  state?: string
  postal_code?: string
  service_needed: string
  tags?: string[]
  project_details?: string // Message/project details
  timeline?: string // Urgency/timeline
  additional_info?: string // Additional service-specific data
}

interface GHLResponse {
  success: boolean
  contactId?: string
  error?: string
}


/**
 * Format phone number for GHL (remove special characters)
 */
function formatPhoneForGHL(phone: string): string {
  // Remove all non-numeric characters except + at the beginning
  return phone.replace(/[^\d+]/g, '').replace(/^\+?1/, '')
}

/**
 * Map service type to GHL tags
 */
function getServiceTags(service?: string, source?: string): string[] {
  const tags = ['website-lead']
  
  // Add source page tag if provided
  if (source) {
    tags.push(source.toLowerCase().replace(/\s+/g, '-'))
  }
  
  switch (service) {
    case 'roofing':
      tags.push('roofing-lead')
      break
    case 'windows':
      tags.push('windows-lead')
      break
    case 'siding':
      tags.push('siding-lead')
      break
    case 'gutters':
      tags.push('gutters-lead')
      break
    case 'multiple':
      tags.push('multiple-services')
      break
    case 'assessment':
      tags.push('needs-assessment')
      break
    case 'other':
      tags.push('general-inquiry')
      break
    default:
      if (service) {
        tags.push(`${service}-lead`)
      } else {
        tags.push('general-inquiry')
      }
  }
  
  return tags
}

/**
 * Prepare form data for GHL webhook
 */
export function prepareGHLData(formData: any): GHLContactData {
  // Map service dropdown value to readable format
  const getServiceName = (service: string) => {
    switch (service) {
      case 'roofing': return 'Roofing'
      case 'windows': return 'Windows'
      case 'siding': return 'Siding'
      case 'gutters': return 'Gutters'
      case 'multiple': return 'Multiple Services'
      case 'assessment': return 'Needs Assessment'
      default: return service || 'General Inquiry'
    }
  }
  
  // Map form fields to GHL's expected snake_case format
  const ghlData: GHLContactData = {
    first_name: formData.firstName || '',
    last_name: formData.lastName || '',
    email: formData.email,
    phone: formatPhoneForGHL(formData.phone),
    full_address: formData.address,
    city: formData.city,
    state: formData.state,
    postal_code: formData.postalCode,
    service_needed: getServiceName(formData.service),
    tags: getServiceTags(formData.service, formData.source),
  }

  // Add message/project details
  if (formData.message) {
    ghlData.project_details = formData.message
  }

  // Add source information as additional info
  if (formData.source) {
    ghlData.additional_info = `Lead Source: ${formData.source}`
  }

  return ghlData
}

/**
 * Send data to GHL webhook
 */
export async function sendToGHL(data: GHLContactData): Promise<GHLResponse> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL
  
  if (!webhookUrl) {
    console.warn('GHL webhook URL not configured')
    return { success: true } // Don't fail the form submission if GHL is not configured
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.GHL_API_KEY || '', // Optional API key for authentication
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`GHL webhook returned ${response.status}: ${response.statusText}`)
    }

    const result = await response.json().catch(() => ({}))
    
    return {
      success: true,
      contactId: result.contactId || result.id || undefined,
    }
  } catch (error) {
    console.error('Failed to send data to GHL:', error)
    
    // Log error but don't fail the main form submission
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Combined function to prepare and send data to GHL
 */
export async function submitToGHL(formData: any): Promise<GHLResponse> {
  const ghlData = prepareGHLData(formData)
  return sendToGHL(ghlData)
}