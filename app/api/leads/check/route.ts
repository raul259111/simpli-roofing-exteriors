import { NextResponse } from 'next/server'

// This would normally check a database for new leads
// For demo purposes, we'll simulate occasional new leads

const lastCheckTime = Date.now()

export async function GET(request: Request) {
  try {
    // Simulate a 5% chance of a new lead on each check
    const hasNewLead = Math.random() < 0.05
    
    if (hasNewLead) {
      const services = ['roofing', 'windows', 'siding', 'gutters']
      const names = ['John Smith', 'Mary Johnson', 'Robert Williams', 'Patricia Brown', 'Michael Davis']
      
      const newLead = {
        id: `LEAD-${Date.now()}`,
        name: names[Math.floor(Math.random() * names.length)],
        phone: `(801) 555-${Math.floor(Math.random() * 9000) + 1000}`,
        email: Math.random() > 0.5 ? `customer${Math.floor(Math.random() * 100)}@email.com` : undefined,
        service: services[Math.floor(Math.random() * services.length)],
        timestamp: new Date().toISOString(),
        status: 'new',
        source: ['website', 'quick_quote', 'popup', 'service_page'][Math.floor(Math.random() * 4)]
      }
      
      // In production, save this lead to database
      // TODO: Save newLead to database
      
      return NextResponse.json({
        newLead,
        hasNewLead: true
      })
    }
    
    return NextResponse.json({
      hasNewLead: false,
      lastCheck: lastCheckTime
    })
  } catch (error) {
    // TODO: Log error in production logging system
    return NextResponse.json(
      { error: 'Failed to check for leads' },
      { status: 500 }
    )
  }
}