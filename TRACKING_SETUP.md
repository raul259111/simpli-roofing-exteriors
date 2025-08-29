# Analytics Tracking Setup Guide

This guide explains how to set up and configure analytics tracking for the Simpli Roofing & Exteriors website.

## Overview

The website includes two analytics platforms:
1. **Google Analytics 4 (GA4)** - For comprehensive web analytics and conversion tracking
2. **Microsoft Clarity** - For heatmaps, session recordings, and user behavior analysis

## Setup Instructions

### 1. Google Analytics 4 Setup

#### Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com)
2. Click "Admin" (gear icon) in the bottom left
3. Click "Create Property"
4. Enter property details:
   - Property name: "Simpli Roofing & Exteriors"
   - Time zone: "United States - Mountain Time"
   - Currency: "US Dollar"
5. Select business details and objectives
6. Accept terms and create property

#### Get Measurement ID
1. In GA4 property, go to Admin > Data Streams
2. Click "Add stream" > "Web"
3. Enter website URL: `https://simpli-exteriors.com`
4. Stream name: "Main Website"
5. Copy the Measurement ID (format: G-XXXXXXXXXX)

#### Configure GA4 Events
The following events are automatically tracked:
- `page_view` - Every page visit
- `form_submit` - Form submissions with form name
- `click_to_call` - Phone number clicks
- `conversion` - Quote requests and leads
- `scroll` - Scroll depth (25%, 50%, 75%, 90%, 100%)
- `time_on_page` - User engagement time

#### Set Up Conversions
1. Go to Admin > Conversions
2. Mark these events as conversions:
   - `form_submit`
   - `click_to_call`
   - `quote_request`

### 2. Microsoft Clarity Setup

#### Create Clarity Project
1. Go to [Microsoft Clarity](https://clarity.microsoft.com)
2. Sign in with Microsoft account
3. Click "New project"
4. Enter project details:
   - Name: "Simpli Roofing & Exteriors"
   - Website URL: `https://simpli-exteriors.com`
   - Category: "Services"
5. Click "Create"

#### Get Project ID
1. Go to Settings > Setup
2. Click "Install tracking code"
3. Copy the Project ID from the script
4. The ID is the string after `/tag/` in the script URL

#### Clarity Features
- **Heatmaps**: Visual representation of user clicks and scrolls
- **Session Recordings**: Watch actual user sessions
- **Dashboard**: User metrics and insights
- **Filters**: Segment users by behavior, device, location

### 3. Environment Configuration

Add these variables to your `.env.local` file:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR_ID_HERE

# Microsoft Clarity
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_project_id_here
```

### 4. Verify Installation

#### Google Analytics
1. Open your website in a browser
2. Go to GA4 > Reports > Realtime
3. You should see your visit appear
4. Navigate pages and verify page_view events
5. Submit a test form and verify form_submit event

#### Microsoft Clarity
1. Open your website
2. Go to Clarity dashboard
3. Wait 2-3 minutes for data processing
4. Check "Recordings" to see your session
5. Check "Heatmaps" after accumulating data

## Tracked Events

### Form Events
- **form_start**: User begins filling a form
- **form_submit**: Successful form submission
- **form_error**: Form submission error
- **quote_request**: Quote form submitted

### User Interactions
- **phone_click**: Phone number clicked
- **page_scroll**: Scroll depth milestones
- **time_on_page**: Time spent on page

### Conversions
- **lead_generated**: New lead created
- **quote_request**: Quote requested
- **phone_call**: Phone number clicked

## Custom Implementation

### Track Custom Events

#### Google Analytics
```javascript
import { GAEvent } from '@/components/GoogleAnalytics'

// Track a custom event
GAEvent.custom('event_name', {
  parameter1: 'value1',
  parameter2: 'value2'
})

// Track a conversion
GAEvent.conversion('conversion_type', 100) // value in USD
```

#### Microsoft Clarity
```javascript
import { ClarityTracking } from '@/components/MicrosoftClarity'

// Track custom event
ClarityTracking.formSubmit('contact_form', true)
ClarityTracking.quoteRequest('roofing')
```

### Track Phone Clicks
Phone clicks are automatically tracked when using the `PhoneLink` component:
```jsx
import PhoneLink from '@/components/PhoneLink'

<PhoneLink 
  number="4359224340"
  displayNumber="(435) 922-4340"
  source="header"
/>
```

## Privacy & Compliance

### GDPR Compliance
- IP anonymization is enabled
- Default consent mode configured
- Analytics storage granted by default
- Ad storage denied by default

### Cookie Policy
- First-party cookies only
- 7200 second (2 hour) expiration
- Secure and SameSite flags enabled

### User Privacy
- No personally identifiable information (PII) collected
- Session recordings in Clarity can be disabled
- Users can opt-out via browser settings

## Reporting & Analysis

### Key Metrics to Monitor

#### Traffic Metrics
- Users and Sessions
- Page views
- Bounce rate
- Average session duration

#### Conversion Metrics
- Form submission rate
- Phone click rate
- Quote request conversion rate
- Lead quality score

#### User Behavior
- Most visited pages
- User flow paths
- Drop-off points
- Device and browser usage

### Custom Reports

#### GA4 Custom Reports
1. Go to Reports > Library
2. Create new report
3. Add dimensions: Source/Medium, Landing Page
4. Add metrics: Users, Conversions, Engagement Rate

#### Clarity Insights
1. Use filters to segment users
2. Create funnels for conversion paths
3. Identify rage clicks and dead clicks
4. Analyze scroll depth on key pages

## Troubleshooting

### GA4 Not Tracking
1. Check browser console for errors
2. Verify Measurement ID is correct
3. Check ad blockers aren't blocking GA
4. Use GA4 DebugView for testing

### Clarity Not Recording
1. Verify Project ID is correct
2. Check if Clarity script loads
3. Clear browser cache
4. Check for CSP blocking issues

### Missing Events
1. Open browser DevTools
2. Go to Network tab
3. Filter by "collect" or "google-analytics"
4. Verify requests are being sent

## Best Practices

1. **Test in Development**: Use different measurement IDs for dev/staging/production
2. **Regular Monitoring**: Check analytics weekly for insights
3. **Data Retention**: Configure data retention policies in GA4
4. **Custom Alerts**: Set up alerts for traffic drops or spikes
5. **Annotations**: Add annotations for marketing campaigns or changes
6. **Goal Tracking**: Define and track specific business goals
7. **Segmentation**: Create user segments for targeted analysis

## Support Resources

- [GA4 Documentation](https://support.google.com/analytics)
- [Microsoft Clarity Help](https://docs.microsoft.com/clarity)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

## Contact

For analytics support or questions:
- Technical issues: Check browser console for errors
- Setup help: Refer to official documentation
- Custom tracking: Modify components in `/components` directory