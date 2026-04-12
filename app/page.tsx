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
import { useRouter } from 'next/navigation'
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
  const heroNavTl = useRef<gsap.core.Timeline | null>(null)
  const ctaNavTl = useRef<gsap.core.Timeline | null>(null)

  const scrollToSectionRef = useRef<(id: string, isInstant?: boolean) => void>(
    () => {}
  )

  const router = useRouter()

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

            heroNavTl.current = navMorphTl

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
            ctaNavTl.current = navMorphTl
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

          // hash function

          const hash = window.location.hash.replace('#', '')
          if (hash) {
            // 1. Force a calculation of all pin spacing
            ScrollTrigger.refresh()

            // 2. Wait for one "tick" of the GSAP engine to ensure IDs are registered
            gsap.delayedCall(0.1, () => {
              const idToSTMap: Record<string, string> = {
                projects: 'projects-section',
                services: 'services-section',
                about: 'about-section',
                team: 'team-section',
              }

              const stId = idToSTMap[hash] || `${hash}-section`
              const st = ScrollTrigger.getById(stId)

              if (st) {
                const scrollPercentage = hash === 'team' ? 0.8 : 0.1
                const targetY =
                  st.start + (st.end - st.start) * scrollPercentage

                window.scrollTo({ top: targetY, behavior: 'instant' })
              } else {
                // Fallback if no ST exists
                const el = document.getElementById(hash)
                if (el)
                  window.scrollTo({ top: el.offsetTop, behavior: 'instant' })
              }

              // Clean the URL
              window.history.replaceState(null, '', window.location.pathname)
            })
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

  // back to top

  const handleBackToTop = contextSafe(() => {
    //  Force the Navbar back to its "Start" state immediately
    heroNavTl.current?.progress(0).pause()
    ctaNavTl.current?.progress(0).pause()

    //  Ensure the container is visible
    gsap.set([navContainerRef.current, navItemsRef.current], {
      autoAlpha: 1,
      y: 0,
      pointerEvents: 'auto', // Force the interaction back on
      clearProps: 'all', // Optional: wipes GSAP styles to let CSS take over
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

  const scrollToSection = contextSafe(
    (id: string, isInstant: boolean = false) => {
      if (id === 'hero') {
        handleBackToTop()
        return
      }

      let sectionElement: HTMLElement | null = null
      let scrollPercentage = 0.1

      switch (id) {
        case 'projects':
          sectionElement = projectsRef.current?.section
          break
        case 'about':
          sectionElement = aboutRef.current?.section
          break
        case 'team':
          sectionElement = teamRef.current?.section
          scrollPercentage = 0.8
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
        requestAnimationFrame(() => {
          const st = ScrollTrigger.getById(`${id}-section`)

          if (st) {
            const targetY = st.start + (st.end - st.start) * scrollPercentage

            gsap.to(window, {
              scrollTo: {
                y: targetY,
                autoKill: false,
              },
              duration: isInstant ? 0 : 1.5,
              ease: isInstant ? 'none' : 'power4.inOut',
            })
          } else {
            // Fallback
            gsap.to(window, {
              scrollTo: { y: sectionElement, autoKill: false },
              duration: isInstant ? 0 : 1.5,
              ease: isInstant ? 'none' : 'power4.inOut',
            })
          }
        })
      }
    }
  )

  useEffect(() => {
    scrollToSectionRef.current = scrollToSection
  })

  // Hash effect
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash || !preloaderDone) return

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Resolving the target independently
          const idToSTMap: Record<string, string> = {
            projects: 'projects-section',
            services: 'services-section',
            about: 'about-section',
            team: 'team-section',
          }

          const stId = idToSTMap[hash]
          const scrollPercentage = hash === 'team' ? 0.8 : 0.2

          if (stId) {
            const st = ScrollTrigger.getById(stId)
            if (st) {
              const targetY = st.start + (st.end - st.start) * scrollPercentage
              // native scrollTo for instant jump
              window.scrollTo({ top: targetY, behavior: 'instant' })
              window.history.replaceState(null, '', window.location.pathname)
              return
            }
          }

          // Fallback for non-pinned sections
          scrollToSectionRef.current(hash, true)
          window.history.replaceState(null, '', window.location.pathname)
        })
      })
    }, 200)

    return () => clearTimeout(timer)
  }, [preloaderDone])

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

      <Projects ref={projectsRef} />

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
