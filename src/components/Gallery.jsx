import { useState } from 'react'

function Item({ project, onOpen }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onClick={() => onOpen(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ breakInside:'avoid', marginBottom:18, position:'relative', overflow:'hidden', borderRadius:3, cursor:'pointer', background:'var(--bg3)' }}>
      {project.image
        ? <img src={project.image} alt={project.title} loading="lazy"
            style={{ width:'100%', display:'block', transform:hovered?'scale(1.045)':'scale(1)', transition:'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)' }} />
        : <div style={{ width:'100%', aspectRatio:'4/3', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg3)', fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'var(--muted)', fontSize:15 }}>
            {project.tag || 'Design'}
          </div>
      }
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(10,8,5,0.86) 0%,transparent 55%)', opacity:hovered?1:0, transition:'opacity 0.32s', display:'flex', alignItems:'flex-end', padding:24 }}>
        <div>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", color:'var(--text)', fontSize:18, lineHeight:1.3, marginBottom:5 }}>{project.title}</p>
          <p style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)' }}>{project.tag}</p>
        </div>
      </div>
    </div>
  )
}

export default function Gallery({ projects, onOpen }) {
  return (
    <section id="work" style={{ padding:'0 56px 120px' }}>
      <p style={{ fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--muted)', marginBottom:44, display:'flex', alignItems:'center', gap:18 }}>
        Selected Work <span style={{ flex:1, height:1, background:'var(--border)' }} />
      </p>
      {projects.length === 0
        ? <div style={{ textAlign:'center', padding:'80px 24px', color:'var(--muted)' }}>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:300, color:'var(--text)', marginBottom:12 }}>No projects yet</p>
            <p style={{ fontSize:14 }}>Add projects from the admin panel.</p>
          </div>
        : <div style={{ columns:'3 280px', columnGap:18 }}>
            {projects.map(p => <Item key={p.id} project={p} onOpen={onOpen} />)}
          </div>
      }
    </section>
  )
}
