import { useState, useRef, useEffect } from 'react'

const ADMIN_PASSWORD = 'mazin2025'

export default function AdminLogin({ onLogin }) {
  const [pw, setPw]       = useState('')
  const [err, setErr]     = useState('')
  const [shake, setShake] = useState(false)
  const ref               = useRef()

  useEffect(() => ref.current?.focus(), [])

  function submit() {
    if (pw === ADMIN_PASSWORD) { onLogin(); return }
    setErr('Wrong password.'); setShake(true); setPw('')
    setTimeout(() => { setShake(false); setErr(''); ref.current?.focus() }, 1400)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 380, textAlign: 'center' }}>
        <p style={{ fontSize: 16, fontWeight: 500, letterSpacing: '0.06em', color: 'var(--text)', marginBottom: 4 }}>Mazin Elkhatib</p>
        <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 52 }}>Admin Panel</p>

        <label style={{ display: 'block', textAlign: 'left', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Password</label>
        <input ref={ref} type="password" value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="••••••••"
          style={{ width: '100%', padding: '12px 16px', border: `1px solid ${shake ? 'var(--danger)' : 'var(--border)'}`, borderRadius: 3, fontSize: 15, fontFamily: 'inherit', background: 'var(--bg2)', color: 'var(--text)', outline: 'none', marginBottom: 10, letterSpacing: '0.12em', animation: shake ? 'shake 0.4s ease' : 'none' }}
        />
        {err && <p style={{ fontSize: 12, color: 'var(--danger)', marginBottom: 12, textAlign: 'left' }}>{err}</p>}
        <button onClick={submit}
          style={{ width: '100%', padding: 13, background: 'var(--text)', color: 'var(--bg)', border: 'none', borderRadius: 3, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'inherit', cursor: 'pointer' }}>
          Enter
        </button>
        <p style={{ marginTop: 24, fontSize: 11, color: 'var(--subtle)' }}>
          Change password in <code style={{ background: 'var(--bg3)', padding: '1px 5px', borderRadius: 2, fontSize: 10, color: 'var(--muted)' }}>AdminLogin.jsx</code> line 3
        </p>
      </div>
    </div>
  )
}
