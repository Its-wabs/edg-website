'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import Image from 'next/image'

const PROJECTS = [
  {
    id: 1,
    title: 'Project Alpha',
    category: 'Branding',
    image: '/images/projects/image.png',
    demo: '#',
  },
  {
    id: 2,
    title: 'Project Beta',
    category: 'Web Design',
    image: '/images/projects/image.png',
    demo: '#',
  },
  {
    id: 3,
    title: 'Project Gamma',
    category: 'Mobile App',
    image: '/images/projects/image.png',
    demo: '#',
  },
  {
    id: 4,
    title: 'Project Delta',
    category: 'E-Commerce',
    image: '/images/projects/image.png',
    demo: '#',
  },
  {
    id: 5,
    title: 'Project Epsilon',
    category: '3D Motion',
    image: '/images/projects/image.png',
    demo: '#',
  },
  {
    id: 6,
    title: 'Project Zeta',
    category: 'Strategy',
    image: '/images/projects/image.png',
    demo: '#',
  },
]

const ProjectsGrid = () => {
  const container = useRef(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useGSAP(
    () => {
      gsap.set('.grid-item', {
        opacity: 0,
        y: 100,
        rotationX: -45,
        z: -200,
        transformPerspective: 1000,
      })

      gsap.to('.grid-item', {
        opacity: 1,
        y: 0,
        rotationX: 0,
        z: 0,
        duration: 1.2,
        stagger: {
          amount: 0.4,
          grid: [3, 2],
          from: 'start',
        },
        ease: 'expo.out',
        clearProps: 'all',
      })
    },
    { scope: container }
  )

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      ref={container}
      className="min-h-screen w-full bg-primary-950 px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid-item mb-12">
          <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-white/30">
            Index / Selected Works
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              onClick={() => window.open(proj.demo, '_blank')}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHoveredId(proj.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="grid-item group relative aspect-[16/10] overflow-hidden rounded-sm bg-primary-900 md:cursor-none"
            >
              {/* Image */}
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="scale-[1.02] object-cover opacity-50 transition-all duration-700 md:opacity-100 md:group-hover:scale-105 md:group-hover:opacity-20"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
                  0{proj.id}
                </span>

                <div className="opacity-100 md:translate-y-4 md:opacity-0 md:transition-all md:duration-500 md:ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <h3 className="font-display text-4xl uppercase leading-none tracking-tighter text-white md:text-5xl">
                    {proj.title}
                  </h3>
                  <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-[#20d76c]">
                    {proj.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cursor badge */}
      {hoveredId !== null && (
        <div
          className="pointer-events-none fixed z-[100] hidden h-24 w-24 items-center justify-center rounded-full bg-[#20d76c] md:flex"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: 'translate(10px, -70%)',
          }}
        >
          <div className="flex flex-col items-center text-center">
            <span className="font-sans text-[10px] font-semibold uppercase leading-tight tracking-widest text-primary-950">
              View <br /> Live
            </span>
            <svg
              className="mt-1 h-4 w-4 text-primary-950"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProjectsGrid
