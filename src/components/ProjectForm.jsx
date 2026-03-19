import { useState, useEffect, useRef } from 'react'
import { fileToBase64 } from '../storage'

const fi = { width: '100%', padding: '11px 14px', border: '1px solid var(--border)', borderRadius: 3, fontSize: 13, fontFamily: 'inherit', background: 'var(--bg2)', color: 'var(--text)', outline: 'none', marginBottom: 20, transition: 'border-color 0.2s' }
const lb = { display: 'block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 7 }
const fo = e => e.target.style.borderColor = 'var(--accent)'
const fb = e => e.target.style.borderColor = 'var(--border)'

export default function ProjectForm({ project, isNew, onSave, onDelete }) {
  const [form, setForm]     = useState({ title: '', tag: '', description: '', credits: '', image: '', photos: [], status: 'published' })
  const [saved, setSaved]   = useState(false)
  const [dragging, setDrag] = useState(false)
  const [uploading, setUpl] = useState(false)
  const coverRef            = useRef()
  const extrasRef           = useRef()

  useEffect(() => {
    setForm(project ? {
      title: project.title || '', tag: project.tag || '',
      description: project.description || '', credits: project.credits || '',
      image: project.image || '', photos: project.photos || [],
      status: project.status || 'published',
    } : { title: '', tag: '', description: '', credits: '', image: '', photos: [], status: 'published' })
    setSaved(false)
  }, [project])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function uploadFile(file, isCover) {
    if (!file || !file.type.startsWith('image/')) return
    setUpl(true)
    try {
      const b64 = await fileToBase64(file)
      if (isCover) set('image', b64)
      else setForm(f => ({ ...f, photos: [...f.photos, b64] }))
    } catch { alert('Could not read image.') }
    setUpl(false)
  }

  async function uploadMultiple(files) {
    setUpl(true)
    const results = []
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        try { results.push(await fileToBase64(file)) } catch {}
      }
    }
    setForm(f => ({ ...f, photos: [...f.photos, ...results] }))
    setUpl(false)
  }

  function removePhoto(idx) { setForm(f => ({ ...f, photos: f.photos.filter((_, i) => i !== idx) })) }

  function movePhoto(idx, dir) {
    setForm(f => {
      const photos = [...f.photos]
      const swap = idx + dir
      if (swap < 0 || swap >= photos.length) return f
      ;[photos[idx], photos[swap]] = [photos[swap], photos[idx]]
      return { ...f, photos }
    })
  }

  function handleSave() {
    if (!form.title.trim()) { alert('Please enter a project title.'); return }
    onSave({ ...(project || {}), ...form, title: form.title.trim() })
    setSaved(true)
    setTimeout(() => setSaved(false), 2800)
  }

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 6 }}>
          {isNew ? 'New Project' : 'Edit Project'}
        </h2>
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>{isNew ? 'Fill in the details below.' : 'Update and save.'}</p>
      </div>

      {/* Cover image */}
      <label style={lb}>Cover Image</label>
      {form.image ? (
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <img src={form.image} alt="cover" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 3, border: '1px solid var(--border)', display: 'block' }} />
          <button onClick={() => set('image', '')} style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.7)', border: 'none', color: 'var(--text)', borderRadius: 2, width: 26, height: 26, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
      ) : (
        <div
          onDragOver={e => { e.preventDefault(); setDrag(true) }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); uploadFile(e.dataTransfer.files[0], true) }}
          onClick={() => coverRef.current.click()}
          style={{ border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 3, padding: '32px 20px', textAlign: 'center', cursor: 'pointer', background: dragging ? 'rgba(201,164,110,0.05)' : 'transparent', marginBottom: 16, transition: 'all 0.2s' }}
        >
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>Drop image here or <span style={{ color: 'var(--accent)' }}>click to upload</span></p>
          {uploading && <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>Processing…</p>}
        </div>
      )}
      <input ref={coverRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => uploadFile(e.target.files[0], true)} />

      {/* URL fallback */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>or URL</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <input type="url" value={form.image.startsWith('data:') ? '' : form.image}
        onChange={e => set('image', e.target.value)} onFocus={fo} onBlur={fb}
        placeholder="https://…" style={fi} />

      {/* Extra photos */}
      <label style={lb}>Additional Photos</label>
      {form.photos.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 12 }}>
          {form.photos.map((img, i) => (
            <div key={i} style={{ position: 'relative', background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={img} alt="" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: 4, opacity: 0, transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0'}>
                <div style={{ display: 'flex', gap: 3 }}>
                  <button onClick={() => movePhoto(i, -1)} disabled={i === 0} style={{ background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff', borderRadius: 2, width: 22, height: 22, cursor: 'pointer', fontSize: 11 }}>←</button>
                  <button onClick={() => movePhoto(i, 1)} disabled={i === form.photos.length - 1} style={{ background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff', borderRadius: 2, width: 22, height: 22, cursor: 'pointer', fontSize: 11 }}>→</button>
                </div>
                <button onClick={() => removePhoto(i)} style={{ background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff', borderRadius: 2, width: 22, height: 22, cursor: 'pointer', fontSize: 13 }}>×</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        onDragOver={e => { e.preventDefault(); setDrag(true) }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); uploadFile(e.dataTransfer.files[0], false) }}
        onClick={() => extrasRef.current.click()}
        style={{ border: `1px dashed var(--border)`, borderRadius: 3, padding: '14px', textAlign: 'center', cursor: 'pointer', marginBottom: 20, transition: 'all 0.2s' }}
      >
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>+ Add more photos</p>
      </div>
      <input ref={extrasRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => uploadMultiple(Array.from(e.target.files))} />

      {/* Fields */}
      <label style={lb}>Project Title *</label>
      <input type="text" value={form.title} onChange={e => set('title', e.target.value)} onFocus={fo} onBlur={fb} placeholder="e.g. Brand Identity — Nour Studio" style={fi} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={lb}>Category / Tag</label>
          <input type="text" value={form.tag} onChange={e => set('tag', e.target.value)} onFocus={fo} onBlur={fb} placeholder="Branding, Campaign…" style={fi} />
        </div>
        <div>
          <label style={lb}>Visibility</label>
          <select value={form.status} onChange={e => set('status', e.target.value)} onFocus={fo} onBlur={fb} style={fi}>
            <option value="published">Published — visible</option>
            <option value="draft">Draft — hidden</option>
          </select>
        </div>
      </div>

      <label style={lb}>Description</label>
      <textarea rows={5} value={form.description} onChange={e => set('description', e.target.value)} onFocus={fo} onBlur={fb}
        placeholder="Describe the project. Blank line = new paragraph." style={{ ...fi, resize: 'vertical' }} />

      <label style={lb}>Credits</label>
      <p style={{ fontSize: 11, color: 'var(--subtle)', marginBottom: 8, marginTop: -14 }}>One per line: "Role: Art Direction"</p>
      <textarea rows={5} value={form.credits} onChange={e => set('credits', e.target.value)} onFocus={fo} onBlur={fb}
        placeholder={'Role: Art Direction\nClient: Brand Name\nAgency: Studio\nYear: 2024'}
        style={{ ...fi, resize: 'vertical', fontFamily: 'monospace', fontSize: 12 }} />

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', paddingTop: 20, marginTop: 8, borderTop: '1px solid var(--border)' }}>
        <button onClick={handleSave} style={{ padding: '11px 32px', background: 'var(--accent)', color: 'var(--bg)', border: 'none', borderRadius: 3, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'inherit', cursor: 'pointer', fontWeight: 500 }}>
          {isNew ? 'Add to Portfolio' : 'Save Changes'}
        </button>
        {!isNew && (
          <button onClick={onDelete} style={{ padding: '10px 20px', background: 'none', border: '1px solid rgba(224,82,82,0.3)', borderRadius: 3, color: 'var(--danger)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'inherit', cursor: 'pointer' }}>
            Delete
          </button>
        )}
        {saved && <span style={{ fontSize: 12, color: 'var(--success)', letterSpacing: '0.04em' }}>✓ Saved — visible on portfolio</span>}
      </div>
    </div>
  )
}
