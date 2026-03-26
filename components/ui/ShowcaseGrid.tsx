'use client'
import { forwardRef, useRef, useImperativeHandle } from 'react'

const PROJECTS = [
  { id: 1, color: 'bg-blue-600' },
  { id: 2, color: 'bg-emerald-500' },
  { id: 3, color: 'bg-purple-600' },
  { id: 4, color: 'bg-orange-500' },
  { id: 5, color: 'bg-rose-500' },
  { id: 6, color: 'bg-cyan-600' },
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
            className={`aspect-video w-full ${proj.color} rounded-sm shadow-2xl will-change-transform`}
          />
        ))}
      </div>
    </div>
  )
})

ShowcaseGrid.displayName = 'ShowcaseGrid'
export default ShowcaseGrid
