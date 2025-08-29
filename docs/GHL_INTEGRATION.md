# GoHighLevel (GHL) Webhook Integration

## Overview
This website is integrated with GoHighLevel (GHL) to automatically sync all form submissions as leads in your GHL CRM. Every quote request and contact form submission is sent to GHL in real-time.

## Features
- ✅ Automatic lead creation in GHL for all form submissions
- ✅ Smart name parsing (splits into firstName and lastName)
- ✅ Service-specific tagging and categorization
- ✅ Custom field mapping for project details
- ✅ Parallel processing (doesn't slow down form submissions)
- ✅ Graceful error handling (forms work even if GHL is down)

## Configuration

### 1. Get Your GHL Webhook URL
1. Log into your GoHighLevel account
2. Navigate to Settings → Integrations → Webhooks
3. Create a new webhook or copy an existing webhook URL
4. The URL should look like: `https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID`

### 2. Set Environment Variables
Add these to your `.env.local` file:

```env
# Required: Your GHL webhook URL
GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID

# Optional: API key if your webhook requires authentication
GHL_API_KEY=your_api_key_here
```

### 3. Verify Configuration
Check if GHL is properly configured:
```bash
curl http://localhost:3001/api/ghl-webhook
```

## Data Mapping

### Standard Fields
All forms send these fields to GHL:

| Form Field | GHL Field | Example |
|------------|-----------|---------|
| Name | firstName, lastName | "John Smith" → firstName: "John", lastName: "Smith" |
| Email | email | "john@example.com" |
| Phone | phone | "4359224340" (formatted) |
| Address | address1 | "123 Main St, St. George, UT" |
| Service | tags | ["website-lead", "roofing-lead"] |
| Source | source | "Website - Roofing" |

### Custom Fields
Service-specific data is mapped to custom fields:

| Custom Field | Purpose | Example Values |
|--------------|---------|----------------|
| customField1 | Message/Project Details | "Need roof replacement" |
| customField2 | Timeline/Urgency | "urgent", "normal", "planning" |
| customField3 | Service-Specific Info | "Roof Type: Asphalt Shingles" |

## Service-Specific Tags

Each service type gets specific tags:

- **Roofing**: `["website-lead", "roofing-lead"]`
- **Windows**: `["website-lead", "windows-lead"]`
- **Siding**: `["website-lead", "siding-lead"]`
- **Gutters**: `["website-lead", "gutters-lead"]`
- **Multiple/Other**: `["website-lead", "multiple-services"]`
- **General Contact**: `["website-lead", "general-inquiry"]`

## Form Integration Points

### 1. Main Contact Form (`/contact`)
- Standard contact information
- Service selection
- Optional message field

### 2. Roofing Quote Form (`/services/roofing`)
- Roof type selection
- Urgency/timeline
- Project details

### 3. Windows Quote Form (`/services/windows`)
- Window type preference
- Number of windows
- Timeline

### 4. Siding Quote Form (`/services/siding`)
- Siding material preference
- Home size
- Current siding type

### 5. Gutters Quote Form (`/services/gutters`)
- Gutter type preference
- Current issues
- Home size

## Testing

### Test Individual Form Submission
```bash
# Test the GHL webhook directly
curl -X POST http://localhost:3001/api/ghl-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "435-555-0123",
    "address": "123 Test St",
    "service": "roofing",
    "message": "Test message"
  }'
```

### Run Full Test Suite
```bash
node scripts/test-ghl-webhook.js
```

This will:
1. Check GHL configuration
2. Test direct webhook endpoint
3. Test contact API integration
4. Submit sample data for each form type

## API Endpoints

### `/api/ghl-webhook`
Direct GHL webhook endpoint for testing and external integrations.

**GET**: Check configuration status
```json
{
  "status": "GHL Webhook API",
  "configured": true,
  "timestamp": "2024-01-28T10:00:00Z"
}
```

**POST**: Submit lead to GHL
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "435-555-0123",
  "address": "123 Main St",
  "service": "roofing",
  "message": "Need quote"
}
```

### `/api/contact`
Main contact form endpoint (sends to both email and GHL).

**Response includes GHL status:**
```json
{
  "success": true,
  "leadId": "LEAD-123456-ABC123",
  "data": {
    "confirmationSent": true,
    "notificationSent": true,
    "ghlSubmitted": true,
    "ghlContactId": "ghl_contact_123"
  }
}
```

## Error Handling

The integration is designed to be fault-tolerant:

1. **GHL Down**: Forms continue to work, emails are sent, leads are not lost
2. **Invalid Data**: Validation happens before GHL submission
3. **Network Issues**: Timeout handling prevents form submission delays
4. **Missing Config**: System works without GHL (email-only mode)

## Monitoring

Check GHL submission status in the browser console:
- ✅ Successful submission: `ghlSubmitted: true`
- ❌ Failed submission: `ghlSubmitted: false`
- 📝 Contact ID: `ghlContactId: "xyz123"`

Server logs will show:
```
GHL submission failed: [error details]
```

## Troubleshooting

### GHL not receiving leads
1. Check webhook URL is correct in `.env.local`
2. Verify webhook is active in GHL dashboard
3. Check server logs for error messages
4. Run test script: `node scripts/test-ghl-webhook.js`

### Phone numbers not formatting correctly
- System automatically removes special characters
- Accepts formats: (435) 555-0123, 435-555-0123, 4355550123
- Outputs to GHL: 4355550123

### Custom fields not showing in GHL
1. Ensure custom fields are created in GHL
2. Map field IDs in GHL webhook settings
3. Check field types match (text, number, etc.)

### Testing in development
1. Use ngrok to expose local webhook: `ngrok http 3001`
2. Update GHL webhook URL temporarily
3. Test form submissions
4. Check GHL contact creation

## Support

For GHL integration issues:
1. Check this documentation
2. Review server logs
3. Run test suite
4. Contact GHL support for webhook issues
5. Contact developer for code issues