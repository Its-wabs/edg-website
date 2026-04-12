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
import ProjectsGrid from '@/components/ui/ProjectsGrid'
import Services from '@/components/sections/services'
import Testimonials from '@/components/sections/testimonials'
import About from '@/components/sections/about'
import Team from '@/components/sections/team'
import Footer from '@/components/sections/footer'
import FinalCTA from '@/components/sections/finalCTA'
import Menu from '@/components/layout/menu'
import { useRouter } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [showGrid, setShowGrid] = useState(false)
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

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined')
      window.history.scrollRestoration = 'manual'
    document.body.style.overflow = preloaderDone ? 'auto' : 'hidden'
  }, [preloaderDone])

  useEffect(() => {
    // Lock scroll if preloader is active OR menu is open
    document.body.style.overflow =
      preloaderDone && !isMenuOpen ? 'auto' : 'hidden'
  }, [preloaderDone, isMenuOpen])

  const { contextSafe } = useGSAP(
    () => {
      if (!preloaderDone || !projectsRef.current || showGrid) return

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
            gsap.set(navBurgerRef.current, { scale: 0, autoAlpha: 0 })

            const navMorphTl = gsap.timeline({ paused: true })

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
                {
                  scale: 1,
                  autoAlpha: 1,
                  duration: 0.4,
                  ease: 'back.out(1.7)',
                },
                '-=0.2'
              )

            navTl.current = navMorphTl

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
            gsap.set(navBurgerRef.current, { scale: 1, autoAlpha: 1 })
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
            gsap.set(tTitle, { opacity: 0 })

            gsap.set(tLeft, { y: '180vh' })
            gsap.set(tRight, { y: '150vh' })

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

          // ABOUT SECTION

          if (aboutRef.current) {
            const { section, headline, process, stats, steps, numbers } =
              aboutRef.current
            const isDesktop = context.conditions?.isDesktop

            const aboutTl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: isDesktop ? '+=600%' : '+=400%',
                pin: true,
                scrub: 1.5,
                invalidateOnRefresh: true,
              },
            })

            // Set initial off-stage positions

            gsap.set([process, stats], { y: '100vh', opacity: 0 })

            aboutTl
              // PHASE 1: Headline
              .fromTo(
                headline.querySelectorAll('.header-title span'),
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.15, duration: 2 },
                0
              )
              .fromTo(
                headline.querySelector('.sub-header'),
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5 },
                0.5
              )
              .to(
                headline,
                {
                  y: isDesktop ? '-100vh' : '-120vh',
                  opacity: 0,
                  duration: 3,
                  ease: 'expo.in',
                },
                2
              )

              // PHASE 2: Process
              .to(
                process,
                {
                  y: 0,
                  opacity: 1,
                  autoAlpha: 1,
                  duration: 4,
                  ease: 'expo.out',
                },
                3.5
              )
              .from(
                process.querySelector('.process-title'),
                { opacity: 0, y: 50, duration: 2 },
                4
              )
              .from(
                process.querySelectorAll(steps),
                {
                  scale: isDesktop ? 0.8 : 0.9,
                  y: isDesktop ? 0 : 20,
                  opacity: 0,
                  stagger: 0.2,
                  duration: 3,
                },
                5
              )
              .to(
                process,
                { y: '-100vh', opacity: 0, duration: 3, ease: 'expo.in' },
                6
              )

            // PHASE 3: Stats
            aboutTl
              .to(
                stats,
                {
                  y: 0,
                  opacity: 1,
                  autoAlpha: 1,
                  duration: 4,
                  ease: 'expo.out',
                },
                8.5
              )
              .from(
                stats.querySelector('.stats-title'),
                {
                  opacity: 0,
                  y: 50,
                  duration: 2,
                },
                9
              )
              .from(
                numbers,
                {
                  textContent: 0,
                  duration: 3,
                  ease: 'power2.out',
                  snap: { textContent: 1 },
                  stagger: 0.2,
                  scale: 1.1,
                },
                9.5
              )
              .to(
                numbers,
                {
                  scale: 1,
                  duration: 1,
                  ease: 'back.out(2)',
                },
                '-=1'
              )
          }

          // team

          if (teamRef.current) {
            const { section, bgLetters, bgWordContainer, cards } =
              teamRef.current
            const isDesktop = context.conditions?.isDesktop

            if (isDesktop) {
              // DESKTOP ANIMATION
              gsap.set(bgLetters, {
                x: '100vw',
                y: '100vh',
                rotation: 45,
                opacity: 0,
              })
              gsap.set(cards, { y: 100, opacity: 0, scale: 0.9 })
              gsap.set(bgWordContainer, { opacity: 0.4 })

              const teamTl = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  start: 'top top',
                  end: '+=300%',
                  pin: true,
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              })

              teamTl
                .to(bgLetters, {
                  x: 0,
                  y: 0,
                  rotation: 0,
                  opacity: 1,
                  stagger: 0.1,
                  duration: 3,
                  ease: 'power3.out',
                })
                .to(
                  bgWordContainer,
                  {
                    opacity: 0.02,
                    scale: 0.95,
                    duration: 2,
                    ease: 'power2.inOut',
                  },
                  '-=1'
                )
                .to(
                  cards,
                  {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    stagger: 0.2,
                    duration: 2,
                    ease: 'expo.out',
                  },
                  '-=0.5'
                )
            } else {
              //  MOBILE: SIMPLE SECTION

              gsap.set([bgLetters, cards, bgWordContainer], {
                clearProps: 'all',
              })

              gsap.set(bgLetters, { opacity: 1, x: 0, y: 0, rotation: 0 })
              gsap.set(cards, { opacity: 1, y: 0, scale: 1 })
            }
          }

          // FINAL CTA SECTION
          if (FinalCtaRef.current && isDesktop) {
            const section = FinalCtaRef.current
            const content = section.querySelector('div')
            const title = section.querySelector('h2')
            const paras = [
              section.querySelector('.cta-para-top'),
              section.querySelector('.cta-para-bottom'),
            ]
            const button = section.querySelector('button')
            const isDesktop = context.conditions?.isDesktop

            //  Initial States
            gsap.set(content, {
              scale: isDesktop ? 0.8 : 1,
              opacity: 0,
              y: 50,
            })

            gsap.set(button, {
              scale: 0.9,
              opacity: 0,
            })

            gsap.set(paras, {
              scale: isDesktop ? 0.8 : 1,
              opacity: 0,
              y: 50,
            })

            const ctaTl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: isDesktop ? 'top top' : 'top 80%',
                end: isDesktop ? '+=200%' : 'bottom 20%',
                pin: isDesktop,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            })

            ctaTl
              //  Initial reveal
              .to(content, {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 2,
                ease: 'power2.out',
              })

              // Title & Paragraph Pop
              .from(
                title,
                {
                  y: 40,
                  opacity: 0,
                  duration: 1,
                },
                '-=1'
              )

              //  The Button reveal
              .to(
                button,
                {
                  scale: 1,
                  opacity: 1,
                  duration: 1.5,
                  ease: 'back.out',
                },
                '-=0.5'
              )

              .to(
                paras,
                {
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  stagger: 0.2,
                  ease: 'power2.out',
                },
                '-=0.3'
              )
          }

          if (isDesktop && FinalCtaRef.current) {
            gsap.set(navBurgerRef.current, { scale: 0, autoAlpha: 0 })

            const navMorphTl = gsap.timeline({ paused: true })

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
                {
                  scale: 1,
                  autoAlpha: 1,
                  duration: 0.4,
                  ease: 'back.out(1.7)',
                },
                '-=0.2'
              )
            navTl.current = navMorphTl
            ScrollTrigger.create({
              trigger: FinalCtaRef.current,
              start: 'top top',

              end: '+=200%',
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (self.progress > 0.01 && self.progress < 0.8) {
                  navMorphTl.play()
                } else if (self.progress <= 0.01) {
                  navMorphTl.reverse()
                }
              },
              onLeave: () => {
                gsap.to(navContainerRef.current, {
                  autoAlpha: 0,
                  y: -50,
                  duration: 0.4,
                  ease: 'power2.inOut',
                  overwrite: 'auto',
                })
              },
              onEnterBack: () => {
                gsap.to(navContainerRef.current, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.3,
                  overwrite: 'auto',
                })
              },
            })
          } else {
            gsap.set(navBurgerRef.current, { scale: 1, autoAlpha: 1 })
          }

          // hide navbar on mobile when footer enters viewport
          if (!isDesktop && footerRef.current) {
            ScrollTrigger.create({
              trigger: footerRef.current,
              start: 'top bottom',
              invalidateOnRefresh: true,
              onEnter: () => {
                gsap.to(navContainerRef.current, {
                  autoAlpha: 0,
                  y: -50,
                  duration: 0.4,
                  ease: 'power2.inOut',
                  overwrite: 'auto',
                })
              },
              onLeaveBack: () => {
                gsap.to(navContainerRef.current, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.3,
                  ease: 'power2.out',
                  overwrite: 'auto',
                })
              },
            })
          }
        }
      )

      return () => {
        mm.revert()
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    },
    { scope: mainContainer, dependencies: [preloaderDone, showGrid] }
  )

  const handleViewAll = contextSafe(() => {
    // Safety check in case ref is lost
    if (!projectsRef.current) return

    const cards = projectsRef.current.items
    const section = projectsRef.current.section
    const btn = projectsRef.current.button
    const heroHeight = heroRef.current?.offsetHeight || 0

    const scatterTl = gsap.timeline({
      onComplete: () => {
        // 1. Kill only the ScrollTriggers specifically for this pinned section
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === section) t.kill()
        })

        // 2. State swap (toggling CSS visibility via your JSX)
        setShowGrid(true)

        // 3. Instant repositioning
        window.scrollTo({
          top: heroHeight,
          behavior: 'instant',
        })

        // 4. Force global recalculation
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 50)
      },
    })

    scatterTl
      .to(btn, { opacity: 0, scale: 0.5, duration: 0.3 })
      .to(
        cards,
        {
          x: () => (Math.random() - 0.5) * window.innerWidth * 2,
          y: () => (Math.random() - 0.5) * window.innerHeight * 2,
          rotation: () => (Math.random() - 0.5) * 180,
          opacity: 0,
          scale: 0,
          duration: 0.8,
          stagger: { amount: 0.3, from: 'end' },
          ease: 'power3.in',
        },
        0
      )
      // Fade the section out so it doesn't block the grid
      .to(section, { autoAlpha: 0, duration: 0.4 }, '-=0.2')
  })
  // back to top

  const handleBackToTop = contextSafe(() => {
    //  Force the Navbar back to its "Start" state immediately
    if (navTl.current) {
      navTl.current.reverse().pause()
    }

    //  Ensure the container is visible
    gsap.to(navContainerRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.3,
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

  const scrollToSection = contextSafe((id: string) => {
    let sectionElement: HTMLElement | null = null

    switch (id) {
      case 'solutions':
        sectionElement = projectsRef.current?.section
        break
      case 'about':
        sectionElement = aboutRef.current?.section
        break
      case 'team':
        sectionElement = teamRef.current?.section
        break
      case 'contact':
        sectionElement = FinalCtaRef.current
        break
      case 'services':
        sectionElement = servicesRef.current?.section
        break
      case 'process':
        sectionElement = aboutRef.current?.process

        break
    }

    if (sectionElement) {
      // 2. Find the GSAP ScrollTrigger associated with this specific element
      const st = ScrollTrigger.getAll().find(
        (t) => t.trigger === sectionElement
      )

      if (st) {
        // scroll back to each section
        gsap.to(window, {
          scrollTo: {
            y: st.start + (id === 'team' ? 2200 : 600),
            autoKill: false,
          },
          duration: 1.5,
          ease: 'power4.inOut',
        })
      } else {
        // Fallback if ScrollTrigger
        gsap.to(window, {
          scrollTo: { y: sectionElement, autoKill: false },
          duration: 1.5,
          ease: 'power4.inOut',
        })
      }
    }
  })

  const handleMenuNavigation = (id: string) => {
    if (id === 'contact') {
      router.push('/contact')
    } else {
      scrollToSection(id)
    }
  }

  return (
    <div
      ref={mainContainer}
      className="relative w-full overflow-x-hidden bg-primary-950"
    >
      <PreLoad onComplete={() => setPreloaderDone(true)} />

      <Menu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleMenuNavigation}
      />

      <NavBar
        itemsRef={navItemsRef}
        burgerRef={navBurgerRef}
        navContainerRef={navContainerRef}
        onBurgerClick={() => setIsMenuOpen(!isMenuOpen)}
        isOpen={isMenuOpen}
        onNavigate={scrollToSection}
      />

      <div ref={heroRef}>
        <Hero />
      </div>

      <div className="relative min-h-screen bg-primary-950">
        {/* Always keep Projects in DOM but hide it when showGrid is true */}
        <div style={{ display: showGrid ? 'none' : 'block' }}>
          <Projects ref={projectsRef} onViewAll={handleViewAll} />
        </div>

        {/* Only mount the Grid when requested to keep initial load light */}
        {showGrid && (
          <div className="relative z-30">
            <ProjectsGrid />
          </div>
        )}
      </div>

      <Services ref={servicesRef} />

      <Testimonials ref={testimonialsRef} />

      <About ref={aboutRef} />

      <Team ref={teamRef} />

      <FinalCTA ref={FinalCtaRef} />

      <Footer
        ref={footerRef}
        onScrollToTop={handleBackToTop}
        onNavigate={scrollToSection}
      />
    </div>
  )
}
