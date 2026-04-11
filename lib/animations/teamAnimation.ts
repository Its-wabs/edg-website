import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface TeamRefs {
  section: HTMLElement
  bgLetters: HTMLElement[]
  bgWordContainer: HTMLElement
  cards: HTMLElement[]
}

gsap.registerPlugin(ScrollTrigger)

export function setupTeamAnimation(
  teamRef: React.RefObject<TeamRefs | null>,
  isDesktop: boolean
) {
  if (!teamRef.current) return

  const { section, bgLetters, bgWordContainer, cards } = teamRef.current

  if (isDesktop) {
    // DESKTOP ANIMATION
    gsap.set(bgLetters, {
      x: '100vw',
      y: '100vh',
      rotation: 45,
      opacity: 0,
    })
    gsap.set(cards, { y: 100, opacity: 0, scale: 0.9 })
    gsap.set(bgWordContainer, { opacity: 0.4 })

    const teamTl = gsap.timeline({
      scrollTrigger: {
        id: 'team-section',
        trigger: section,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    teamTl
      .to(bgLetters, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 3,
        ease: 'power3.out',
      })
      .to(
        bgWordContainer,
        {
          opacity: 0.02,
          scale: 0.95,
          duration: 2,
          ease: 'power2.inOut',
        },
        '-=1'
      )
      .to(
        cards,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 2,
          ease: 'expo.out',
        },
        '-=0.5'
      )
  } else {
    //  MOBILE: SIMPLE SECTION

    gsap.set([bgLetters, cards, bgWordContainer], {
      clearProps: 'all',
    })

    gsap.set(bgLetters, { opacity: 1, x: 0, y: 0, rotation: 0 })
    gsap.set(cards, { opacity: 1, y: 0, scale: 1 })
  }
}
