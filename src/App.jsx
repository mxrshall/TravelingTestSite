import { useEffect, useState } from 'react'
import ContactPage from './ContactPage.jsx'
import DestinationPage from './DestinationPage.jsx'
import Destinations from './Destinations.jsx'
import Footer from './Footer.jsx'
import Hero from './Hero.jsx'
import JourneyBand from './JourneyBand.jsx'
import Nav from './Nav.jsx'

function safeDecode(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return ''
  }
}

function App() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  const onContact = hash === '#/contact'
  const destinationMatch = hash.match(/^#\/destination\/(.+?)\/?$/)
  const onSubpage = onContact || destinationMatch !== null

  return (
    <div className="min-h-screen bg-purple-950 text-white">
      <Nav onSubpage={onSubpage} />
      <main>
        {onContact ? (
          <ContactPage />
        ) : destinationMatch ? (
          <DestinationPage slug={safeDecode(destinationMatch[1])} />
        ) : (
          <>
            <Hero />
            <Destinations />
            <JourneyBand />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
