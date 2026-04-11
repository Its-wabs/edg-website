import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface AboutRefs {
  section: HTMLElement
  headline: HTMLElement
  process: HTMLElement
  stats: HTMLElement
  steps: string
  numbers: HTMLElement[]
}

gsap.registerPlugin(ScrollTrigger)

export function setupAboutAnimation(
  aboutRef: React.RefObject<AboutRefs | null>,
  isDesktop: boolean
) {
  if (!aboutRef.current) return

  const { section, headline, process, stats, steps, numbers } = aboutRef.current

  const aboutTl = gsap.timeline({
    scrollTrigger: {
      id: 'about-section',
      trigger: section,
      start: 'top top',
      end: isDesktop ? '+=600%' : '+=400%',
      pin: true,
      scrub: 1.5,
      invalidateOnRefresh: true,
    },
  })

  // Set initial off-stage positions

  gsap.set([process, stats], { y: '100vh', opacity: 0 })

  aboutTl
    // PHASE 1: Headline
    .fromTo(
      headline.querySelectorAll('.header-title span'),
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 2 },
      0
    )
    .fromTo(
      headline.querySelector('.sub-header'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5 },
      0.5
    )
    .to(
      headline,
      {
        y: isDesktop ? '-100vh' : '-120vh',
        opacity: 0,
        duration: 3,
        ease: 'expo.in',
      },
      2
    )

    // PHASE 2: Process
    .to(
      process,
      {
        y: 0,
        opacity: 1,
        autoAlpha: 1,
        duration: 4,
        ease: 'expo.out',
      },
      3.5
    )
    .from(
      process.querySelector('.process-title'),
      { opacity: 0, y: 50, duration: 2 },
      4
    )
    .from(
      process.querySelectorAll(steps),
      {
        scale: isDesktop ? 0.8 : 0.9,
        y: isDesktop ? 0 : 20,
        opacity: 0,
        stagger: 0.2,
        duration: 3,
      },
      5
    )
    .to(process, { y: '-100vh', opacity: 0, duration: 3, ease: 'expo.in' }, 6)

  // PHASE 3: Stats
  aboutTl
    .to(
      stats,
      {
        y: 0,
        opacity: 1,
        autoAlpha: 1,
        duration: 4,
        ease: 'expo.out',
      },
      8.5
    )
    .from(
      stats.querySelector('.stats-title'),
      {
        opacity: 0,
        y: 50,
        duration: 2,
      },
      9
    )
    .from(
      numbers,
      {
        textContent: 0,
        duration: 3,
        ease: 'power2.out',
        snap: { textContent: 1 },
        stagger: 0.2,
        scale: 1.1,
      },
      9.5
    )
    .to(
      numbers,
      {
        scale: 1,
        duration: 1,
        ease: 'back.out(2)',
      },
      '-=1'
    )
}
