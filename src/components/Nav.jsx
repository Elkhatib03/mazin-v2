import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 'var(--nav-h)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px',
      background: 'var(--bg)',
    }}>
      {/* Left links */}
      <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
        {[['/', 'Work', true], ['/about', 'About', false]].map(([to, label, end]) => (
          <NavLink key={to} to={to} end={end} style={() => ({
            fontSize: 22, fontWeight: 500,
            color: 'var(--text)',
            textDecoration: 'none',
          })}>
            {label}
          </NavLink>
        ))}
        <a href="https://www.instagram.com/Mazin.elkhatib" target="_blank" rel="noreferrer"
          style={{ fontSize: 22, fontWeight: 500, color: 'var(--text)', textDecoration: 'none' }}>
          Instagram
        </a>
        <a href="https://www.linkedin.com/in/mazinelkhatib-الخطيب-مازن-b5664910b" target="_blank" rel="noreferrer"
          style={{ fontSize: 22, fontWeight: 500, color: 'var(--text)', textDecoration: 'none' }}>
          LinkedIn
        </a>
      </div>

   
    </nav>
  )
}