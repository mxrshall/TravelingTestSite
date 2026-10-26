import { act, render, screen } from '@testing-library/react'
import App from './App.jsx'

// jsdom does no layout, so motion's scroll tracking never fires: drive the page scroll position by hand.
const { pageScrollY } = vi.hoisted(() => ({ pageScrollY: { current: null } }))

vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal()
  pageScrollY.current = actual.motionValue(0)
  return {
    ...actual,
    useScroll: () => ({ scrollY: pageScrollY.current, scrollYProgress: actual.motionValue(0) }),
  }
})

function scrollTo(y) {
  act(() => pageScrollY.current.set(y))
}

describe('scroll motion', () => {
  beforeEach(() => {
    window.scrollY = 0
    window.innerHeight = 800
  })

  it('keeps the four hero layers, back to front', () => {
    const { container } = render(<App />)
    const layers = [...container.querySelectorAll('#hero [data-layer]')].map((el) => el.dataset.layer)
    expect(layers).toEqual(['sky', 'far', 'near', 'foreground'])
  })

  it('hides destination cards until they scroll into view', () => {
    render(<App />)
    for (const card of screen.getAllByRole('article')) {
      expect(card).toHaveStyle({ opacity: '0' })
    }
  })

  it('shows a transparent nav over the hero and a solid one once scrolled past it', () => {
    render(<App />)
    const header = screen.getByRole('banner')
    expect(header).toHaveAttribute('data-nav-solid', 'false')

    scrollTo(900)
    expect(header).toHaveAttribute('data-nav-solid', 'true')

    scrollTo(0)
    expect(header).toHaveAttribute('data-nav-solid', 'false')
  })
})
