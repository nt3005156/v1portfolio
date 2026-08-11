import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, Upload, ExternalLink, Eye, EyeOff } from 'lucide-react'
import { readFileAsDataURL } from '../../utils/fileStorage'

export default function AdsManager() {
  const { ads, addAd, updateAd, deleteAd } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', company: '', description: '', imageUrl: '', linkUrl: '', active: true })

  const openCreate = () => { setEditing(null); setForm({ title: '', company: '', description: '', imageUrl: '', linkUrl: '', active: true }); setShowModal(true) }
  const openEdit = (ad) => { setEditing(ad); setForm({ title: ad.title, company: ad.company, description: ad.description, imageUrl: ad.imageUrl, linkUrl: ad.linkUrl, active: ad.active }); setShowModal(true) }

  const handleImageUpload = async (file) => {
    if (!file) return
    const dataUrl = await readFileAsDataURL(file)
    setForm({ ...form, imageUrl: dataUrl })
  }

  const handleSave = () => {
    if (!form.title) return alert('Title required')
    if (editing) updateAd(editing.id, form)
    else addAd(form)
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-amber-300 uppercase">Admin / Ads & Sponsors</div>
          <h1 className="font-serif text-3xl text-white mt-2">Sponsor / Advertisement</h1>
          <p className="font-mono text-xs text-zinc-500 mt-1">Add sponsor banners that appear on the website. You can add, edit, delete anytime. Images can be uploaded from computer.</p>
        </div>
        <button onClick={openCreate} className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4"/>New Ad / Sponsor</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ads.map(ad => (
          <div key={ad.id} className={`rounded-[1.5rem] border p-5 bg-[#0a0a0f] ${ad.active ? 'border-white/10' : 'border-white/5 opacity-60'}`}>
            {ad.imageUrl ? <img src={ad.imageUrl} alt={ad.title} className="w-full h-36 object-cover rounded-xl mb-4 border border-white/10" /> : <div className="w-full h-36 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-mono text-xs text-zinc-600 mb-4">No image</div>}
            <div className="flex justify-between items-start">
              <div>
                <div className="font-mono text-[11px] text-zinc-500">{ad.company}</div>
                <div className="font-medium text-white">{ad.title}</div>
                <div className="font-mono text-xs text-zinc-500 mt-1 line-clamp-2">{ad.description}</div>
                <div className="mt-2 flex items-center gap-2 font-mono text-[11px] text-violet-300"><ExternalLink className="w-3 h-3"/>{ad.linkUrl || 'No link'}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={()=>updateAd(ad.id, { active: !ad.active })} className="w-8 h-8 rounded-full glass flex items-center justify-center">{ad.active ? <Eye className="w-4 h-4"/> : <EyeOff className="w-4 h-4"/>}</button>
                <button onClick={()=>openEdit(ad)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><Edit2 className="w-4 h-4"/></button>
                <button onClick={()=>{ if(confirm('Delete ad?')) deleteAd(ad.id)}} className="w-8 h-8 rounded-full glass flex items-center justify-center text-red-300"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
            <div className="mt-3 font-mono text-[10px] text-zinc-600">{ad.active ? '✓ Active — visible on site' : '○ Hidden'}</div>
          </div>
        ))}
        {ads.length===0 && <div className="col-span-3 glass rounded-2xl p-10 text-center font-mono text-sm text-zinc-500">No ads yet. Create your first sponsor banner.</div>}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-auto">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20, opacity: 0 }} className="w-full max-w-lg glass rounded-[1.5rem] border border-white/10 p-6 my-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl text-white">{editing ? 'Edit Ad' : 'New Sponsor / Ad'}</h3>
                <button onClick={()=>setShowModal(false)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><X className="w-4 h-4"/></button>
              </div>

              <div className="space-y-4">
                <div><label className="font-mono text-xs text-zinc-500">Title *</label><input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none" placeholder="e.g., New Batch — Class 12" /></div>
                <div><label className="font-mono text-xs text-zinc-500">Company / Sponsor Name</label><input value={form.company} onChange={e=>setForm({...form, company: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none" placeholder="NKT Classes, or Sponsor Co." /></div>
                <div><label className="font-mono text-xs text-zinc-500">Description</label><textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} rows={3} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none" placeholder="Short line that appears under ad" /></div>
                <div><label className="font-mono text-xs text-zinc-500">Link URL (where ad points)</label><input value={form.linkUrl} onChange={e=>setForm({...form, linkUrl: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none" placeholder="https://... or #contact" /></div>
                <div>
                  <label className="font-mono text-xs text-zinc-500">Image — Upload from Computer</label>
                  <div className="mt-2 flex gap-3 items-center">
                    <label className="px-4 py-2 rounded-full bg-white text-black text-xs font-medium flex items-center gap-2 cursor-pointer hover:bg-zinc-200">
                      <Upload className="w-4 h-4"/> Upload Image
                      <input type="file" accept="image/*" className="hidden" onChange={e=>{ const f=e.target.files[0]; if(f) handleImageUpload(f) }} />
                    </label>
                    {form.imageUrl && <a href={form.imageUrl} target="_blank" className="font-mono text-xs text-violet-300">Preview</a>}
                  </div>
                  {form.imageUrl && <img src={form.imageUrl} alt="preview" className="mt-3 w-full h-40 object-cover rounded-xl border border-white/10" />}
                  <input value={form.imageUrl} onChange={e=>setForm({...form, imageUrl: e.target.value})} className="mt-3 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none" placeholder="Or paste image URL https://..." />
                </div>
                <label className="flex items-center gap-2 font-mono text-xs text-zinc-400"><input type="checkbox" checked={form.active} onChange={e=>setForm({...form, active: e.target.checked})} /> Active (visible on site)</label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button onClick={()=>setShowModal(false)} className="px-5 py-2.5 rounded-full glass text-sm">Cancel</button>
                <button onClick={handleSave} className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2"><Save className="w-4 h-4"/>{editing ? 'Update' : 'Create'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass rounded-2xl p-5 font-mono text-xs text-zinc-500">
        <div className="font-medium text-white mb-2">How sponsor ads work</div>
        <ul className="list-disc pl-4 space-y-1">
          <li>Ads are stored in localStorage (exp_ads) — for production move to DB.</li>
          <li>Frontend shows only active ads in Sponsors section.</li>
          <li>Admin can upload image from computer (stored as DataURL, 5MB demo limit) or paste URL.</li>
          <li>Link can be internal (#contact) or external (https).</li>
        </ul>
      </div>
    </div>
  )
}
