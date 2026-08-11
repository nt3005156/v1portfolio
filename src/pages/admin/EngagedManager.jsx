import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'

export default function EngagedManager() {
  const { engaged, setEngaged, addEngaged, updateEngaged, deleteEngaged } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', level: '', desc: '' })

  const openCreate = () => { setEditing(null); setForm({ name: '', level: '', desc: '' }); setShowModal(true) }
  const openEdit = (item) => { setEditing(item); setForm({ name: item.name, level: item.level, desc: item.desc }); setShowModal(true) }

  const handleSave = () => {
    if (!form.name) return alert('Name required')
    if (editing) {
      updateEngaged(editing.id || editing.name, form)
    } else {
      addEngaged(form)
    }
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-violet-400 uppercase">Admin / Currently Engaged</div>
          <h1 className="font-serif text-3xl text-white mt-2">Currently Teaching At</h1>
          <p className="font-mono text-xs text-zinc-500 mt-1">Manage RIMS, SRSS, APS, PSS, RSS etc — appears in About section. No code needed.</p>
        </div>
        <button onClick={openCreate} className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4"/>Add School</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {engaged.map((sch, idx)=>(
          <div key={sch.id || idx} className="p-5 rounded-2xl border border-white/10 bg-[#0a0a0f] flex justify-between">
            <div>
              <div className="font-medium text-white">{sch.name} <span className="text-zinc-500 text-xs">({sch.level})</span></div>
              <div className="font-mono text-xs text-zinc-500 mt-1">{sch.desc}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={()=>openEdit(sch)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><Edit2 className="w-4 h-4"/></button>
              <button onClick={()=>{ if(confirm('Delete?')) deleteEngaged(sch.id || sch.name)}} className="w-8 h-8 rounded-full glass flex items-center justify-center text-red-300"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        ))}
        {engaged.length===0 && <div className="col-span-3 glass rounded-2xl p-10 text-center font-mono text-sm text-zinc-500">No schools added. Add RIMS, SRSS etc.</div>}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20, opacity: 0 }} className="w-full max-w-md glass rounded-[1.5rem] border border-white/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl text-white">{editing ? 'Edit' : 'New'} School</h3>
                <button onClick={()=>setShowModal(false)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><X className="w-4 h-4"/></button>
              </div>
              <div className="space-y-4">
                <div><label className="font-mono text-xs text-zinc-500">School Name / Short</label><input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="RIMS" /></div>
                <div><label className="font-mono text-xs text-zinc-500">Level / Grades</label><input value={form.level} onChange={e=>setForm({...form, level: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="+2 or 9,10 or 6,7,8,9,10" /></div>
                <div><label className="font-mono text-xs text-zinc-500">Description</label><input value={form.desc} onChange={e=>setForm({...form, desc: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Plus 2 - Computer Science" /></div>
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
