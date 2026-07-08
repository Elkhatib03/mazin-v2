import { useState, useEffect, useRef } from 'react'
import uploadToCloudinary from '../cloudinary'

const fi = { width: '100%', padding: '11px 14px', border: '1px solid var(--border)', borderRadius: 3, fontSize: 13, fontFamily: 'inherit', background: 'var(--bg2)', color: 'var(--text)', outline: 'none', marginBottom: 20, transition: 'border-color 0.2s' }
const lb = { display: 'block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 7 }
const fo = e => e.target.style.borderColor = 'var(--accent)'
const fb = e => e.target.style.borderColor = 'var(--border)'
const btnSm = { background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff', borderRadius: 2, width: 22, height: 22, cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }

export default function ProjectForm({ project, isNew, onSave, onDelete }) {
  const [form, setForm]         = useState({ title: '', tag: '', description: '', credits: '', image: '', photos: [], blocks: [], status: 'published' })
  const [saved, setSaved]       = useState(false)
  const [dragging, setDrag]     = useState(false)
  const [uploading, setUpl]     = useState(false)
  const [pendingBI, setPending] = useState(null) // pending block index for image upload
  const coverRef                = useRef()
  const blockImgRef             = useRef()

  useEffect(() => {
    setForm(project ? {
      title: project.title || '', tag: project.tag || '',
      description: project.description || '', credits: project.credits || '',
      image: project.image || '', photos: project.photos || [],
      blocks: project.blocks || [],
      status: project.status || 'published',
    } : { title: '', tag: '', description: '', credits: '', image: '', photos: [], blocks: [], status: 'published' })
    setSaved(false)
  }, [project])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function uploadFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    setUpl(true)
    try {
      const url = await uploadToCloudinary(file)
      set('image', url)
    } catch { alert('Upload failed. Check your connection and try again.') }
    setUpl(false)
  }

  async function uploadBlockImage(file) {
    if (!file || !file.type.startsWith('image/') || pendingBI === null) return
    const idx = pendingBI
    setUpl(true)
    try {
      const url = await uploadToCloudinary(file)
      setForm(f => {
        const blocks = [...f.blocks]
        blocks[idx] = { ...blocks[idx], url }
        return { ...f, blocks }
      })
    } catch { alert('Upload failed.') }
    setUpl(false)
    setPending(null)
  }

  function triggerBlockUpload(i) {
    setPending(i)
    blockImgRef.current.value = ''
    blockImgRef.current.click()
  }

  function addTextBlock() {
    setForm(f => ({ ...f, blocks: [...f.blocks, { type: 'text', content: '' }] }))
  }

  function addImageBlock() {
    const newIdx = form.blocks.length
    setForm(f => ({ ...f, blocks: [...f.blocks, { type: 'image', url: '' }] }))
    setPending(newIdx)
    setTimeout(() => { blockImgRef.current.value = ''; blockImgRef.current.click() }, 0)
  }

  function updateBlock(i, patch) {
    setForm(f => {
      const blocks = [...f.blocks]
      blocks[i] = { ...blocks[i], ...patch }
      return { ...f, blocks }
    })
  }

  function removeBlock(i) {
    setForm(f => ({ ...f, blocks: f.blocks.filter((_, idx) => idx !== i) }))
  }

  function moveBlock(i, dir) {
    setForm(f => {
      const blocks = [...f.blocks]
      const swap = i + dir
      if (swap < 0 || swap >= blocks.length) return f
      ;[blocks[i], blocks[swap]] = [blocks[swap], blocks[i]]
      return { ...f, blocks }
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
          onDrop={e => { e.preventDefault(); setDrag(false); uploadFile(e.dataTransfer.files[0]) }}
          onClick={() => coverRef.current.click()}
          style={{ border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 3, padding: '32px 20px', textAlign: 'center', cursor: 'pointer', background: dragging ? 'rgba(201,164,110,0.05)' : 'transparent', marginBottom: 16, transition: 'all 0.2s' }}
        >
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>Drop image here or <span style={{ color: 'var(--accent)' }}>click to upload</span></p>
          {uploading && <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>Processing…</p>}
        </div>
      )}
      <input ref={coverRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => uploadFile(e.target.files[0])} />

      {/* URL fallback */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>or URL</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <input type="url" value={form.image.startsWith('data:') ? '' : form.image}
        onChange={e => set('image', e.target.value)} onFocus={fo} onBlur={fb}
        placeholder="https://…" style={fi} />

      {/* Fields */}
      <label style={lb}>Project Title *</label>
      <input type="text" value={form.title} onChange={e => set('title', e.target.value)} onFocus={fo} onBlur={fb} placeholder="e.g. Brand Identity — Nour Studio" style={fi} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={lb}>Category / Tag</label>
          <select value={form.tag} onChange={e => set('tag', e.target.value)} onFocus={fo} onBlur={fb} style={fi}>
            <option value="">— Select —</option>
            <option value="Events">Events</option>
            <option value="Advertising">Advertising</option>
            <option value="Branding">Branding</option>
          </select>
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

      {/* Content Blocks */}
      <label style={lb}>Content Blocks</label>
      <p style={{ fontSize: 11, color: 'var(--subtle)', marginBottom: 12 }}>
        Mix photos and text in any order — shown on the project page
      </p>

      {form.blocks.map((block, i) => (
        <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 3, marginBottom: 8, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', background: 'var(--bg3)', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              {block.type === 'image' ? 'Image' : 'Text'}
            </span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => moveBlock(i, -1)} disabled={i === 0} style={btnSm}>↑</button>
              <button onClick={() => moveBlock(i, 1)} disabled={i === form.blocks.length - 1} style={btnSm}>↓</button>
              <button onClick={() => removeBlock(i)} style={{ ...btnSm, background: 'rgba(180,40,40,0.7)' }}>×</button>
            </div>
          </div>

          {block.type === 'text' ? (
            <textarea
              rows={4}
              value={block.content}
              onChange={e => updateBlock(i, { content: e.target.value })}
              onFocus={fo} onBlur={fb}
              placeholder="Enter text…"
              style={{ width: '100%', padding: '11px 14px', border: 'none', borderRadius: 0, fontSize: 13, fontFamily: 'inherit', background: 'var(--bg2)', color: 'var(--text)', outline: 'none', resize: 'vertical', display: 'block' }}
            />
          ) : (
            block.url ? (
              <div style={{ position: 'relative' }}>
                <img src={block.url} alt="" style={{ width: '100%', display: 'block', maxHeight: 220, objectFit: 'cover' }} />
                <button onClick={() => updateBlock(i, { url: '' })} style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff', borderRadius: 2, width: 24, height: 24, cursor: 'pointer', fontSize: 14 }}>×</button>
              </div>
            ) : (
              <div onClick={() => triggerBlockUpload(i)} style={{ padding: '24px', textAlign: 'center', cursor: 'pointer', background: 'var(--bg2)' }}>
                <p style={{ fontSize: 12, color: uploading && pendingBI === i ? 'var(--accent)' : 'var(--muted)' }}>
                  {uploading && pendingBI === i ? 'Uploading…' : 'Click to upload image'}
                </p>
              </div>
            )
          )}
        </div>
      ))}

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button onClick={addTextBlock} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 3, color: 'var(--muted)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'inherit', cursor: 'pointer' }}>
          + Text Block
        </button>
        <button onClick={addImageBlock} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 3, color: 'var(--muted)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'inherit', cursor: 'pointer' }}>
          + Image Block
        </button>
      </div>
      <input ref={blockImgRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => uploadBlockImage(e.target.files[0])} />

      <label style={lb}>Credits</label>
      <p style={{ fontSize: 11, color: 'var(--subtle)', marginBottom: 8 }}>One per line: "Role: Art Direction"</p>
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
