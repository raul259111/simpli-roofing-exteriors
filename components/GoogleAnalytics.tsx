'use client'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Don't load GA if no measurement ID is provided
if (!GA_MEASUREMENT_ID) {
  console.info('Google Analytics not configured - skipping initialization')
}

// Track page views
export function useGoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: document.title,
      })
    }
  }, [pathname, searchParams])
}

// Analytics event tracking helper
export const GAEvent = {
  // Track form submissions
  formSubmit: (formName: string, formData?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'engagement',
        event_label: formName,
        form_name: formName,
        ...formData
      })
    }
  },

  // Track phone clicks
  phoneClick: (source: string, phoneNumber: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_to_call', {
        event_category: 'engagement',
        event_label: source,
        phone_number: phoneNumber,
        value: 1
      })
    }
  },

  // Track conversions
  conversion: (conversionType: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${GA_MEASUREMENT_ID}/${conversionType}`,
        value: value || 0,
        currency: 'USD'
      })
    }
  },

  // Track scroll depth
  scrollDepth: (percentage: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'scroll', {
        event_category: 'engagement',
        event_label: `${percentage}%`,
        value: percentage
      })
    }
  },

  // Track time on page
  timeOnPage: (seconds: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'time_on_page', {
        event_category: 'engagement',
        value: seconds
      })
    }
  },

  // Track custom events
  custom: (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'custom',
        ...parameters
      })
    }
  }
}

export default function GoogleAnalytics() {
  useGoogleAnalytics()

  // Don't render if no GA ID is configured
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onError={() => {
          console.warn('Google Analytics failed to load')
        }}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Default consent mode
          gtag('consent', 'default', {
            'analytics_storage': 'granted',
            'ad_storage': 'denied',
            'functionality_storage': 'granted',
            'personalization_storage': 'denied',
            'security_storage': 'granted'
          });
          
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: true,
            cookie_flags: 'max-age=7200;secure;samesite=none',
            anonymize_ip: true
          });

          // Enhanced Ecommerce tracking
          gtag('config', '${GA_MEASUREMENT_ID}', {
            'custom_map.dimension1': 'service_type',
            'custom_map.dimension2': 'lead_source',
            'custom_map.dimension3': 'user_type'
          });
          
          // Enhanced conversion tracking
          gtag('set', 'user_properties', {
            'crm_id': null
          });
        `}
      </Script>
    </>
  )
}

// Scroll depth tracking hook
export function useScrollDepthTracking() {
  useEffect(() => {
    let maxScroll = 0
    const scrollMarks = [25, 50, 75, 90, 100]
    const trackedMarks = new Set<number>()

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage

        scrollMarks.forEach(mark => {
          if (scrollPercentage >= mark && !trackedMarks.has(mark)) {
            trackedMarks.add(mark)
            GAEvent.scrollDepth(mark)
          }
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}

// Time on page tracking hook
export function useTimeOnPageTracking() {
  useEffect(() => {
    const startTime = Date.now()
    const timeMarks = [30, 60, 120, 300, 600] // seconds

    const intervals = timeMarks.map(seconds => {
      return setTimeout(() => {
        GAEvent.timeOnPage(seconds)
      }, seconds * 1000)
    })

    return () => {
      intervals.forEach(clearTimeout)
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      GAEvent.timeOnPage(timeSpent)
    }
  }, [])
}