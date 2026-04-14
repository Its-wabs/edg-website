'use client'

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from 'react'
import gsap from 'gsap'
import { useRouter, usePathname } from 'next/navigation'

interface TransitionContextType {
  navigateTo: (href: string) => void
}

const TransitionContext = createContext<TransitionContextType | null>(null)

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)

  // useRef so these never cause re-renders and are never stale in callbacks
  const isAnimating = useRef(false)
  const hasNavigated = useRef(false) // distinguishes first-load from real navigations
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Phase 2: pathname changed = new page mounted under the overlay → reveal
  useEffect(() => {
    // Skip the very first mount — no overlay is covering anything
    if (!hasNavigated.current) return

    const overlay = overlayRef.current
    if (!overlay) return

    // Cancel any safety fallback timer
    if (safetyTimer.current) {
      clearTimeout(safetyTimer.current)
      safetyTimer.current = null
    }

    // Kill any in-progress tween on the overlay before starting the reveal
    gsap.killTweensOf(overlay)

    // Slide overlay upward off screen, revealing the new page beneath
    gsap.to(overlay, {
      yPercent: -100,
      duration: 0.85,
      ease: 'power3.inOut',
      onComplete: () => {
        // Park it below the screen, ready for next use
        gsap.set(overlay, { yPercent: 100 })
        isAnimating.current = false
      },
    })
  }, [pathname])

  const navigateTo = useCallback(
    (href: string) => {
      // Prevent double-firing (e.g. double-click, menu + button both firing)
      if (isAnimating.current) return
      // Don't navigate to the current page
      if (href === window.location.pathname) return

      isAnimating.current = true
      hasNavigated.current = true

      const overlay = overlayRef.current
      if (!overlay) {
        // No overlay ref yet — just navigate immediately
        router.push(href)
        isAnimating.current = false
        return
      }

      // Kill any leftover tween from a previous transition
      gsap.killTweensOf(overlay)

      // Make sure overlay starts from below the screen
      gsap.set(overlay, { yPercent: 100 })

      // Phase 1: Cover slides up from below, hiding the current page
      gsap.to(overlay, {
        yPercent: 0,
        duration: 0.75,
        ease: 'power3.inOut',
        onComplete: () => {
          router.push(href)

          // Safety net: if pathname doesn't change within 3s (e.g. router error),
          // force-reset the overlay so the user isn't stuck on a black screen
          safetyTimer.current = setTimeout(() => {
            gsap.to(overlay, {
              yPercent: -100,
              duration: 0.5,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.set(overlay, { yPercent: 100 })
                isAnimating.current = false
                hasNavigated.current = false
              },
            })
          }, 3000)
        },
      })
    },
    [router]
  )

  // Cleanup safety timer on unmount
  useEffect(() => {
    return () => {
      if (safetyTimer.current) clearTimeout(safetyTimer.current)
    }
  }, [])

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {/*
        Overlay panel — always positioned below the viewport.
        Phase 1: slides UP to cover the screen (yPercent 100 → 0)
        Phase 2: slides UP off-screen to reveal new page (yPercent 0 → -100)
      */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: '#0a0a0a',
          transform: 'translateY(100%)',
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      />
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx)
    throw new Error('useTransition must be used inside TransitionProvider')
  return ctx
}
