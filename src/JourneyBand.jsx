import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Reveal from './Reveal.jsx'

// Pass `image` (a path under public/images/) to replace the gradient background.
function JourneyBand({ image = '' }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section ref={ref} id="journey" className="relative overflow-hidden px-4 py-32 text-center sm:py-40">
      <motion.div
        data-band-background
        style={{ ...(image ? { backgroundImage: `url(${image})` } : {}), ...(reduceMotion ? {} : { y: backgroundY }) }}
        className="absolute -inset-y-[20%] inset-x-0 bg-gradient-to-r from-purple-800 via-pink-600 to-orange-400 bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-purple-950/30" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal as="blockquote" className="text-2xl font-semibold italic text-white sm:text-4xl">
          “The world is a book, and those who do not travel read only one page.”
        </Reveal>
        <p className="mt-4 text-orange-100">— Saint Augustine</p>
        <a
          href="#destinations"
          className="mt-10 inline-block rounded-full bg-orange-400 px-8 py-3 font-semibold text-purple-950 shadow-lg transition hover:bg-orange-300"
        >
          Start your journey
        </a>
      </div>
    </section>
  )
}

export default JourneyBand
