'use client'

import { useRef, forwardRef, useImperativeHandle } from 'react'

const STEPS = [
  {
    id: '01',
    title: 'DÉCOUVERTE APPROFONDIE',
    desc: 'Nous analysons vos besoins réels pour concevoir des solutions qui frappent juste.',
  },
  {
    id: '02',
    title: 'STRATÉGIE & UX',
    desc: 'Priorité à la conversion et à une structure claire pour guider vos utilisateurs.',
  },
  {
    id: '03',
    title: 'DESIGN SUR MESURE',
    desc: 'Une identité visuelle forte qui distingue votre marque sur le marché.',
  },
  {
    id: '04',
    title: 'DÉVELOPPEMENT SCALABLE',
    desc: 'Des technologies modernes et robustes pour soutenir votre croissance.',
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
          <span>C&apos;est quoi</span>
          <span className="text-accent-500">edg</span>
          <span>?</span>
        </h2>
        <p className="sub-header mt-8 max-w-4xl font-display text-lg uppercase tracking-tight text-white/80 md:mt-12 md:text-3xl">
          Depuis 2016, nous aidons les PME françaises à automatiser leurs
          processus et croître durablement
        </p>
      </div>

      {/* LAYER 2: PROCESS GRID */}
      <div
        ref={processRef}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-4 opacity-0 md:px-20"
      >
        <h2 className="process-title mb-8 text-center font-display text-3xl uppercase tracking-tighter text-white md:text-6xl">
          Notre Processus
        </h2>
        <div className="grid w-full max-w-7xl grid-cols-1 border border-white/10 bg-primary-950/50 backdrop-blur-sm md:grid-cols-2">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="step-card flex flex-col gap-2 border-b border-white/10 p-6 last:border-b-0 md:border md:p-12"
            >
              <span className="font-display text-3xl text-accent-500 md:text-5xl">
                {step.id}
              </span>
              <h3 className="font-display text-lg uppercase text-white md:text-xl">
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed text-white/50 md:text-sm">
                {step.desc}
              </p>
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
                {/* ONLY the number is inside this span */}
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
