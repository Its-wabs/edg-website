'use client'

import { useRef, forwardRef, useImperativeHandle } from 'react'

const TEAM = [
  { name: 'Meriem', role: 'CEO', placeholderBg: 'bg-blue-600' },
  { name: 'Sophie', role: 'Lead Développeur', placeholderBg: 'bg-purple-600' },
  { name: 'Marc', role: 'Expert Stratégie', placeholderBg: 'bg-orange-500' },
]

const Team = forwardRef((_, ref) => {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const bgWordRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    section: sectionRef.current,
    grid: gridRef.current,
    bgLetters: '.bg-letter',
    bgWordContainer: bgWordRef.current,
    cards: '.team-card',
  }))

  const word = 'EQUIPE'

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-primary-950 px-6 py-24"
    >
      <div
        ref={bgWordRef}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      >
        <h2 className="flex font-display text-[25vw] font-black uppercase leading-none tracking-tighter text-white">
          {word.split('').map((letter, i) => (
            <span key={i} className="bg-letter inline-block">
              {letter}
            </span>
          ))}
        </h2>
      </div>

      {/* 2. FOREGROUND GRID */}
      <div className="relative z-10 w-full max-w-7xl">
        <div
          ref={gridRef}
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6 lg:gap-10"
        >
          {TEAM.map((member, i) => (
            <div
              key={i}
              className="team-card group relative aspect-square overflow-hidden border border-white/5 bg-primary-900"
            >
              {/* Background Color/Image */}
              <div
                className={`absolute inset-0 h-full w-full ${member.placeholderBg} transition-all duration-1000 ease-out group-hover:scale-110 md:grayscale md:group-hover:grayscale-0`}
              />

              <div className="absolute inset-x-0 bottom-0 z-20 flex translate-y-0 flex-col justify-end p-6 transition-all duration-500 ease-out md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                <h3 className="font-display text-2xl uppercase leading-none tracking-tighter text-white lg:text-3xl">
                  {member.name}
                </h3>
                <p className="mt-1 font-sans text-[10px] font-medium uppercase tracking-widest text-[#20d76c] lg:text-xs">
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
