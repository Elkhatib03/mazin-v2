import { supabase } from './supabase'

// ── Default / seed data ───────────────────────────────────────────────

export const DEFAULT_ABOUT = {
  name:      'Mazin Elkhatib',
  title:     'Art Director',
  location:  'Dubai, United Arab Emirates',
  bio:       "I'm an Art Director with over 10 years of experience shaping brands, campaigns, and digital experiences across Jordan and the UAE. I believe great design is not just about aesthetics — it's about telling stories that move people.\n\nCurrently leading creative at Black Orange in Dubai, I've worked with agencies like VMLY&R and Sudacé, collaborating with brands across the region to build identities that endure.",
  photo:     '',
  email:     'maz.designs92@gmail.com',
  linkedin:  'https://www.linkedin.com/in/mazin-elkhatib-مازن-الخطيب-b5664910b',
  instagram: 'https://www.instagram.com/Mazin.elkhatib',
  behance:   'https://www.behance.net/MazElkhatib',
  skills:    ['Art Direction','Brand Identity','Advertising','Animation Direction','Artistic Direction','Design Leadership','Typography','Visual Storytelling'],
  services: [
    { title: 'Brand Identity',   desc: 'Logo systems, visual language, and brand guidelines built to last.' },
    { title: 'Art Direction',    desc: 'Campaign concepting, photo & video direction, and creative strategy.' },
    { title: 'Editorial Design', desc: 'Publications, layouts, and print materials with precise typographic craft.' },
    { title: 'Digital Design',   desc: 'Web design, social content, and motion graphics for digital platforms.' },
  ],
  experience: [
    { company: 'Black Orange',          role: 'Art Director',            period: 'Dec 2023 – Present',  location: 'Dubai, UAE' },
    { company: 'VMLY&R',                role: 'Art Director',            period: 'Oct 2022 – Dec 2023', location: 'Amman, Jordan' },
    { company: 'Sudacé Digital Agency', role: 'Art Director',            period: 'Jan 2022 – Oct 2022', location: 'Amman, Jordan' },
    { company: 'Sudacé Digital Agency', role: 'Junior Art Director',     period: 'Feb 2021 – Jan 2022', location: 'Amman, Jordan' },
    { company: 'Whiteful',              role: 'Senior Graphic Designer', period: 'Sep 2018 – Feb 2021', location: 'Amman, Jordan' },
    { company: 'Canada Global Centre',  role: 'Graphic Designer',        period: 'Oct 2013 – Sep 2018', location: 'Jordan' },
  ],
  education: [
    { school: 'Helwan University Cairo',  degree: "Bachelor's Degree in Design", period: '2009 – 2013' },
    { school: 'Ibn Sina Language School', degree: 'High School',                 period: '2009' },
  ],
  certifications: ['Advertising Course', 'Art Direction & Design Leadership'],
  languages:      ['Arabic', 'English'],
}

export const DEMO_PROJECTS = [
  {
    title: 'Brand Identity — Nour Studio', tag: 'Branding', status: 'published',
    description: 'A refined visual identity system for a boutique wellness studio in Amman. The project involved developing a complete brand language — from logo and typography to color system and print collateral.\n\nThe identity draws from the serene, natural environment of the studio, using organic forms and a restrained palette to convey calm and trust.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&q=80',
    photos: ['https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80', 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&q=80'],
    credits: 'Role: Art Direction & Brand Design\nClient: Nour Studio, Amman\nYear: 2024',
  },
  {
    title: 'Editorial Design — Mada Magazine', tag: 'Editorial', status: 'published',
    description: 'Art direction and layout design for a quarterly cultural publication covering arts, architecture, and urban life in the Arab world.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    photos: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80'],
    credits: 'Role: Art Direction & Layout Design\nPublication: Mada Magazine\nYear: 2023',
  },
  {
    title: 'Packaging — Oud & Co.', tag: 'Packaging', status: 'published',
    description: 'Luxury packaging design for an artisan oud fragrance house. The brief called for packaging that felt rooted in heritage while speaking to a contemporary global audience.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80',
    photos: [],
    credits: 'Role: Art Direction & Packaging Design\nClient: Oud & Co.\nYear: 2023',
  },
  {
    title: 'Web Design — Hayat Foundation', tag: 'Digital', status: 'published',
    description: 'Website and digital experience for a regional NGO working in health and education.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80',
    photos: [],
    credits: 'Role: Art Direction & Web Design\nClient: Hayat Foundation\nYear: 2022',
  },
  {
    title: 'Visual Identity — Manara Café', tag: 'Branding', status: 'published',
    description: 'Complete brand system for a specialty coffee concept in Amman — logo, packaging, signage, and environmental graphics.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
    photos: [],
    credits: 'Role: Brand Design\nClient: Manara Café\nYear: 2022',
  },
  {
    title: 'Campaign — Ramadan Collection', tag: 'Campaign', status: 'published',
    description: 'Art direction and photography for a seasonal fashion campaign celebrating the spirit of Ramadan.',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80',
    photos: [],
    credits: 'Role: Art Direction & Creative Strategy\nYear: 2022',
  },
]

export const DEFAULT_CLIENTS = [
  { name: 'Meta',      logo: '' },
  { name: 'Amazon',    logo: '' },
  { name: 'Nike',      logo: '' },
  { name: 'Apple',     logo: '' },
  { name: 'Google',    logo: '' },
  { name: 'Microsoft', logo: '' },
]

// ── Field mapping ─────────────────────────────────────────────────────

function dbToProject(row) {
  return {
    id:          row.id,
    title:       row.title           || '',
    tag:         row.category        || '',
    description: row.description     || '',
    credits:     row.credits         || '',
    image:       row.cover_image     || '',
    photos:      row.gallery_images  || [],
    blocks:      row.content_blocks  || [],
    status:      row.published ? 'published' : 'draft',
  }
}

function projectToDb(p) {
  return {
    title:          p.title       || '',
    category:       p.tag         || '',
    description:    p.description || '',
    credits:        p.credits     || '',
    cover_image:    p.image       || '',
    gallery_images: p.photos      || [],
    content_blocks: p.blocks      || [],
    published:      p.status === 'published',
  }
}

function dbToAbout(row) {
  const social = row.social_links || {}
  return {
    name:           row.name           || DEFAULT_ABOUT.name,
    title:          row.title          || DEFAULT_ABOUT.title,
    location:       row.location       || DEFAULT_ABOUT.location,
    bio:            row.bio            || DEFAULT_ABOUT.bio,
    photo:          row.photo          || DEFAULT_ABOUT.photo,
    email:          row.email          || DEFAULT_ABOUT.email,
    linkedin:       social.linkedin    || DEFAULT_ABOUT.linkedin,
    instagram:      social.instagram   || DEFAULT_ABOUT.instagram,
    behance:        social.behance     || DEFAULT_ABOUT.behance,
    skills:         row.skills         || DEFAULT_ABOUT.skills,
    services:       row.services       || DEFAULT_ABOUT.services,
    experience:     row.experience     || DEFAULT_ABOUT.experience,
    education:      row.education      || DEFAULT_ABOUT.education,
    certifications: row.certifications || DEFAULT_ABOUT.certifications,
    languages:      row.languages      || DEFAULT_ABOUT.languages,
  }
}

function aboutToDb(data) {
  return {
    id:             1,
    name:           data.name,
    title:          data.title,
    location:       data.location,
    bio:            data.bio,
    photo:          data.photo,
    email:          data.email,
    social_links:   { linkedin: data.linkedin, instagram: data.instagram, behance: data.behance },
    skills:         data.skills,
    services:       data.services,
    experience:     data.experience,
    education:      data.education,
    certifications: data.certifications,
    languages:      data.languages,
  }
}

function dbToClient(row) {
  return {
    id:   row.id,
    name: row.name || '',
    logo: row.logo || '',
  }
}

// ── Projects ──────────────────────────────────────────────────────────

export async function getProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error

    if (data.length === 0) {
      await _seedProjects()
      const { data: seeded } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })
      return (seeded || []).map(dbToProject)
    }

    return data.map(dbToProject)
  } catch (err) {
    console.error('getProjects:', err)
    return DEMO_PROJECTS
  }
}

export async function saveProject(project) {
  try {
    const dbRow = projectToDb(project)

    if (project.id) {
      const { error } = await supabase
        .from('projects')
        .update(dbRow)
        .eq('id', project.id)
      if (error) throw error
      window.dispatchEvent(new CustomEvent('mazin:projects'))
      return project.id
    } else {
      const { data, error } = await supabase
        .from('projects')
        .insert(dbRow)
        .select('id')
        .single()
      if (error) throw error
      window.dispatchEvent(new CustomEvent('mazin:projects'))
      return data.id
    }
  } catch (err) {
    console.error('saveProject:', err)
    throw err
  }
}

export async function deleteProject(id) {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    if (error) throw error
    window.dispatchEvent(new CustomEvent('mazin:projects'))
  } catch (err) {
    console.error('deleteProject:', err)
    throw err
  }
}

// ── About ─────────────────────────────────────────────────────────────

export async function getAbout() {
  try {
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .eq('id', 1)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No row yet — seed defaults
        await _seedAbout()
        return DEFAULT_ABOUT
      }
      throw error
    }

    return dbToAbout(data)
  } catch (err) {
    console.error('getAbout:', err)
    return DEFAULT_ABOUT
  }
}

export async function saveAbout(data) {
  try {
    const { error } = await supabase
      .from('about')
      .upsert(aboutToDb(data), { onConflict: 'id' })
    if (error) throw error
    window.dispatchEvent(new CustomEvent('mazin:about'))
  } catch (err) {
    console.error('saveAbout:', err)
    throw err
  }
}

// ── Clients ───────────────────────────────────────────────────────────

export async function getClients() {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error

    if (data.length === 0) {
      await _seedClients()
      const { data: seeded } = await supabase
        .from('clients')
        .select('*')
        .order('sort_order', { ascending: true })
      return (seeded || []).map(dbToClient)
    }

    return data.map(dbToClient)
  } catch (err) {
    console.error('getClients:', err)
    return DEFAULT_CLIENTS
  }
}

export async function saveClients(clients) {
  try {
    // Replace all: delete existing rows then insert the new set
    const { data: existing } = await supabase.from('clients').select('id')
    if (existing?.length) {
      await supabase.from('clients').delete().in('id', existing.map(r => r.id))
    }

    if (clients.length > 0) {
      const rows = clients.map((c, i) => ({
        name:       c.name || '',
        logo:       c.logo || '',
        sort_order: i,
      }))
      const { error } = await supabase.from('clients').insert(rows)
      if (error) throw error
    }

    window.dispatchEvent(new CustomEvent('mazin:clients'))
  } catch (err) {
    console.error('saveClients:', err)
    throw err
  }
}

// ── Seed helpers ──────────────────────────────────────────────────────

async function _seedProjects() {
  const rows = DEMO_PROJECTS.map((p, i) => ({
    ...projectToDb(p),
    sort_order: i,
  }))
  await supabase.from('projects').insert(rows)
}

async function _seedAbout() {
  await supabase.from('about').insert(aboutToDb(DEFAULT_ABOUT))
}

async function _seedClients() {
  const rows = DEFAULT_CLIENTS.map((c, i) => ({
    name: c.name,
    logo: c.logo,
    sort_order: i,
  }))
  await supabase.from('clients').insert(rows)
}

// ── Misc ──────────────────────────────────────────────────────────────

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}
