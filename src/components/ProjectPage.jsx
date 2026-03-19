import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProjects, PROJECTS_KEY } from '../storage'

export default function ProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [lightboxImg, setLightboxImg] = useState(null)

  useEffect(() => {
    const load = () => {
      const p = getProjects().find(x => x.id === id)
      if (!p) navigate('/')
      else setProject(p)
    }
    load()
    window.addEventListener('mazin:projects', load)
    window.addEventListener('storage', e => { if (e.key === PROJECTS_KEY) load() })
    return () => {
      window.removeEventListener('mazin:projects', load)
      window.removeEventListener('storage', load)
    }
  }, [id, navigate])

  if (!project) return null

  const allImages = [project.image, ...(project.photos || [])].filter(Boolean)

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '56px 48px 120px' }}>

        {/* Back */}
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', marginBottom: 56 }}>
          ← Work
        </Link>

        {/* Title */}
        <h1 style={{ fontSize: 22, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 8, lineHeight: 1.3 }}>
          {project.title}
        </h1>
        {project.tag && (
          <p style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 48 }}>
            {project.tag}
          </p>
        )}

        {/* Description */}
        {project.description && (
          <div style={{ marginBottom: 64, maxWidth: 660 }}>
            {project.description.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text)', opacity: 0.8, marginBottom: 20 }}>
                {para}
              </p>
            ))}
          </div>
        )}

        {/* Images */}
        {allImages.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 64 }}>
            {allImages.map((img, i) => (
              <div key={i} onClick={() => setLightboxImg(img)}
                style={{ cursor: 'zoom-in', background: 'var(--bg3)', overflow: 'hidden', borderRadius: 2 }}>
                <img src={img} alt={`${project.title} ${i + 1}`}
                  style={{ width: '100%', display: 'block', transition: 'opacity 0.25s' }}
                  onMouseEnter={e => e.target.style.opacity = '0.88'}
                  onMouseLeave={e => e.target.style.opacity = '1'}
                />
              </div>
            ))}
          </div>
        )}

        {/* Credits */}
        {project.credits && (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 36 }}>
            {project.credits.split('\n').filter(Boolean).map((line, i) => {
              const [key, ...rest] = line.split(':')
              const val = rest.join(':').trim()
              return (
                <p key={i} style={{ fontSize: 13, lineHeight: 2, color: 'var(--text)' }}>
                  {val
                    ? <><span style={{ color: 'var(--muted)' }}>{key.trim()}: </span>{val}</>
                    : line
                  }
                </p>
              )
            })}
          </div>
        )}

        <div style={{ marginTop: 80, textAlign: 'center' }}>
          <a href="#" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}>↑ Back to Top</a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(0,0,0,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'zoom-out' }}>
          <img src={lightboxImg} alt="" onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 2 }} />
          <button onClick={() => setLightboxImg(null)}
            style={{ position: 'fixed', top: 24, right: 32, background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 32, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
      )}
    </div>
  )
}
