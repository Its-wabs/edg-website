'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface PreloaderProps {
  onComplete: () => void
}

const PreLoad = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const barFillRef = useRef<HTMLDivElement>(null)
  const barTrackRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isComplete, setIsComplete] = useState(false)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(preloaderRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: 'expo.inOut',
            onComplete: () => {
              setIsComplete(true)
              onComplete()
            },
          })
        },
      })

      // 1. Setup initial state

      gsap.set(barTrackRef.current, {
        rotation: 90,
        x: 60,
      })
      gsap.set(textRef.current, { x: -10 })

      tl.to(barTrackRef.current, {
        opacity: 1,
        duration: 0.4,
      })
        // 2. The Filling Animation
        .to(barFillRef.current, {
          scaleY: 1,
          duration: 2.5,
          ease: 'power1.inOut',
        })
        // 3. The Flip & Center
        .to(
          barTrackRef.current,
          {
            x: 0,
            rotation: 0,
            duration: 0.8,
            ease: 'expo.inOut',
          },
          '+=0.1'
        )
        // 4. Reveal Text
        .to(
          textRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        )
    },
    { scope: containerRef }
  )

  if (isComplete) return null

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black"
    >
      <div ref={containerRef} className="flex scale-[2] items-baseline gap-1">
        {/* The Track */}
        <div
          ref={barTrackRef}
          className="relative h-[28px] w-3 overflow-hidden bg-white/10 opacity-0 will-change-transform"
        >
          {/* The Fill  */}
          <div
            ref={barFillRef}
            className="absolute inset-0 origin-bottom scale-y-0 bg-accent-500 will-change-transform"
          />
        </div>

        <h1
          ref={textRef}
          className="font-display text-display-sm uppercase leading-none tracking-tighter text-white opacity-0"
        >
          edg
        </h1>
      </div>
    </div>
  )
}

export default PreLoad
