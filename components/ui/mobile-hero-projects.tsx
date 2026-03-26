'use client'
import { useRef, useState, forwardRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const PROJECTS = [
  { id: 1, color: 'bg-blue-600', title: 'Project Alpha' },
  { id: 2, color: 'bg-emerald-500', title: 'Project Beta' },
  { id: 3, color: 'bg-purple-600', title: 'Project Gamma' },
  { id: 4, color: 'bg-orange-500', title: 'Project Delta' },
  { id: 5, color: 'bg-rose-500', title: 'Project Epsilon' },
]

const HeroProjectsMobile = forwardRef<HTMLDivElement, { isActive: boolean }>(
  ({ isActive }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const currentRef = useRef<HTMLDivElement>(null)
    const nextRef = useRef<HTMLDivElement>(null)

    useGSAP(
      () => {
        if (!isActive) return
        // the reset
        gsap.set(currentRef.current, { x: '0%', opacity: 1, scale: 1 })
        gsap.set(nextRef.current, { x: '100%', opacity: 0, scale: 0.9 })

        const timer = gsap.delayedCall(3, () => {
          const nextIndex = (currentIndex + 1) % PROJECTS.length
          const tl = gsap.timeline({
            onComplete: () => setCurrentIndex(nextIndex),
          })

          // the animation
          tl.to(currentRef.current, {
            x: '-20%',
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: 'expo.inOut',
          })

          tl.fromTo(
            nextRef.current,
            { x: '100%', opacity: 0, scale: 1.1 },
            {
              x: '0%',
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'expo.out',
            },
            '<'
          )
        })

        return () => timer.kill()
      },
      { dependencies: [currentIndex, isActive], scope: containerRef }
    )

    const currentProject = PROJECTS[currentIndex]
    const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length]

    return (
      <div ref={ref} className="z-10 flex w-full flex-col items-center p-6">
        <div
          ref={containerRef}
          className="relative aspect-video w-full overflow-hidden"
        >
          {/* Current Card */}
          <div
            ref={currentRef}
            className={`absolute inset-0 will-change-transform ${currentProject.color}`}
          >
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="mb-1 text-5xl font-black leading-none text-white/20"></span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white"></h3>
            </div>
          </div>

          {/* Next Card */}
          <div
            ref={nextRef}
            className={`absolute inset-0 will-change-transform ${nextProject.color}`}
          >
            <div className="absolute inset-0 flex flex-col justify-end p-6 ">
              <span className="mb-1 text-5xl font-black leading-none text-white/20"></span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white"></h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

HeroProjectsMobile.displayName = 'HeroProjectsMobile'
export default HeroProjectsMobile
