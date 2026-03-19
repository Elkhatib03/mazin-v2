import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminShell from './AdminShell'

const SESSION_KEY = 'mazin_admin_auth'

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')

  function onLogin()  { sessionStorage.setItem(SESSION_KEY, '1'); setAuthed(true) }
  function onLogout() { sessionStorage.removeItem(SESSION_KEY);   setAuthed(false) }

  return authed ? <AdminShell onLogout={onLogout} /> : <AdminLogin onLogin={onLogin} />
}
