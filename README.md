# Simpli Roofing & Exteriors Website

A modern, responsive website for Simpli Roofing & Exteriors, a professional roofing and exterior services company serving Southern Utah. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Service Pages**: Dedicated pages for Roofing, Windows, Siding, and Gutters services
- **Lead Generation**: Integrated contact forms with GoHighLevel (GHL) CRM webhook integration
- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **SEO Optimized**: Built-in SEO optimization with meta tags and structured data
- **Performance**: Fast loading times with Next.js 15 optimizations
- **Google Analytics**: Integrated tracking for form submissions and user interactions

## Tech Stack

- **Framework**: Next.js 15.4.7 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Email**: Resend API (optional)
- **CRM**: GoHighLevel webhook integration
- **Analytics**: Google Analytics 4

## Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- GoHighLevel account (for webhook integration)
- Resend account (optional, for email notifications)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/simpli-exteriors.git
cd simpli-exteriors
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Configure environment variables (see Environment Variables section below)

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# GoHighLevel Webhook Configuration
GHL_WEBHOOK_URL=your_ghl_webhook_url_here
GHL_API_KEY=your_ghl_api_key_here (optional)

# Resend Email Configuration (Optional)
RESEND_API_KEY=your_resend_api_key_here

# Google Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id_here
```

### GoHighLevel Webhook Setup

1. Log into your GoHighLevel account
2. Navigate to Settings > Webhooks
3. Create a new webhook with the following configuration:
   - **Trigger**: Contact Created/Updated
   - **URL**: Your webhook endpoint URL
   - **Method**: POST
   - **Headers**: Add any authentication headers if needed

4. The webhook expects the following fields (snake_case format):
   - `first_name` - Contact's first name
   - `last_name` - Contact's last name
   - `email` - Contact email
   - `phone` - Phone number (digits only)
   - `full_address` - Street address
   - `city` - City
   - `state` - State (2-letter code)
   - `postal_code` - Postal/ZIP code
   - `service_needed` - Selected service
   - `project_details` - Message/project details
   - `tags` - Array of tags for categorization

## Project Structure

```
simpli-exteriors/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── services/          # Service pages
│   │   ├── roofing/
│   │   ├── windows/
│   │   ├── siding/
│   │   └── gutters/
│   ├── contact/           # Contact page
│   ├── careers/           # Careers page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── ServiceQuoteForm.tsx  # Standardized quote form
│   └── GoogleAnalytics.tsx   # GA tracking
├── lib/                   # Utility functions
│   ├── ghl.ts            # GoHighLevel integration
│   └── validations.ts    # Form validation schemas
├── public/               # Static assets
│   └── images/          # Image files
└── styles/              # Additional styles
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run dev:webpack  # Start development server with Webpack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## Form Configuration

All service forms use a standardized layout with the following fields:
- First Name & Last Name
- Email & Phone
- Address (Street, City, State, Postal Code)
- Service Needed (dropdown)
- Project Details (optional text area)

Service options include:
- Roofing
- Windows
- Siding
- Gutters
- Multiple Services
- Not Sure - Need Assessment

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

1. Build the production bundle:
```bash
npm run build
```

2. The build output will be in the `.next` folder
3. Deploy using your preferred hosting service that supports Node.js

### Environment-Specific Configurations

- **Development**: Uses `.env.local`
- **Production**: Configure environment variables in your hosting platform

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading for off-screen images
- Turbopack for faster development builds
- Optimized CSS with Tailwind CSS
- Form validation on client-side to reduce server load

## Security Considerations

- All form inputs are validated both client-side and server-side
- Environment variables for sensitive data
- HTTPS enforced in production
- XSS protection through React's built-in escaping
- Input sanitization for all user-submitted data

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - The dev server will automatically find an available port
   - Check the console output for the actual port being used

2. **GHL Webhook Not Working**
   - Verify the webhook URL is correctly configured
   - Check that all required fields are being sent
   - Review server logs for any error messages

3. **Build Errors**
   - Clear the build cache: `rm -rf .next`
   - Clear node_modules cache: `rm -rf node_modules/.cache`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved by Simpli Roofing & Exteriors.

## Contact

Simpli Roofing & Exteriors
- Phone: 435-922-4340
- Website: [simpli-exteriors.com](https://simpli-exteriors.com)
- Service Areas: St. George, Hurricane, Ivins, Santa Clara, Washington, and surrounding areas in Southern Utah

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Form handling with [React Hook Form](https://react-hook-form.com/)
- Validation with [Zod](https://zod.dev/)