'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import HeroProjects from '../ui/hero-projects'
import ShowcaseGrid from '../ui/ShowcaseGrid'
import HeroProjectsMobile from '../ui/mobile-hero-projects'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<any>(null) // Carousel
  const showcaseRef = useRef<any>(null) // Video Grid
  const manifestoRef = useRef<HTMLDivElement>(null)
  const mobileProjectRef = useRef<any>(null)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile() // Check on mount
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useGSAP(
    () => {
      if (!sectionRef.current || !showcaseRef.current) return

      let mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
        },
        (context) => {
          const { isMobile: mobileMatch } = context.conditions as any
          const target = mobileMatch
            ? mobileProjectRef.current
            : projectsRef.current

          const masterTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=700%',
              scrub: 1.5,
              pin: true,
              invalidateOnRefresh: true,
            },
          })

          // PHASE 2 : dismiss the carousel

          masterTl
            .to(headlineRef.current, { y: '-50vh', opacity: 0, duration: 2 }, 0)
            .to(
              target,
              { opacity: 0, y: '-50vh', filter: 'blur(20px)', duration: 2 },
              0
            )

          // PHASE 2: isolated hero project
          masterTl
            .to(showcaseRef.current.container, { opacity: 1, duration: 2 }, 1.5)
            .fromTo(
              showcaseRef.current.text,
              { y: mobileMatch ? '40vh' : '60vh', opacity: 0 },
              { y: 0, opacity: 1, duration: 2, ease: 'expo.out' },
              1.5
            )
            .fromTo(
              showcaseRef.current.items[1],
              {
                y: '60vh',
                scale: mobileMatch ? 1.2 : 2,
                x: mobileMatch ? '-27vw' : 0,
                zIndex: 50,
              },
              {
                y: mobileMatch ? '20vh' : '30vh',
                scale: mobileMatch ? 1.5 : 2.2,
                x: mobileMatch ? '-27vw' : 0,
                duration: 3,
                ease: 'expo.out',
              },
              1.5
            )

          //  DISMISS Isolation Text
          masterTl.to(
            showcaseRef.current.text,
            {
              y: '-30vh',
              opacity: 0,
              duration: 1.5,
              ease: 'power2.in',
            },
            4
          )

          // SCALE DOWN & BRING GRID
          masterTl.to(
            showcaseRef.current.items[1],
            {
              y: 0,
              x: 0,
              scale: 1,
              duration: 3,
              ease: 'expo.inOut',
            },
            5
          )

          const otherItems = showcaseRef.current.items.filter(
            (_: any, i: number) => i !== 1
          )
          masterTl.fromTo(
            otherItems,
            { y: '100vh', opacity: 0, scale: 0.8 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.15,
              duration: 2.5,
              ease: 'expo.out',
            },
            5.5
          )

          // PHASE 3: MANIFESTO
          masterTl
            .to(
              showcaseRef.current.container,
              {
                y: -40,
                filter: 'blur(40px)',
                opacity: 0.1,
                scale: 0.9,
                duration: 3,
              },
              8.5
            )
            .fromTo(
              manifestoRef.current,
              { y: '50vh', opacity: 0 },
              { y: 0, opacity: 1, duration: 2, ease: 'expo.out' },
              9
            )

          //  PHASE 4: FINAL EXIT
          masterTl.to(
            [showcaseRef.current.container, manifestoRef.current],
            {
              y: '-100vh',
              opacity: 0,
              stagger: 0.1,
              duration: 2.5,
              ease: 'expo.in',
            },
            12
          )

          masterTl.fromTo(
            '.featured',
            { y: '100vh', opacity: 0 },
            { y: 0, opacity: 1, duration: 2, ease: 'expo.out' },
            14
          )
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100vh] w-full flex-col items-center overflow-hidden bg-primary-950"
    >
      {/* Layer 1: Initial Hero */}
      <div className="relative z-30 flex flex-col items-center pt-[12vh]">
        <h1
          ref={headlineRef}
          className="w-full max-w-md text-center font-display text-[clamp(1.875rem,8vw,3.5rem)] uppercase leading-snug text-white md:w-[80vw] md:max-w-none md:text-display-lg"
        >
          nous transformons vos idées métier en logiciels{' '}
          <span className="text-accent-500">rentables</span>
        </h1>
        <div className="block w-full md:hidden">
          <HeroProjectsMobile ref={mobileProjectRef} isActive={isMobile} />
        </div>
        <div className="hidden w-full md:block">
          <HeroProjects ref={projectsRef} isActive={!isMobile} />
        </div>
      </div>

      {/* Layer 2: Showcase Grid */}
      <ShowcaseGrid ref={showcaseRef} />

      {/* Layer 3: Manifesto */}
      <div
        ref={manifestoRef}
        className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center px-10 opacity-0"
      >
        <h2 className="w-full max-w-lg text-center font-display text-[clamp(1.5rem,6vw,2.5rem)] uppercase leading-tight text-white md:max-w-4xl md:text-display-md">
          Depuis 2016, nous accompagnons les entreprises dans leur{' '}
          <span className="text-accent-500">transformation digitale</span>.
        </h2>
      </div>

      {/* Layer 4: Featured Work  */}
      <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
        <h2 className="featured select-none font-display text-[10vw] uppercase leading-none tracking-tighter text-white opacity-0">
          Featured work
        </h2>
      </div>
    </section>
  )
}

export default Hero
