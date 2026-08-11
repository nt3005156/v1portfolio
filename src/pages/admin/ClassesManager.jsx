import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, GraduationCap, Save, X } from 'lucide-react'

const colorPresets = [
  'from-violet-600 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-cyan-500 to-blue-600',
  'from-amber-500 to-orange-600',
  'from-pink-500 to-rose-600',
  'from-indigo-500 to-violet-600',
]

export default function ClassesManager() {
  const { learning, addClass, updateClass, deleteClass } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', short: '', description: '', color: colorPresets[0], accent: '#7c3aed', stats: { students: '0' } })

  const openCreate = () => { setEditing(null); setForm({ name: '', short: '', description: '', color: colorPresets[0], accent: '#7c3aed', stats: { students: '0' } }); setShowModal(true) }
  const openEdit = (cls) => { setEditing(cls); setForm({ name: cls.name, short: cls.short, description: cls.description, color: cls.color, accent: cls.accent, stats: cls.stats }); setShowModal(true) }

  const handleSave = () => {
    if (!form.name || !form.short) return alert('Name and Short required')
    if (editing) updateClass(editing.id, form)
    else addClass({ ...form, subjects: [] })
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-violet-400 uppercase">Admin / Classes</div>
          <h1 className="font-serif text-3xl text-white mt-2">Manage Classes</h1>
          <p className="font-mono text-xs text-zinc-500 mt-1">Create new classes like Class 11, 12, 10 — each with its own color theme.</p>
        </div>
        <button onClick={openCreate} className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2 hover:bg-zinc-200"><Plus className="w-4 h-4"/>New Class</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {learning.classes.map(cls => (
          <motion.div key={cls.id} layout className="group relative rounded-[1.5rem] border border-white/10 bg-[#0a0a0f] p-6">
            <div className={`absolute inset-0 bg-gradient-to-br ${cls.color} opacity-5 group-hover:opacity-10 transition rounded-[1.5rem]`} />
            <div className="relative">
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cls.color} flex items-center justify-center font-serif text-white`}>{cls.short}</div>
                  <div>
                    <div className="font-medium text-white">{cls.name}</div>
                    <div className="font-mono text-xs text-zinc-500">{cls.id} • {cls.subjects.length} subjects</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>openEdit(cls)} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10"><Edit2 className="w-4 h-4"/></button>
                  <button onClick={()=>{ if(confirm(`Delete ${cls.name}?`)) deleteClass(cls.id)}} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-red-500/20 text-red-300"><Trash2 className="w-4 h-4"/></button>
                </div>
              </div>
              <p className="font-mono text-xs text-zinc-400 mt-4">{cls.description}</p>
              <div className="mt-4 flex gap-2">
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-[11px] font-mono text-zinc-400">Color: {cls.color.split(' ')[0]}</span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-[11px] font-mono text-zinc-400">{cls.subjects.reduce((a,b)=>a+b.chapters.length,0)} chapters</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ y: 20, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} className="w-full max-w-lg glass rounded-[1.5rem] border border-white/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl text-white">{editing ? 'Edit Class' : 'Create New Class'}</h3>
                <button onClick={()=>setShowModal(false)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><X className="w-4 h-4"/></button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="font-mono text-xs text-zinc-500">Name *</label><input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" placeholder="Class 11" /></div>
                  <div><label className="font-mono text-xs text-zinc-500">Short *</label><input value={form.short} onChange={e=>setForm({...form, short: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none" placeholder="11" /></div>
                </div>
                <div><label className="font-mono text-xs text-zinc-500">Description</label><textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} rows={3} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none" placeholder="Foundation..." /></div>
                <div><label className="font-mono text-xs text-zinc-500">Color Gradient</label><div className="mt-2 grid grid-cols-3 gap-2">{colorPresets.map(c=><button key={c} onClick={()=>setForm({...form, color: c})} className={`h-10 rounded-xl bg-gradient-to-br ${c} border ${form.color===c ? 'border-white' : 'border-transparent'}`} />)}</div></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="font-mono text-xs text-zinc-500">Accent Hex</label><input value={form.accent} onChange={e=>setForm({...form, accent: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  <div><label className="font-mono text-xs text-zinc-500">Students Label</label><input value={form.stats?.students || ''} onChange={e=>setForm({...form, stats: { ...form.stats, students: e.target.value }})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="420+" /></div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button onClick={()=>setShowModal(false)} className="px-5 py-2.5 rounded-full glass text-sm">Cancel</button>
                <button onClick={handleSave} className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2"><Save className="w-4 h-4"/>{editing ? 'Update' : 'Create'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
