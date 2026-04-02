import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProjects, PROJECTS_KEY, getClients } from '../storage'

function LogoBar() {
  const [clients, setClients] = useState(getClients)

  useEffect(() => {
    const reload = () => setClients(getClients())
    window.addEventListener('mazin:clients', reload)
    window.addEventListener('storage', reload)
    return () => {
      window.removeEventListener('mazin:clients', reload)
      window.removeEventListener('storage', reload)
    }
  }, [])

  const items = [...clients, ...clients, ...clients, ...clients]

  return (
    <div style={{ overflow: 'hidden', padding: '48px 0', background: 'var(--bg)' }}>
      <style>{`
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-right 35s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .logo-item { transition: opacity 0.3s ease; opacity: 0.3; display: flex; align-items: center; justify-content: center; padding: 0 60px; flex-shrink: 0; height: 48px; }
        .logo-item:hover { opacity: 1; }
      `}</style>
      <div className="marquee-track">
        {items.map((client, i) => (
          <div key={i} className="logo-item">
            {client.logo
              ? <img src={client.logo} alt={client.name} style={{ height: 28, width: 'auto', maxWidth: 120, objectFit: 'contain', pointerEvents: 'none' }} />
              : <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)', whiteSpace: 'nowrap' }}>{client.name}</span>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const [projects, setProjects] = useState(() =>
    getProjects().filter(p => p.status === 'published')
  )
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const reload = () => setProjects(getProjects().filter(p => p.status === 'published'))
    window.addEventListener('mazin:projects', reload)
    window.addEventListener('storage', e => { if (e.key === PROJECTS_KEY) reload() })
    return () => {
      window.removeEventListener('mazin:projects', reload)
      window.removeEventListener('storage', reload)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Hero intro */}
      <div style={{
        position: 'fixed',
        top: 'var(--nav-h)',
        left: 0, right: 0,
        zIndex: 10,
        pointerEvents: scrollY > 200 ? 'none' : 'auto',
        opacity: Math.max(0, 1 - scrollY / 200),
        transform: `translateY(${Math.min(scrollY * 0.3, 60)}px)`,
        transition: 'none',
        background: 'var(--bg)',
        padding: '72px 48px 60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}>
        <span style={{
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          fontWeight: 500,
        }}>
          Portfolio — 2025
        </span>

        <p style={{
          fontSize: 'clamp(30px, 4.5vw, 58px)',
          color: 'var(--text)',
          lineHeight: 1.25,
          maxWidth: 800,
          textAlign: 'center',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          Hello ✌︎ I'm Mazin — Design Director and ✎ visual artist living in ↬ Dubai
          <br />
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 14px',
          border: '1px solid var(--border)',
          borderRadius: 999,
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
          Available for work · Dubai, UAE
        </div>
      </div>

      {/* Project grid */}
      {projects.length === 0 ? (
        <div style={{ padding: '80px 48px', textAlign: 'center', color: 'var(--muted)', marginTop: 340 }}>
          <p style={{ fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            No projects yet. Add some from the admin panel.
          </p>
        </div>
      ) : (
        <>
          <div style={{
            padding: '24px 24px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--border)',
            marginTop: 340,
          }}>
            <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Selected Work
            </span>
            <span style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--subtle)' }}>
              {projects.length} Projects
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
            padding: '0 24px',
            marginTop: 40,
            borderTop: '1px solid var(--border)',
          }}>
            {projects.map(p => <GridItem key={p.id} project={p} />)}
          </div>
        </>
      )}

      {/* Logo bar at the bottom */}
      <LogoBar />

    </div>
  )
}

function GridItem({ project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/project/${project.id}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', borderBottom: '1px solid var(--border)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: 'var(--bg3)', position: 'relative' }}>
        {project.image ? (
          <img
            src={project.image} alt={project.title} loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s ease', display: 'block' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {project.tag || 'Design'}
          </div>
        )}

        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 24,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
          padding: 48,
        }}>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 24px)',
            fontWeight: 500,
            color: '#fff',
            textAlign: 'center',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            lineHeight: 1.4,
          }}>
            {project.title.split('').map((char, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.3s ease ${i * 30}ms, transform 0.3s ease ${i * 30}ms`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </p>
          {project.tag && (
            <p style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s',
            }}>
              {project.tag}
            </p>
          )}
        </div>
      </div>

      <div style={{ padding: '14px 18px 18px', background: 'var(--bg)' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: hovered ? 'var(--text)' : 'var(--muted)', transition: 'color 0.2s', lineHeight: 1.5 }}>
          {project.title}
        </p>
        {project.tag && (
          <p style={{ fontSize: 10, color: 'var(--subtle)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 }}>
            {project.tag}
          </p>
        )}
      </div>
    </Link>
  )
}