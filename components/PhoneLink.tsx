'use client'
import { Phone } from 'lucide-react'
import { GAEvent } from '@/components/GoogleAnalytics'
import { ClarityTracking } from '@/components/MicrosoftClarity'

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
    // Track phone click with Google Analytics
    GAEvent.phoneClick(source, number)
    
    // Track phone click with Microsoft Clarity
    ClarityTracking.phoneClick(number)
    
    // Track conversion for phone calls
    GAEvent.conversion('phone_call', 50)
    
    // Track with custom analytics endpoint for internal tracking
    if (typeof window !== 'undefined') {
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
      }).catch(() => {
        // Silently fail - analytics shouldn't break functionality
      })
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