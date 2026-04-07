'use client'
import { useRef, useState, forwardRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'

const PROJECTS = [
  { id: 1, title: 'Project one', image: '/images/projects/image.png' },
  { id: 2, title: 'Project two', image: '/images/projects/image.png' },
  { id: 3, title: 'Project three', image: '/images/projects/image.png' },
  { id: 4, title: 'Project four', image: '/images/projects/image.png' },
  { id: 5, title: 'Project five', image: '/images/projects/image.png' },
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
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={currentProject.image}
              alt={currentProject.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <span className="mb-1 font-display text-6xl font-black leading-none text-white/20">
                0{currentProject.id}
              </span>
              <h3 className="font-sans text-2xl font-bold uppercase tracking-tight text-white">
                {currentProject.title}
              </h3>
            </div>
          </div>

          {/* Next Card */}
          <div ref={nextRef} className="absolute inset-0 will-change-transform">
            <Image
              src={nextProject.image}
              alt={nextProject.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <span className="mb-1 font-display text-6xl font-black leading-none text-white/20">
                0{nextProject.id}
              </span>
              <h3 className="font-sans text-2xl font-bold uppercase tracking-tight text-white">
                {nextProject.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

HeroProjectsMobile.displayName = 'HeroProjectsMobile'
export default HeroProjectsMobile
