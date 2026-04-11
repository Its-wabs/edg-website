import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function setupFinalCTAanimation(
  FinalCtaRef: RefObject<HTMLDivElement | null>,
  isDesktop: boolean
) {
  if (!FinalCtaRef.current || !isDesktop) return

  const section = FinalCtaRef.current
  const content = section.querySelector('div')
  const title = section.querySelector('h2')
  const paras = [
    section.querySelector('.cta-para-top'),
    section.querySelector('.cta-para-bottom'),
  ]
  const button = section.querySelector('button')

  //  Initial States
  gsap.set(content, {
    scale: isDesktop ? 0.8 : 1,
    opacity: 0,
    y: 50,
  })

  gsap.set(button, {
    scale: 0.9,
    opacity: 0,
  })

  gsap.set(paras, {
    scale: isDesktop ? 0.8 : 1,
    opacity: 0,
    y: 50,
  })

  const ctaTl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: isDesktop ? 'top top' : 'top 80%',
      end: isDesktop ? '+=200%' : 'bottom 20%',
      pin: isDesktop,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })

  ctaTl
    //  Initial reveal
    .to(content, {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 2,
      ease: 'power2.out',
    })

    // Title & Paragraph Pop
    .from(
      title,
      {
        y: 40,
        opacity: 0,
        duration: 1,
      },
      '-=1'
    )

    //  The Button reveal
    .to(
      button,
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'back.out',
      },
      '-=0.5'
    )

    .to(
      paras,
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
      },
      '-=0.3'
    )
}
