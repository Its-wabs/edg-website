# EDG Informatique Agency Website

> A premium agency website for EDG , a local development agency based in Algeria. Built with a design-engineer approach: purposeful motion, conversion-first layout, and a hybrid navigation system.

---

## Overview

EDG Studio's website was designed to position the agency at the premium end of the local market moving away from generic "web dev shop" aesthetics and toward the kind of design-forward presentation that creative studios and serious clients respond to. The build doubled as a technical laboratory: every major decision was made deliberately, with the tradeoffs documented.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | GSAP + ScrollTrigger |
| Deployment | Vercel |

---

## Features

- **Hybrid navigation :**  scroll-based on the homepage, standard page navigation on all other routes
- **Breakpoint-split components :**  complex grid animations use separate desktop/mobile components to avoid conditional logic bloat
- **GSAP matchMedia architecture :** animation contexts are properly scoped, initialized, and reverted per breakpoint
- **Conversion-aware motion :**  animations guide attention and reinforce hierarchy rather than compete with the message
- **Stack-to-grid project expansion :** custom `fromTo` GSAP interaction for the work section

---

## Project Structure

```
/
├── app/
│   ├── page.tsx              # Homepage (scroll navigation)
│   │   ├── terms/page.tsx
│   │   ├── projects/page.tsx
        ├── privacy/page.tsx
│   │   └── contact/page.tsx
├── components/
│   ├── layout/
│   │   ├── navbar.tsx               # Hybrid scroll/page nav
        └── menu.tsx
│   ├── sections/
│   │   ├── hero.tsx
        ├── about.tsx
│   │   ├── services.tsx
│   │   ├── finalCTA.tsx
│   │   ├── projects.tsx
│   │   ├── team.tsx
        ├── testimonials.tsx
│   │   └── footer.tsx
│   └── ui/
        ├── hero-projects.tsx
        ├── mobile-hero-projects.tsx
        ├── preloader.tsx
        ├── ProjectsGrid.tsx
        └── ShowcaseGrid.tsx
├── lib/
│   └── animations/               # GSAP utility functions
└── public/
```

---

## Architecture Notes

### `useImperativeHandle` over prop drilling

For components that need to expose imperative animation triggers (play, reverse, reset), `useImperativeHandle` was used to keep the component tree flat. Avoids threading callbacks through multiple layers of props.

```tsx
// Inside an animated section component
useImperativeHandle(ref, () => ({
    section: sectionRef.current,
    items: cardsRef.current,
    title: titleRef.current,
  }))
```

### Separate components for breakpoint-divergent animations

When a grid animation is fundamentally different between desktop and mobile — different stagger direction, different trigger, different layout — a split into two files is cleaner than a single component with heavy conditional logic.

```
hero-projects.tsx  →  Carousel animation
mobile-hero-projects.tsx   →  single column
```


### Navigation logic

```ts
const handleNavigate = (id: string) => {
    if (pathname === '/terms') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.push(`/#${id}`)
    }
  }
```

---

## Animation Patterns Used

| Pattern | Section | Notes |
|---|---|---|
| Stagger from center | Services grid | Organic feel, avoids sequential monotony |
| ScrollTrigger batch | Work grid | More performant than per-card triggers |
| Clip-path reveal | Hero, section headers | High-impact, layout-stable |
| fromTo custom ease | Project expansion | Stack-to-grid interaction |

---

## Key Learnings

This project generated several decisions that carried forward into future work:

- **Tailwind abstraction limit**  Tailwind accelerated the build but abstracted away enough CSS fundamentals that the next project will use pure CSS. A deliberate recalibration.
- **Config ownership**  A version downgrade exercise early in the project led to a much deeper understanding of Next.js config and Turbopack flags.
- **Clarity over spectacle** Complex animations were stripped back in favor of motion that serves conversion. The audience is a professional client evaluating competence, not a conference attendee looking for a demo.
- **The Pattern Lab** Rebuilding grid animation patterns from scratch locally during this project directly led to the idea for a reusable GSAP pattern library.

---

## License

Private client project. Source shared for portfolio and documentation purposes only.

---

