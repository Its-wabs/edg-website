'use client'
import { forwardRef, useRef, useImperativeHandle } from 'react'
import Image from 'next/image'
const PROJECTS = [
  {
    id: 1,
    title: 'Project Alpha',
    image: '/images/projects/image.png',
    video: '/videos/alpha.mp4',
  },
  {
    id: 2,
    title: 'Project Beta',
    image: '/images/projects/image.png',
    video: '/videos/beta.mp4',
  },
  {
    id: 3,
    title: 'Project Gamma',
    image: '/images/projects/image.png',
    video: '/videos/gamma.mp4',
  },
  {
    id: 4,
    title: 'Project Delta',
    image: '/images/projects/image.png',
    video: '/videos/delta.mp4',
  },
  {
    id: 5,
    title: 'Project Epsilon',
    image: '/images/projects/image.png',
    video: '/videos/epsilon.mp4',
  },
  {
    id: 6,
    title: 'Project Zeta',
    image: '/images/projects/image.png',
    video: '/videos/zeta.mp4',
  },
]

const ShowcaseGrid = forwardRef((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const textRef = useRef<HTMLHeadingElement>(null)

  useImperativeHandle(ref, () => ({
    container: containerRef.current,
    items: itemsRef.current,
    text: textRef.current,
  }))

  const USE_VIDEO = false

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-start pt-[10vh] opacity-0 md:pt-[15vh]"
    >
      <h2
        ref={textRef}
        className="z-50 mb-8 px-6 text-center font-display text-[4vw] uppercase tracking-[0.3em] text-white opacity-0 md:mb-12 md:text-[1.2vw] md:tracking-[0.5em]"
      >
        L&apos;Élite du Web. <br className="md:hidden" /> Votre vision, notre
        code.
      </h2>

      {/* - Mobile: 2 columns
          - Desktop: 3 columns */}
      <div className="grid w-[120vw] grid-cols-2 gap-4 px-4 md:w-[120vw] md:grid-cols-3 md:gap-12">
        {PROJECTS.map((proj, i) => (
          <div
            key={proj.id}
            ref={(el) => {
              itemsRef.current[i] = el
            }}
            className="relative aspect-video w-full overflow-hidden  bg-neutral-900 "
          >
            {/* OPTION A: Image Implementation */}
            {!USE_VIDEO && (
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="scale-[1.01] object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            )}

            {/* OPTION B: Video Implementation */}
            {USE_VIDEO && (
              <video
                src={proj.video}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full scale-[1.01] object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
})

ShowcaseGrid.displayName = 'ShowcaseGrid'
export default ShowcaseGrid
