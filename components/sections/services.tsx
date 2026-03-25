'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'

const SERVICES_DATA = [
  {
    id: '01',
    title: 'Développement Web & Mobile',
    desc: 'Des sites web et applications mobiles performants, conçus pour atteindre vos objectifs business.',
    color: 'bg-accent-200',
    textColor: 'text-black',
  },
  {
    id: '02',
    title: 'Marketing Digital & Communication',
    desc: 'Nous priorisons une structure claire, une expérience utilisateur fluide et des solutions évolutives.',
    color: 'bg-accent-300',
    textColor: 'text-black',
  },
  {
    id: '03',
    title: 'Consulting & Stratégie Digitale',
    desc: 'Nous vous accompagnons dans la transformation numérique pour booster votre croissance.',
    color: 'bg-accent-400',
    textColor: 'text-black',
  },
]

const Services = forwardRef((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)

  useImperativeHandle(ref, () => ({
    section: sectionRef.current,
    items: cardsRef.current,
    title: titleRef.current,
  }))

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-primary-950"
    >
      <div className="relative flex h-[35vh] w-full items-center justify-center px-8">
        <h2
          ref={titleRef}
          className="featured select-none font-display text-[10vw] uppercase leading-none tracking-tighter text-white/90"
        >
          Nos services
        </h2>
      </div>

      <div className="absolute inset-0 top-[35vh]">
        {SERVICES_DATA.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el
            }}
            className={`absolute top-0 flex h-full w-full flex-col items-center justify-center  ${service.color} ${service.textColor} px-6 md:px-20`}
            style={{ zIndex: index + 1 }}
          >
            <div className="service-content flex max-w-4xl flex-col items-center text-center">
              <span className="mb-4 font-mono text-sm uppercase tracking-widest opacity-40">
                {service.id}
              </span>
              <h2 className="mb-6 font-display text-4xl uppercase leading-[0.9] md:text-7xl">
                {service.title}
              </h2>
              <p className="max-w-xl font-sans text-lg opacity-70">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
})

Services.displayName = 'Services'
export default Services
