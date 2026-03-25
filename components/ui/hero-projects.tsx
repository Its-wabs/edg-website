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

const HeroProjects = forwardRef<HTMLDivElement>((_, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  const getInitialStyles = (i: number) => ({
    width: i === 0 ? '80%' : i === 1 ? '20%' : '0%',
    opacity: i === 0 ? 1 : i === 1 ? 0.4 : 0,
    display: i > 2 ? 'none' : 'block',
  })

  useGSAP(
    () => {
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
    { dependencies: [currentIndex] }
  )

  return (
    <div
      ref={ref}
      className="z-10 flex h-auto w-full flex-col items-center overflow-visible p-10"
    >
      <div className="flex h-[60vh] w-[85vw] items-stretch justify-center gap-2">
        {PROJECTS.map((proj, i) => (
          <div
            key={proj.id}
            ref={(el) => {
              itemsRef.current[i] = el
            }}
            style={getInitialStyles(i)}
            className={`relative overflow-hidden rounded-sm ${proj.color}`}
          >
            <div className="absolute inset-0 flex flex-col justify-end whitespace-nowrap p-8">
              <span className="mb-2 text-8xl font-black leading-none text-white/20"></span>
              <h3 className="text-2xl font-bold uppercase tracking-tight text-white"></h3>
            </div>
            <div className="absolute left-1/2 top-10 flex -translate-x-1/2 items-center justify-center"></div>
          </div>
        ))}
      </div>
    </div>
  )
})

HeroProjects.displayName = 'HeroProjects'
export default HeroProjects
