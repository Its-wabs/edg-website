import { forwardRef } from 'react'

const FinalCTA = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="relative flex h-screen w-full flex-col items-center justify-center bg-accent-600 px-6 py-24"
    >
      <div className="flex max-w-4xl flex-col items-center text-center">
        <h2 className="cta-title mb-8 font-display text-3xl uppercase tracking-tighter text-accent-950 md:text-8xl">
          Prêt à transformer <br />{' '}
          <span className="text-white">votre vision ?</span>
        </h2>
        <p className="cta-para-top mb-12 max-w-2xl font-sans text-lg font-medium text-black md:text-xl">
          Découvrez l intégralité de nos expertises et comment nous accompagnons
          nos partenaires vers l excellence digitale.
        </p>

        <button className="cta-button group relative mb-6 flex items-center gap-6 bg-white px-10 py-5 font-display text-xl text-black transition-all hover:bg-primary-950 hover:text-white">
          <span className="uppercase tracking-widest">
            Réserver un appel DÉCOUVERTE
          </span>
          <span className="text-2xl transition-transform group-hover:translate-x-2">
            →
          </span>
        </button>
        <p className="cta-para-bottom md:text-md mb-12 max-w-2xl font-sans text-sm font-medium text-black/70">
          Appel de 30 minutes sans engagement conseil gratuit
        </p>
      </div>
    </section>
  )
})
FinalCTA.displayName = 'FinalCTA'
export default FinalCTA
