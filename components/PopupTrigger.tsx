'use client'
import { useState, useEffect } from 'react'
import QuickQuoteModal from './QuickQuoteModal'

export default function PopupTrigger() {
  const [showModal, setShowModal] = useState(false)
  const [hasShownScroll, setHasShownScroll] = useState(false)
  const [hasShownExit, setHasShownExit] = useState(false)

  useEffect(() => {
    // Check if popup was shown recently (within 24 hours)
    const lastShown = localStorage.getItem('quickQuoteLastShown')
    const twentyFourHours = 24 * 60 * 60 * 1000
    if (lastShown && Date.now() - parseInt(lastShown) < twentyFourHours) {
      setHasShownScroll(true)
      setHasShownExit(true)
      return
    }

    // Scroll trigger (show after 30% scroll)
    const handleScroll = () => {
      if (hasShownScroll || showModal) return
      
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      
      if (scrollPercentage > 30) {
        setShowModal(true)
        setHasShownScroll(true)
        localStorage.setItem('quickQuoteLastShown', Date.now().toString())
        
        // Track popup trigger
        if (typeof window !== 'undefined' && (window as any).clarity) {
          (window as any).clarity('event', 'quick_quote_popup_shown', {
            trigger: 'scroll',
            scrollPercentage: Math.round(scrollPercentage)
          })
        }
      }
    }

    // Exit intent trigger (mouse leaves viewport at top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasShownExit || hasShownScroll || showModal) return
      
      // Detect if mouse is leaving from the top of the viewport
      if (e.clientY <= 0) {
        setShowModal(true)
        setHasShownExit(true)
        localStorage.setItem('quickQuoteLastShown', Date.now().toString())
        
        // Track popup trigger
        if (typeof window !== 'undefined' && (window as any).clarity) {
          (window as any).clarity('event', 'quick_quote_popup_shown', {
            trigger: 'exit_intent'
          })
        }
      }
    }

    // Time-based trigger (show after 45 seconds)
    const timeoutId = setTimeout(() => {
      if (!hasShownScroll && !hasShownExit && !showModal) {
        setShowModal(true)
        localStorage.setItem('quickQuoteLastShown', Date.now().toString())
        
        // Track popup trigger
        if (typeof window !== 'undefined' && (window as any).clarity) {
          (window as any).clarity('event', 'quick_quote_popup_shown', {
            trigger: 'time_based',
            seconds: 45
          })
        }
      }
    }, 45000)

    // Add event listeners
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timeoutId)
    }
  }, [hasShownScroll, hasShownExit, showModal])

  const handleClose = () => {
    setShowModal(false)
    
    // Track popup close
    if (typeof window !== 'undefined' && (window as any).clarity) {
      (window as any).clarity('event', 'quick_quote_popup_closed')
    }
  }

  return <QuickQuoteModal isOpen={showModal} onClose={handleClose} />
}