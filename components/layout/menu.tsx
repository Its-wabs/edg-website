'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { usePathname, useRouter } from 'next/navigation'
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Solutions', path: '/projects' },
  { label: 'Services', path: '/services' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
]
interface MenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const container = useRef(null)
  const linksRef = useRef<HTMLDivElement[]>([])
  const pathname = usePathname()
  const router = useRouter()

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(container.current, {
          y: 0,
          duration: 0.8,
          ease: 'power4.inOut',
        })

        gsap.fromTo(
          linksRef.current,
          { y: 140, opacity: 0 },
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

  const handleLinkClick = (path: string) => {
    // Close menu immediately
    onClose()
    setTimeout(() => {
      if (pathname === path) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      router.push(path)
    }, 500)
  }

  return (
    <div
      ref={container}
      className={`fixed inset-0 z-[90] flex -translate-y-full flex-col items-center justify-center bg-primary-950 px-6 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <nav className="flex flex-col items-center gap-6">
        {NAV_LINKS.map((link, i) => (
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
              <button
                onClick={() => handleLinkClick(link.path)}
                className="relative block w-full text-center font-display text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl"
              >
                {/* LAYER 1: Default Text */}
                <span className="block transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full">
                  {link.label}
                </span>

                {/* LAYER 2: Hover Text */}
                <span className="absolute inset-0 block translate-y-full italic text-[#20d76c] transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:translate-y-0">
                  {link.label}
                </span>
              </button>
            </div>
          </div>
        ))}
      </nav>

      {/* FOOTER ELEMENTS */}
      <div className="absolute bottom-12 left-6 right-6 flex items-end justify-between pt-8 md:left-20 md:right-20">
        <div className="flex gap-6">
          <a
            href="#"
            className="text-white transition-all duration-300 hover:-translate-y-1 hover:text-[#20d76c]"
          >
            <LinkedinLogoIcon size={24} />
          </a>
          <a
            href="#"
            className="text-white transition-all duration-300 hover:-translate-y-1 hover:text-[#20d76c]"
          >
            <InstagramLogoIcon size={24} />
          </a>
          <a
            href="#"
            className="text-white transition-all duration-300 hover:-translate-y-1 hover:text-[#20d76c]"
          >
            <FacebookLogoIcon size={24} />
          </a>
        </div>
        <div className="text-right font-sans">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            Based in
          </p>
          <p className="text-sm font-bold uppercase text-white">Algeria</p>
        </div>
      </div>
    </div>
  )
}
