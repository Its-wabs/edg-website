'use client'

import { useRef, forwardRef, useImperativeHandle } from 'react'

const TEAM = [
  { name: 'Meriem', role: 'CEO', placeholderBg: 'bg-blue-600' },
  { name: 'Sophie', role: 'Lead Développeur', placeholderBg: 'bg-purple-600' },
  { name: 'Marc', role: 'Expert Stratégie', placeholderBg: 'bg-orange-500' },
]

const Team = forwardRef((_, ref) => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    section: sectionRef.current,
    title: titleRef.current,
    grid: gridRef.current,
    cards: '.team-card',
  }))

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-primary-950 px-6 py-24 md:h-screen"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 md:px-6">
        <h2
          ref={titleRef}
          className="mb-8 text-center font-display text-4xl uppercase leading-none tracking-tighter text-white md:mb-12 md:text-[8vw]"
        >
          L&apos;Équipe
        </h2>

        <div
          ref={gridRef}
          className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-10"
        >
          {TEAM.map((member, i) => (
            <div
              key={i}
              className="team-card group  relative aspect-[3/4] overflow-hidden bg-primary-900"
            >
              <div
                className={`absolute inset-0 h-full w-full ${member.placeholderBg} transition-all duration-1000 ease-out group-hover:scale-105 md:grayscale md:group-hover:grayscale-0`}
              />

              <div className="absolute inset-x-0 bottom-0 z-20 flex translate-y-0 flex-col justify-end p-6 opacity-100 transition-all duration-500 ease-out md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                <h3 className="font-display text-3xl uppercase leading-none tracking-tighter text-white md:text-4xl">
                  {member.name}
                </h3>
                <p className="mt-2 font-sans text-xs font-medium uppercase tracking-widest text-accent-500 md:text-sm">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

Team.displayName = 'Team'
export default Team
