import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, Clock } from 'lucide-react'

export default function DailyLogManager() {
  const { dailyLogs, addLog, updateLog, deleteLog, setDailyLogs } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ time: '09:00', text: '', date: 'Today' })

  const openCreate = () => { setEditing(null); setForm({ time: '09:00', text: '', date: 'Today' }); setShowModal(true) }
  const openEdit = (log) => { setEditing(log); setForm({ time: log.time, text: log.text, date: log.date || 'Today' }); setShowModal(true) }

  const handleSave = () => {
    if (!form.text) return alert('Text required')
    if (editing) {
      updateLog(editing.id || `${editing.time}-${editing.date}`, form)
    } else {
      addLog(form)
    }
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-emerald-400 uppercase">Admin / What Happened Today</div>
          <h1 className="font-serif text-3xl text-white mt-2">Daily Teaching Log — Admin Managed</h1>
          <p className="font-mono text-xs text-zinc-500 mt-1">This appears in About section. Update what happened today without touching code.</p>
        </div>
        <button onClick={openCreate} className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4"/>Add Log</button>
      </div>

      <div className="grid gap-3">
        {dailyLogs.map((log, i) => (
          <div key={log.id || i} className="flex justify-between items-start p-5 rounded-2xl border border-white/10 bg-[#0a0a0f] group">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-mono text-xs text-zinc-400"><Clock className="w-4 h-4" /></div>
              <div>
                <div className="flex gap-2 items-center"><span className="font-mono text-xs text-violet-300">{log.time}</span><span className="font-mono text-[11px] text-zinc-600">{log.date}</span></div>
                <div className="font-mono text-sm text-white mt-1">{log.text}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>openEdit(log)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><Edit2 className="w-4 h-4"/></button>
              <button onClick={()=>{ if(confirm('Delete?')) deleteLog(log.id || `${log.time}-${log.date}`)}} className="w-8 h-8 rounded-full glass flex items-center justify-center text-red-300"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        ))}
        {dailyLogs.length===0 && <div className="glass rounded-2xl p-10 text-center font-mono text-sm text-zinc-500">No logs yet. Add your first teaching log.</div>}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20, opacity: 0 }} className="w-full max-w-lg glass rounded-[1.5rem] border border-white/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl text-white">{editing ? 'Edit Log' : 'New Log'}</h3>
                <button onClick={()=>setShowModal(false)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><X className="w-4 h-4"/></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="font-mono text-xs text-zinc-500">Time</label><input value={form.time} onChange={e=>setForm({...form, time: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="09:00" /></div>
                  <div><label className="font-mono text-xs text-zinc-500">Date Label</label><input value={form.date} onChange={e=>setForm({...form, date: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Today" /></div>
                </div>
                <div><label className="font-mono text-xs text-zinc-500">What happened?</label><textarea value={form.text} onChange={e=>setForm({...form, text: e.target.value})} rows={4} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Class 12 — explained 3NF..." /></div>
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
        <div className="font-medium text-white mb-2">How it works</div>
        <div>This log appears in About section on homepage. When you update here, student sees it live — no code deploy needed. Perfect for daily teaching journal.</div>
      </div>
    </div>
  )
}
