'use client'

import { useEffect } from 'react'
import { initPostHog, track } from '@/lib/posthog'

/** Starts PostHog and records outbound contact clicks (WhatsApp, phone, email). */
export default function PostHogProvider() {
  useEffect(() => {
    initPostHog()
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (href.includes('wa.me') || href.includes('whatsapp.com')) track('whatsapp_click')
      else if (href.startsWith('tel:')) track('phone_click')
      else if (href.startsWith('mailto:')) track('email_click')
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])
  return null
}
