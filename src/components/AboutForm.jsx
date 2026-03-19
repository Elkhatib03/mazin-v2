import { useState } from 'react'
import { getAbout, saveAbout } from '../storage'

const fi = { width: '100%', padding: '11px 14px', border: '1px solid var(--border)', borderRadius: 3, fontSize: 13, fontFamily: 'inherit', background: 'var(--bg2)', color: 'var(--text)', outline: 'none', marginBottom: 20, transition: 'border-color 0.2s' }
const lb = { display: 'block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 7 }
const fo = e => e.target.style.borderColor = 'var(--accent)'
const fb = e => e.target.style.borderColor = 'var(--border)'

function Sec({ children }) {
  return (
    <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20, marginTop: 12, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
      {children}
    </p>
  )
}

export default function AboutForm() {
  const [form, setForm] = useState(getAbout)
  const [saved, setSaved] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const [expText, setExpText] = useState(() => JSON.stringify(form.experience, null, 2))
  const [eduText, setEduText] = useState(() => JSON.stringify(form.education,  null, 2))
  const [srvText, setSrvText] = useState(() => JSON.stringify(form.services,   null, 2))
  const [jsonErr, setJsonErr] = useState({})

  function tryJSON(text, key) {
    try { setForm(f => ({ ...f, [key]: JSON.parse(text) })); setJsonErr(e => ({ ...e, [key]: null })) }
    catch (err) { setJsonErr(e => ({ ...e, [key]: err.message })) }
  }

  function handleSave() { saveAbout(form); setSaved(true); setTimeout(() => setSaved(false), 2800) }

  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 16, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 6 }}>About Page</h2>
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>Edit all content on the About page.</p>
      </div>

      <Sec>Basic Info</Sec>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div><label style={lb}>Full Name</label><input type="text" value={form.name} onChange={e => set('name', e.target.value)} style={fi} onFocus={fo} onBlur={fb} /></div>
        <div><label style={lb}>Title</label><input type="text" value={form.title} onChange={e => set('title', e.target.value)} style={fi} onFocus={fo} onBlur={fb} /></div>
      </div>
      <label style={lb}>Location</label>
      <input type="text" value={form.location} onChange={e => set('location', e.target.value)} style={fi} onFocus={fo} onBlur={fb} />

      <Sec>Bio</Sec>
      <label style={lb}>Bio (blank line = new paragraph)</label>
      <textarea rows={6} value={form.bio} onChange={e => set('bio', e.target.value)} style={{ ...fi, resize: 'vertical' }} onFocus={fo} onBlur={fb} />

      <Sec>Photo</Sec>
      {form.photo && <img src={form.photo} alt="preview" style={{ width: 120, height: 160, objectFit: 'cover', borderRadius: 2, marginBottom: 12, border: '1px solid var(--border)' }} />}
      <label style={lb}>Photo URL</label>
      <input type="url" value={form.photo} onChange={e => set('photo', e.target.value)} style={fi} onFocus={fo} onBlur={fb} placeholder="https://…" />

      <Sec>Contact & Social</Sec>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div><label style={lb}>Email</label><input type="text" value={form.email} onChange={e => set('email', e.target.value)} style={fi} onFocus={fo} onBlur={fb} /></div>
        <div><label style={lb}>LinkedIn</label><input type="url" value={form.linkedin} onChange={e => set('linkedin', e.target.value)} style={fi} onFocus={fo} onBlur={fb} /></div>
        <div><label style={lb}>Instagram</label><input type="url" value={form.instagram} onChange={e => set('instagram', e.target.value)} style={fi} onFocus={fo} onBlur={fb} /></div>
        <div><label style={lb}>Behance</label><input type="url" value={form.behance} onChange={e => set('behance', e.target.value)} style={fi} onFocus={fo} onBlur={fb} /></div>
      </div>

      <Sec>Skills</Sec>
      <label style={lb}>Comma separated</label>
      <input type="text" value={form.skills.join(', ')} onChange={e => set('skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} style={fi} onFocus={fo} onBlur={fb} />

      <Sec>Certifications</Sec>
      <textarea rows={3} value={form.certifications.join('\n')} onChange={e => set('certifications', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))} style={{ ...fi, resize: 'vertical' }} onFocus={fo} onBlur={fb} />

      <Sec>Languages</Sec>
      <input type="text" value={form.languages.join(', ')} onChange={e => set('languages', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} style={fi} onFocus={fo} onBlur={fb} />

      <Sec>Services (JSON)</Sec>
      <textarea rows={8} value={srvText} onChange={e => { setSrvText(e.target.value); tryJSON(e.target.value, 'services') }} style={{ ...fi, fontFamily: 'monospace', fontSize: 12, resize: 'vertical' }} onFocus={fo} onBlur={fb} />
      {jsonErr.services && <p style={{ color: 'var(--danger)', fontSize: 11, marginTop: -14, marginBottom: 16 }}>⚠ {jsonErr.services}</p>}

      <Sec>Experience (JSON)</Sec>
      <textarea rows={14} value={expText} onChange={e => { setExpText(e.target.value); tryJSON(e.target.value, 'experience') }} style={{ ...fi, fontFamily: 'monospace', fontSize: 12, resize: 'vertical' }} onFocus={fo} onBlur={fb} />
      {jsonErr.experience && <p style={{ color: 'var(--danger)', fontSize: 11, marginTop: -14, marginBottom: 16 }}>⚠ {jsonErr.experience}</p>}

      <Sec>Education (JSON)</Sec>
      <textarea rows={8} value={eduText} onChange={e => { setEduText(e.target.value); tryJSON(e.target.value, 'education') }} style={{ ...fi, fontFamily: 'monospace', fontSize: 12, resize: 'vertical' }} onFocus={fo} onBlur={fb} />
      {jsonErr.education && <p style={{ color: 'var(--danger)', fontSize: 11, marginTop: -14, marginBottom: 16 }}>⚠ {jsonErr.education}</p>}

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
        <button onClick={handleSave} style={{ padding: '11px 32px', background: 'var(--accent)', color: 'var(--bg)', border: 'none', borderRadius: 3, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'inherit', cursor: 'pointer', fontWeight: 500 }}>
          Save About Page
        </button>
        {saved && <span style={{ fontSize: 12, color: 'var(--success)' }}>✓ Saved</span>}
      </div>
    </div>
  )
}
