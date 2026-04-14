'use client'

import { useRouter, usePathname } from 'next/navigation'
import { forwardRef } from 'react'

interface NavBarProps {
  itemsRef?: React.RefObject<HTMLDivElement>
  burgerRef?: React.RefObject<HTMLDivElement>
  navContainerRef: React.RefObject<HTMLDivElement>
  onBurgerClick?: () => void
  isOpen?: boolean
}

const NavBar = forwardRef<HTMLDivElement, NavBarProps>(
  ({ itemsRef, burgerRef, navContainerRef, onBurgerClick, isOpen }) => {
    const router = useRouter()
    const pathname = usePathname()

    const navigateTo = (path: string) => {
      if (pathname === path) {
        return
      }
      router.push(path)
    }

    const handleLogoClick = () => {
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        router.push('/')
      }
    }

    return (
      <div
        ref={navContainerRef}
        className="navbar fixed top-6 z-[100] flex w-full items-center justify-center rounded-lg border-none border-transparent"
      >
        <nav className="flex w-[90vw] items-center justify-between">
          <div
            onClick={handleLogoClick}
            className="logo flex cursor-pointer items-center justify-center gap-1"
          >
            <span className="text-center font-display text-display-sm uppercase text-[#20d76c]">
              I
            </span>
            <h1 className="text-center font-display text-display-sm uppercase text-white">
              edg
            </h1>
          </div>

          <div ref={itemsRef} className="hidden items-center gap-14 md:flex">
            <button
              onClick={() => navigateTo('/projects')}
              className={`nav-link ${pathname === '/projects' ? 'active-link' : ''}`}
            >
              solutions
            </button>
            <button
              onClick={() => navigateTo('/about')}
              className={`nav-link ${pathname === '/about' ? 'active-link' : ''}`}
            >
              about us
            </button>
            <button
              onClick={() => navigateTo('/services')}
              className={`nav-link ${pathname === '/services' ? 'active-link' : ''}`}
            >
              services
            </button>

            {/* Always show Contact CTA */}
            <button
              onClick={() => navigateTo('/contact')}
              className="nav-contact"
            >
              contactez-nous
            </button>
          </div>

          {/* The menu Icon */}
          <div
            ref={burgerRef}
            onClick={onBurgerClick}
            className="scale-1 absolute right-[5vw] flex cursor-pointer flex-col gap-1.5 p-2 md:scale-0"
          >
            <div
              className={`h-[3px] w-8 rounded-full bg-white transition-transform duration-300 ${isOpen ? 'translate-y-[9px] rotate-45' : ''}`}
            />
            <div
              className={`h-[3px] w-8 rounded-full bg-white transition-transform duration-300 ${isOpen ? '-translate-y-[9px] -rotate-45' : ''}`}
            />
          </div>
        </nav>
      </div>
    )
  }
)

NavBar.displayName = 'NavBar'

export default NavBar
