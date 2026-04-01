'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react'

const MENU_LINKS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'About Us', href: '#about' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

export default function Menu({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const container = useRef(null)
  // We'll target the wrappers for the GSAP entrance to keep the "masking" look
  const linksRef = useRef<HTMLDivElement[]>([])

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(container.current, {
          y: 0,
          duration: 0.8,
          ease: 'power4.inOut',
        })

        // The GSAP entrance: sliding the link UP into its mask
        gsap.fromTo(
          linksRef.current,
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            delay: 0.4,
            ease: 'power3.out',
          }
        )
      } else {
        gsap.to(container.current, {
          y: '-100%',
          duration: 0.6,
          ease: 'power4.inOut',
        })
      }
    },
    { dependencies: [isOpen], scope: container }
  )

  return (
    <div
      ref={container}
      className={`fixed inset-0 z-[90] flex -translate-y-full flex-col items-center justify-center bg-primary-900 px-6 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <nav className="flex flex-col items-center gap-6">
        {MENU_LINKS.map((link, i) => (
          /* 1. THE MASK: This div clips the text so it "rolls" into view */
          <div
            key={link.label}
            className="group w-full overflow-hidden px-8 py-1"
          >
            <div
              ref={(el) => {
                if (el) linksRef.current[i] = el
              }}
              className="relative"
            >
              <a
                href={link.href}
                onClick={onClose}
                className="relative block font-display text-5xl  font-black uppercase leading-none tracking-tight text-white md:text-7xl"
              >
                {/* LAYER 1: Default Text (Slides UP and OUT) */}
                <span className="ease-[0.76, 0, 0.24, 1] block transition-transform duration-500 group-hover:-translate-y-full">
                  {link.label}
                </span>

                {/* LAYER 2: Hover Text (Slides UP and IN from bottom) */}
                <span className="ease-[0.76, 0, 0.24, 1] absolute inset-0 block translate-y-full italic text-accent-500 transition-transform duration-500 group-hover:translate-y-0">
                  {link.label}
                </span>
              </a>
            </div>
          </div>
        ))}
      </nav>

      {/* FOOTER ELEMENTS */}
      <div className="absolute bottom-12 left-6 right-6 flex items-end justify-between pt-8 md:left-20  md:right-20">
        <div className="flex gap-6">
          <a
            href="#"
            className="text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-accent-500"
          >
            <LinkedinLogoIcon size={24} />
          </a>
          <a
            href="#"
            className="text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-accent-500"
          >
            <InstagramLogoIcon size={24} />
          </a>
          <a
            href="#"
            className="text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-accent-500"
          >
            <FacebookLogoIcon size={24} />
          </a>
        </div>

        <div className="pointer-events-none text-right font-sans">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            Based in
          </p>
          <p className="text-sm font-bold uppercase text-white">Algeria</p>
        </div>
      </div>
    </div>
  )
}
