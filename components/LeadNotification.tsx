'use client'
import { useState, useEffect } from 'react'
import { Bell, X, Phone, Mail, Clock, CheckCircle } from 'lucide-react'

interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  service: string
  timestamp: string
  status: 'new' | 'contacted' | 'closed'
  source: string
}

export default function LeadNotification() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [showNotification, setShowNotification] = useState(false)
  const [newLead, setNewLead] = useState<Lead | null>(null)

  useEffect(() => {
    // Set up WebSocket or polling for real-time lead notifications
    // For demo purposes, we'll use polling
    const checkForNewLeads = async () => {
      try {
        const response = await fetch('/api/leads/check')
        if (response.ok) {
          const data = await response.json()
          if (data.newLead) {
            handleNewLead(data.newLead)
          }
        }
      } catch (error) {
        console.error('Error checking for leads:', error)
      }
    }

    // Check every 30 seconds
    const interval = setInterval(checkForNewLeads, 30000)
    
    // Also check immediately on mount
    checkForNewLeads()

    return () => clearInterval(interval)
  }, [])

  const handleNewLead = (lead: Lead) => {
    setNewLead(lead)
    setShowNotification(true)
    setLeads(prev => [lead, ...prev])

    // Play notification sound (optional)
    playNotificationSound()

    // Send browser notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Lead!', {
        body: `${lead.name} requested a quote for ${lead.service}`,
        icon: '/favicon.ico',
        tag: lead.id
      })
    }

    // Auto-hide after 10 seconds
    setTimeout(() => {
      setShowNotification(false)
    }, 10000)
  }

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  const markAsContacted = async (leadId: string) => {
    try {
      await fetch(`/api/leads/${leadId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'contacted' })
      })
      
      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? { ...lead, status: 'contacted' } : lead
      ))
    } catch (error) {
      console.error('Error updating lead status:', error)
    }
  }

  if (!showNotification || !newLead) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-slide-up">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-2 animate-pulse" />
              <span className="font-bold">New Lead!</span>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Lead Details */}
        <div className="p-4">
          <div className="mb-3">
            <h3 className="font-bold text-gray-900 text-lg">{newLead.name}</h3>
            <p className="text-sm text-gray-600">
              Service: <span className="font-semibold">{newLead.service}</span>
            </p>
          </div>

          <div className="space-y-2 mb-4">
            <a
              href={`tel:${newLead.phone}`}
              className="flex items-center text-primary-600 hover:text-primary-700"
              onClick={() => markAsContacted(newLead.id)}
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-semibold">{newLead.phone}</span>
            </a>
            
            {newLead.email && (
              <a
                href={`mailto:${newLead.email}`}
                className="flex items-center text-primary-600 hover:text-primary-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">{newLead.email}</span>
              </a>
            )}
            
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-2" />
              <span>{new Date(newLead.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-2">
            <button
              onClick={() => {
                window.location.href = `tel:${newLead.phone}`
                markAsContacted(newLead.id)
              }}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </button>
            <button
              onClick={() => markAsContacted(newLead.id)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <CheckCircle className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Source Info */}
        <div className="bg-gray-50 px-4 py-2 text-xs text-gray-600">
          Source: {newLead.source}
        </div>
      </div>
    </div>
  )
}