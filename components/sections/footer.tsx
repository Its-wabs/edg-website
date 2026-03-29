'use client'

import React from 'react'
import Image from 'next/image'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-primary-950 py-[4vh]">
      {/* 1. MASSIVE LOGO BAR */}
      <div className="flex w-[90vw] justify-between">
        <div className="flex items-center font-display text-[22vw] font-black leading-[0.75] tracking-tight">
          <span className="text-[#20d76c]">I</span>
          <span className="text-white">EDG</span>
        </div>

        {/* Mascot edgo */}
        <div className="relative hidden aspect-square h-[22vw] overflow-hidden rounded-sm md:flex">
          <Image
            src="/images/edgo.png"
            alt="EDG Groupe Mascot"
            className="h-full w-full object-cover"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>

      {/* 2. MIDDLE SECTION (Headline & Links) */}
      <div className="mt-12 flex w-[89vw] flex-col items-center justify-between gap-12 md:my-auto md:mt-0 md:flex-row md:gap-[10vw]">
        {/* Headline */}
        <div className="min-w-[50vw]">
          <h2 className="font-sans text-4xl font-medium text-white/90 md:text-5xl lg:text-[4rem] xl:text-[5rem]">
            Envoyez un message aujourd&apos;hui et votre projet commence demain.
          </h2>
        </div>

        {/* Navigation Grid */}
        <div className="flex min-w-[50vw] gap-16 md:gap-[7vh] md:pr-12">
          {/* Col 1 */}
          <ul className="flex flex-col gap-8 font-sans text-xl font-semibold uppercase text-white/80 lg:gap-8 xl:gap-12">
            <li>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[#20d76c]"
              >
                Accueil
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[#20d76c]"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[#20d76c]"
              >
                Nos Projets
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[#20d76c]"
              >
                Services
              </a>
            </li>
          </ul>

          {/* Col 2 */}
          <ul className="flex flex-col gap-8 font-sans text-xl font-semibold uppercase text-white/80 lg:gap-8 xl:gap-12">
            <li>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[#20d76c]"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[#20d76c]"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[#20d76c]"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[#20d76c]"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. BACK TO TOP BUTTON */}
      <div className="mt-8 flex w-full justify-end pr-[5vw] md:mt-0 md:-translate-y-6 lg:-translate-y-12">
        <button
          onClick={scrollToTop}
          className="group flex h-16 w-16 items-center justify-center bg-white transition-transform duration-500 ease-out hover:scale-110"
          aria-label="Back to top"
        >
          <svg
            className="h-8 w-8 text-[#111111] transition-transform duration-300 group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeWidth="3"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            ></path>
          </svg>
        </button>
      </div>

      {/* 4. BOTTOM BAR */}
      <div className="mt-8 flex w-[90vw] flex-col gap-6 md:mt-0 md:flex-row md:justify-between">
        {/* Social Links */}
        <div className="flex flex-wrap gap-6 font-sans text-sm font-medium text-white/80">
          <a
            href="#"
            className="transition-colors duration-300 hover:text-white"
          >
            Privacy
          </a>
          <a
            href="#"
            className="transition-colors duration-300 hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="transition-colors duration-300 hover:text-white"
          >
            Twitter
          </a>
          <a
            href="#"
            className="transition-colors duration-300 hover:text-white"
          >
            Facebook
          </a>
          <a
            href="#"
            className="transition-colors duration-300 hover:text-white"
          >
            Instagram
          </a>
        </div>

        {/* Copyright */}
        <div className="font-sans text-sm font-medium text-white/50">
          All rights reserved by edg groupe. 2026
        </div>
      </div>
    </footer>
  )
}

export default Footer
