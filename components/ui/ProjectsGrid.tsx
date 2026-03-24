'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

const PROJECTS = [
  { id: 1, color: 'bg-blue-600', title: 'Project Alpha', category: 'Branding' },
  {
    id: 2,
    color: 'bg-emerald-500',
    title: 'Project Beta',
    category: 'Web Design',
  },
  {
    id: 3,
    color: 'bg-purple-600',
    title: 'Project Gamma',
    category: 'Mobile App',
  },
  {
    id: 4,
    color: 'bg-orange-500',
    title: 'Project Delta',
    category: 'E-Commerce',
  },
  {
    id: 5,
    color: 'bg-rose-500',
    title: 'Project Epsilon',
    category: '3D Motion',
  },
  { id: 6, color: 'bg-zinc-800', title: 'Project Zeta', category: 'Strategy' },
]

const ProjectsGrid = () => {
  const container = useRef(null)

  useGSAP(
    () => {
      // 1. Set the perspective for the whole container
      gsap.set('.grid-item', {
        opacity: 0,
        y: 100,
        rotationX: -45,
        z: -200,
        transformPerspective: 1000,
      })

      // 2. Animate them in with a "Springy" flip
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
              className="grid-item group relative aspect-[16/10] overflow-hidden rounded-sm bg-primary-900"
            >
              {/* Image / Color Overlay */}
              <div
                className={`absolute inset-0 ${proj.color} opacity-60 transition-transform duration-1000 ease-out group-hover:scale-105`}
              />

              <div className="absolute inset-0 z-10 flex flex-col justify-between p-10">
                <h3 className="font-display text-4xl uppercase leading-none tracking-tighter text-white md:text-5xl"></h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsGrid
