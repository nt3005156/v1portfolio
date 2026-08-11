import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'

const colorPresets = [
  'from-violet-600 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-cyan-500 to-blue-600',
  'from-amber-500 to-orange-600',
  'from-pink-500 to-rose-600',
]
const iconPresets = ['💻','⚛️','∫','📚','🔬','📐','🌍','🧪']

export default function SubjectsManager() {
  const { learning, addSubject, updateSubject, deleteSubject } = useAdmin()
  const [selectedClass, setSelectedClass] = useState(learning.classes[0]?.id || '')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', short: '', description: '', icon: '💻', color: colorPresets[0] })

  const currentClass = learning.classes.find(c=>c.id===selectedClass)

  const openCreate = () => { setEditing(null); setForm({ name: '', short: '', description: '', icon: '💻', color: colorPresets[0] }); setShowModal(true) }
  const openEdit = (sub) => { setEditing(sub); setForm({ name: sub.name, short: sub.short, description: sub.description, icon: sub.icon, color: sub.color }); setShowModal(true) }

  const handleSave = () => {
    if (!form.name) return alert('Name required')
    if (editing) updateSubject(selectedClass, editing.id, form)
    else addSubject(selectedClass, { ...form, chapters: [] })
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-cyan-400 uppercase">Admin / Subjects</div>
          <h1 className="font-serif text-3xl text-white mt-2">Manage Subjects</h1>
          <p className="font-mono text-xs text-zinc-500 mt-1">Subjects live inside classes. e.g., Computer Science inside Class 12.</p>
        </div>
        <div className="flex gap-3">
          <select value={selectedClass} onChange={e=>setSelectedClass(e.target.value)} className="glass rounded-full px-5 py-2.5 text-sm text-white bg-[#0a0a0f] border border-white/10">
            {learning.classes.map(c=> <option key={c.id} value={c.id} className="bg-black">{c.name}</option>)}
          </select>
          <button onClick={openCreate} className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4"/>New Subject</button>
        </div>
      </div>

      {!currentClass ? <div className="font-mono text-sm text-zinc-500">No class found. Create a class first.</div> :
        <div className="grid md:grid-cols-2 gap-4">
          {currentClass.subjects.map(sub => (
            <div key={sub.id} className="rounded-[1.5rem] border border-white/10 bg-[#0a0a0f] p-6 flex justify-between">
              <div className="flex gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sub.color} flex items-center justify-center text-xl`}>{sub.icon}</div>
                <div>
                  <div className="font-medium text-white">{sub.name} <span className="text-zinc-500 text-xs">({sub.short})</span></div>
                  <div className="font-mono text-xs text-zinc-500 mt-1 max-w-[24ch]">{sub.description}</div>
                  <div className="font-mono text-xs text-zinc-600 mt-2">{sub.chapters?.length || 0} chapters</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={()=>openEdit(sub)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><Edit2 className="w-4 h-4"/></button>
                <button onClick={()=>{ if(confirm(`Delete ${sub.name}?`)) deleteSubject(selectedClass, sub.id)}} className="w-8 h-8 rounded-full glass flex items-center justify-center text-red-300"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
          ))}
          {currentClass.subjects.length===0 && <div className="col-span-2 glass rounded-2xl p-8 text-center font-mono text-sm text-zinc-500">No subjects yet in {currentClass.name}. Create first.</div>}
        </div>
      }

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20, opacity: 0 }} className="w-full max-w-lg glass rounded-[1.5rem] border border-white/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl text-white">{editing ? 'Edit Subject' : 'New Subject'} in {currentClass?.name}</h3>
                <button onClick={()=>setShowModal(false)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><X className="w-4 h-4"/></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="font-mono text-xs text-zinc-500">Name</label><input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none" placeholder="Computer Science" /></div>
                  <div><label className="font-mono text-xs text-zinc-500">Short</label><input value={form.short} onChange={e=>setForm({...form, short: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none" placeholder="CS" /></div>
                </div>
                <div><label className="font-mono text-xs text-zinc-500">Description</label><textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} rows={2} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none" /></div>
                <div><label className="font-mono text-xs text-zinc-500">Icon</label><div className="mt-2 flex gap-2 flex-wrap">{iconPresets.map(ic=><button key={ic} onClick={()=>setForm({...form, icon: ic})} className={`w-10 h-10 rounded-xl text-xl border ${form.icon===ic ? 'border-white bg-white/10' : 'border-white/10 bg-white/5'}`}>{ic}</button>)} <input value={form.icon} onChange={e=>setForm({...form, icon: e.target.value})} className="w-20 bg-white/[0.04] border border-white/10 rounded-xl px-2 py-2 text-sm text-white" /></div></div>
                <div><label className="font-mono text-xs text-zinc-500">Color Gradient</label><div className="mt-2 grid grid-cols-5 gap-2">{colorPresets.map(c=><button key={c} onClick={()=>setForm({...form, color: c})} className={`h-10 rounded-xl bg-gradient-to-br ${c} border ${form.color===c ? 'border-white' : 'border-transparent'}`} />)}</div></div>
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
