import destinations from './data/destinations.js'
import DestinationCard from './DestinationCard.jsx'
import Reveal from './Reveal.jsx'

function Destinations() {
  return (
    <section id="destinations" aria-labelledby="destinations-heading" className="px-4 py-20 sm:px-8">
      <Reveal as="h2" id="destinations-heading" className="text-center text-3xl font-bold text-orange-200 sm:text-4xl">
        Featured destinations
      </Reveal>
      <div className="mx-auto mt-12 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination, index) => (
          <DestinationCard key={destination.name} {...destination} delay={(index % 3) * 0.12} />
        ))}
      </div>
    </section>
  )
}

export default Destinations
