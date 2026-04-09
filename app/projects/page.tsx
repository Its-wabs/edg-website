'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { usePathname, useRouter } from 'next/navigation'
import Footer from '@/components/sections/footer'
import NavBar from '@/components/layout/navbar'
import Menu from '@/components/layout/menu'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const PROJECTS = [
  {
    id: 'project-alpha',
    title: 'PROJECT ALPHA',
    category: 'MOTION SYSTEMS',
    description:
      'EXPLORING THE BOUNDARIES OF KINETIC TYPOGRAPHY AND SCROLL SYSTEMS.',
    year: '2026',
    image: '/images/projects/image.png',
    video: '/videos/projects/alpha.mp4',
    url: 'https://alpha.sys',
  },
  {
    id: 'project-beta',
    title: 'PROJECT BETA',
    category: 'EXPERT STRATEGY',
    description:
      'AN INDUSTRIAL DESIGN APPROACH TO MODERN E-COMMERCE ARCHITECTURE.',
    year: '2026',
    image: '/images/projects/image.png',
    video: '/videos/projects/alpha.mp4',
    url: 'https://beta.sys',
  },
  {
    id: 'project-gamma',
    title: 'PROJECT GAMMA',
    category: 'DESIGN ENGINEERING',
    description: 'HIGH-CONTRAST EDITORIAL INTERFACES FOR CREATIVE DISCOURSES.',
    year: '2025',
    image: '/images/projects/image.png',
    video: '/videos/projects/alpha.mp4',
    url: 'https://gamma.sys',
  },
  {
    id: 'project-delta',
    title: 'PROJECT DELTA',
    category: 'SYSTEMS INTEGRATION',
    description:
      'SYSTEMS INTEGRATION FOR AUTONOMOUS LOGISTICS AND DATA VISUALIZATION.',
    year: '2025',
    image: '/images/projects/image.png',
    video: '/videos/projects/alpha.mp4',
    url: 'https://delta.sys',
  },
  {
    id: 'project-epsilon',
    title: 'PROJECT EPSILON',
    category: 'CREATIVE DIRECTION',
    description: 'MINIMALIST EXPERIMENTAL PORTFOLIO FOR ARCHITECTURAL FIRMS.',
    year: '2024',
    image: '/images/projects/image.png',
    video: '/videos/projects/alpha.mp4',
    url: 'https://epsilon.sys',
  },
  {
    id: 'project-zeta',
    title: 'PROJECT ZETA',
    category: 'MOTION SYSTEMS',
    description:
      'A DEEP DIVE INTO NEOMORPHIC SHADOWS AND 3D DRAWER COMPONENTS.',
    year: '2024',
    image: '/images/projects/image.png',
    video: '/videos/projects/alpha.mp4',
    url: 'https://zeta.sys',
  },
]

const ARCHIVE_ITEMS = [
  {
    category: 'Aviation',
    client: 'Aéro-Nexus',
    year: 2024,
    type: 'Solution CRM/ERP',
    url: '#',
  },
  {
    category: 'Tech Saas',
    client: 'Eco-System',
    year: 2023,
    type: 'Audit & Consulting',
    url: '#',
  },
  {
    category: 'Transport',
    client: 'Logis-Core',
    year: 2024,
    type: 'Optimisation Logistique',
    url: '#',
  },
  {
    category: 'Intégration',
    client: 'Tech-Nexus',
    year: 2024,
    type: 'Déploiement Cloud',
    url: '#',
  },
  {
    category: 'Expert Strategy',
    client: 'Solaris',
    year: 2023,
    type: 'Stratégie Marketing',
    url: '#',
  },
  {
    category: 'Security',
    client: 'Archive.log',
    year: 2022,
    type: 'Consultation Sécurité',
    url: '#',
  },
]

export default function ProjectsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const hugeHeaderRef = useRef<HTMLHeadingElement>(null)
  const archiveRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  const navItemsRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const pathname = usePathname()

  const handleNavigate = (id: string) => {
    if (pathname === '/contact' && (id === 'contact' || id === 'hero')) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.push(`/#${id}`)
    }
  }

  const handleMenuNavigation = (id: string) => {
    setIsMenuOpen(false)

    if (id === 'hero' || id === 'home') {
      router.push('/')
      return
    }

    const pages = ['projects', 'contact', 'terms']

    if (pages.includes(id)) {
      router.push(`/${id}`)
    } else {
      if (pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push(`/#${id}`)
      }
    }
  }

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
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
      className="min-h-screen bg-primary text-white selection:bg-[#20d76c] selection:text-[#0F0E0D]"
    >
      <Menu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleMenuNavigation}
      />

      <NavBar
        itemsRef={navItemsRef}
        navContainerRef={navContainerRef}
        onNavigate={handleNavigate}
        isOpen={isMenuOpen}
        onBurgerClick={() => setIsMenuOpen((prev) => !prev)}
      />

      {/*  HEADER  */}
      <section className="flex flex-col items-center px-6 pt-32 md:px-20 md:pt-40">
        <h1
          ref={hugeHeaderRef}
          className="flex items-center font-display text-[18vw] font-black uppercase leading-[0.7] tracking-tight md:text-[20vw]"
        >
          <span className="text-[#20d76c]">P</span>
          <span>ROJETS</span>
        </h1>

        <div className="mt-12 flex w-full justify-center">
          <p className="max-w-2xl text-center font-sans text-lg uppercase leading-relaxed tracking-tight opacity-70 md:text-xl">
            Un aperçu d&apos;ingénierie moderne et de récits visuels purs. Nous
            concevons des systèmes et des stratégies expertes pour des clients
            ambitieux.
          </p>
        </div>
      </section>

      {/* THE GRID  */}
      <section className="grid-reveal-trigger mx-auto mt-32 max-w-[95vw] px-6 md:px-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {PROJECTS.map((item) => (
            <div
              key={item.id}
              onClick={() => window.open(item.url, '_blank')}
              className="reveal-item group relative flex aspect-square cursor-pointer flex-col overflow-hidden bg-primary-950 p-6 transition-all duration-500  ease-in-out hover:bg-[#20d76c]"
            >
              {/* BLURRED BACKGROUND */}
              <div className="pointer-events-none absolute inset-0 scale-150  opacity-0 blur-[80px] transition-opacity duration-700 md:opacity-65 md:group-hover:opacity-25">
                <Image src={item.image} alt="" fill className="object-cover" />
              </div>

              {/* Top info */}
              <div className="flex items-center justify-between font-sans text-[10px] font-semibold uppercase tracking-widest text-white/40 group-hover:text-primary-950">
                <span>{item.title}</span>
                <span className="text-[#20d76c] group-hover:text-primary-950">
                  {item.category}
                </span>
              </div>

              {/* Centered Thumbnail Image */}
              <div className="relative mx-auto my-auto h-[40%] w-[70%] overflow-hidden bg-neutral-900 transition-transform duration-700 group-hover:scale-105">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* replace the image above with this for video showcase*/}
                {/*
  <Image
    src={item.image}
    alt={item.title}
    fill
    className="object-cover transition-opacity duration-500 group-hover:opacity-0"
    sizes="(max-width: 768px) 100vw, 33vw"
  />

  
   <video
    src={item.video}
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
  /> 
  */}
              </div>

              {/* Bottom text info */}
              <div className="mt-4 font-sans text-[10px] font-semibold uppercase tracking-widest group-hover:text-primary-950">
                <p>{item.year} / Algiers</p>
                <p className="mt-2 italic leading-relaxed text-white/50 group-hover:text-primary-950">
                  &quot;{item.description}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*  ARCHIVE LIST */}
      <section
        ref={archiveRef}
        className="mx-auto mt-48 h-full max-w-[1400px] px-6 pb-40 md:px-20"
      >
        <div className="flex items-end justify-between pb-8">
          <h2 className="font-display text-4xl uppercase text-white/85 md:text-6xl">
            ARCHIVE
          </h2>
          <span className="font-sans text-sm font-medium uppercase tracking-widest text-[#20d76c]">
            Systems & Strategies / 2022-2026
          </span>
        </div>

        <div className="reveal-line h-[1px] w-full bg-white/20" />

        {ARCHIVE_ITEMS.map((item, i) => (
          <div
            key={i}
            onClick={() => window.open(item.url, '_blank')}
            className="group flex w-full cursor-pointer flex-col border-b border-white/10 transition-colors hover:bg-white/[0.03]"
          >
            <div className="flex w-full items-center justify-between p-8">
              <span className="w-1/4 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#20d76c]">
                {item.category}
              </span>
              <span className="w-2/4 font-display text-lg uppercase tracking-tight text-white transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                {item.client}
              </span>
              <span className="hidden w-1/4 text-right font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 md:inline">
                {item.type}
              </span>
              <span className="w-12 text-right font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                {item.year}
              </span>
            </div>
          </div>
        ))}

        <div className="reveal-line h-[1px] w-full bg-white/20" />
      </section>

      <Footer
        ref={footerRef}
        onNavigate={handleNavigate}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </div>
  )
}
