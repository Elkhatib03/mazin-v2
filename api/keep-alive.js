import { supabase } from '../src/supabase.js'

export default async function handler(req, res) {
  await supabase.from('projects').select('id').limit(1)
  res.status(200).json({ ok: true, ts: new Date().toISOString() })
}
