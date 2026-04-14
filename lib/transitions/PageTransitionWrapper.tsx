'use client'

import { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'

interface PageTransitionWrapperProps {
  children: ReactNode
  className?: string
}

/**
 * Wrap each page's root div with this.
 * On mount it slides in from below (matching the habito.studio feel).
 * Also marks itself as [data-page-transition] so the outgoing animation
 * in TransitionContext can target it.
 */
export default function PageTransitionWrapper({
  children,
  className = '',
}: PageTransitionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Start off-screen below, slightly scaled up (feels like it's coming from depth)
    gsap.set(el, {
      yPercent: 8,
      scale: 1.02,
      filter: 'brightness(0.6)',
    })

    // Slide into place — this is the "new page entrance"
    gsap.to(el, {
      yPercent: 0,
      scale: 1,
      filter: 'brightness(1)',
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.05, // tiny delay so the cover panel is already clearing
      clearProps: 'filter,transform', // clean up after done
    })
  }, [])

  return (
    <div
      ref={ref}
      data-page-transition
      className={className}
      style={{ willChange: 'transform, filter', transformOrigin: 'top center' }}
    >
      {children}
    </div>
  )
}
