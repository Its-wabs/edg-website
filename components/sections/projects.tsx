'use client'

import { useRef, forwardRef, useImperativeHandle, useState } from 'react'
import Image from 'next/image'

const PROJECTS = [
  {
    id: 1,
    title: 'Project one',
    desc: 'Système de design & Branding',
    image: '/images/projects/image.png',
    demo: '#',
  },
  {
    id: 2,
    title: 'Project two',
    desc: 'Interface de gestion complexe',
    image: '/images/projects/image.png',
    demo: '#',
  },
  {
    id: 3,
    title: 'Project three',
    desc: 'Expérience voyage immersive',
    image: '/images/projects/image.png',
    demo: '#',
  },
  {
    id: 4,
    title: 'Project four',
    desc: 'Plateforme E-commerce B2B',
    image: '/images/projects/image.png',
    demo: '#',
  },
  {
    id: 5,
    title: 'Project five',
    desc: 'Application Saas Enterprise',
    image: '/images/projects/image.png',
    demo: '#',
  },
]

const Projects = forwardRef(({ onViewAll }: { onViewAll: () => void }, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const btnRef = useRef<HTMLButtonElement>(null)

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useImperativeHandle(ref, () => ({
    section: sectionRef.current,
    items: itemsRef.current,
    button: btnRef.current,
  }))

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-primary-950"
    >
      <div className="relative flex aspect-video w-[90vw] max-w-[1200px] items-center justify-center md:w-[70vw] lg:max-h-[75vh]">
        {PROJECTS.map((proj, i) => (
          <div
            onMouseMove={handleMouseMove}
            key={proj.id}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={(el) => {
              itemsRef.current[i] = el
            }}
            onClick={() => window.open(proj.demo, '_blank')}
            className="group absolute inset-0 flex flex-col justify-end overflow-hidden bg-neutral-900 p-6 will-change-transform md:cursor-none md:p-12"
          >
            <Image
              src={proj.image}
              alt={proj.title}
              fill
              className="scale-[1.02] object-cover opacity-50 transition-all duration-700 md:opacity-100 md:group-hover:scale-105 md:group-hover:opacity-20"
              sizes="(max-width: 768px) 90vw, 70vw"
            />

            <div className="relative z-10 opacity-100 md:translate-y-8 md:opacity-0 md:transition-all md:duration-500 md:ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <span className="mb-[-1rem] block font-display text-[6rem] leading-none text-white/5 md:text-[10rem]">
                0{proj.id}
              </span>
              <h3 className="font-display text-4xl uppercase text-white md:text-7xl">
                {proj.title}
              </h3>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#20d76c]">
                {proj.desc}
              </p>
            </div>
          </div>
        ))}

        {/* Cursor badge */}
        {isHovered && (
          <div
            className="pointer-events-none fixed z-[100] hidden h-24 w-24 items-center justify-center rounded-full bg-[#20d76c] md:flex"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transform: 'translate(50%, 50%)',
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
      </div>

      <button
        ref={btnRef}
        onClick={onViewAll}
        className="absolute bottom-10 z-20 border border-white/10 px-8 py-4 font-display text-xs uppercase tracking-widest text-white transition-all hover:bg-white hover:text-primary-950 md:bottom-[3vh]"
      >
        View more Projects
      </button>
    </section>
  )
})

Projects.displayName = 'Projects'
export default Projects
