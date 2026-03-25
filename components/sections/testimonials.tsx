'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'

const LEFT_DATA = [
  {
    id: 'L01',
    title: 'SH-TATA',
    desc: "EDG has developed 2 sites for us so far and I don't think we would ever outsource our work to anyone other than him.",
    color: 'bg-accent-200',
  },
  {
    id: 'L02',
    title: 'SH-TATA',
    desc: "EDG has developed 2 sites for us so far and I don't think we would ever outsource our work to anyone other than him.",
    color: 'bg-accent-300',
  },
  {
    id: 'L03',
    title: 'SH-TATA',
    desc: "EDG has developed 2 sites for us so far and I don't think we would ever outsource our work to anyone other than him.",
    color: 'bg-accent-400',
  },
]

const RIGHT_DATA = [
  {
    id: 'R01',
    title: 'SH-TATA',
    desc: "EDG has developed 2 sites for us so far and I don't think we would ever outsource our work to anyone other than him.",
    color: 'bg-zinc-500',
  },
  {
    id: 'R02',
    title: 'SH-TATA',
    desc: "EDG has developed 2 sites for us so far and I don't think we would ever outsource our work to anyone other than him.",
    color: 'bg-zinc-600',
  },
  {
    id: 'R03',
    title: 'SH-TATA',
    desc: "EDG has developed 2 sites for us so far and I don't think we would ever outsource our work to anyone other than him.",
    color: 'bg-zinc-700',
  },
]

const Testimonials = forwardRef((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useImperativeHandle(ref, () => ({
    section: sectionRef.current,
    leftCol: leftColRef.current,
    rightCol: rightColRef.current,
    title: titleRef.current,
    leftItems: leftColRef.current?.querySelectorAll('.testimonial-item'),
    rightItems: rightColRef.current?.querySelectorAll('.testimonial-item'),
  }))

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex h-screen flex-col items-center justify-center overflow-hidden bg-primary-950"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
        <h2
          ref={titleRef}
          className="whitespace-nowrap font-display text-display-sm uppercase text-white"
        >
          Our clients.
        </h2>
      </div>

      <div className="flex w-[90vw] justify-between gap-[10vw] px-20 py-10">
        {/* LEFT COLUMN */}
        <div ref={leftColRef} className="flex w-[40vh] flex-col gap-[25vh]">
          {LEFT_DATA.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-item relative flex flex-col gap-4"
            >
              {/* Image Overlay placeholder */}
              <div
                className={`absolute bottom-24 left-20 aspect-video w-[70%] ${testimonial.color} -z-10  opacity-40`}
              />

              <h2 className="font-display text-lg uppercase leading-[0.9] text-white md:text-4xl">
                {testimonial.title}
              </h2>
              <p className="max-w-xl font-sans text-lg text-white opacity-70">
                &quot;{testimonial.desc}&quot;
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div ref={rightColRef} className="flex w-[40vh] flex-col gap-[40vh]">
          {RIGHT_DATA.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-item relative flex flex-col gap-4"
            >
              {/* Image Overlay placeholder */}
              <div
                className={`absolute -left-48 bottom-24 aspect-video w-[70%] ${testimonial.color} -z-10  opacity-40`}
              />

              <h2 className="font-display text-lg uppercase leading-[0.9] text-white md:text-4xl">
                {testimonial.title}
              </h2>
              <p className="max-w-xl font-sans text-lg text-white opacity-70">
                &quot;{testimonial.desc}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

Testimonials.displayName = 'Testimonials'
export default Testimonials
