// Back-to-front mountain silhouettes; each is its own layer so it can move independently.
const mountains = [
  {
    layer: 'far',
    fill: 'fill-purple-400/70',
    height: 'h-[55%]',
    path: 'M0 320 L0 190 L120 120 L240 170 L380 70 L520 160 L660 90 L800 150 L960 60 L1100 140 L1240 80 L1440 160 L1440 320 Z',
  },
  {
    layer: 'near',
    fill: 'fill-purple-700',
    height: 'h-[42%]',
    path: 'M0 320 L0 220 L160 140 L300 210 L460 110 L620 200 L780 130 L940 220 L1100 120 L1280 200 L1440 150 L1440 320 Z',
  },
  {
    layer: 'foreground',
    fill: 'fill-purple-950',
    height: 'h-[25%]',
    path: 'M0 320 L0 240 C 200 180, 360 260, 560 220 C 760 180, 900 250, 1100 210 C 1260 180, 1360 230, 1440 210 L1440 320 Z',
  },
]

function Hero() {
  return (
    <section id="hero" className="relative flex h-screen items-center justify-center overflow-hidden">
      <div
        data-layer="sky"
        className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-pink-500 to-orange-300"
      >
        <div className="absolute left-1/2 top-[45%] h-40 w-40 -translate-x-1/2 rounded-full bg-amber-200 opacity-90 blur-[2px] sm:h-56 sm:w-56" />
      </div>
      {mountains.map(({ layer, fill, height, path }) => (
        <svg
          key={layer}
          data-layer={layer}
          aria-hidden="true"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className={`absolute inset-x-0 bottom-0 w-full ${height} ${fill}`}
        >
          <path d={path} />
        </svg>
      ))}
      <div className="relative z-10 -mt-24 px-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-7xl">
          Travelsite
        </h1>
        <p className="mt-4 text-lg text-orange-50 drop-shadow sm:text-2xl">
          Discover the world's most breathtaking places
        </p>
      </div>
    </section>
  )
}

export default Hero
