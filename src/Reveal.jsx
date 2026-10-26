import { motion, useReducedMotion } from 'motion/react'

// Fades and slides its child up the first time it enters the viewport.
// With prefers-reduced-motion it renders a plain element, visible immediately.
function Reveal({ as = 'div', delay = 0, ...props }) {
  const reduceMotion = useReducedMotion()
  const Tag = reduceMotion ? as : motion[as]
  if (reduceMotion) return <Tag {...props} />
  return (
    <Tag
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      {...props}
    />
  )
}

export default Reveal
