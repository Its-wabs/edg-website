'use client'

import { useRef, forwardRef, useImperativeHandle } from 'react'

const PRINCIPLES = [
  {
    id: '01',
    title: 'MISSION',
    desc: "Propulser l'innovation numérique en transformant des idées complexes en expériences fluides et performantes.",
  },
  {
    id: '02',
    title: 'VISION',
    desc: "Devenir le partenaire stratégique de référence pour les entreprises qui visent l'excellence digitale.",
  },
  {
    id: '03',
    title: 'APPROCHE',
    desc: 'Un équilibre parfait entre rigueur technique, stratégie data-driven et intuition artistique.',
  },
]

const STATS = [
  { label: 'Clients', value: '12' },
  { label: 'Experts', value: '12' },
  { label: 'Projets', value: '10' },
  { label: 'Années', value: '3' },
]

const About = forwardRef((_, ref) => {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    section: sectionRef.current,
    headline: headlineRef.current,
    process: processRef.current,
    stats: statsRef.current,
    steps: '.step-card',
    numbers: '.num-val',
  }))

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-primary-950"
    >
      {/* LAYER 1: HEADLINE */}
      <div
        ref={headlineRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <h2 className="header-title flex flex-col items-center justify-center gap-x-6 font-display text-[12vw] uppercase leading-none tracking-tighter text-white md:flex-row md:text-[8rem]">
          <span>C&apos;est qui</span>
          <span className="text-accent-500">edg</span>
          <span>?</span>
        </h2>
        <p className="sub-header mt-8 max-w-4xl font-display text-lg uppercase tracking-tight text-white/80 md:mt-12 md:text-3xl">
          Depuis 2016, nous aidons les PME françaises à automatiser leurs
          processus et croître durablement
        </p>
      </div>

      {/* LAYER 2: PRINCIPLES GRID */}
      <div
        ref={processRef}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-4 opacity-0 md:px-20"
      >
        <h2 className="process-title mb-4 text-center font-display text-xl uppercase tracking-tighter text-white md:mb-12 md:text-6xl">
          Notre Philosophie
        </h2>

        <div className="grid max-h-[90vh] w-full max-w-[90vw] grid-cols-1 border-l border-t border-white/10  md:max-h-full md:max-w-7xl md:grid-cols-3">
          {PRINCIPLES.map((item, i) => (
            <div
              key={i}
              className="step-card flex flex-row items-center gap-4 border-b border-r border-white/10 p-4 transition-colors hover:bg-white/[0.02] md:flex-col md:items-start md:gap-4 md:p-12"
            >
              <span className="font-display text-2xl text-accent-500 md:text-6xl">
                {item.id}
              </span>

              <div className="flex flex-col gap-1">
                <h3 className="font-display text-sm uppercase text-white md:text-2xl">
                  {item.title}
                </h3>

                <p className="font-sans text-[10px] font-medium leading-tight text-white/60 md:text-base md:leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* LAYER 3: STATS */}
      <div
        ref={statsRef}
        className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-4 opacity-0"
      >
        <h2 className="stats-title mb-10 text-center font-display text-3xl uppercase tracking-tighter text-white md:text-6xl">
          Propulser les entreprises <br className="hidden md:block" /> vers le
          sommet
        </h2>
        <div className="grid w-full max-w-7xl grid-cols-2 gap-y-8 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="font-display text-6xl tracking-tighter text-white md:text-[8rem]">
                <span className="num-val inline-block">
                  {stat.value.replace('+', '')}
                </span>
                <span className="text-accent-500">+</span>
              </span>
              <span className="font-display text-xs uppercase tracking-widest text-white/40 md:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

About.displayName = 'About'
export default About
