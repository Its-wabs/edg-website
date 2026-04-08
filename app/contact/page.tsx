'use client'

import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Footer from '@/components/sections/footer'
import NavBar from '@/components/layout/navbar'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/all'

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/company/edg',
    target: '_blank',
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/edg',
    target: '_blank',
  },
  {
    name: 'Facebook',
    link: 'https://www.facebook.com/edg',
    target: '_blank',
  },
  {
    name: 'GitHub',
    link: 'https://github.com/edg',
    target: '_blank',
  },
]

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const ContactPage = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)
  const navBurgerRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  //  Navigation Logic
  const handleNavigate = (id: string) => {
    if (pathname === '/contact' && (id === 'contact' || id === 'hero')) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.push(`/#${id}`)
    }
  }

  useGSAP(
    () => {
      //  Entrance Animations
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1 },
      })
      tl.from('.reveal-text', { y: 100, opacity: 0, stagger: 0.1 }).from(
        '.reveal-line',
        { scaleX: 0, transformOrigin: 'left', stagger: 0.1 },
        '-=0.5'
      )

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
      className="bg-primary-950 text-white selection:bg-[#20d76c] selection:text-primary-950"
    >
      <NavBar
        itemsRef={navItemsRef}
        burgerRef={navBurgerRef}
        navContainerRef={navContainerRef}
        onBurgerClick={() => setIsMenuOpen(!isMenuOpen)}
        isOpen={isMenuOpen}
        onNavigate={handleNavigate}
      />

      {/*HEADER */}
      <section className="px-6 pt-32 md:px-20 md:pt-40">
        <div className="flex items-end justify-between pb-8">
          <h1 className="reveal-text font-display text-5xl uppercase md:text-8xl">
            Contact
          </h1>
          <span className="reveal-text font-sans text-sm font-medium uppercase tracking-widest text-[#20d76c] md:text-base">
            08:22 / GMT+1
          </span>
        </div>

        <div className="mt-12 flex flex-col gap-12 md:flex-row md:justify-between">
          {/* LEFT: INFO */}
          <div className="flex flex-col gap-8 md:w-1/3">
            <div className="reveal-text">
              <p className="font-sans text-xs uppercase tracking-widest text-white/40">
                Location
              </p>
              <p className="mt-2 font-display text-xl uppercase">
                Algeria / Remote
              </p>
            </div>
            <div className="reveal-text">
              <p className="font-sans text-xs uppercase tracking-widest text-white/40">
                Say Hello
              </p>
              <a
                href="mailto:contact@edggroupe.com"
                className="group relative mt-2 block w-fit font-display text-xl uppercase italic underline-offset-8 hover:text-[#20d76c] md:text-2xl"
              >
                info@edggroupe.com
              </a>
            </div>
          </div>

          {/* RIGHT: HEADLINE */}
          <div className="md:w-1/2">
            <h2 className="reveal-text font-sans text-3xl font-semibold uppercase leading-[1.1] md:text-5xl lg:text-7xl">
              Parlons de votre{' '}
              <span className="text-[#20d76c]">prochain projet.</span>{' '}
              Remplissez le formulaire ci-dessous ↓
            </h2>
          </div>
        </div>
      </section>

      {/* FORM*/}
      <section className="mt-24 px-6 md:px-20">
        <div className="reveal-line h-[1px] w-full bg-white/20" />

        <form className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="group relative">
            <input
              type="text"
              className="w-full border-b border-white/20 bg-transparent py-4 font-display text-xl uppercase outline-none focus:border-[#20d76c]"
              placeholder="Votre nom"
            />
          </div>
          <div className="group relative">
            <input
              type="email"
              className="w-full border-b border-white/20 bg-transparent py-4 font-display text-xl uppercase outline-none focus:border-[#20d76c]"
              placeholder="email@exemple.com"
            />
          </div>

          <div className="group relative md:col-span-2">
            <textarea
              rows={4}
              className="w-full border-b border-white/20 bg-transparent py-4 font-display text-xl uppercase outline-none focus:border-[#20d76c]"
              placeholder="Décrivez vos besoins..."
            />
          </div>

          {/* CTA */}
          <div className="md:col-span-2">
            <button className="group flex items-center gap-4 py-8 font-display text-4xl uppercase transition-colors hover:text-[#20d76c] md:text-6xl">
              Envoyer
              <svg
                className="h-8 w-8 transition-transform group-hover:translate-x-4 md:h-12 md:w-12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </section>

      {/*SOCIAL GRID  */}
      <section className="mt-32 grid grid-cols-2 border-t border-white/10 md:grid-cols-4">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.name}
            href={social.link}
            target={social.target}
            rel="noopener noreferrer"
            className="flex aspect-square flex-col items-center justify-center border-r border-white/10 p-8 transition-all duration-500 ease-in-out hover:bg-[#20d76c] hover:text-primary-950"
          >
            <span className="font-display text-lg uppercase tracking-tighter md:text-2xl">
              {social.name}
            </span>
          </a>
        ))}
      </section>

      {/* FOOTER */}
      <Footer
        ref={footerRef}
        onNavigate={handleNavigate}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </div>
  )
}

export default ContactPage
