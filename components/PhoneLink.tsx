'use client'
import { Phone } from 'lucide-react'

interface PhoneLinkProps {
  number?: string
  displayNumber?: string
  className?: string
  showIcon?: boolean
  source?: string
  children?: React.ReactNode
}

export default function PhoneLink({ 
  number = '8015550123',
  displayNumber = '(801) 555-0123',
  className = '',
  showIcon = true,
  source = 'unknown',
  children
}: PhoneLinkProps) {
  
  const handleClick = () => {
    // Track phone click
    if (typeof window !== 'undefined') {
      // Track with Clarity
      if ((window as any).clarity) {
        (window as any).clarity('event', 'phone_click', {
          number: number,
          source: source,
          timestamp: new Date().toISOString(),
          page: window.location.pathname
        })
      }

      // Track with Google Analytics (if available)
      if ((window as any).gtag) {
        (window as any).gtag('event', 'click_to_call', {
          event_category: 'engagement',
          event_label: source,
          value: number
        })
      }

      // Track with custom analytics endpoint
      fetch('/api/analytics/phone-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number,
          source,
          page: window.location.pathname,
          referrer: document.referrer,
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.error('Failed to track phone click:', err))
    }
  }

  return (
    <a
      href={`tel:${number}`}
      onClick={handleClick}
      className={className}
      data-phone-tracking={source}
    >
      {children || (
        <>
          {showIcon && <Phone className="inline-block h-4 w-4 mr-1" />}
          {displayNumber}
        </>
      )}
    </a>
  )
}