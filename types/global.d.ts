// Global type declarations for analytics and tracking
declare global {
  interface Window {
    // Google Analytics
    gtag: (...args: any[]) => void
    dataLayer: any[]
    
    // Microsoft Clarity
    clarity?: (action: string, ...args: any[]) => void
  }
}

export {}