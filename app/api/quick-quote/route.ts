import { NextResponse } from 'next/server'

// This would normally use SendGrid or another email service
// For now, we'll create a placeholder that can be easily integrated

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, service, message, timeframe } = body

    // Validate required fields
    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format the lead data
    const leadData = {
      type: 'quick_quote',
      name,
      phone,
      email: email || 'Not provided',
      service,
      message: message || 'No message',
      timeframe: timeframe || 'Not specified',
      timestamp: new Date().toISOString(),
      source: 'website_quick_quote',
      ip: request.headers.get('x-forwarded-for') || 'Unknown'
    }

    // TODO: Save lead to database in production

    // Send notification email (placeholder for SendGrid integration)
    await sendLeadNotification(leadData)

    // Send auto-response to customer if email provided
    if (email && email !== 'Not provided') {
      await sendCustomerAutoResponse(email, name, service)
    }

    // Track conversion
    // This would integrate with your analytics platform

    return NextResponse.json({ 
      success: true, 
      message: 'Quote request received successfully',
      leadId: generateLeadId()
    })
  } catch (error) {
    // TODO: Log error in production logging system
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    )
  }
}

// Helper function to send lead notification
async function sendLeadNotification(leadData: any) {
  // Placeholder for SendGrid integration
  // In production, uncomment and configure:
  
  /*
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
  const msg = {
    to: process.env.LEAD_NOTIFICATION_EMAIL || 'leads@simpliexteriors.com',
    from: 'noreply@simpliexteriors.com',
    subject: `New Quick Quote: ${leadData.service} - ${leadData.name}`,
    text: formatLeadEmail(leadData),
    html: formatLeadEmailHTML(leadData),
  }
  
  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error('Error sending notification email:', error)
  }
  */
  
  // TODO: Send email notification in production
}

// Helper function to send auto-response to customer
async function sendCustomerAutoResponse(email: string, name: string, service: string) {
  // TODO: Send auto-response email in production
}

// Generate unique lead ID
function generateLeadId(): string {
  return `LEAD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

// Format lead email content
function formatLeadEmail(leadData: any): string {
  return `
New Quick Quote Request

Name: ${leadData.name}
Phone: ${leadData.phone}
Email: ${leadData.email}
Service: ${leadData.service}
Timeframe: ${leadData.timeframe}
Message: ${leadData.message}
Submitted: ${new Date(leadData.timestamp).toLocaleString()}
Source: ${leadData.source}
IP: ${leadData.ip}

Please follow up with this lead as soon as possible.
  `.trim()
}

function formatLeadEmailHTML(leadData: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background-color: #f3f4f6; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #374151; }
    .value { color: #111827; margin-left: 10px; }
    .urgent { background-color: #fee2e2; padding: 10px; border-radius: 4px; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Quick Quote Request</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span>
        <span class="value">${leadData.name}</span>
      </div>
      <div class="field">
        <span class="label">Phone:</span>
        <span class="value"><a href="tel:${leadData.phone}">${leadData.phone}</a></span>
      </div>
      <div class="field">
        <span class="label">Email:</span>
        <span class="value"><a href="mailto:${leadData.email}">${leadData.email}</a></span>
      </div>
      <div class="field">
        <span class="label">Service:</span>
        <span class="value">${leadData.service}</span>
      </div>
      <div class="field">
        <span class="label">Timeframe:</span>
        <span class="value">${leadData.timeframe}</span>
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <span class="value">${leadData.message}</span>
      </div>
      <div class="field">
        <span class="label">Submitted:</span>
        <span class="value">${new Date(leadData.timestamp).toLocaleString()}</span>
      </div>
      ${leadData.timeframe === 'urgent' ? '<div class="urgent">⚠️ This is an urgent request - please follow up promptly!</div>' : ''}
    </div>
  </div>
</body>
</html>
  `.trim()
}