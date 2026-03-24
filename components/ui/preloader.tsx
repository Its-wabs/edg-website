'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

const PreLoad = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
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
  }, [onComplete])

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
        {/* The Green Bar */}
        <div
          ref={barRef}
          className="mb-1 h-[30px] w-3 bg-accent-500 will-change-transform"
        />

        {/* The Logo Text */}
        <h1
          ref={textRef}
          className="font-display text-display-sm uppercase leading-[0.8] tracking-tighter text-white"
        >
          edg
        </h1>
      </div>
    </div>
  )
}

export default PreLoad
