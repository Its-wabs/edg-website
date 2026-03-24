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
      className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-start pt-[15vh] opacity-0"
    >
      <h2
        ref={textRef}
        className="z-50 mb-12 font-display text-[1.5vw] uppercase tracking-[0.5em] text-white opacity-0"
      >
        We are EDG your final destination
      </h2>

      <div className="mt-10 grid h-[140vh] w-[120vw] grid-cols-3 gap-12">
        {PROJECTS.map((proj, i) => (
          <div
            key={proj.id}
            ref={(el) => {
              itemsRef.current[i] = el
            }}
            className={`${proj.color} rounded-sm shadow-2xl will-change-transform`}
          />
        ))}
      </div>
    </div>
  )
})

ShowcaseGrid.displayName = 'ShowcaseGrid'
export default ShowcaseGrid
