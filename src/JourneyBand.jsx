// Pass `image` (a path under public/images/) to replace the gradient background.
function JourneyBand({ image = '' }) {
  return (
    <section id="journey" className="relative overflow-hidden px-4 py-32 text-center sm:py-40">
      <div
        data-band-background
        className="absolute inset-0 bg-gradient-to-r from-purple-800 via-pink-600 to-orange-400 bg-cover bg-center"
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      />
      <div className="absolute inset-0 bg-purple-950/30" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <blockquote className="text-2xl font-semibold italic text-white sm:text-4xl">
          “The world is a book, and those who do not travel read only one page.”
        </blockquote>
        <p className="mt-4 text-orange-100">— Saint Augustine</p>
        <a
          href="#destinations"
          className="mt-10 inline-block rounded-full bg-orange-400 px-8 py-3 font-semibold text-purple-950 shadow-lg transition hover:bg-orange-300"
        >
          Start your journey
        </a>
      </div>
    </section>
  )
}

export default JourneyBand
