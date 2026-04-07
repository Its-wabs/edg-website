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

const HeroProjects = forwardRef<HTMLDivElement, { isActive: boolean }>(
  ({ isActive }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const itemsRef = useRef<(HTMLDivElement | null)[]>([])

    const getInitialStyles = (i: number) => ({
      width: i === 0 ? '80%' : i === 1 ? '20%' : '0%',
      opacity: i === 0 ? 1 : i === 1 ? 0.4 : 0,
      display: i > 2 ? 'none' : 'block',
    })

    useGSAP(
      () => {
        if (!isActive) return

        const timer = gsap.delayedCall(2.5, () => {
          const nextIndex = (currentIndex + 1) % PROJECTS.length
          const tl = gsap.timeline({
            onComplete: () => setCurrentIndex(nextIndex),
          })

          PROJECTS.forEach((_, i) => {
            let targetWidth = '0%'
            let opacity = 0.4

            if (i === nextIndex) {
              targetWidth = nextIndex === 0 ? '80%' : '60%'
              opacity = 1
            } else if (
              i === nextIndex - 1 ||
              (nextIndex === 0 && i === PROJECTS.length - 1)
            ) {
              targetWidth = '20%'
            } else if (
              i === nextIndex + 1 ||
              (nextIndex === PROJECTS.length - 1 && i === 0)
            ) {
              targetWidth = '20%'
            }

            tl.to(
              itemsRef.current[i],
              {
                width: targetWidth,
                autoAlpha: opacity,
                duration: 0.8,
                ease: 'power3.inOut',
                display: targetWidth === '0%' ? 'none' : 'block',
              },
              0
            )
          })
        })

        return () => timer.kill()
      },
      { dependencies: [currentIndex, isActive] }
    )

    return (
      <div
        ref={ref}
        className="z-10 flex h-auto w-full flex-col items-center overflow-visible p-10"
      >
        <div className="relative h-[40vh] w-full items-stretch justify-center gap-2 md:flex md:h-[60vh] md:w-[85vw]">
          {PROJECTS.map((proj, i) => (
            <div
              key={proj.id}
              ref={(el) => {
                itemsRef.current[i] = el
              }}
              style={getInitialStyles(i)}
              className="relative overflow-hidden  bg-neutral-900"
            >
              {/* Actual Image */}
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                priority={i < 2}
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                <span className="mb-2 font-display text-6xl font-black leading-none text-white/10 md:text-8xl">
                  0{proj.id}
                </span>
                <h3 className="font-sans text-xl font-bold uppercase tracking-widest text-white md:text-3xl">
                  {proj.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)

HeroProjects.displayName = 'HeroProjects'
export default HeroProjects
