# Lead Capture System Setup Guide

## Overview
This guide explains how to set up and configure the enhanced lead capture functionality for Simpli Roofing & Exteriors website.

## Features Implemented

### 1. Quick Quote Popup Modal
- **Automatic Triggers:**
  - Scroll-based: Shows after 30% page scroll
  - Exit intent: Detects when user is about to leave
  - Time-based: Shows after 45 seconds on page
- **Smart Display:** Only shows once per 24 hours per visitor
- **Analytics Tracking:** All triggers and submissions are tracked

### 2. Service-Specific Quick Quote Widgets
- Embedded on each service page (Roofing, Windows, Siding, Gutters)
- Pre-fills service type automatically
- Compact form for quick submissions
- Instant quote request with timeframe selection

### 3. Phone Click Tracking
- All phone links are tracked automatically
- Captures:
  - Click source (which page/button)
  - Timestamp
  - User's current page
  - Referrer information
- Data sent to analytics endpoint

### 4. Lead Notification System
- Real-time lead notifications in browser
- Visual and audio alerts for new leads
- Quick action buttons (Call Now, Mark as Contacted)
- Lead status tracking

### 5. Email Integration (SendGrid)
- Automated lead notifications to business
- Customer auto-response emails
- Professional HTML email templates
- Lead tracking and ID generation

## Setup Instructions

### Step 1: Environment Variables
1. Copy `.env.example` to `.env.local`
2. Add your API keys:
```bash
SENDGRID_API_KEY=your_actual_api_key
LEAD_NOTIFICATION_EMAIL=your_email@domain.com
```

### Step 2: Install SendGrid (for production)
```bash
npm install @sendgrid/mail
```

### Step 3: Configure Analytics
1. Update Microsoft Clarity ID in `components/Analytics.tsx`
2. Add Google Analytics ID if using
3. Configure any additional tracking services

### Step 4: Test Lead Capture
1. Test popup triggers:
   - Scroll down page to trigger scroll popup
   - Move mouse to browser tab to trigger exit intent
   - Wait 45 seconds for time-based trigger

2. Test quick quote forms:
   - Submit form on service pages
   - Check console for lead data
   - Verify email notifications (when configured)

3. Test phone tracking:
   - Click phone links
   - Check Network tab for analytics calls
   - Verify tracking data in console

## API Endpoints

### `/api/quick-quote`
Handles quick quote form submissions
- Method: POST
- Body: `{ name, phone, email, service, message, timeframe }`
- Returns: `{ success, leadId, message }`

### `/api/contact`
Handles main contact form submissions
- Method: POST
- Body: `{ name, phone, email, service, message }`
- Returns: `{ success, leadId, timestamp }`

### `/api/analytics/phone-click`
Tracks phone link clicks
- Method: POST
- Body: `{ number, source, page, referrer, timestamp }`
- Returns: `{ success, tracked }`

### `/api/leads/check`
Checks for new leads (for notification system)
- Method: GET
- Returns: `{ hasNewLead, newLead? }`

### `/api/leads/[id]/status`
Updates lead status
- Method: PUT
- Body: `{ status: 'new' | 'contacted' | 'closed' }`
- Returns: `{ success, leadId, status }`

## Customization

### Popup Trigger Settings
Edit `components/PopupTrigger.tsx`:
- `scrollPercentage > 30` - Change scroll trigger point
- `setTimeout(..., 45000)` - Change time delay (milliseconds)
- `twentyFourHours` - Change display frequency

### Email Templates
Edit email HTML in:
- `/api/contact/route.ts` - Main contact form emails
- `/api/quick-quote/route.ts` - Quick quote emails

### Lead Notification Settings
Edit `components/LeadNotification.tsx`:
- `setInterval(..., 30000)` - Change check frequency
- `setTimeout(..., 10000)` - Change auto-hide duration

## Analytics Integration

### Microsoft Clarity
Already integrated. Events tracked:
- `quick_quote_submit`
- `quick_quote_popup_shown`
- `quick_quote_popup_closed`
- `service_quick_quote_submit`
- `phone_click`

### Google Analytics
Add to `components/PhoneLink.tsx`:
```javascript
if ((window as any).gtag) {
  (window as any).gtag('event', 'your_event_name', {
    // your parameters
  })
}
```

## Database Integration (Optional)

To save leads to a database:

1. Install Prisma or your preferred ORM
2. Create lead schema
3. Update API routes to save to database
4. Example with Prisma:

```javascript
// api/quick-quote/route.ts
import { prisma } from '@/lib/prisma'

const lead = await prisma.lead.create({
  data: {
    name,
    phone,
    email,
    service,
    message,
    source: 'quick_quote'
  }
})
```

## CRM Integration (Optional)

### HubSpot Example:
```javascript
const hubspot = require('@hubspot/api-client')
const hubspotClient = new hubspot.Client({ apiKey: process.env.HUBSPOT_API_KEY })

await hubspotClient.crm.contacts.basicApi.create({
  properties: {
    firstname: name.split(' ')[0],
    lastname: name.split(' ')[1] || '',
    phone,
    email,
    hs_lead_status: 'NEW'
  }
})
```

## Troubleshooting

### Popup Not Showing
- Check browser console for errors
- Clear localStorage (`localStorage.removeItem('quickQuoteLastShown')`)
- Verify PopupTrigger is added to layout.tsx

### Emails Not Sending
- Verify SendGrid API key is correct
- Check SendGrid sender verification
- Review email logs in SendGrid dashboard

### Phone Tracking Not Working
- Check Network tab for API calls
- Verify analytics endpoint is responding
- Check for console errors

## Production Checklist

- [ ] Set up SendGrid account and verify sender
- [ ] Add production environment variables
- [ ] Configure domain DNS for email
- [ ] Set up database for lead storage
- [ ] Configure backup notification method (SMS/Slack)
- [ ] Test all forms in production
- [ ] Set up lead response SLA monitoring
- [ ] Configure analytics dashboards
- [ ] Train team on lead notification system
- [ ] Set up automated lead routing rules

## Support

For issues or questions about the lead capture system, contact the development team or refer to the component documentation in the codebase.