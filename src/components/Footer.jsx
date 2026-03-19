export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '28px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'var(--bg)',
      color: 'var(--muted)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
    }}>
      <span>© 2025 Mazin Elkhatib</span>
      <a href="#" style={{ color: 'var(--muted)', textDecoration: 'none' }}>↑ Back to Top</a>
    </footer>
  )
}
