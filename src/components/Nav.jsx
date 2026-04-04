import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',      label: 'Work',      end: true,  internal: true },
  { to: '/about', label: 'About',     end: false, internal: true },
  { href: 'https://www.instagram.com/Mazin.elkhatib',                              label: 'Instagram' },
  { href: 'https://www.linkedin.com/in/mazin-elkhatib-مازن-الخطيب-b5664910b',     label: 'LinkedIn'  },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="nav-root">
      {/* Desktop links */}
      <div className="nav-links">
        {links.map(link => link.internal
          ? <NavLink key={link.to} to={link.to} end={link.end} className="nav-link">{link.label}</NavLink>
          : <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="nav-link">{link.label}</a>
        )}
      </div>

      {/* Hamburger button — visible on mobile only */}
      <button
        className={`nav-hamburger${open ? ' ham-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span className="ham-line" />
        <span className="ham-line" />
        <span className="ham-line" />
      </button>

      {/* Mobile dropdown */}
      <div className={`nav-mobile-menu${open ? ' is-open' : ''}`}>
        {links.map(link => link.internal
          ? <NavLink key={link.to} to={link.to} end={link.end} className="nav-mobile-link" onClick={() => setOpen(false)}>{link.label}</NavLink>
          : <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="nav-mobile-link" onClick={() => setOpen(false)}>{link.label}</a>
        )}
      </div>
    </nav>
  )
}
