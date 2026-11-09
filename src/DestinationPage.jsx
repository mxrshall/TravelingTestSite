import destinations from './data/destinations.js'

const linkClass = 'font-medium text-orange-300 transition hover:text-orange-200'

function DestinationPage({ slug }) {
  const destination = destinations.find((d) => d.slug === slug)

  if (!destination) {
    return (
      <section className="mx-auto max-w-3xl px-4 pb-20 pt-32 sm:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-orange-300">Destination not found</h1>
        <p className="mt-4 text-lg text-purple-100">We couldn't find that destination. Maybe it's still on our map.</p>
        <a href="#/" className={`mt-8 inline-block ${linkClass}`}>
          Back to home
        </a>
      </section>
    )
  }

  const { name, country, image, description, bestTime, highlights } = destination

  return (
    <section className="mx-auto max-w-3xl px-4 pb-20 pt-32 sm:px-8">
      <a href="#/" className={linkClass}>
        Back to destinations
      </a>
      {image ? (
        <img src={image} alt={`${name}, ${country}`} className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover" />
      ) : (
        <div
          data-testid="image-placeholder"
          className="mt-6 aspect-[16/9] w-full rounded-2xl bg-gradient-to-br from-orange-300 via-pink-500 to-purple-700"
        />
      )}
      <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-orange-300 sm:text-5xl">{name}</h1>
      <p className="text-sm font-medium uppercase tracking-wide text-purple-300">{country}</p>
      <p className="mt-4 text-lg text-purple-100">{description}</p>
      <p className="mt-6 text-purple-100">
        <span className="font-semibold text-orange-200">Best time to visit:</span> {bestTime}
      </p>
      <h2 className="mt-8 text-2xl font-bold text-orange-200">Highlights</h2>
      <ul className="mt-3 list-disc space-y-1 pl-6 text-purple-100">
        {highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </section>
  )
}

export default DestinationPage
