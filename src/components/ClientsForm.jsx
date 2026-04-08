import { useState, useEffect, useRef } from 'react'
import { getClients, saveClients } from '../storage'
import uploadToCloudinary from '../cloudinary'

const fi = { width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: 3, fontSize: 13, fontFamily: 'inherit', background: 'var(--bg2)', color: 'var(--text)', outline: 'none', transition: 'border-color 0.2s' }
const fo = e => e.target.style.borderColor = 'var(--accent)'
const fb = e => e.target.style.borderColor = 'var(--border)'

let tempId = Date.now()
function newTempId() { return `temp_${++tempId}` }

export default function ClientsForm() {
  const [clients,   setClients]   = useState([])
  const [loading,   setLoading]   = useState(true)
  const [uploading, setUploading] = useState({})
  const [saved,     setSaved]     = useState(false)
  const [saving,    setSaving]    = useState(false)
  const fileRefs = useRef({})

  useEffect(() => {
    getClients().then(data => {
      setClients(data)
      setLoading(false)
    })
  }, [])

  function set(id, key, val) {
    setClients(cs => cs.map(c => c.id === id ? { ...c, [key]: val } : c))
  }

  function addClient() {
    setClients(cs => [...cs, { id: newTempId(), name: '', logo: '' }])
  }

  function remove(id) {
    setClients(cs => cs.filter(c => c.id !== id))
  }

  async function handleLogoUpload(id, file) {
    if (!file || !file.type.startsWith('image/')) return
    setUploading(u => ({ ...u, [id]: true }))
    try {
      const url = await uploadToCloudinary(file)
      set(id, 'logo', url)
    } catch {
      alert('Upload failed. Check your connection and try again.')
    }
    setUploading(u => ({ ...u, [id]: false }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      await saveClients(clients)
      // Refetch to get proper UUIDs for any newly inserted clients
      const refreshed = await getClients()
      setClients(refreshed)
      setSaved(true)
      setTimeout(() => setSaved(false), 2800)
    } catch {
      alert('Save failed. Please try again.')
    }
    setSaving(false)
  }

  if (loading) {
    return <div style={{ paddingTop: 80, textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>Loading…</div>
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 6 }}>
          Clients
        </h2>
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>
          Manage the logos shown in the marquee bar on the homepage. Upload a logo image or leave it blank to show the client name as text.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {clients.map((client) => (
          <div key={client.id} style={{ display: 'grid', gridTemplateColumns: '48px 1fr auto auto', gap: 12, alignItems: 'center', padding: '12px 14px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 3 }}>

            {/* Logo preview */}
            <div style={{ width: 48, height: 48, background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
              {uploading[client.id]
                ? <span style={{ fontSize: 10, color: 'var(--muted)' }}>…</span>
                : client.logo
                  ? <img src={client.logo} alt={client.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
                  : <span style={{ fontSize: 9, color: 'var(--subtle)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>No logo</span>
              }
            </div>

            {/* Name input */}
            <input
              type="text"
              value={client.name}
              onChange={e => set(client.id, 'name', e.target.value)}
              onFocus={fo} onBlur={fb}
              placeholder="Client name"
              style={fi}
            />

            {/* Upload button */}
            <div>
              <input
                ref={el => fileRefs.current[client.id] = el}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => handleLogoUpload(client.id, e.target.files[0])}
              />
              <button
                onClick={() => fileRefs.current[client.id]?.click()}
                disabled={!!uploading[client.id]}
                style={{ padding: '9px 14px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 3, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: uploading[client.id] ? 'var(--subtle)' : 'var(--muted)', cursor: uploading[client.id] ? 'default' : 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'border-color 0.2s' }}
                onMouseEnter={e => { if (!uploading[client.id]) e.currentTarget.style.borderColor = 'var(--accent)' }}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                {uploading[client.id] ? 'Uploading…' : client.logo ? 'Replace' : 'Upload Logo'}
              </button>
            </div>

            {/* Delete */}
            <button
              onClick={() => remove(client.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 16, lineHeight: 1, padding: '4px 6px', fontFamily: 'inherit', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >×</button>

          </div>
        ))}
      </div>

      {/* Add client */}
      <button
        onClick={addClient}
        style={{ width: '100%', padding: '11px', background: 'transparent', border: '1px dashed var(--border)', borderRadius: 3, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit', marginBottom: 28, transition: 'border-color 0.2s, color 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
      >
        + Add Client
      </button>

      {/* Save */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{ padding: '11px 32px', background: 'var(--accent)', color: 'var(--bg)', border: 'none', borderRadius: 3, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'inherit', cursor: saving ? 'default' : 'pointer', fontWeight: 500, opacity: saving ? 0.7 : 1 }}
        >
          {saving ? 'Saving…' : 'Save Clients'}
        </button>
        {saved && <span style={{ fontSize: 12, color: 'var(--success)', letterSpacing: '0.04em' }}>✓ Saved — updated on homepage</span>}
      </div>
    </div>
  )
}
