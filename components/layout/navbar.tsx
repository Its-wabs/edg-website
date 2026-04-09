'use client'

import { useRouter, usePathname } from 'next/navigation'
import { forwardRef } from 'react'

interface NavBarProps {
  itemsRef?: React.RefObject<HTMLDivElement>
  burgerRef?: React.RefObject<HTMLDivElement>
  navContainerRef: React.RefObject<HTMLDivElement>
  onBurgerClick?: () => void
  isOpen?: boolean
  onNavigate: (id: string) => void
}

const NavBar = forwardRef<HTMLDivElement, NavBarProps>(
  ({
    itemsRef,
    burgerRef,
    navContainerRef,
    onBurgerClick,
    isOpen,
    onNavigate,
  }) => {
    const router = useRouter()
    const pathname = usePathname()

    // Check if we are on the Home page
    const isHome = pathname === '/'

    const handleLinkClick = (e: React.MouseEvent, id: string) => {
      e.preventDefault()
      onNavigate(id)
    }

    return (
      <div
        ref={navContainerRef}
        className="navbar fixed top-6 z-[100] flex w-full items-center justify-center rounded-lg border-none border-transparent"
      >
        <nav className="flex w-[90vw] items-center justify-between">
          <div
            onClick={() => router.push('/')}
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
            {isHome ? (
              /* ── HOME PATH LINKS ── */
              <>
                <button
                  onClick={(e) => handleLinkClick(e, 'solutions')}
                  className="nav-link"
                >
                  solutions
                </button>
                <button
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className="nav-link"
                >
                  about us
                </button>
                <button
                  onClick={(e) => handleLinkClick(e, 'team')}
                  className="nav-link"
                >
                  team
                </button>
              </>
            ) : (
              /* ── OTHER PAGES LINKS ── */
              <>
                <button
                  onClick={() => router.push('/projects')}
                  className="nav-link"
                >
                  projects
                </button>
                <button
                  onClick={() => router.push('/terms')}
                  className="nav-link"
                >
                  terms
                </button>
              </>
            )}

            {/* Always show Contact CTA */}
            <button
              onClick={() => router.push('/contact')}
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
