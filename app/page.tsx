'use client'

import NavBar from '@/components/layout/navbar'
import Hero from '@/components/sections/hero'
import PreLoad from '@/components/ui/preloader'

import { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Projects from '@/components/sections/projects'
import ProjectsGrid from '@/components/ui/ProjectsGrid'

gsap.registerPlugin(ScrollTrigger)
export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [showGrid, setShowGrid] = useState(false)

  const mainContainer = useRef(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<any>(null)
  const nextSceneRef = useRef<HTMLDivElement>(null)

  const navItemsRef = useRef<HTMLDivElement>(null)
  const navBurgerRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined')
      window.history.scrollRestoration = 'manual'
    document.body.style.overflow = preloaderDone ? 'auto' : 'hidden'
  }, [preloaderDone])

  const { contextSafe } = useGSAP(
    () => {
      if (!preloaderDone || !projectsRef.current) return

      const cards = projectsRef.current.items
      const projectSection = projectsRef.current.section
      const viewAllBtn = projectsRef.current.button

      // 1. Initial State: Hiding off-screen with the /-\ tilt
      gsap.set(cards, {
        yPercent: -120,
        rotationX: 60,
        z: -500,
        transformPerspective: 1500,
        transformOrigin: '50% 0%',
      })

      const projectsTl = gsap.timeline({
        scrollTrigger: {
          trigger: projectSection,
          start: 'top top',
          end: `+=${cards.length * 150}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      cards.forEach((card: HTMLDivElement, index: number) => {
        // Phase 1: The current card swoops in to the front
        projectsTl.to(
          card,
          {
            yPercent: 0,
            rotationX: 0,
            z: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 1,
          },
          index * 1.5
        )

        // Phase 2: ALL previous cards shift back to form the visible stack
        if (index > 0) {
          projectsTl.to(
            cards.slice(0, index),
            {
              // This is the magic: each card gets a deeper Z and higher Y
              // based on how many cards are currently on top of it.
              z: (i: number) => (index - i) * -40,
              y: (i: number) => (index - i) * -15,
              scale: (i: number) => 1 - (index - i) * 0.03,
              brightness: (i: number) => 1 - (index - i) * 0.15,
              duration: 0.8,
              ease: 'power2.inOut',
              overwrite: 'auto',
            },
            index * 1.5
          )
        }
      })

      projectsTl.to(
        viewAllBtn,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '+=0.2'
      )

      const navMorphTl = gsap.timeline({ paused: true })

      navMorphTl
        .to(navItemsRef.current, {
          x: 30,
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.4,
          ease: 'power2.in',
        })
        .to(
          navBurgerRef.current,
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' },
          '-=0.2'
        )

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          if (self.progress > 0.01 && self.progress < 0.99) {
            navMorphTl.play()
          } else if (self.progress <= 0.01) {
            navMorphTl.reverse()
          }
        },
        onLeave: () => {
          navMorphTl.reverse()
        },
        onEnterBack: () => {
          navMorphTl.play()
        },
      })
    },
    { scope: mainContainer, dependencies: [preloaderDone] }
  )

  const handleViewAll = contextSafe(() => {
    const cards = projectsRef.current.items
    const section = projectsRef.current.section
    const btn = projectsRef.current.button

    // 1. Get the height of the Hero. where the Project Grid will actually begin.
    const heroHeight = heroRef.current?.offsetHeight || 0

    const scatterTl = gsap.timeline({
      onComplete: () => {
        // 2. Kill the project trigger
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === section) t.kill()
        })

        // 3. Swap to Grid
        setShowGrid(true)

        // 4.  Scroll to the bottom of the Hero instantly.
        window.scrollTo({
          top: heroHeight,
          behavior: 'instant',
        })

        // 5. Force a refresh so the Services section knows its new position
        setTimeout(() => {
          ScrollTrigger.refresh(true)
        }, 10)
      },
    })

    scatterTl
      .to(btn, { opacity: 0, scale: 0.5, duration: 0.3 })
      .to(
        cards,
        {
          x: () => (Math.random() - 0.5) * window.innerWidth * 2.5,
          y: () => (Math.random() - 0.5) * window.innerHeight * 2.5,
          rotation: () => (Math.random() - 0.5) * 180,
          opacity: 0,
          scale: 0,
          duration: 0.8,
          stagger: {
            amount: 0.3,
            from: 'end',
          },
          ease: 'power3.in',
        },
        0
      )
      .to(section, { opacity: 0, duration: 0.4 }, '-=0.2')
  })

  return (
    <div ref={mainContainer} className="relative w-full overflow-x-hidden">
      <PreLoad onComplete={() => setPreloaderDone(true)} />

      <NavBar
        itemsRef={navItemsRef}
        burgerRef={navBurgerRef}
        navContainerRef={navContainerRef}
      />

      <div ref={heroRef}>
        <Hero />
      </div>

      <div className="relative min-h-screen bg-primary-950">
        {!showGrid ? (
          <Projects ref={projectsRef} onViewAll={handleViewAll} />
        ) : (
          <div className="relative z-30">
            <ProjectsGrid />
          </div>
        )}
      </div>
      <div>
        <section
          ref={nextSceneRef}
          className="flex h-screen w-full items-center justify-center bg-primary-900"
        >
          <h2 className="font-display text-display-md uppercase text-white">
            sevices
          </h2>
        </section>
      </div>
    </div>
  )
}
