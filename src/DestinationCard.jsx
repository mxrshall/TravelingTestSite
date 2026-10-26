import Reveal from './Reveal.jsx'

function DestinationCard({ name, country, blurb, image, delay }) {
  return (
    <Reveal as="article" delay={delay} className="overflow-hidden rounded-2xl bg-purple-900/60 shadow-lg ring-1 ring-white/10">
      {image ? (
        <img src={image} alt={`${name}, ${country}`} className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div
          data-testid="image-placeholder"
          className="aspect-[4/3] w-full bg-gradient-to-br from-orange-300 via-pink-500 to-purple-700"
        />
      )}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-sm font-medium uppercase tracking-wide text-orange-300">{country}</p>
        <p className="mt-2 text-purple-100">{blurb}</p>
      </div>
    </Reveal>
  )
}

export default DestinationCard
