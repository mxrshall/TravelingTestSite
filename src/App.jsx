import Destinations from './Destinations.jsx'
import Footer from './Footer.jsx'
import Hero from './Hero.jsx'
import JourneyBand from './JourneyBand.jsx'
import Nav from './Nav.jsx'

function App() {
  return (
    <div className="min-h-screen bg-purple-950 text-white">
      <Nav />
      <main>
        <Hero />
        <Destinations />
        <JourneyBand />
      </main>
      <Footer />
    </div>
  )
}

export default App
