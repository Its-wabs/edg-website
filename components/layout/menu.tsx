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

// 1. Define the two different link sets
const HOME_LINKS = [
  { label: 'Solutions', id: 'solutions', path: '/#solutions', isHash: true },
  { label: 'A Propos', id: 'about', path: '/#about', isHash: true },
  { label: 'Equipe', id: 'team', path: '/#team', isHash: true },
  { label: 'Contact', id: 'contact', path: '/contact', isHash: false },
]

const OTHER_LINKS = [
  { label: 'Projets', id: 'projects', path: '/projects', isHash: false },
  { label: 'Conditions', id: 'terms', path: '/terms', isHash: false },
  { label: 'Home', id: 'hero', path: '/', isHash: false },
  { label: 'Contact', id: 'contact', path: '/contact', isHash: false },
]

interface MenuProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (id: string) => void
}

export default function Menu({ isOpen, onClose, onNavigate }: MenuProps) {
  const container = useRef(null)
  const linksRef = useRef<HTMLDivElement[]>([])
  const pathname = usePathname()
  const router = useRouter()

  const isHome = pathname === '/'
  const activeLinks = isHome ? HOME_LINKS : OTHER_LINKS

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

  const handleLinkClick = (link: (typeof HOME_LINKS)[0]) => {
    onClose()

    // Small delay to let the menu start closing before the transition
    setTimeout(() => {
      if (link.isHash && isHome) {
        onNavigate(link.id)
      } else {
        router.push(link.path)
      }
    }, 400)
  }

  return (
    <div
      ref={container}
      className={`fixed inset-0 z-[90] flex -translate-y-full flex-col items-center justify-center bg-primary-950 px-6 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <nav className="flex flex-col items-center gap-6">
        {activeLinks.map((link, i) => (
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
                onClick={() => handleLinkClick(link)}
                className="relative block w-full text-center font-display text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl"
              >
                {/* LAYER 1: Default Text */}
                <span className="block transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full">
                  {link.label}
                </span>

                {/* LAYER 2: Hover Text (The Green/Accent layer) */}
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
