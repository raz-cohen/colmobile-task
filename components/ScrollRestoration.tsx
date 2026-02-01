'use client'

/**
 * Scroll Restoration for Next.js App Router
 * 
 * Restores scroll position ONLY when navigating back via browser back button.
 * Does NOT restore on page refresh or initial load.
 * 
 * Uses browser's Performance Navigation Timing API to detect navigation type.
 * 
 * Usage:
 * Add to root layout wrapped in Suspense:
 *   <Suspense fallback={null}>
 *     <ScrollRestoration />
 *   </Suspense>
 */

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

interface ScrollRestorationProps {
  /**
   * Enable or disable scroll restoration.
   */
  enabled?: boolean
  
  /**
   * Routes to exclude from restoration (will scroll to top).
   * Use simple string matching: '/products/1', '/products/2'
   */
  excludeRoutes?: string[]
}

export function ScrollRestoration({
  enabled = true,
  excludeRoutes = [],
}: ScrollRestorationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isRestoringRef = useRef(false)
  const isBackNavigationRef = useRef(false)
  const isNavigatingAwayRef = useRef(false)
  const currentPathnameRef = useRef(pathname)

  // Listen for any clicks on links - stop saving when user clicks away
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Find if click target is or is within a link
      const link = (e.target as HTMLElement)?.closest('a')
      if (link && link.href) {
        const url = new URL(link.href, window.location.origin)
        // Check if it's internal navigation to a different page
        if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
          // Stop saving immediately when link is clicked
          isNavigatingAwayRef.current = true
          
          // Re-enable after navigation (increased timeout)
          setTimeout(() => {
            isNavigatingAwayRef.current = false
          }, 500)
        }
      }
    }
    
    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [])

  // Listen for popstate events to detect back/forward navigation
  // This fires BEFORE pathname changes in Next.js
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // Set flag when popstate fires (back/forward navigation)
      isBackNavigationRef.current = true
    }
    
    window.addEventListener('popstate', handlePopState)
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // Simple storage key: pathname
  const storageKey = `scroll-${pathname}`

  useEffect(() => {
    if (!enabled) return

    // Detect if pathname changed (navigation happening)
    const pathnameChanged = currentPathnameRef.current !== pathname
    if (pathnameChanged) {
      // Stop saving scroll IMMEDIATELY
      isNavigatingAwayRef.current = true
      
      // Update pathname ref
      currentPathnameRef.current = pathname
      
      // Re-enable saving after navigation completes (increased from 100ms to 200ms)
      setTimeout(() => {
        isNavigatingAwayRef.current = false
      }, 200)
    }

    // Check if route should be excluded (e.g., product detail pages)
    const isExcluded = excludeRoutes.some(route => pathname.startsWith(route))
    
    if (isExcluded) {
      window.scrollTo(0, 0)
      // Reset flag after checking
      isBackNavigationRef.current = false
      return
    }

    // Check if this is back navigation using the popstate flag
    const isBackNavigation = isBackNavigationRef.current
    
    // Reset the flag immediately after reading (before any async operations)
    isBackNavigationRef.current = false

    // Only restore scroll if this is back/forward navigation
    if (isBackNavigation) {
      const savedPosition = sessionStorage.getItem(storageKey)
      if (savedPosition && !isRestoringRef.current) {
        isRestoringRef.current = true
        
        // Use setTimeout with 0ms to ensure we're after all synchronous operations
        // This allows Next.js router to complete its navigation first
        setTimeout(() => {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: parseInt(savedPosition, 10),
              behavior: 'instant',
            })
            isRestoringRef.current = false
          })
        }, 0)
      }
    } else {
      // Not back navigation - might be initial load or refresh
      // Give popstate a chance to fire by checking again after a microtask
      setTimeout(() => {
        if (isBackNavigationRef.current) {
          // Popstate fired late, restore now
          const savedPosition = sessionStorage.getItem(storageKey)
          if (savedPosition && !isRestoringRef.current) {
            isRestoringRef.current = true
            requestAnimationFrame(() => {
              window.scrollTo({
                top: parseInt(savedPosition, 10),
                behavior: 'instant',
              })
              isRestoringRef.current = false
            })
          }
          // Reset flag after late check
          isBackNavigationRef.current = false
        }
      }, 10)
    }

    // Save scroll position on scroll (throttled)
    let rafId: number | null = null
    const handleScroll = () => {
      // Don't save if we're navigating away or currently restoring
      if (!isRestoringRef.current && !isNavigatingAwayRef.current && rafId === null) {
        rafId = requestAnimationFrame(() => {
          const scrollPos = window.scrollY
          sessionStorage.setItem(storageKey, scrollPos.toString())
          rafId = null
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [enabled, pathname, storageKey, excludeRoutes])

  return null
}
