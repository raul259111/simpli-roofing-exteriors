'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    clarity?: any
  }
}

export default function Analytics() {
  useEffect(() => {
    // Microsoft Clarity
    if (process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID) {
      (function(c: any, l: Document, a: string, r: string, i: string, t?: HTMLScriptElement, y?: Element) {
        c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) }
        t = l.createElement(r) as HTMLScriptElement
        t.async = true
        t.src = "https://www.clarity.ms/tag/" + i
        y = l.getElementsByTagName(r)[0]
        if (y && y.parentNode) {
          y.parentNode.insertBefore(t, y)
        }
      })(window, document, "clarity", "script", process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID)
    }

    // Heatmap.com
    if (process.env.NEXT_PUBLIC_HEATMAP_PROJECT_ID) {
      (function(h: any, e: Document, a: string, t: string, m?: HTMLScriptElement, p?: Element) {
        m = e.createElement(a) as HTMLScriptElement
        m.async = true
        m.src = t
        p = e.getElementsByTagName(a)[0]
        if (p && p.parentNode) {
          p.parentNode.insertBefore(m, p)
        }
      })(window, document, 'script', 'https://script.heatmap.com/track.js?site_id=' + process.env.NEXT_PUBLIC_HEATMAP_PROJECT_ID)
    }
  }, [])

  return null
}