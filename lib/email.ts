import { Resend } from 'resend'

// Initialize Resend with API key from environment (gracefully handle missing key)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Business owner email - update this with the actual email
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'info@gosimpliut.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@gosimpliut.com'

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  postalCode: string
  phone: string
  service?: string
  message?: string
  source?: string
}

export interface EmailResponse {
  success: boolean
  message: string
  error?: string
}

// Email template for business owner notification
const getOwnerEmailTemplate = (data: ContactFormData) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #ea580c; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background: #f7f7f7; padding: 20px; border: 1px solid #ddd; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .value { margin-top: 5px; padding: 10px; background: white; border-radius: 3px; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
    .cta { display: inline-block; padding: 12px 24px; background: #ea580c; color: white !important; text-decoration: none; border-radius: 5px; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Lead from Simpli Roofing & Exteriors Website</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${data.firstName} ${data.lastName}</div>
      </div>
      
      <div class="field">
        <div class="label">Email:</div>
        <div class="value">${data.email}</div>
      </div>
      
      <div class="field">
        <div class="label">Phone:</div>
        <div class="value">${data.phone}</div>
      </div>
      
      <div class="field">
        <div class="label">Address:</div>
        <div class="value">${data.address}<br/>${data.city}, ${data.state} ${data.postalCode}</div>
      </div>
      
      ${data.service ? `
      <div class="field">
        <div class="label">Service Interested In:</div>
        <div class="value">${data.service}</div>
      </div>
      ` : ''}
      
      ${data.message ? `
      <div class="field">
        <div class="label">Message:</div>
        <div class="value">${data.message}</div>
      </div>
      ` : ''}
      
      <div class="field">
        <div class="label">Lead Source:</div>
        <div class="value">${data.source || 'Website'}</div>
      </div>
      
      <div class="field">
        <div class="label">Submitted At:</div>
        <div class="value">${new Date().toLocaleString('en-US', { timeZone: 'America/Denver' })}</div>
      </div>
      
      <a href="tel:${data.phone.replace(/\D/g, '')}" class="cta">Call ${data.firstName}</a>
    </div>
    
    <div class="footer">
      <p>This lead was automatically generated from your website at simpliexteriors.com</p>
      <p>To update notification settings, please contact your website administrator.</p>
    </div>
  </div>
</body>
</html>
`

// Email template for customer confirmation
const getCustomerEmailTemplate = (data: ContactFormData) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #ea580c; color: white; padding: 30px; text-align: center; border-radius: 5px 5px 0 0; }
    .content { background: white; padding: 30px; border: 1px solid #ddd; border-top: none; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
    .cta { display: inline-block; padding: 12px 24px; background: #ea580c; color: white !important; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    h1 { margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Contacting Simpli Roofing & Exteriors</h1>
    </div>
    <div class="content">
      <p>Dear ${data.firstName} ${data.lastName},</p>
      
      <p>Thank you for reaching out to Simpli Roofing & Exteriors! We've received your inquiry and appreciate your interest in our ${data.service || 'services'}.</p>
      
      <p><strong>What happens next?</strong></p>
      <ul>
        <li>One of our experienced team members will review your request</li>
        <li>We'll contact you within 1 business day to discuss your project</li>
        <li>We'll schedule a convenient time for a free consultation and estimate</li>
      </ul>
      
      <p><strong>Your Information:</strong></p>
      <ul>
        <li>Name: ${data.firstName} ${data.lastName}</li>
        <li>Email: ${data.email}</li>
        <li>Address: ${data.address}, ${data.city}, ${data.state} ${data.postalCode}</li>
        <li>Phone: ${data.phone}</li>
        ${data.service ? `<li>Service: ${data.service}</li>` : ''}
      </ul>
      
      <p>If you need immediate assistance, please don't hesitate to call us at <strong>435-922-4340</strong>.</p>
      
      <p>We look forward to working with you!</p>
      
      <p>Best regards,<br>
      The Simpli Roofing & Exteriors Team</p>
    </div>
    
    <div class="footer">
      <p>Simpli Roofing & Exteriors - Your Trusted Exterior Specialists</p>
      <p>Serving St. George and Cedar City, Utah | 30+ Years of Experience</p>
    </div>
  </div>
</body>
</html>
`

// Send email notification to business owner
export async function sendOwnerNotification(data: ContactFormData): Promise<EmailResponse> {
  try {
    if (!resend) {
      // TODO: Log configuration error in production logging system
      // TODO: Log the lead to database even if email fails
      return {
        success: false,
        message: 'Email service not configured',
        error: 'Missing API key'
      }
    }

    const result = await resend.emails.send({
      from: `Simpli Roofing & Exteriors <${FROM_EMAIL}>`,
      to: BUSINESS_EMAIL,
      subject: `New Lead: ${data.firstName} ${data.lastName} - ${data.service || 'General Inquiry'}`,
      html: getOwnerEmailTemplate(data),
      replyTo: data.email
    })

    if (result.error) {
      throw new Error(result.error.message)
    }

    return {
      success: true,
      message: 'Owner notification sent successfully'
    }
  } catch (error) {
    // TODO: Log error in production logging system
    return {
      success: false,
      message: 'Failed to send notification',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Send confirmation email to customer
export async function sendCustomerConfirmation(data: ContactFormData): Promise<EmailResponse> {
  try {
    if (!resend) {
      return {
        success: false,
        message: 'Email service not configured',
        error: 'Missing API key'
      }
    }

    const result = await resend.emails.send({
      from: `Simpli Roofing & Exteriors <${FROM_EMAIL}>`,
      to: data.email,
      subject: 'Thank You for Contacting Simpli Roofing & Exteriors',
      html: getCustomerEmailTemplate(data)
    })

    if (result.error) {
      throw new Error(result.error.message)
    }

    return {
      success: true,
      message: 'Confirmation email sent successfully'
    }
  } catch (error) {
    // TODO: Log error in production logging system
    return {
      success: false,
      message: 'Failed to send confirmation',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Send both notifications
export async function sendEmailNotifications(data: ContactFormData): Promise<{
  owner: EmailResponse
  customer: EmailResponse
}> {
  const [ownerResult, customerResult] = await Promise.all([
    sendOwnerNotification(data),
    sendCustomerConfirmation(data)
  ])

  return {
    owner: ownerResult,
    customer: customerResult
  }
}