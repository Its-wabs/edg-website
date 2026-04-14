'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        {
          y: '100vh',
        },
        {
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          clearProps: 'all',
        }
      )
    },
    { dependencies: [] }
  )

  return (
    <div
      ref={containerRef}
      className="relative z-[95] min-h-screen w-full"
      /* z-[95] is higher than Menu (z-[90]) but lower than Navbar (z-[100]) */
    >
      {children}
    </div>
  )
}
