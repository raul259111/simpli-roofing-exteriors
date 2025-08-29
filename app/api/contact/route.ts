import { NextResponse } from 'next/server'
import { contactFormSchema, getErrorMessage } from '@/lib/validations'
import { sendEmailNotifications } from '@/lib/email'
import { submitToGHL } from '@/lib/ghl'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate form data
    const validatedData = contactFormSchema.parse(body)
    
    // Add metadata
    const formData = {
      ...validatedData,
      source: body.source || 'Contact Form',
      timestamp: new Date().toISOString(),
      leadId: generateLeadId(),
      // Include any service-specific fields from the body
      ...extractServiceFields(body)
    }
    
    // Send to both email and GHL in parallel for better performance
    const [emailResults, ghlResult] = await Promise.all([
      sendEmailNotifications(formData),
      submitToGHL(formData)
    ])
    
    // Log GHL submission result (but don't fail the request)
    if (!ghlResult.success) {
      console.error('GHL submission failed:', ghlResult.error)
    }
    
    // TODO: Log submission to production logging system
    
    // Return success response even if emails or GHL fail (data is still captured)
    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We\'ll be in touch within 1 business day.',
      leadId: formData.leadId,
      data: {
        confirmationSent: emailResults.customer.success,
        notificationSent: emailResults.owner.success,
        ghlSubmitted: ghlResult.success,
        ghlContactId: ghlResult.contactId
      }
    })
    
  } catch (error) {
    // TODO: Log error in production logging system
    
    const errorMessage = getErrorMessage(error)
    
    return NextResponse.json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? errorMessage : 'Please check your information and try again.'
    }, { status: 400 })
  }
}

// Helper function to generate unique lead ID
function generateLeadId(): string {
  return `LEAD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
}

// Helper function to extract service-specific fields
function extractServiceFields(body: any): any {
  const serviceFields: any = {}
  
  // Name fields
  if (body.firstName) serviceFields.firstName = body.firstName
  if (body.lastName) serviceFields.lastName = body.lastName
  
  // Address fields
  if (body.city) serviceFields.city = body.city
  if (body.state) serviceFields.state = body.state
  if (body.postalCode) serviceFields.postalCode = body.postalCode
  
  // Roofing specific fields
  if (body.roofType) serviceFields.roofType = body.roofType
  
  // Windows specific fields
  if (body.windowType) serviceFields.windowType = body.windowType
  if (body.numberOfWindows) serviceFields.numberOfWindows = body.numberOfWindows
  
  // Siding specific fields
  if (body.sidingType) serviceFields.sidingType = body.sidingType
  if (body.homeSize) serviceFields.homeSize = body.homeSize
  if (body.currentSiding) serviceFields.currentSiding = body.currentSiding
  
  // Gutters specific fields
  if (body.gutterType) serviceFields.gutterType = body.gutterType
  if (body.currentIssue) serviceFields.currentIssue = body.currentIssue
  
  // Common fields
  if (body.urgency) serviceFields.urgency = body.urgency
  
  return serviceFields
}

// GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    status: 'Contact API is running',
    timestamp: new Date().toISOString(),
    emailConfigured: !!process.env.RESEND_API_KEY
  })
}