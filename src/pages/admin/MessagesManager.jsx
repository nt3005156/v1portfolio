import { useState, useEffect } from 'react'
import { Mail, Trash2, CheckCircle, Clock, Search, Send } from 'lucide-react'

export default function MessagesManager() {
  const [messages, setMessages] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const load = () => {
    try {
      const data = JSON.parse(localStorage.getItem('exp_messages') || '[]')
      setMessages(data)
    } catch { setMessages([]) }
  }

  useEffect(()=>{ load() }, [])

  const save = (arr) => {
    localStorage.setItem('exp_messages', JSON.stringify(arr))
    setMessages(arr)
  }

  const toggleRead = (id) => {
    const arr = messages.map(m=> m.id===id ? {...m, read: !m.read} : m)
    save(arr)
  }
  const del = (id) => {
    if(!confirm('Delete this message?')) return
    const arr = messages.filter(m=>m.id!==id)
    save(arr)
  }
  const markAllRead = () => {
    const arr = messages.map(m=>({...m, read: true}))
    save(arr)
  }
  const clearAll = () => {
    if(!confirm('Clear all messages?')) return
    localStorage.removeItem('exp_messages')
    setMessages([])
  }

  const filtered = messages.filter(m=>{
    if (filter==='unread' && m.read) return false
    if (filter==='read' && !m.read) return false
    if (search) {
      const q = search.toLowerCase()
      return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.message.toLowerCase().includes(q) || m.type.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-cyan-400 uppercase">Admin / Messages — Student Inquiries</div>
          <h1 className="font-serif text-3xl text-white mt-2">Contact Messages</h1>
          <p className="font-mono text-xs text-zinc-500 mt-1">All messages from contact form appear here. In production, also send to email/database.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={markAllRead} className="px-4 py-2 rounded-full glass text-xs">Mark all read</button>
          <button onClick={clearAll} className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs">Clear all</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, email, message..." className="pl-10 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-sm text-white w-[280px] outline-none" />
        </div>
        <div className="flex gap-1 p-1 bg-black rounded-full border border-white/10">
          {[
            { id: 'all', label: `All (${messages.length})` },
            { id: 'unread', label: `Unread (${messages.filter(m=>!m.read).length})` },
            { id: 'read', label: `Read (${messages.filter(m=>m.read).length})` },
          ].map(t=> <button key={t.id} onClick={()=>setFilter(t.id)} className={`px-4 py-1.5 rounded-full text-xs font-mono ${filter===t.id ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}>{t.label}</button>)}
        </div>
        <div className="font-mono text-xs text-zinc-600">Storage: localStorage • For 1000 students, migrate to Supabase/DB in production.</div>
      </div>

      {filtered.length===0 ? (
        <div className="glass rounded-[1.5rem] p-12 text-center">
          <Mail className="w-10 h-10 mx-auto text-zinc-600 mb-4" />
          <div className="font-serif text-xl text-white">No messages yet</div>
          <div className="font-mono text-sm text-zinc-500 mt-2">When students submit the contact form, they will appear here. Test via homepage → Contact.</div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(m=>(
            <div key={m.id} className={`group rounded-[1.5rem] border p-5 transition ${m.read ? 'border-white/5 bg-white/[0.02]' : 'border-violet-500/30 bg-violet-500/5'}`}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm ${m.read ? 'bg-white/10 text-zinc-400' : 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white'}`}>{m.name[0]?.toUpperCase()||'?'}</div>
                  <div>
                    <div className="flex items-center gap-2"><span className="font-medium text-white text-sm">{m.name}</span><span className={`w-2 h-2 rounded-full ${m.read ? 'bg-zinc-600' : 'bg-emerald-400 animate-pulse'}`} /><span className="font-mono text-[11px] text-zinc-500">{new Date(m.at).toLocaleString()}</span></div>
                    <div className="font-mono text-xs text-zinc-400 mt-1">{m.email} • {m.type}</div>
                    <div className="mt-3 font-mono text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{m.message}</div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.type)}&body=${encodeURIComponent(`Hi ${m.name},\n\n`)}`} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10" title="Reply"><Send className="w-4 h-4"/></a>
                  <button onClick={()=>toggleRead(m.id)} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10" title={m.read ? 'Mark unread' : 'Mark read'}>{m.read ? <Clock className="w-4 h-4"/> : <CheckCircle className="w-4 h-4 text-emerald-400"/>}</button>
                  <button onClick={()=>del(m.id)} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-red-500/10 text-red-300" title="Delete"><Trash2 className="w-4 h-4"/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="glass rounded-2xl p-5 font-mono text-xs text-zinc-500">
        <div className="font-medium text-white mb-2">Production Notes — 1000 students handling:</div>
        <ul className="list-disc pl-4 space-y-1">
          <li>Current demo: localStorage (500 messages max, ~5MB). 1000 students browsing is fine (static CDN).</li>
          <li>For production with 1000 concurrent contact: Move exp_messages to Supabase table or API — just replace save/load with fetch.</li>
          <li>Content persistence after 1 month update: localStorage stays on same domain after new deployment. Plus use Settings → Export JSON backup before deploy.</li>
          <li>PDF upload 5MB limit is localStorage demo; for production use Supabase Storage / S3 — file handling already isolated.</li>
        </ul>
      </div>
    </div>
  )
}
