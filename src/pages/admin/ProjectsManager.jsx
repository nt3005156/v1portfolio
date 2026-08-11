import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'

const colorPresets = [
  'from-violet-600 to-indigo-600',
  'from-cyan-500 to-blue-500',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-pink-500 to-rose-500',
]

export default function ProjectsManager() {
  const { projects, addProject, updateProject, deleteProject } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', category: 'Education Platform', desc: '', longDesc: '', tags: '', color: colorPresets[0], accent: '#7c3aed', image: 'hub', year: '2024', links: { live: '#', github: '#' }, featured: true })

  const openCreate = () => { setEditing(null); setForm({ title: '', category: 'Education Platform', desc: '', longDesc: '', tags: '', color: colorPresets[0], accent: '#7c3aed', image: 'hub', year: '2024', links: { live: '#', github: '#' }, featured: true }); setShowModal(true) }
  const openEdit = (p) => { setEditing(p); setForm({ ...p, tags: (p.tags||[]).join(', ') }); setShowModal(true) }

  const handleSave = () => {
    if (!form.title) return alert('Title required')
    const payload = { ...form, tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean) }
    if (editing) updateProject(editing.id, payload)
    else addProject(payload)
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-amber-300 uppercase">Admin / Projects</div>
          <h1 className="font-serif text-3xl text-white mt-2">Manage Portfolio Projects</h1>
          <p className="font-mono text-xs text-zinc-500 mt-1">Add featured work — shows on homepage with filtering.</p>
        </div>
        <button onClick={openCreate} className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4"/>New Project</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map(p=>(
          <div key={p.id} className="rounded-[1.5rem] border border-white/10 bg-[#0a0a0f] p-6">
            <div className="flex justify-between">
              <div className={`px-3 py-1 rounded-full bg-gradient-to-br ${p.color} text-xs text-white`}>{p.category}</div>
              <div className="flex gap-2">
                <button onClick={()=>openEdit(p)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><Edit2 className="w-4 h-4"/></button>
                <button onClick={()=>{ if(confirm('Delete?')) deleteProject(p.id)}} className="w-8 h-8 rounded-full glass flex items-center justify-center text-red-300"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
            <div className="font-serif text-xl text-white mt-4">{p.title}</div>
            <div className="font-mono text-xs text-zinc-500 mt-1">{p.desc}</div>
            <div className="mt-3 flex gap-2 flex-wrap">{(p.tags||[]).map(t=><span key={t} className="px-2 py-1 rounded-full bg-white/5 text-[10px] font-mono text-zinc-400">{t}</span>)}</div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-auto">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20, opacity: 0 }} className="w-full max-w-2xl glass rounded-[1.5rem] border border-white/10 p-6 my-8 max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl text-white">{editing ? 'Edit Project' : 'New Project'}</h3>
                <button onClick={()=>setShowModal(false)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><X className="w-4 h-4"/></button>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="font-mono text-xs text-zinc-500">Title</label><input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  <div><label className="font-mono text-xs text-zinc-500">Category</label><input value={form.category} onChange={e=>setForm({...form, category: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                </div>
                <div><label className="font-mono text-xs text-zinc-500">Short Desc</label><textarea value={form.desc} onChange={e=>setForm({...form, desc: e.target.value})} rows={2} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                <div><label className="font-mono text-xs text-zinc-500">Long Desc</label><textarea value={form.longDesc} onChange={e=>setForm({...form, longDesc: e.target.value})} rows={3} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="font-mono text-xs text-zinc-500">Tags (comma)</label><input value={form.tags} onChange={e=>setForm({...form, tags: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  <div><label className="font-mono text-xs text-zinc-500">Year</label><input value={form.year} onChange={e=>setForm({...form, year: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                </div>
                <div><label className="font-mono text-xs text-zinc-500">Color</label><div className="mt-2 flex gap-2">{colorPresets.map(c=><button key={c} onClick={()=>setForm({...form, color: c})} className={`h-10 w-10 rounded-xl bg-gradient-to-br ${c} border ${form.color===c ? 'border-white' : 'border-transparent'}`} />)}</div></div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="font-mono text-xs text-zinc-500">Live URL</label><input value={form.links?.live||''} onChange={e=>setForm({...form, links: {...form.links, live: e.target.value}})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  <div><label className="font-mono text-xs text-zinc-500">Github URL</label><input value={form.links?.github||''} onChange={e=>setForm({...form, links: {...form.links, github: e.target.value}})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                </div>
                <label className="flex items-center gap-2 font-mono text-xs text-zinc-400"><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form, featured: e.target.checked})} /> Featured on homepage</label>
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
