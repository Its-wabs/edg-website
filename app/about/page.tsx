'use client'

import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Footer from '@/components/sections/footer'
import NavBar from '@/components/layout/navbar'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/all'
import Menu from '@/components/layout/menu'
import { useTransitionRouter } from 'next-view-transitions'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// DATA

const PRINCIPLES = [
  {
    id: '01',
    title: 'VISION',
    sub: 'Where we go',
    desc: "Devenir le partenaire stratégique de référence pour les entreprises qui visent l'excellence digitale. Nous construisons des ponts entre ambition et réalité numérique.",
  },
  {
    id: '02',
    title: 'MISSION',
    sub: 'What we do',
    desc: "Propulser l'innovation numérique en transformant des idées complexes en expériences fluides et performantes. Chaque ligne de code, chaque pixel, chaque interaction et intentionnels.",
  },
  {
    id: '03',
    title: 'APPROCHE',
    sub: 'How we work',
    desc: 'Un équilibre parfait entre rigueur technique, stratégie data-driven et intuition artistique. Nous ne livrons pas des sites web, nous livrons des instruments de croissance.',
  },
]

const TEAM = [
  { name: 'Meriem', role: 'CEO & Founder', image: '/images/edgo.png' },
]

const CLIENTS = [
  {
    id: '01',
    name: 'SH-TATA',
    year: '2023',
    services: ['Branding', 'Web'],
    feedback:
      'EDG has developed 2 sites for us so far. Their expertise in systems design is unparalleled.',
  },
  {
    id: '02',
    name: 'Blomer',
    year: '2023',
    services: ['Web', 'Dev'],
    feedback:
      'Outstanding workflow and communication throughout the entire project.',
  },
  {
    id: '03',
    name: 'Solventlife',
    year: '2024',
    services: ['Strategy', 'Web'],
    feedback: 'A true technical partner for our sustained growth.',
  },
  {
    id: '04',
    name: 'Uneek Clothing',
    year: '2024',
    services: ['Branding', 'Print'],
    feedback: 'Redefined our digital presence entirely — beyond expectations.',
  },
]

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [openClient, setOpenClient] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)
  const navBurgerRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  // manifesto refs
  const manifestoRef = useRef<HTMLElement>(null)
  const manifestoInner = useRef<HTMLDivElement>(null)
  // philosophy refs
  const philoRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  // outro
  const outroRef = useRef<HTMLElement>(null)

  const router = useTransitionRouter()

  const navigatePrinciple = (dir: 1 | -1) => {
    const next = (activeIndex + dir + PRINCIPLES.length) % PRINCIPLES.length
    const tl = gsap.timeline()

    tl.to([titleRef.current, descRef.current], {
      y: dir > 0 ? -40 : 40,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      stagger: 0.05,
    })
      .call(() => setActiveIndex(next))
      .fromTo(
        [titleRef.current, descRef.current],
        { y: dir > 0 ? 60 : -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.07 }
      )
  }

  // Accordion toggle

  const toggleClient = (id: string) => {
    if (openClient === id) {
      // close
      const el = document.getElementById(`client-body-${id}`)
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.inOut',
      })
      setOpenClient(null)
    } else {
      // close previous
      if (openClient) {
        const prev = document.getElementById(`client-body-${openClient}`)
        gsap.to(prev, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        })
      }
      setOpenClient(id)
      const el = document.getElementById(`client-body-${id}`)
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.45, ease: 'power3.out' }
      )
    }
  }

  useGSAP(
    () => {
      // Manifesto
      if (manifestoRef.current && manifestoInner.current) {
        ScrollTrigger.create({
          trigger: manifestoRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: false,
          onUpdate: (self) => {
            const p = self.progress
            gsap.set(manifestoInner.current, {
              filter: `blur(${p * 14}px)`,
              opacity: 1 - p * 1.4,
              scale: 1 - p * 0.06,
            })
          },
        })

        // Philosophy slides up
        gsap.fromTo(
          philoRef.current,
          { yPercent: 8 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: philoRef.current,
              start: 'top bottom',
              end: 'top top',
              scrub: 1,
            },
          }
        )
      }

      //  Philosophy section entrance
      gsap.fromTo(
        '.philo-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: philoRef.current, start: 'top 75%' },
        }
      )

      // General section reveals
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          }
        )
      })

      // Outro:
      if (outroRef.current) {
        gsap.to(outroRef.current, {
          scale: 0.94,
          opacity: 0,
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: outroRef.current,
            start: 'bottom 80%',
            end: 'bottom 20%',
            scrub: 1.5,
          },
        })
      }

      ScrollTrigger.create({
        trigger: outroRef.current,
        start: 'top -20',
        onEnter: () => {
          gsap.to(navContainerRef.current, {
            y: -100,
            autoAlpha: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          })
        },
        onLeaveBack: () => {
          gsap.to(navContainerRef.current, {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            ease: 'power2.out',
          })
        },
      })
    },
    { scope: containerRef }
  )

  const principle = PRINCIPLES[activeIndex]

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-hidden bg-primary-950 text-white selection:bg-[#20d76c] selection:text-black"
    >
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <NavBar
        itemsRef={navItemsRef}
        burgerRef={navBurgerRef}
        navContainerRef={navContainerRef}
        onBurgerClick={() => setIsMenuOpen(!isMenuOpen)}
        isOpen={isMenuOpen}
      />

      {/* MANIFESTO */}
      <section
        ref={manifestoRef}
        className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-16 pt-32 md:px-20 md:pb-20 md:pt-40"
      >
        <div
          ref={manifestoInner}
          className="flex flex-col justify-between gap-16 will-change-[filter,opacity,transform]"
        >
          {/* Top: index + label */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/30">
              About EDG
            </span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-xs tracking-[0.3em] text-white/30">
              2026
            </span>
          </div>

          {/* Centre: manifesto text */}
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <h1 className="font-display text-[10vw] font-black uppercase leading-[1.1] tracking-tighter md:text-[8vw]">
              Nous <br />
              construisons <br />
              <span className="text-[#20d76c]">l&apos;avenir</span> <br />
              numérique.
            </h1>

            <div className="flex max-w-xs flex-col gap-6 pb-2">
              <p className="font-sans text-sm leading-relaxed text-white/60">
                Depuis 2016, EDG propulse l&apos;innovation digitale de
                l&apos;idée brute au produit qui change les règles du jeu.
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#20d76c]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#20d76c]">
                  Algeria
                </span>
              </div>
            </div>
          </div>

          {/* Bottom: scroll cue */}
          <div className="flex items-center gap-4 self-end">
            <span className="font-mono text-xs uppercase tracking-widest text-white/20">
              Scroll
            </span>
            <div className="flex flex-col gap-1">
              <div className="h-4 w-px animate-bounce self-center bg-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/*  PHILOSOPHY */}
      <section
        ref={philoRef}
        className="relative z-10 min-h-screen bg-primary-950 px-6 pb-24 pt-24 md:px-20"
      >
        {/* Label */}
        <div className="philo-label mb-20 flex items-center gap-6">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/30">
            Notre Philosophie
          </span>
          <div className="h-px w-12 bg-white/10" />
          <span className="font-mono text-xs text-white/20">
            {principle.id} / {String(PRINCIPLES.length).padStart(2, '0')}
          </span>
        </div>

        {/* Main principle display */}
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          {/* Giant title */}
          <div ref={titleRef} className="flex-1">
            <div className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-white/30">
              {principle.sub}
            </div>
            <h2 className="font-display text-[3.5rem] font-black uppercase leading-none tracking-tight text-white md:text-[9rem]">
              {principle.title}
              <span className="text-[#20d76c]">.</span>
            </h2>
          </div>

          {/* Description + navigation */}
          <div
            ref={descRef}
            className="flex max-w-md flex-col gap-10 pb-2 md:max-w-sm"
          >
            <p className="font-sans text-base leading-relaxed text-white/60 md:text-lg">
              {principle.desc}
            </p>

            {/* Navigation arrows */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigatePrinciple(-1)}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all duration-300 hover:border-[#20d76c] hover:bg-[#20d76c]/10"
                aria-label="Previous"
              >
                <span className="text-white/60 transition-colors group-hover:text-[#20d76c]">
                  ←
                </span>
              </button>
              <button
                onClick={() => navigatePrinciple(1)}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all duration-300 hover:border-[#20d76c] hover:bg-[#20d76c]/10"
                aria-label="Next"
              >
                <span className="text-white/60 transition-colors group-hover:text-[#20d76c]">
                  →
                </span>
              </button>

              {/* Progress dots */}
              <div className="ml-2 flex items-center gap-2">
                {PRINCIPLES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const dir = i > activeIndex ? 1 : -1
                      navigatePrinciple(i === activeIndex ? 1 : dir)
                      setActiveIndex(i)
                    }}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-8 bg-[#20d76c]' : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="mt-20 h-px w-full bg-white/10" />
      </section>

      {/* TEAM */}
      <section className="relative z-10 bg-primary-950 px-6 py-32 md:px-20">
        <div className="reveal-up mb-16 flex items-end justify-between">
          <h2 className="font-display text-[3rem] font-black uppercase leading-none tracking-tight md:text-[7rem]">
            L&apos;équipe
            <span className="text-[#20d76c]">.</span>
          </h2>
        </div>

        {/* centered single member, it could be easily changed later to grid*/}
        <div className="reveal-up flex justify-center">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="group flex flex-col items-center gap-6"
            >
              <div className="relative aspect-square w-[70vw] overflow-hidden bg-white/5 md:w-[20vw]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  sizes="(max-width: 768px) 40vw, 340px"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="font-display text-3xl uppercase tracking-tight">
                  {member.name}
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#20d76c]">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS ACCORDION */}
      <section className="relative z-10 bg-primary-950 px-6 pb-32 md:px-20">
        <div className="reveal-up mb-16 flex items-end justify-between border-t border-white/10 pt-16">
          <h2 className="whitespace-nowrap font-display text-[2.5rem] font-black uppercase leading-none tracking-tight md:text-[7rem]">
            Nos Clients
            <span className="text-[#20d76c]">.</span>
          </h2>
        </div>

        <div className="reveal-up flex flex-col">
          {CLIENTS.map((client) => {
            const isOpen = openClient === client.id
            return (
              <div key={client.id} className="border-b border-white/10">
                <button
                  onClick={() => toggleClient(client.id)}
                  className="group flex w-full items-center justify-between py-6 text-left transition-colors duration-300 hover:bg-white/[0.02] md:py-8"
                >
                  <div className="flex items-center gap-8 md:gap-16">
                    <span className="w-8 font-mono text-xs font-bold text-white/30">
                      ({client.id})
                    </span>
                    <span
                      className="font-display uppercase tracking-tight text-white transition-colors group-hover:text-[#20d76c]"
                      style={{
                        fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
                        fontWeight: 900,
                      }}
                    >
                      {client.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 md:gap-10">
                    <div className="hidden gap-2 md:flex">
                      {client.services.map((s) => (
                        <span
                          key={s}
                          className="rounded-sm border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/40"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="hidden font-mono text-sm text-white/30 md:block">
                      {client.year}
                    </span>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 md:h-10 md:w-10 ${
                        isOpen
                          ? 'border-[#20d76c] bg-[#20d76c]/10 text-[#20d76c]'
                          : 'border-white/20 text-white/50 group-hover:border-[#20d76c] group-hover:text-[#20d76c]'
                      }`}
                    >
                      <span
                        className={`text-sm transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </button>

                {/* Accordion body */}
                <div
                  id={`client-body-${client.id}`}
                  style={{ height: 0, overflow: 'hidden', opacity: 0 }}
                >
                  <div className="pb-8 pl-16 md:pl-24">
                    <p className="max-w-xl font-sans text-base leading-relaxed text-white/60 md:text-lg">
                      &quot;{client.feedback}&quot;
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/*  OUTRO  */}
      <section
        ref={outroRef}
        className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center bg-primary-950 px-6 py-32 text-center md:px-20"
        style={{ transformOrigin: 'center top' }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/30">
          Prêt à construire quelque chose ?
        </p>
        <h2 className="mt-6 font-display text-[3rem] font-black uppercase leading-none tracking-tight md:text-[9rem]">
          Travaillons <br />
          <span className="text-[#20d76c]">ensemble.</span>
        </h2>
        <a
          onClick={() => router.push('/contact')}
          className="group mt-12 flex cursor-pointer items-center gap-4 border-b border-white/20 pb-2 font-sans text-lg font-medium text-white transition-all duration-300 hover:border-[#20d76c] hover:text-[#20d76c]"
        >
          Démarrer un projet
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            ↗
          </span>
        </a>
      </section>

      {/* FOOTER */}
      <div className="relative z-20">
        <Footer
          ref={footerRef}
          onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </div>
    </div>
  )
}
