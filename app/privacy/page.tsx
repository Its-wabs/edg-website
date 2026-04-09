'use client'

import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRouter, usePathname } from 'next/navigation'

import NavBar from '@/components/layout/navbar'
import Footer from '@/components/sections/footer'
import Menu from '@/components/layout/menu'

gsap.registerPlugin(ScrollTrigger)

const POLICY_SECTIONS = [
  {
    title: 'Information We Collect',
    content: [
      'Personal Information: Name, email address, phone number, billing information, and any other information you provide when signing up for our subscription services or contacting us.',
      'Usage Data: Information about how you use our website, including your IP address, browser type, pages visited, and time spent on the site.',
      'Cookies: We use cookies and similar tracking technologies to enhance your experience on our website.',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'To provide and manage our subscription services.',
      'To communicate with you, including responding to your inquiries and sending updates.',
      'To improve our website and services.',
      'To analyze usage patterns to enhance user experience.',
    ],
  },
  {
    title: 'Data Sharing and Disclosure',
    content: [
      'We do not sell or rent your personal information to third parties. However, we may share your information with service providers (payment processors, marketing) who assist in our operations.',
      'Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities.',
    ],
  },
  {
    title: 'Data Security',
    content: [
      'We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet is 100% secure.',
    ],
  },
]

const PrivacyPage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  const handleNavigate = (id: string) => {
    if (pathname === '/privacy') {
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
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.2 },
      })

      tl.from('.reveal-header', { y: 100, opacity: 0, delay: 0.2 }).from(
        '.policy-section',
        { y: 40, opacity: 0, stagger: 0.1, duration: 1 },
        '-=0.5'
      )

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top -20',
        onEnter: () =>
          gsap.to(navContainerRef.current, { y: -100, autoAlpha: 0 }),
        onLeaveBack: () =>
          gsap.to(navContainerRef.current, { y: 0, autoAlpha: 1 }),
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="bg-primary-950 text-white selection:bg-[#20d76c] selection:text-primary-950"
    >
      <Menu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleMenuNavigation}
      />
      <NavBar
        navContainerRef={navContainerRef}
        onBurgerClick={() => setIsMenuOpen(!isMenuOpen)}
        isOpen={isMenuOpen}
        onNavigate={handleNavigate}
      />

      {/* HEADER */}
      <section className="flex flex-col items-center px-6 pb-20 pt-40 text-center md:pt-52">
        <h1 className="reveal-header font-display text-6xl font-black uppercase tracking-tighter md:text-9xl">
          PRIVACY
          <br />
          POLICY
        </h1>
        <p className="reveal-header mt-10 font-sans text-xs font-bold uppercase tracking-[0.4em] text-[#20d76c]">
          Effective Date: October 3, 2024
        </p>
      </section>

      {/* CONTENT */}
      <section className="mx-auto flex max-w-3xl flex-col px-6 pb-40">
        <div className="policy-section mb-16">
          <p className="font-sans text-sm leading-relaxed text-white/70 md:text-base">
            At EDG, we are committed to protecting your privacy. This Privacy
            Policy outlines how we collect, use, and safeguard your information
            when you visit our website or use our services.
          </p>
        </div>

        {POLICY_SECTIONS.map((section, idx) => (
          <div key={idx} className="policy-section mb-16 flex flex-col gap-6">
            <h2 className="font-display text-2xl uppercase tracking-tight md:text-3xl">
              {section.title}
            </h2>
            <ul className="flex flex-col gap-4">
              {section.content.map((point, pIdx) => (
                <li
                  key={pIdx}
                  className="relative pl-6 font-sans text-sm leading-relaxed text-white/50 md:text-base"
                >
                  <span className="absolute left-0 top-3 h-1 w-1 rounded-full bg-[#20d76c]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="terms-section mt-20 border-t border-white/10 pt-20 text-center">
          <p className="font-sans text-[15px] uppercase tracking-[0.5em] text-white/60">
            Questions regarding these terms?
          </p>
          <a
            href="mailto:legal@edggroupe.com"
            className="text-1xl mt-6 block font-display uppercase transition-colors hover:text-[#20d76c] md:text-2xl"
          >
            legal@edggroupe.com
          </a>
        </div>
      </section>

      <Footer
        ref={footerRef}
        onNavigate={handleNavigate}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </div>
  )
}

export default PrivacyPage
