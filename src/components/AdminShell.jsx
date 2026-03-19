import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getProjects, saveProjects, uid } from '../storage'
import ProjectForm from './ProjectForm'
import AboutForm from './AboutForm'

export default function AdminShell({ onLogout }) {
  const [tab,      setTab]      = useState('projects')
  const [projects, setProjects] = useState(getProjects)
  const [editId,   setEditId]   = useState(null)
  const [isNew,    setIsNew]    = useState(false)

  function save(updated) {
    let next
    if (isNew) {
      const p = { ...updated, id: uid() }
      next = [p, ...projects]
      setIsNew(false); setEditId(p.id)
    } else {
      next = projects.map(p => p.id === editId ? { ...updated, id: editId } : p)
    }
    setProjects(next); saveProjects(next)
  }

  function deleteProject() {
    const p = projects.find(x => x.id === editId)
    if (!confirm(`Delete "${p?.title}"?`)) return
    const next = projects.filter(x => x.id !== editId)
    setProjects(next); saveProjects(next)
    setEditId(null); setIsNew(false)
  }

  function deleteSidebar(id) {
    if (!confirm('Delete this project?')) return
    const next = projects.filter(x => x.id !== id)
    setProjects(next); saveProjects(next)
    if (editId === id) { setEditId(null); setIsNew(false) }
  }

  const editing  = projects.find(p => p.id === editId) || null
  const pubCount = projects.filter(p => p.status === 'published').length

  const tabBtn = (id, label) => (
    <button key={id} onClick={() => setTab(id)} style={{
      padding: '6px 16px',
      background: tab === id ? 'var(--text)' : 'transparent',
      color: tab === id ? 'var(--bg)' : 'var(--muted)',
      border: '1px solid var(--border)',
      borderRadius: 3, fontSize: 10, textTransform: 'uppercase',
      letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'inherit',
      transition: 'all 0.15s',
    }}>{label}</button>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)', fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif" }}>

      {/* Header */}
      <header style={{ height: 60, background: 'var(--bg2)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'sticky', top: 0, zIndex: 50, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: '0.04em', color: 'var(--text)' }}>Mazin Elkhatib</span>
          <span style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(201,164,110,0.15)', color: 'var(--accent)', padding: '3px 8px', borderRadius: 2 }}>Admin</span>
          <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
            {tabBtn('projects', 'Portfolio')}
            {tabBtn('about', 'About')}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/" target="_blank" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '6px 14px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 3, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--muted)' }}>View Site ↗</button>
          </Link>
          {tab === 'projects' && (
            <button onClick={() => { setIsNew(true); setEditId(null) }}
              style={{ padding: '6px 14px', background: 'var(--accent)', color: 'var(--bg)', border: 'none', borderRadius: 3, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>
              + Add Project
            </button>
          )}
          <button onClick={onLogout} style={{ padding: '6px 14px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 3, fontSize: 10, cursor: 'pointer', color: 'var(--muted)', fontFamily: 'inherit' }}>Log Out</button>
        </div>
      </header>

      {/* Body */}
      {tab === 'about'
        ? <main style={{ flex: 1, overflowY: 'auto', padding: '44px 56px', background: 'var(--bg)' }}><AboutForm /></main>
        : (
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Sidebar */}
            <aside style={{ width: 260, borderRight: '1px solid var(--border)', background: 'var(--bg2)', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
              {/* Stats */}
              <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 24 }}>
                {[['Total', projects.length], ['Live', pubCount], ['Draft', projects.length - pubCount]].map(([lbl, val]) => (
                  <div key={lbl} style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 20, fontWeight: 500, lineHeight: 1, color: 'var(--text)' }}>{val}</p>
                    <p style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>{lbl}</p>
                  </div>
                ))}
              </div>
              {/* List */}
              <div style={{ flex: 1, overflowY: 'auto', padding: 10 }}>
                {isNew && (
                  <div style={{ padding: '10px 12px', borderRadius: 3, border: '1px solid var(--accent)', background: 'rgba(201,164,110,0.06)', marginBottom: 6 }}>
                    <p style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>New project…</p>
                  </div>
                )}
                {!projects.length && !isNew && (
                  <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12, paddingTop: 32 }}>No projects yet</p>
                )}
                {projects.map(p => (
                  <SItem key={p.id} project={p}
                    active={editId === p.id && !isNew}
                    onSelect={() => { setIsNew(false); setEditId(p.id) }}
                    onDelete={() => deleteSidebar(p.id)}
                  />
                ))}
              </div>
            </aside>

            {/* Form area */}
            <main style={{ flex: 1, overflowY: 'auto', padding: '40px 48px', background: 'var(--bg)' }}>
              {(isNew || editing)
                ? <ProjectForm key={isNew ? 'new' : editId} project={editing} isNew={isNew} onSave={save} onDelete={deleteProject} />
                : (
                  <div style={{ textAlign: 'center', paddingTop: 120, color: 'var(--muted)' }}>
                    <p style={{ fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text)', marginBottom: 12 }}>Select a project</p>
                    <p style={{ fontSize: 13 }}>Or{' '}
                      <button onClick={() => setIsNew(true)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: 13, textDecoration: 'underline', fontFamily: 'inherit' }}>
                        add a new one
                      </button>
                    </p>
                  </div>
                )
              }
            </main>
          </div>
        )
      }
    </div>
  )
}

function SItem({ project, active, onSelect, onDelete }) {
  const [hov, setHov] = useState(false)
  return (
    <div onClick={onSelect} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: '10px 12px', borderRadius: 3, cursor: 'pointer', marginBottom: 4, border: active ? '1px solid var(--accent)' : hov ? '1px solid var(--border)' : '1px solid transparent', background: active || hov ? 'var(--bg3)' : 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, transition: 'all 0.15s' }}>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: 11, fontWeight: 500, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text)' }}>
          {project.title || 'Untitled'}
        </p>
        <p style={{ fontSize: 10, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 2, background: project.status === 'published' ? 'rgba(76,175,125,0.15)' : 'var(--bg3)', color: project.status === 'published' ? 'var(--success)' : 'var(--muted)' }}>
            {project.status}
          </span>
          {project.tag}
        </p>
      </div>
      {hov && (
        <button onClick={e => { e.stopPropagation(); onDelete() }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 13, padding: '1px 4px', flexShrink: 0, lineHeight: 1, fontFamily: 'inherit' }}
          onMouseEnter={e => e.target.style.color = 'var(--danger)'}
          onMouseLeave={e => e.target.style.color = 'var(--muted)'}>✕</button>
      )}
    </div>
  )
}
