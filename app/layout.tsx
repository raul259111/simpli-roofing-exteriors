import './globals.css'
import { Inter } from 'next/font/google'
import Analytics from '@/components/Analytics'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import WebVitals from '@/components/WebVitals'
import LocalBusinessSchema from '@/components/LocalBusinessSchema'
import Breadcrumbs from '@/components/Breadcrumbs'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata = {
  title: {
    default: 'Simpli Roofing & Exteriors - Utah\'s Premier Roofing and Exterior Specialists',
    template: '%s | Simpli Roofing & Exteriors'
  },
  description: 'Professional roofing, siding, windows, and aluminum gutter services in St George and Cedar City, Utah. 30+ years of experience. Licensed, bonded, and insured. Free estimates available.',
  keywords: 'roofing Utah, siding Utah, windows Utah, aluminum gutters Utah, St George roofing, Cedar City contractors, exterior home improvement, Southern Utah contractors',
  authors: [{ name: 'Simpli Roofing & Exteriors' }],
  creator: 'Simpli Roofing & Exteriors',
  publisher: 'Simpli Roofing & Exteriors',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Simpli Roofing & Exteriors - Utah\'s Premier Roofing and Exterior Specialists',
    description: 'Professional roofing, siding, windows, and aluminum gutter services in Southern Utah. 30+ years experience. Free estimates.',
    url: 'https://simpliexteriors.com',
    siteName: 'Simpli Roofing & Exteriors',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simpli Roofing & Exteriors - Utah\'s Premier Roofing and Exterior Specialists',
    description: 'Professional roofing, siding, windows, and aluminum gutter services in Southern Utah. 30+ years experience.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <LocalBusinessSchema />
      </head>
      <body className={inter.className}>
        <Breadcrumbs />
        {children}
        <Analytics />
        <GoogleAnalytics />
        <WebVitals />
        {/* <PopupTrigger /> - Disabled for professional experience */}
        {/* <LeadNotification /> - Internal use only */}
      </body>
    </html>
  )
}