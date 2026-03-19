import { useState, useEffect } from 'react'
import { getAbout } from '../storage'

const divider = { height: 1, background: 'var(--border)', margin: '52px 0' }
const secLabel = { fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }
const line = { flex: 1, height: 1, background: 'var(--border)' }

export default function AboutPage() {
  const [a, setA] = useState(getAbout)

  useEffect(() => {
    const h = () => setA(getAbout())
    window.addEventListener('mazin:about', h)
    window.addEventListener('storage', h)
    return () => { window.removeEventListener('mazin:about', h); window.removeEventListener('storage', h) }
  }, [])

  return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 48px 120px' }}>

        {/* Hero */}
        <div style={{ display: 'grid', gridTemplateColumns: a.photo ? '1fr 280px' : '1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>About</p>
            <h1 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 8 }}>{a.name}</h1>
            <p style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 36 }}>{a.title} — {a.location}</p>
            {a.bio.split('\n\n').map((p, i) => (
              <p key={i} style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text)', opacity: 0.8, marginBottom: 18, maxWidth: 580 }}>{p}</p>
            ))}
            {/* Links */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 36 }}>
              {[
                [a.email    && `mailto:${a.email}`, 'Email'],
                [a.linkedin,  'LinkedIn'],
                [a.behance,   'Behance'],
                [a.instagram, 'Instagram'],
              ].filter(([href]) => href).map(([href, label]) => (
                <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer"
                  style={{ padding: '9px 18px', border: '1px solid var(--border)', borderRadius: 2, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text)', textDecoration: 'none', background: 'var(--bg2)', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          {a.photo && (
            <img src={a.photo} alt={a.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', border: '1px solid var(--border)' }} />
          )}
        </div>

        <div style={divider} />

        {/* Services */}
        <p style={secLabel}>Services <span style={line} /></p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'var(--border)' }}>
          {a.services.map((sv, i) => (
            <div key={i} style={{ padding: '28px 24px', background: 'var(--bg2)' }}>
              <p style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text)', marginBottom: 10 }}>{sv.title}</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{sv.desc}</p>
            </div>
          ))}
        </div>

        <div style={divider} />

        {/* Skills */}
        <p style={secLabel}>Skills <span style={line} /></p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {a.skills.map((sk, i) => (
            <span key={i} style={{ padding: '7px 14px', border: '1px solid var(--border)', borderRadius: 2, fontSize: 11, color: 'var(--text)', letterSpacing: '0.04em', textTransform: 'uppercase', background: 'var(--bg2)' }}>{sk}</span>
          ))}
        </div>

        <div style={divider} />

        {/* Experience */}
        <p style={secLabel}>Experience <span style={line} /></p>
        <div>
          {a.experience.map((ex, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: 24, paddingBottom: 28, marginBottom: 28, borderBottom: i < a.experience.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text)' }}>{ex.company}</p>
                  {i === 0 && <span style={{ fontSize: 9, padding: '2px 7px', background: 'rgba(201,164,110,0.15)', color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 2 }}>Now</span>}
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>{ex.role}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 12, color: 'var(--muted)' }}>{ex.period}</p>
                <p style={{ fontSize: 11, color: 'var(--subtle)', marginTop: 3 }}>{ex.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={divider} />

        {/* Education */}
        <p style={secLabel}>Education <span style={line} /></p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {a.education.map((ed, i) => (
            <div key={i} style={{ padding: '24px', border: '1px solid var(--border)', background: 'var(--bg2)' }}>
              <p style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text)', marginBottom: 8 }}>{ed.school}</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>{ed.degree}</p>
              <p style={{ fontSize: 11, color: 'var(--subtle)' }}>{ed.period}</p>
            </div>
          ))}
        </div>

        <div style={divider} />

        {/* Certs + Languages */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <p style={secLabel}>Certifications <span style={line} /></p>
            {a.certifications.map((c, i) => (
              <p key={i} style={{ fontSize: 13, color: 'var(--text)', marginBottom: 12, paddingLeft: 16, borderLeft: '2px solid var(--accent)', opacity: 0.85 }}>{c}</p>
            ))}
          </div>
          <div>
            <p style={secLabel}>Languages <span style={line} /></p>
            <div style={{ display: 'flex', gap: 10 }}>
              {a.languages.map((l, i) => (
                <span key={i} style={{ padding: '8px 20px', border: '1px solid var(--border)', borderRadius: 2, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text)', background: 'var(--bg2)' }}>{l}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
