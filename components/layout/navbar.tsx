'use client'

import { forwardRef } from 'react'

interface NavBarProps {
  itemsRef: React.RefObject<HTMLDivElement>
  burgerRef: React.RefObject<HTMLDivElement>
  navContainerRef: React.RefObject<HTMLDivElement>
}

const NavBar = forwardRef<HTMLDivElement, NavBarProps>(
  ({ itemsRef, burgerRef, navContainerRef }) => {
    return (
      <div
        ref={navContainerRef}
        className="navbar fixed top-6 z-40 flex w-full items-center justify-center rounded-lg border-none border-transparent"
      >
        <nav className="flex w-[90vw] items-center justify-between">
          <div className="logo flex cursor-pointer items-center justify-center gap-1">
            <div className="mb-1 h-[30px] w-3 bg-accent-500" />
            <h1 className="text-center font-display text-display-sm uppercase text-white">
              edg
            </h1>
          </div>
          <div ref={itemsRef} className="hidden items-center gap-14 md:flex">
            <a href="" className="nav-link">
              solutions
            </a>
            <a href="" className="nav-link">
              about us
            </a>
            <a href="" className="nav-link">
              team
            </a>
            <a href="" className="nav-contact">
              contactez-nous
            </a>
          </div>

          {/* The menu Icon thats Hidden by default  */}
          <div
            ref={burgerRef}
            className="scale-1 absolute right-[5vw] flex cursor-pointer flex-col gap-1.5 p-2 md:scale-0"
          >
            <div className="h-[3px] w-8 rounded-full bg-white" />
            <div className="h-[3px] w-8 rounded-full bg-white" />
          </div>
        </nav>
      </div>
    )
  }
)

NavBar.displayName = 'NavBar'

export default NavBar
