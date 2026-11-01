import { useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

const links = [
  { href: '#destinations', label: 'Destinations' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
]

const linkClass = 'font-medium text-purple-100 transition hover:text-orange-300'

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { scrollY } = useScroll()

  // The hero is one screen tall: go solid once it has scrolled out from under the nav.
  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > window.innerHeight - 72))

  return (
    <header
      data-nav-solid={solid || menuOpen}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid || menuOpen ? 'bg-purple-950/95 shadow-lg shadow-orange-500/10 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-4 py-4 sm:px-8">
        <div className="flex items-center justify-between">
          <a href="#hero" className="text-xl font-extrabold tracking-tight text-orange-300">
            Travelsite
          </a>
          <ul className="hidden gap-8 sm:flex">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md sm:hidden"
          >
            <span className="h-0.5 w-6 bg-orange-300" />
            <span className="h-0.5 w-6 bg-orange-300" />
            <span className="h-0.5 w-6 bg-orange-300" />
          </button>
        </div>
        {menuOpen && (
          <ul id="mobile-menu" aria-label="Mobile menu" className="flex flex-col gap-4 pb-2 pt-4 sm:hidden">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a href={href} onClick={() => setMenuOpen(false)} className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}

export default Nav
