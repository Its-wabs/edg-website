import { forwardRef } from 'react'

const ServicesCTA = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="relative flex min-h-[60vh] w-full flex-col items-center justify-center bg-accent-600 px-6 py-24"
    >
      <div className="flex max-w-4xl flex-col items-center text-center">
        <h2 className="mb-8 font-display text-3xl uppercase tracking-tighter text-accent-950 md:text-8xl">
          Prêt à transformer <br />{' '}
          <span className="text-white">votre vision ?</span>
        </h2>
        <p className="mb-12 max-w-2xl font-sans text-lg font-medium text-black md:text-xl">
          Découvrez l intégralité de nos expertises et comment nous accompagnons
          nos partenaires vers l excellence digitale.
        </p>

        <button className="group relative flex items-center gap-6 bg-white px-10 py-5 font-display text-xl text-black transition-all hover:bg-primary-950 hover:text-white">
          <span className="uppercase tracking-widest">
            Voir tous nos services
          </span>
          <span className="text-2xl transition-transform group-hover:translate-x-2">
            →
          </span>
        </button>
      </div>
    </section>
  )
})
ServicesCTA.displayName = 'ServicesCTA'
export default ServicesCTA
