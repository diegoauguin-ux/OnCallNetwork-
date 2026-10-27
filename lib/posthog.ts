'use client'

import posthog from 'posthog-js'

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

let started = false

export function initPostHog() {
  if (started || typeof window === 'undefined' || !KEY) return
  started = true
  posthog.init(KEY, {
    api_host: HOST,
    capture_pageview: 'history_change',
    capture_pageleave: true,
    autocapture: true,
    capture_heatmaps: true,
    person_profiles: 'identified_only',
    session_recording: { maskAllInputs: true },
  })
}

/** Safe wrapper: no-op on the server or when PostHog is not configured. */
export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !KEY || !started) return
  try {
    posthog.capture(event, props)
  } catch {
    /* noop */
  }
}
