'use client'

import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Footer from '@/components/sections/footer'
import NavBar from '@/components/layout/navbar'
import { useRouter } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/all'
import Menu from '@/components/layout/menu'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// DATA edit content here, nothing else needs to change

const SERVICES = [
  {
    id: '01',
    category: 'Digital',
    title: 'Développement\nWeb & Mobile',
    desc: 'Des sites web et applications mobiles performants, architecturés pour convertir, retenir et évoluer avec votre business.',
    items: [
      'Sites Vitrine',
      'Applications Web',
      'E-commerce',
      'Applications Mobiles',
      'APIs & Intégrations',
      'Performance & SEO',
    ],
    bg: 'bg-accent-600',
  },
  {
    id: '02',
    category: 'Growth',
    title: 'Marketing Digital\n& Communication',
    desc: 'Stratégies data-driven qui transforment votre audience en clients fidèles. Visibilité maximale, résultats mesurables.',
    items: [
      'Social Media Management',
      'SEO & Content',
      'Email Marketing',
      'Publicité Digitale',
      'Analytics & Reporting',
      'Brand Storytelling',
    ],
    bg: 'bg-accent-700',
  },
  {
    id: '03',
    category: 'Strategy',
    title: 'Consulting\n& Stratégie Digitale',
    desc: 'Un regard externe, expert et sans compromis sur votre transformation numérique. On construit la feuille de route, vous exécutez en confiance.',
    items: [
      'Audit Digital',
      'Roadmap Produit',
      'Architecture Système',
      'Formation Équipes',
      'Due Diligence Tech',
      'Scaling & Optimisation',
    ],
    bg: 'bg-accent-800',
  },
]

const PROCESS = [
  {
    id: '01',
    icon: '⚡',
    title: 'Livraison Rapide',
    desc: 'Sprints cadencés, feedback continu. Vos projets avancent vite sans sacrifier la qualité.',
  },
  {
    id: '02',
    icon: '◈',
    title: 'Expertise Pointue',
    desc: 'Une équipe senior sur chaque projet. Pas de juniors cachés derrière des promesses.',
  },
  {
    id: '03',
    icon: '◎',
    title: 'Communication Claire',
    desc: 'Un interlocuteur dédié, des updates réguliers. Vous savez toujours où en est votre projet.',
  },
  {
    id: '04',
    icon: '∞',
    title: 'Support Continu',
    desc: "La relation ne s'arrête pas à la livraison. On reste là pour faire évoluer ce qu'on a construit.",
  },
]

const STATS = [
  { value: '3', label: "Pôles d'expertise" },
  { value: '48h', label: 'Délai de réponse max' },
  { value: '100%', label: 'Projets livrés à temps' },
  { value: '3+', label: "Années d'expérience" },
]

export default function ServicesPage() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // refs
  const containerRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)
  const navBurgerRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const outroRef = useRef<HTMLElement>(null)
  const manifestoInnerRef = useRef<HTMLDivElement>(null)

  const serviceRef = useRef<HTMLDivElement>(null)
  const serviceCards = useRef<HTMLDivElement[]>([])

  useGSAP(
    () => {
      // Manifesto
      ScrollTrigger.create({
        trigger: '.manifesto-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: ({ progress: p }) => {
          gsap.set(manifestoInnerRef.current, {
            filter: `blur(${p * 14}px)`,
            opacity: 1 - p * 1.4,
            scale: 1 - p * 0.05,
          })
        },
      })

      const cards = serviceCards.current

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: serviceRef.current,
          start: 'top top',
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      cards.forEach((card, i) => {
        if (i === 0) return

        tl.fromTo(
          card,
          {
            yPercent: 100,
            scale: 0.8,
          },
          {
            yPercent: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.inOut',
          },
          `card-${i}`
        )
      })

      // Process cards
      gsap.utils.toArray<HTMLElement>('.process-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        )
      })

      //  Outro
      if (outroRef.current) {
        gsap.to(outroRef.current, {
          scale: 0.93,
          opacity: 0,
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: outroRef.current,
            start: 'bottom 75%',
            end: 'bottom 15%',
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

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-hidden bg-primary text-white selection:bg-[#20d76c] selection:text-black"
    >
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <NavBar
        itemsRef={navItemsRef}
        burgerRef={navBurgerRef}
        navContainerRef={navContainerRef}
        onBurgerClick={() => setIsMenuOpen(!isMenuOpen)}
        isOpen={isMenuOpen}
      />

      {/*  MANIFESTO */}
      <section className="manifesto-section relative flex min-h-screen flex-col justify-between px-6 pb-16 pt-32 md:px-20 md:pt-40">
        <div
          ref={manifestoInnerRef}
          className="flex flex-col justify-between gap-20 will-change-[filter,opacity,transform]"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/30">
              Nos Services
            </span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-xs text-white/20">03 offres</span>
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h1 className="font-display text-[4rem] font-black uppercase leading-[1] tracking-tight md:text-[10rem]">
              On crée
              <br />
              ce qui
              <br />
              <span className="text-[#20d76c]">marche.</span>
            </h1>

            <p className="max-w-xs pb-3 font-sans text-lg leading-relaxed text-white/50">
              Trois pôles d&apos;expertise complémentaires pour couvrir
              l&apos;intégralité de votre présence digitale du code au contenu,
              de la stratégie au support.
            </p>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex gap-6">
              {SERVICES.map((s) => (
                <span
                  key={s.id}
                  className="font-mono text-xs uppercase tracking-widest text-white/20"
                >
                  {s.category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SCROLL STACK */}

      <section
        ref={serviceRef}
        className="relative h-screen w-full overflow-hidden bg-primary"
      >
        {SERVICES.map((svc, i) => (
          <div
            key={svc.id}
            ref={(el) => {
              if (el) serviceCards.current[i] = el
            }}
            className={`absolute inset-0 flex h-screen ${svc.bg} w-full flex-col items-center justify-center px-6 md:px-20`}
            style={{ zIndex: i + 10 }}
          >
            {/* GHOST NUMBER */}
            <span className="pointer-events-none absolute bottom-0 right-4 select-none font-display text-[22vw] font-black leading-none text-white/5">
              {svc.id}
            </span>

            {/* CARD CONTENT */}
            <div className="relative z-10 flex w-full max-w-7xl flex-col items-start justify-center gap-[20vw] md:max-w-full md:flex-row md:items-center md:justify-between">
              {/* Left Column */}
              <div className="flex flex-col gap-6 md:w-1/2">
                <span className="font-sans text-xs font-bold uppercase tracking-[0.4em] text-accent-950">
                  {svc.category}
                </span>
                <h2 className="font-display text-4xl font-black uppercase leading-[1.1] tracking-tight text-white md:text-[6rem]">
                  {svc.title}
                  <span className="text-[#20d76c]">.</span>
                </h2>
                <p className="max-w-md font-sans text-base text-white/50 md:text-lg">
                  {svc.desc}
                </p>
              </div>

              {/* Right Column: Deliverables */}
              <div className="grid w-full grid-cols-2 gap-4 border-t border-white/10 pt-2 md:border-l md:border-t-0 md:pl-16 md:pt-0">
                {svc.items.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-1 w-1 rounded-full bg-[#20d76c]" />
                    <span className="font-sans text-sm text-white/70">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* PROCESS / WHY US  */}
      <section className="relative z-10 bg-primary px-6 py-32 md:px-20">
        <div className="mb-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2
            className="font-display uppercase leading-none tracking-tighter text-white"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)', fontWeight: 900 }}
          >
            Pourquoi
            <br />
            <span className="text-[#20d76c]">nous choisir</span> ?
          </h2>
          <p className="max-w-xs font-sans text-sm leading-relaxed text-white/40 md:pb-2">
            Quatre principes non-négociables qui définissent notre façon de
            travailler.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((item) => (
            <div
              key={item.id}
              className="process-card group relative flex flex-col justify-between gap-14 bg-[#0a0a0a] p-8 transition-colors duration-500 hover:bg-[#111] md:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:text-[#20d76c]">
                  {item.icon}
                </span>
                <span className="font-mono text-xs text-white/20">
                  ({item.id})
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-[#20d76c] md:text-2xl">
                  {item.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-white/50">
                  {item.desc}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-[#20d76c] transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-2 gap-8 border-t  border-white/10 pt-16 md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-2"
            >
              <span className="font-display text-[2.5rem] font-black leading-none tracking-tight text-white md:text-[5rem]">
                {stat.value}
                <span className="text-[#20d76c]">.</span>
              </span>
              <span className="font-sans text-[10px] uppercase text-white/30  md:text-[15px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/*  OUTRO  */}
      <section
        ref={outroRef}
        className="relative z-10 flex min-h-[55vh] flex-col items-center justify-center bg-primary px-6 py-32 text-center"
        style={{ transformOrigin: 'center top' }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/30">
          Prêt à démarrer ?
        </span>
        <h2 className="mt-6 font-display text-[3rem] font-black uppercase leading-none tracking-tight text-white md:text-[10rem]">
          Parlons de
          <br />
          votre <span className="text-[#20d76c]">projet.</span>
        </h2>
        <a
          onClick={() => router.push('/contact')}
          className="group mt-12 flex cursor-pointer items-center gap-4 border-b border-white/20 pb-2 font-sans text-lg font-medium text-white/50 transition-all duration-300 hover:border-[#20d76c] hover:text-[#20d76c]"
        >
          Envoyer un message
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            ↗
          </span>
        </a>
      </section>

      {/* FOOTER  */}
      <div className="relative z-20">
        <Footer
          ref={footerRef}
          onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </div>
    </div>
  )
}
