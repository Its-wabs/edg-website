'use client'

import { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/all'
import { useGSAP } from '@gsap/react'

import NavBar from '@/components/layout/navbar'
import Hero from '@/components/sections/hero'
import PreLoad from '@/components/ui/preloader'
import Projects from '@/components/sections/projects'
import Services from '@/components/sections/services'
import Testimonials from '@/components/sections/testimonials'
import About from '@/components/sections/about'
import Team from '@/components/sections/team'
import Footer from '@/components/sections/footer'
import FinalCTA from '@/components/sections/finalCTA'
import Menu from '@/components/layout/menu'
import { setupAboutAnimation } from '@/lib/animations/aboutAnimation'
import { setupTeamAnimation } from '@/lib/animations/teamAnimation'
import { setupFinalCTAanimation } from '@/lib/animations/finalCTA-animation'
import { setupTestimonialsAnimation } from '@/lib/animations/testimonialsAnimation'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const mainContainer = useRef(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const FinalCtaRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<any>(null)
  const servicesRef = useRef<any>(null)
  const testimonialsRef = useRef<any>(null)
  const aboutRef = useRef<any>(null)
  const teamRef = useRef<any>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  const navItemsRef = useRef<HTMLDivElement>(null)
  const navBurgerRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const navTl = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    // Lock scroll if preloader is active OR menu is open
    document.body.style.overflow =
      preloaderDone && !isMenuOpen ? 'auto' : 'hidden'
  }, [preloaderDone, isMenuOpen])

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

          gsap.set(navContainerRef.current, {
            autoAlpha: 1,
            y: 0,
            clearProps: 'none',
          })

          gsap.set(navBurgerRef.current, { scale: 0, autoAlpha: 0 })
          gsap.set(navItemsRef.current, {
            x: 0,
            autoAlpha: 1,
            pointerEvents: 'auto',
          })

          if (!isDesktop) {
            gsap.set(navBurgerRef.current, { scale: 1, autoAlpha: 1 })
            gsap.set(navItemsRef.current, { autoAlpha: 0, display: 'none' })
          }

          const navMorphTl = gsap.timeline({
            paused: true,
            defaults: { overwrite: 'auto' },
          })
          navMorphTl
            .to(navItemsRef.current, {
              x: 30,
              autoAlpha: 0,
              pointerEvents: 'none',
              duration: 0.4,
              ease: 'power2.in',
            })
            .to(
              navBurgerRef.current,
              { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'back.out(1.7)' },
              '-=0.2'
            )

          navTl.current = navMorphTl

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
                id: 'projects-section',
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
                id: 'services-section',
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
            setupTestimonialsAnimation(testimonialsRef, isDesktop)
          }

          // ABOUT SECTION

          if (aboutRef.current) {
            setupAboutAnimation(aboutRef, isDesktop)
          }

          // team

          if (teamRef.current) {
            setupTeamAnimation(teamRef, isDesktop)
          }

          // FINAL CTA SECTION
          if (FinalCtaRef.current && isDesktop) {
            setupFinalCTAanimation(FinalCtaRef, isDesktop)
          }
        }
      )

      return () => {
        mm.revert()
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    },
    { scope: mainContainer, dependencies: [preloaderDone] }
  )

  useEffect(() => {
    if (!preloaderDone || !footerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        gsap.to(navContainerRef.current, {
          autoAlpha: entry.isIntersecting ? 0 : 1,
          y: entry.isIntersecting ? -16 : 0,
          duration: 0.35,
          ease: 'power2.inOut',
          overwrite: 'auto',
        })
      },
      { threshold: 0.05 }
    )

    observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [preloaderDone])

  // back to top

  const handleBackToTop = contextSafe(() => {
    //  Force the Navbar back to its "Start" state immediately
    navTl.current?.progress(0).pause()

    //  Ensure the container is visible
    gsap.set([navContainerRef.current, navItemsRef.current], {
      autoAlpha: 1,
      y: 0,
    })

    //  Smooth scroll to top
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1.2,
      ease: 'power4.inOut',
      onComplete: () => {
        ScrollTrigger.refresh()
      },
    })
  })

  return (
    <div
      ref={mainContainer}
      className="relative w-full overflow-x-hidden bg-primary-950"
    >
      <PreLoad onComplete={() => setPreloaderDone(true)} />

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <NavBar
        itemsRef={navItemsRef}
        burgerRef={navBurgerRef}
        navContainerRef={navContainerRef}
        onBurgerClick={() => setIsMenuOpen(!isMenuOpen)}
        isOpen={isMenuOpen}
      />

      <div ref={heroRef}>
        <Hero />
      </div>

      <Projects ref={projectsRef} />

      <Services ref={servicesRef} />

      <Testimonials ref={testimonialsRef} />

      <About ref={aboutRef} />

      <Team ref={teamRef} />

      <FinalCTA ref={FinalCtaRef} />

      <Footer ref={footerRef} onScrollToTop={handleBackToTop} />
    </div>
  )
}
