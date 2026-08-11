import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'

export default function EducationManager() {
  const { education, setEducation } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editingIdx, setEditingIdx] = useState(null)
  const [form, setForm] = useState({ degree: '', school: '', year: '', detail: '' })

  const openCreate = () => { setEditingIdx(null); setForm({ degree: '', school: '', year: '', detail: '' }); setShowModal(true) }
  const openEdit = (idx) => { setEditingIdx(idx); const ed = education[idx]; setForm({ degree: ed.degree, school: ed.school, year: ed.year, detail: ed.detail }); setShowModal(true) }

  const handleSave = () => {
    if (!form.degree) return alert('Degree required')
    const payload = { degree: form.degree, school: form.school, year: form.year, detail: form.detail }
    if (editingIdx!==null) {
      const arr=[...education]; arr[editingIdx]=payload; setEducation(arr)
    } else {
      setEducation([payload, ...education])
    }
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-violet-400 uppercase">Admin / Education</div>
          <h1 className="font-serif text-3xl text-white mt-2">Education History</h1>
          <p className="font-mono text-xs text-zinc-500 mt-1">Manage your education entries — BE, Diploma, SEE — appears in About section. No code needed.</p>
        </div>
        <button onClick={openCreate} className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4"/>Add Education</button>
      </div>

      <div className="space-y-3">
        {education.map((ed, idx)=>(
          <div key={idx} className="flex justify-between p-5 rounded-2xl border border-white/10 bg-[#0a0a0f]">
            <div>
              <div className="font-medium text-white">{ed.degree} — {ed.school}</div>
              <div className="font-mono text-xs text-zinc-500 mt-1">{ed.year}</div>
              <div className="font-mono text-xs text-zinc-400 mt-2">{ed.detail}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>openEdit(idx)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><Edit2 className="w-4 h-4"/></button>
              <button onClick={()=>{ if(confirm('Delete?')) setEducation(education.filter((_,i)=>i!==idx))}} className="w-8 h-8 rounded-full glass flex items-center justify-center text-red-300"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20, opacity: 0 }} className="w-full max-w-lg glass rounded-[1.5rem] border border-white/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl text-white">{editingIdx!==null ? 'Edit' : 'New'} Education</h3>
                <button onClick={()=>setShowModal(false)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><X className="w-4 h-4"/></button>
              </div>
              <div className="space-y-4">
                <div><label className="font-mono text-xs text-zinc-500">Degree / Level</label><input value={form.degree} onChange={e=>setForm({...form, degree: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="BE Computer" /></div>
                <div><label className="font-mono text-xs text-zinc-500">School / College</label><input value={form.school} onChange={e=>setForm({...form, school: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Acme Engineering College" /></div>
                <div><label className="font-mono text-xs text-zinc-500">Year / Period</label><input value={form.year} onChange={e=>setForm({...form, year: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="2020 — 2025" /></div>
                <div><label className="font-mono text-xs text-zinc-500">Detail</label><textarea value={form.detail} onChange={e=>setForm({...form, detail: e.target.value})} rows={3} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Brief detail" /></div>
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
