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
import Services from '@/components/sections/services'
import ServicesCTA from '@/components/ui/servicesCTA'
import Testimonials from '@/components/sections/testimonials'

gsap.registerPlugin(ScrollTrigger)
export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [showGrid, setShowGrid] = useState(false)

  const mainContainer = useRef(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const serviceCtaRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<any>(null)
  const servicesRef = useRef<any>(null)
  const testimonialsRef = useRef<any>(null)
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

      ScrollTrigger.config({
        ignoreMobileResize: true,
      })

      let mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
        },
        (context) => {
          const { isDesktop } = context.conditions as any

          if (projectsRef.current) {
            const cards = projectsRef.current.items
            const projectSection = projectsRef.current.section
            const viewAllBtn = projectsRef.current.button

            // 1. Initial State: Hiding off-screen with the tilt
            gsap.set(cards, {
              yPercent: isDesktop ? -120 : -250,
              rotationX: isDesktop ? 60 : 45,
              z: isDesktop ? -500 : -300,
              transformPerspective: 1500,
              transformOrigin: '50% 0%',
            })

            const projectsTl = gsap.timeline({
              scrollTrigger: {
                trigger: projectSection,
                start: 'top top',
                end: `+=${cards.length * (isDesktop ? 150 : 120)}%`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
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
                    z: (i: number) => (index - i) * (isDesktop ? -40 : -25),
                    y: (i: number) => (index - i) * (isDesktop ? -15 : -10),
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
          }

          if (isDesktop && heroRef.current) {
            gsap.set(navBurgerRef.current, { scale: 0, opacity: 0 })

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
              invalidateOnRefresh: true,
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
          } else {
            gsap.set(navBurgerRef.current, { scale: 1, opacity: 1 })
          }

          // SERVICES SECTION
          if (servicesRef.current) {
            const sCards = servicesRef.current.items
            const sSection = servicesRef.current.section
            const sTitle = servicesRef.current.title

            // Clear any previous transforms to avoid "stuck" items
            gsap.set([sTitle, sCards], { clearProps: 'all' })

            gsap.set(sTitle, { opacity: 0, y: '32.5vh', scale: 0.8 })
            gsap.set(sCards, { yPercent: 100 })

            const servicesTl = gsap.timeline({
              scrollTrigger: {
                trigger: sSection,
                start: 'top top',
                end: `+=${sCards.length * 100 + 150}%`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            })

            servicesTl
              .to(sTitle, { opacity: 1, scale: 1, duration: 1 })
              .to(
                sTitle,
                {
                  y: 0,
                  duration: 1.2,
                  scale: isDesktop ? 0.5 : 1,
                  ease: 'expo.inOut',
                },
                1
              )
              .to(
                sCards[0],
                { yPercent: 0, duration: 1.2, ease: 'expo.inOut' },
                1
              )

            sCards.forEach((card: HTMLDivElement, i: number) => {
              if (i === 0) return
              const prevContent =
                sCards[i - 1].querySelector('.service-content')
              const currentContent = card.querySelector('.service-content')
              const pos = i + 1.5

              servicesTl
                .to(
                  card,
                  { yPercent: i * (isDesktop ? 9 : 8), ease: 'power2.inOut' },
                  pos
                )
                .to(
                  prevContent,
                  { y: -100, scale: 0.9, opacity: 0, ease: 'power2.inOut' },
                  pos
                )

                .fromTo(
                  currentContent,
                  { y: 150, opacity: 0 },
                  { y: 0, opacity: 1, ease: 'power2.out' },
                  pos
                )
            })
            servicesTl.to({}, { duration: 1 })
          }

          // TESTIMONIALS SECTION

          if (testimonialsRef.current) {
            const tSection = testimonialsRef.current.section
            const tTitle = testimonialsRef.current.title
            const tLeft = testimonialsRef.current.leftCol
            const tRight = testimonialsRef.current.rightCol

            // Initial States
            // Title starts large and invisible
            gsap.set(tTitle, { opacity: 0 })

            // Both columns start well below the viewport with the right one having a head start
            gsap.set(tLeft, { y: '150vh' })
            gsap.set(tRight, { y: '130vh' })

            const testimonialsTl = gsap.timeline({
              scrollTrigger: {
                trigger: tSection,
                start: 'top top',
                end: '+=500%',
                pin: true,
                scrub: 1,
              },
            })

            testimonialsTl
              // PHASE 1: Title Reveal
              .to(tTitle, {
                opacity: 1,
                scale: 1,
                duration: 2,
                ease: 'power2.out',
              })
              // PHASE 2: Title scales down
              .to(tTitle, {
                scale: isDesktop ? 0.8 : 0.6,
                opacity: isDesktop ? 1 : 0.5,
                filter: isDesktop ? 'blur(0px)' : 'blur(1px)',
                duration: 1,
                ease: 'power2.inOut',
              })

              // PHASE 3: The Double Train
              .to(
                tLeft,
                {
                  y: '-150vh',
                  duration: 10,
                  ease: 'none',
                },
                'train'
              )
              .to(
                tRight,
                {
                  y: '-180vh',
                  duration: 10,
                  ease: 'none',
                },
                'train'
              )
          }
        }
      )
    },
    { scope: mainContainer, dependencies: [preloaderDone, showGrid] }
  )

  const handleViewAll = contextSafe(() => {
    const cards = projectsRef.current.items
    const section = projectsRef.current.section
    const btn = projectsRef.current.button

    //  Get the height of the Hero. where the Project Grid will actually begin.
    const heroHeight = heroRef.current?.offsetHeight || 0

    const scatterTl = gsap.timeline({
      onComplete: () => {
        //  Kill the project trigger
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === section) t.kill()
        })

        // Swap to Grid
        setShowGrid(true)

        //  Scroll to the bottom of the Hero instantly.
        window.scrollTo({
          top: heroHeight,
          behavior: 'instant',
        })

        //  Force a refresh so the Services section knows its new position
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
    <div
      ref={mainContainer}
      className="relative w-full overflow-x-hidden bg-primary-950"
    >
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

      <Services ref={servicesRef} />

      <div ref={serviceCtaRef} className="relative z-0">
        <ServicesCTA />
      </div>

      <Testimonials ref={testimonialsRef} />

      <div
        ref={nextSceneRef}
        className="flex h-[100vh] items-center justify-center bg-black"
      >
        <h2 className="font-display text-display-xl uppercase text-white">
          team
        </h2>
      </div>
    </div>
  )
}
