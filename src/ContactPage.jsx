const details = [
  { label: 'Email', value: 'hello@travelsite.example', href: 'mailto:hello@travelsite.example' },
  { label: 'Phone', value: '+1 (555) 010-2030', href: 'tel:+15550102030' },
  { label: 'Office', value: '42 Wanderer Lane, Suite 7, Lisbon, Portugal' },
  { label: 'Opening hours', value: 'Mon–Fri, 9:00–17:30 (WET)' },
]

function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20 pt-32 sm:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-orange-300 sm:text-5xl">Contact us</h1>
      <p className="mt-4 text-lg text-purple-100">
        Planning a trip, or just curious about a destination? Our travel advisors are happy to help you find the
        perfect getaway. Drop us a line and we usually reply within one working day.
      </p>
      <dl className="mt-10 grid gap-6 sm:grid-cols-2">
        {details.map(({ label, value, href }) => (
          <div key={label} className="rounded-xl bg-purple-900/60 p-6">
            <dt className="text-sm font-semibold uppercase tracking-wide text-purple-300">{label}</dt>
            <dd className="mt-2 text-lg">
              {href ? (
                <a href={href} className="transition hover:text-orange-300">
                  {value}
                </a>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default ContactPage
