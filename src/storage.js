export const PROJECTS_KEY = 'mazin_projects'
export const ABOUT_KEY    = 'mazin_about'

export const DEFAULT_ABOUT = {
  name:      'Mazin Elkhatib',
  title:     'Art Director',
  location:  'Dubai, United Arab Emirates',
  bio:       "I'm an Art Director with over 10 years of experience shaping brands, campaigns, and digital experiences across Jordan and the UAE. I believe great design is not just about aesthetics — it's about telling stories that move people.\n\nCurrently leading creative at Black Orange in Dubai, I've worked with agencies like VMLY&R and Sudacé, collaborating with brands across the region to build identities that endure.",
  photo:     '',
  email:     'maz.designs92@gmail.com',
  linkedin:  'https://www.linkedin.com/in/mazinelkhatib-الخطيب-مازن-b5664910b',
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
    id: 'demo1', title: 'Brand Identity — Nour Studio', tag: 'Branding', status: 'published',
    description: 'A refined visual identity system for a boutique wellness studio in Amman. The project involved developing a complete brand language — from logo and typography to color system and print collateral.\n\nThe identity draws from the serene, natural environment of the studio, using organic forms and a restrained palette to convey calm and trust.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&q=80',
    photos: ['https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80', 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&q=80'],
    credits: 'Role: Art Direction & Brand Design\nClient: Nour Studio, Amman\nYear: 2024',
  },
  {
    id: 'demo2', title: 'Editorial Design — Mada Magazine', tag: 'Editorial', status: 'published',
    description: 'Art direction and layout design for a quarterly cultural publication covering arts, architecture, and urban life in the Arab world.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    photos: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80'],
    credits: 'Role: Art Direction & Layout Design\nPublication: Mada Magazine\nYear: 2023',
  },
  {
    id: 'demo3', title: 'Packaging — Oud & Co.', tag: 'Packaging', status: 'published',
    description: 'Luxury packaging design for an artisan oud fragrance house. The brief called for packaging that felt rooted in heritage while speaking to a contemporary global audience.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80',
    photos: [],
    credits: 'Role: Art Direction & Packaging Design\nClient: Oud & Co.\nYear: 2023',
  },
  {
    id: 'demo4', title: 'Web Design — Hayat Foundation', tag: 'Digital', status: 'published',
    description: 'Website and digital experience for a regional NGO working in health and education.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80',
    photos: [],
    credits: 'Role: Art Direction & Web Design\nClient: Hayat Foundation\nYear: 2022',
  },
  {
    id: 'demo5', title: 'Visual Identity — Manara Café', tag: 'Branding', status: 'published',
    description: 'Complete brand system for a specialty coffee concept in Amman — logo, packaging, signage, and environmental graphics.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
    photos: [],
    credits: 'Role: Brand Design\nClient: Manara Café\nYear: 2022',
  },
  {
    id: 'demo6', title: 'Campaign — Ramadan Collection', tag: 'Campaign', status: 'published',
    description: 'Art direction and photography for a seasonal fashion campaign celebrating the spirit of Ramadan.',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80',
    photos: [],
    credits: 'Role: Art Direction & Creative Strategy\nYear: 2022',
  },
]

export function getProjects() {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY)
    if (!raw) return DEMO_PROJECTS
    return JSON.parse(raw)
  } catch { return DEMO_PROJECTS }
}

export function saveProjects(projects) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
  window.dispatchEvent(new CustomEvent('mazin:projects'))
}

export function getAbout() {
  try {
    const raw = localStorage.getItem(ABOUT_KEY)
    if (!raw) return DEFAULT_ABOUT
    return { ...DEFAULT_ABOUT, ...JSON.parse(raw) }
  } catch { return DEFAULT_ABOUT }
}

export function saveAbout(data) {
  localStorage.setItem(ABOUT_KEY, JSON.stringify(data))
  window.dispatchEvent(new CustomEvent('mazin:about'))
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
