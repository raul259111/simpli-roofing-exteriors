'use client'

import Script from 'next/script'

export default function MicrosoftClarity() {
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

  if (!clarityProjectId) {
    return null // Don't load if no project ID is configured
  }

  return (
    <>
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityProjectId}");
          `,
        }}
        onError={() => {
          console.warn('Microsoft Clarity failed to load')
        }}
      />
    </>
  )
}

// Helper function to track custom events in Clarity
export const clarityEvent = (eventName: string, customAttributes?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.clarity) {
    try {
      window.clarity('set', eventName, customAttributes || {})
    } catch (error) {
      console.warn('Clarity event tracking failed:', error)
    }
  }
}

// Track specific user actions
export const ClarityTracking = {
  // Track form interactions
  formStart: (formName: string) => {
    clarityEvent('form_start', { form: formName })
  },
  
  formSubmit: (formName: string, success: boolean) => {
    clarityEvent('form_submit', { form: formName, success })
  },
  
  formError: (formName: string, error: string) => {
    clarityEvent('form_error', { form: formName, error })
  },
  
  // Track user engagement
  phoneClick: (phoneNumber: string) => {
    clarityEvent('phone_click', { number: phoneNumber })
  },
  
  pageScroll: (percentage: number) => {
    clarityEvent('page_scroll', { depth: percentage })
  },
  
  // Track conversions
  quoteRequest: (service: string) => {
    clarityEvent('quote_request', { service })
  },
  
  leadGenerated: (source: string) => {
    clarityEvent('lead_generated', { source })
  },
}

// Type declaration for window.clarity
declare global {
  interface Window {
    clarity: (action: string, ...args: any[]) => void
  }
}