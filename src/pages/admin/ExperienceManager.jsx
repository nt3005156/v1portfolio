import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'

export default function ExperienceManager() {
  const { experience, setExperience } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editingIdx, setEditingIdx] = useState(null)
  const [form, setForm] = useState({ role: '', org: '', period: '', location: '', points: [''], color: 'violet' })

  const openCreate = () => { setEditingIdx(null); setForm({ role: '', org: '', period: '', location: '', points: [''], color: 'violet' }); setShowModal(true) }
  const openEdit = (idx) => { setEditingIdx(idx); const exp = experience[idx]; setForm({ role: exp.role, org: exp.org, period: exp.period, location: exp.location, points: exp.points?.length ? exp.points : [''], color: exp.color || 'violet' }); setShowModal(true) }

  const handleSave = () => {
    if (!form.role) return alert('Role required')
    const payload = { id: editingIdx !== null ? experience[editingIdx].id : Date.now(), role: form.role, org: form.org, period: form.period, location: form.location, points: form.points.filter(p=>p.trim()), color: form.color }
    if (editingIdx !== null) {
      const arr = [...experience]; arr[editingIdx]=payload; setExperience(arr)
    } else {
      setExperience([payload, ...experience])
    }
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-violet-400 uppercase">Admin / Where I've Been and Built</div>
          <h1 className="font-serif text-3xl text-white mt-2">Manage Experience — No Code Needed</h1>
          <p className="font-mono text-xs text-zinc-500 mt-1">This is the "Where I've been and built" section. Update roles, schools, points anytime — live on homepage.</p>
        </div>
        <button onClick={openCreate} className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4"/>Add Experience</button>
      </div>

      <div className="space-y-4">
        {experience.map((exp, idx)=>(
          <div key={exp.id || idx} className="rounded-[1.5rem] border border-white/10 bg-[#0a0a0f] p-6">
            <div className="flex justify-between">
              <div>
                <div className="font-medium text-white">{exp.role}</div>
                <div className="font-mono text-xs text-zinc-500 mt-1">{exp.org} • {exp.period} • {exp.location}</div>
                <ul className="mt-3 space-y-1 list-disc pl-4 font-mono text-xs text-zinc-400">
                  {(exp.points||[]).map((p,i)=><li key={i}>{p}</li>)}
                </ul>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>openEdit(idx)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><Edit2 className="w-4 h-4"/></button>
                <button onClick={()=>{ if(confirm('Delete?')) { const arr=experience.filter((_,i)=>i!==idx); setExperience(arr) }}} className="w-8 h-8 rounded-full glass flex items-center justify-center text-red-300"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-auto">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20, opacity: 0 }} className="w-full max-w-2xl glass rounded-[1.5rem] border border-white/10 p-6 my-8 max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl text-white">{editingIdx!==null ? 'Edit' : 'New'} Experience</h3>
                <button onClick={()=>setShowModal(false)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><X className="w-4 h-4"/></button>
              </div>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="font-mono text-xs text-zinc-500">Role / Title</label><input value={form.role} onChange={e=>setForm({...form, role: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Senior Developer & Teacher" /></div>
                  <div><label className="font-mono text-xs text-zinc-500">Organization</label><input value={form.org} onChange={e=>setForm({...form, org: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="My Classes" /></div>
                  <div><label className="font-mono text-xs text-zinc-500">Period</label><input value={form.period} onChange={e=>setForm({...form, period: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="2022 — Now" /></div>
                  <div><label className="font-mono text-xs text-zinc-500">Location</label><input value={form.location} onChange={e=>setForm({...form, location: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Kathmandu" /></div>
                </div>
                <div>
                  <label className="font-mono text-xs text-zinc-500">Points (what you did)</label>
                  <div className="space-y-2 mt-2">
                    {form.points.map((p,i)=>(
                      <div key={i} className="flex gap-2">
                        <input value={p} onChange={e=>{ const arr=[...form.points]; arr[i]=e.target.value; setForm({...form, points: arr})}} className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white" placeholder={`Point ${i+1}`} />
                        <button onClick={()=>{ const arr=form.points.filter((_,idx)=>idx!==i); setForm({...form, points: arr})}} className="w-10 h-10 rounded-xl bg-red-500/10 text-red-300 flex items-center justify-center"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    ))}
                  </div>
                  <button onClick={()=>setForm({...form, points:[...form.points, '']})} className="mt-3 px-4 py-2 rounded-full glass text-xs">+ Add Point</button>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={()=>setShowModal(false)} className="px-5 py-2.5 rounded-full glass text-sm">Cancel</button>
                <button onClick={handleSave} className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2"><Save className="w-4 h-4"/>Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
