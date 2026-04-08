import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  await supabase.from('projects').select('id').limit(1)
  res.status(200).json({ ok: true, ts: new Date().toISOString() })
}
