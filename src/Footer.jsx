const socialLinks = ['Instagram', 'Facebook', 'YouTube']

function Footer() {
  return (
    <footer id="contact" className="bg-purple-950 px-4 py-10 text-center text-purple-200">
      <ul className="flex justify-center gap-6">
        {socialLinks.map((name) => (
          <li key={name}>
            <a href="#" className="transition hover:text-orange-300">
              {name}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm">© {new Date().getFullYear()} Travelsite</p>
    </footer>
  )
}

export default Footer
