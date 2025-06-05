'use client'

import dynamic from 'next/dynamic'

// Dynamically loads the real switcher only on the client
const LocaleSwitcherInner = dynamic(() => import('./_ActualLocaleSwitcher'), {
  ssr: false,
  loading: () => <div />, // Optional: what to render while it's loading
})

export default LocaleSwitcherInner
