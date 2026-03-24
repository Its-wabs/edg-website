'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface PreloaderProps {
  onComplete: () => void
}

const PreLoad = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
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

      // initial state rotated
      gsap.set(barRef.current, {
        opacity: 1,
        rotation: 90,
        scaleY: 0,
        x: 50,
      })
      gsap.set(textRef.current, { opacity: 0, x: -10 })

      // the filling
      tl.to(barRef.current, {
        scaleY: 1,
        duration: 3,
        ease: 'power2.inOut',
      })

        // flip
        .to(
          barRef.current,
          {
            x: 0,
            rotation: 0,
            duration: 0.7,
            ease: 'expo.inOut',
          },
          '+=0.2'
        )

        // reveal the text
        .to(
          textRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.2'
        )

        //  the exit

        .to(
          preloaderRef.current,
          {
            yPercent: -100,
            duration: 1,
            ease: 'expo.inOut',
          },
          '+=0.2'
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
      <div
        ref={containerRef}
        className="flex h-[40px] scale-150 items-end gap-2"
      >
        <div
          ref={barRef}
          className="mb-1 h-[30px] w-3 translate-x-[50px] rotate-90 scale-y-0 bg-accent-500 opacity-0 will-change-transform"
        />

        <h1
          ref={textRef}
          className="-translate-x-2.5 font-display text-display-sm uppercase leading-[0.8] tracking-tighter text-white opacity-0"
        >
          edg
        </h1>
      </div>
    </div>
  )
}

export default PreLoad
