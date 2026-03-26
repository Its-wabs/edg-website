'use client'

import { useRef, forwardRef, useImperativeHandle } from 'react'

const PROJECTS = [
  { id: 1, color: 'bg-blue-600', title: 'Project Alpha' },
  { id: 2, color: 'bg-emerald-500', title: 'Project Beta' },
  { id: 3, color: 'bg-purple-600', title: 'Project Gamma' },
  { id: 4, color: 'bg-orange-500', title: 'Project Delta' },
  { id: 5, color: 'bg-rose-500', title: 'Project Epsilon' },
]

const Projects = forwardRef(({ onViewAll }: { onViewAll: () => void }, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const btnRef = useRef<HTMLButtonElement>(null)

  useImperativeHandle(ref, () => ({
    section: sectionRef.current,
    items: itemsRef.current,
    button: btnRef.current,
  }))

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-primary-950"
    >
      <div className="relative flex aspect-video w-[90vw] max-w-[1200px] items-center justify-center md:w-[70vw] lg:max-h-[75vh]">
        {PROJECTS.map((proj, i) => (
          <div
            key={proj.id}
            ref={(el) => {
              itemsRef.current[i] = el
            }}
            className={`absolute inset-0 ${proj.color} flex flex-col justify-end overflow-hidden p-6 will-change-transform md:p-12`}
          >
            {/* Content */}
            <div className="relative z-10">
              <span className="mb-[-2rem] block select-none font-display text-[12rem] leading-none text-white/20"></span>
              <h3 className="font-display text-4xl uppercase tracking-tighter text-white md:text-6xl"></h3>
            </div>

            {/* Hover Circle Placeholder */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-white opacity-0 mix-blend-difference" />
          </div>
        ))}
      </div>
      {/* 3. The View All Projects Button */}
      <button
        ref={btnRef}
        onClick={onViewAll}
        className="md:bottom-13 absolute bottom-10 z-20 translate-y-8  border border-white/20 px-8 py-4 font-display text-xs uppercase tracking-widest text-white opacity-0 transition-colors duration-300 hover:bg-white hover:text-black"
      >
        View All Projects
      </button>
    </section>
  )
})

Projects.displayName = 'Projects'
export default Projects
