import { NextResponse } from 'next/server'
import { prepareGHLData, sendToGHL } from '@/lib/ghl'

/**
 * POST /api/ghl-webhook
 * Direct endpoint for testing GHL webhook integration
 * This can also be used by external services to submit leads
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Prepare data for GHL format
    const ghlData = prepareGHLData(body)
    
    // Send to GHL
    const result = await sendToGHL(ghlData)
    
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to submit to GHL',
          error: result.error
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully submitted to GHL',
      contactId: result.contactId,
      data: ghlData
    })
    
  } catch (error) {
    console.error('GHL webhook error:', error)
    
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request data',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 400 }
    )
  }
}

/**
 * GET /api/ghl-webhook
 * Status endpoint to check if GHL integration is configured
 */
export async function GET() {
  const isConfigured = !!process.env.GHL_WEBHOOK_URL
  
  return NextResponse.json({
    status: 'GHL Webhook API',
    configured: isConfigured,
    timestamp: new Date().toISOString(),
    endpoints: {
      POST: '/api/ghl-webhook - Submit lead to GHL',
      GET: '/api/ghl-webhook - Check configuration status'
    },
    requiredFields: [
      'name',
      'email', 
      'phone',
      'address (optional)',
      'service (optional)',
      'message (optional)'
    ],
    serviceTypes: [
      'roofing',
      'windows', 
      'siding',
      'gutters',
      'other'
    ]
  })
}