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

const TERMS_SECTIONS = [
  {
    title: 'Overview Services',
    content: [
      'EDG offers specialized engineering and design services, including systems thinking, UI/UX creation, and strategic digital architecture.',
      'We operate through a professional service model, providing tailored solutions and subscription-based access to our expertise as outlined on our platform.',
    ],
  },
  {
    title: 'Subscriptions & Billing',
    content: [
      'Plans: We offer tiered access to our services, each with specific billing cycles and features.',
      'Payments: Fees are billed on a recurring basis via specified credit or bank transfer methods. Failure to maintain timely payments may result in service suspension.',
      'Cancellations: You may cancel at any time; however, access remains active until the end of the current billing cycle. Refunds are generally not provided for partial periods.',
    ],
  },
  {
    title: 'Intellectual Property',
    content: [
      'All designs, templates, and code created by EDG remain our intellectual property unless a specific transfer of ownership is agreed upon in writing.',
      'You are granted a limited license for business use. You may not resell, redistribute, or claim original ownership of materials developed by our team.',
    ],
  },
  {
    title: 'Client Responsibilities',
    content: [
      'Accuracy: You agree to provide timely and precise information required for project delivery.',
      'Compliance: Your use of our services must align with all applicable laws and regulations, including intellectual property rights of third parties.',
    ],
  },
  {
    title: 'Liability & Disputes',
    content: [
      'Limitation: EDG is not liable for indirect or consequential damages. Our total liability is limited to the amount paid for services in the preceding 12 months.',
      'Resolution: Disputes will be handled through negotiation first. If unresolved, they shall be submitted to the exclusive jurisdiction of the courts in Algeria.',
    ],
  },
]

const TermsPage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  const handleNavigate = (id: string) => {
    if (pathname === '/terms') {
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
        '.terms-section',
        { y: 40, opacity: 0, stagger: 0.1, duration: 1 },
        '-=0.5'
      )

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top -20',
        onEnter: () =>
          gsap.to(navContainerRef.current, {
            y: -100,
            autoAlpha: 0,
            duration: 0.4,
          }),
        onLeaveBack: () =>
          gsap.to(navContainerRef.current, {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
          }),
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
        <h1 className="reveal-header font-display text-5xl font-black uppercase tracking-tighter md:text-9xl">
          TERMS <span className="text-[#20d76c]">&</span>
          <br />
          CONDITIONS
        </h1>
        <p className="reveal-header mt-10 font-sans text-xs font-bold uppercase tracking-[0.4em] text-white/40">
          Effective Date: October 3, 2024
        </p>
      </section>

      {/* CONTENT COLUMN */}
      <section className="mx-auto flex max-w-3xl flex-col px-6 pb-40">
        <div className="terms-section mb-20 text-center">
          <p className="font-sans text-sm leading-relaxed text-[#20d76c] md:text-lg">
            Welcome to EDG. These Terms and Conditions govern your use of our
            systems and services. By accessing our platform, you agree to comply
            with these professional standards.
          </p>
        </div>

        {TERMS_SECTIONS.map((section, idx) => (
          <div key={idx} className="terms-section mb-16 flex flex-col gap-6">
            <h2 className="font-display text-2xl uppercase tracking-tight md:text-3xl">
              {section.title}
            </h2>
            <ul className="flex flex-col gap-6">
              {section.content.map((point, pIdx) => (
                <li
                  key={pIdx}
                  className="group relative pl-8 font-sans text-sm leading-relaxed text-white/50 md:text-base"
                >
                  <span className="absolute left-0 top-3 h-[1px] w-4 bg-[#20d76c] transition-all group-hover:w-6" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* CONTACT FOOTNOTE */}
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

export default TermsPage
