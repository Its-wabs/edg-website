'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'

const LEFT_DATA = [
  {
    id: 'L01',
    title: 'SH-TATA',
    desc: "EDG has developed 2 sites for us so far and I don't think we would ever outsource our work to anyone other than them.",
    color: 'bg-accent-200',
  },
  {
    id: 'L02',
    title: 'SH-TATA',
    desc: "EDG has developed 2 sites for us so far and I don't think we would ever outsource our work to anyone other than them.",
    color: 'bg-accent-300',
  },
  {
    id: 'L03',
    title: 'SH-TATA',
    desc: "EDG has developed 2 sites for us so far and I don't think we would ever outsource our work to anyone other than them.",
    color: 'bg-accent-400',
  },
]

const RIGHT_DATA = [
  {
    id: 'R01',
    title: 'SH-TATA',
    desc: "EDG has developed 2 sites for us so far and I don't think we would ever outsource our work to anyone other than them.",
    color: 'bg-zinc-500',
  },
  {
    id: 'R02',
    title: 'SH-TATA',
    desc: "EDG has developed 2 sites for us so far and I don't think we would ever outsource our work to anyone other than them.",
    color: 'bg-zinc-600',
  },
  {
    id: 'R03',
    title: 'SH-TATA',
    desc: "EDG has developed 2 sites for us so far and I don't think we would ever outsource our work to anyone other than them.",
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
  }))

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex h-screen flex-col items-center justify-center overflow-hidden bg-primary-950"
    >
      {/* CENTRAL TITLE */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
        <h2
          ref={titleRef}
          className="text-display-xs whitespace-nowrap font-display uppercase text-white sm:text-display-sm"
        >
          Our clients.
        </h2>
      </div>

      {/* COLUMNS WRAPPER */}
      <div className="flex w-full max-w-[1400px] flex-row justify-between gap-4 px-6 md:px-20">
        {/* LEFT COLUMN */}
        <div
          ref={leftColRef}
          className="flex w-[45%] flex-col gap-[30vh] md:w-[35%] md:gap-[25vh]"
        >
          {LEFT_DATA.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-item relative flex flex-col gap-2 md:gap-4"
            >
              <div
                className={`absolute bottom-10 left-0 aspect-video w-full md:bottom-24 md:left-20 md:w-[70%] ${testimonial.color} -z-10 opacity-20 blur-2xl md:opacity-40 md:blur-none`}
              />
              <h2 className="font-display text-xl uppercase leading-[0.9] text-white md:text-4xl">
                {testimonial.title}
              </h2>
              <p className="font-sans text-sm text-white opacity-70 md:text-lg">
                &quot;{testimonial.desc}&quot;
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div
          ref={rightColRef}
          className="flex w-[45%] flex-col gap-[45vh] md:w-[35%] md:gap-[40vh]"
        >
          {RIGHT_DATA.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-item relative flex flex-col gap-2 md:gap-4"
            >
              <div
                className={`absolute -left-10 bottom-10 aspect-video w-full md:-left-48 md:bottom-24 md:w-[70%] ${testimonial.color} -z-10 opacity-20 blur-lg md:opacity-40 md:blur-none`}
              />
              <h2 className="font-display text-xl uppercase leading-[0.9] text-white md:text-4xl">
                {testimonial.title}
              </h2>
              <p className="font-sans text-sm text-white opacity-70 md:text-lg">
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
