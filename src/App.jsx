import { useEffect, useState } from 'react'
import ContactPage from './ContactPage.jsx'
import Destinations from './Destinations.jsx'
import Footer from './Footer.jsx'
import Hero from './Hero.jsx'
import JourneyBand from './JourneyBand.jsx'
import Nav from './Nav.jsx'

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

  return (
    <div className="min-h-screen bg-purple-950 text-white">
      <Nav onContactPage={onContact} />
      <main>
        {onContact ? (
          <ContactPage />
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
