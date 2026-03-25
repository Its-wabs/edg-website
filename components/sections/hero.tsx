'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import HeroProjects from '../ui/hero-projects'
import ShowcaseGrid from '../ui/ShowcaseGrid'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<any>(null) // Carousel
  const showcaseRef = useRef<any>(null) // Video Grid
  const manifestoRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current || !projectsRef.current || !showcaseRef.current)
        return

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=700%',
          scrub: 1.5,
          pin: true,
        },
      })

      // PHASE 2 : dismiss the carousel
      masterTl
        .to(headlineRef.current, { y: '-50vh', opacity: 0, duration: 2 }, 0)
        .to(
          projectsRef.current,
          { opacity: 0, y: '-50vh', filter: 'blur(20px)', duration: 2 },
          0
        )

      // PHASE 2: isolated hero project
      masterTl
        .to(showcaseRef.current.container, { opacity: 1, duration: 2 }, 1.5)
        .fromTo(
          showcaseRef.current.text,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, duration: 2, ease: 'expo.out' },
          1.5
        )
        .fromTo(
          showcaseRef.current.items[1],
          {
            y: '40vh',
            scale: 3,
            zIndex: 50,
          },
          { y: '15vh', scale: 2.2, duration: 3, ease: 'expo.out' },
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
          className="w-[80vw] text-center font-display text-display-lg uppercase leading-snug text-white"
        >
          nous transformons vos idées métier en logiciels{' '}
          <span className="text-accent-500">rentables</span>
        </h1>
        <HeroProjects ref={projectsRef} />
      </div>

      {/* Layer 2: Showcase Grid */}
      <ShowcaseGrid ref={showcaseRef} />

      {/* Layer 3: Manifesto */}
      <div
        ref={manifestoRef}
        className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center px-10 opacity-0"
      >
        <h2 className="max-w-4xl text-center font-display text-display-md uppercase leading-tight text-white">
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
