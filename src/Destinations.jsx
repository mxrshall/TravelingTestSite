import destinations from './data/destinations.js'
import DestinationCard from './DestinationCard.jsx'

function Destinations() {
  return (
    <section id="destinations" aria-labelledby="destinations-heading" className="px-4 py-20 sm:px-8">
      <h2 id="destinations-heading" className="text-center text-3xl font-bold text-orange-200 sm:text-4xl">
        Featured destinations
      </h2>
      <div className="mx-auto mt-12 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.name} {...destination} />
        ))}
      </div>
    </section>
  )
}

export default Destinations
