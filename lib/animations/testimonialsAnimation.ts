import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { RefObject } from 'react'

interface TestimonialsRefs {
  section: HTMLElement
  title: HTMLElement
  leftCol: HTMLElement
  rightCol: HTMLElement
}
gsap.registerPlugin(ScrollTrigger)

export function setupTestimonialsAnimation(
  testimonialsRef: RefObject<TestimonialsRefs | null>,
  isDesktop: boolean
) {
  if (!testimonialsRef.current) return

  const { section, title, leftCol, rightCol } = testimonialsRef.current

  gsap.set(title, { opacity: 0 })
  gsap.set(leftCol, { y: '180vh' })
  gsap.set(rightCol, { y: '150vh' })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=500%',
      pin: true,
      scrub: 1,
    },
  })

  tl
    // PHASE 1: Title reveal
    .to(title, {
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: 'power2.out',
    })
    // PHASE 2: Title scales down
    .to(title, {
      scale: isDesktop ? 0.8 : 0.6,
      opacity: isDesktop ? 1 : 0.5,
      filter: isDesktop ? 'blur(0px)' : 'blur(1px)',
      duration: 1,
      ease: 'power2.inOut',
    })
    // PHASE 3: Double train
    .to(leftCol, { y: '-150vh', duration: 10, ease: 'none' }, 'train')
    .to(rightCol, { y: '-180vh', duration: 10, ease: 'none' }, 'train')
}
