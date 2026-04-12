'use client'

import { useRef, forwardRef, useImperativeHandle } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

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

const Projects = forwardRef((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const btnRef = useRef<HTMLButtonElement>(null)

  const router = useRouter()

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
            onClick={() => window.open(proj.demo, '_blank')}
            className="group absolute inset-0 flex flex-col justify-end overflow-hidden bg-neutral-900 p-6 will-change-transform md:cursor-pointer md:p-12"
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
      </div>

      <button
        ref={btnRef}
        onClick={() => router.push('/projects')}
        className="absolute bottom-10 z-20 border border-white/10 px-8 py-4 font-display text-xs uppercase tracking-widest text-white transition-all hover:bg-white hover:text-primary-950 md:bottom-[3vh]"
      >
        View more Projects
      </button>
    </section>
  )
})

Projects.displayName = 'Projects'
export default Projects
