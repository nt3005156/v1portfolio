import { motion } from 'framer-motion'
import { Mail, MapPin, Github, Linkedin, Send } from 'lucide-react'
import { useAppData } from '../../context/AdminContext'
import { useAdmin } from '../../context/AdminContext'
import { useState } from 'react'
import { api, isApiEnabled } from '../../lib/api'

export default function Contact() {
  const { personalData } = useAppData()
  const { addMessageLocal } = useAdmin()
  const [form, setForm] = useState({ name: '', email: '', type: 'Student (Class 11/12)', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const msg = {
      id: `msg-${Date.now()}`,
      name: form.name,
      email: form.email,
      type: form.type,
      message: form.message,
      at: new Date().toISOString(),
      read: false
    }

    try {
      if (isApiEnabled()) {
        await api.createMessage({ name: form.name, email: form.email, type: form.type, message: form.message })
      } else {
        // Fallback localStorage
        const existing = JSON.parse(localStorage.getItem('exp_messages') || '[]')
        localStorage.setItem('exp_messages', JSON.stringify([msg, ...existing].slice(0, 500)))
        addMessageLocal(msg)
      }
      setSent(true)
      setForm({ name: '', email: '', type: 'Student (Class 11/12)', message: '' })
      setTimeout(()=>setSent(false), 6000)
    } catch (err) {
      setError(err.message || 'Failed to send, saved locally')
      // Save locally as backup
      try {
        const existing = JSON.parse(localStorage.getItem('exp_messages') || '[]')
        localStorage.setItem('exp_messages', JSON.stringify([msg, ...existing].slice(0, 500)))
        addMessageLocal(msg)
        setSent(true)
      } catch {}
    }
  }

  return (
    <section id="contact" className="relative py-24 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="glass rounded-[2rem] overflow-hidden grid lg:grid-cols-2">
          <div className="p-8 md:p-12">
            <div className="font-mono text-[11px] tracking-[0.2em] text-cyan-300 uppercase">06 — Contact — real person here</div>
            <h2 className="font-serif text-5xl leading-[0.9] mt-4">Got stuck?<br/><span className="italic font-light">Just ping me.</span></h2>
            <p className="font-mono text-sm leading-relaxed text-zinc-400 mt-6 max-w-[38ch]">I read every message myself — usually late at night after classes. If you're confused about a chapter or just want to say hi, go ahead. I don't bite.</p>

            <div className="mt-10 space-y-4">
              <a href={`mailto:${personalData.email}`} className="flex items-center gap-3 glass rounded-full px-5 py-3 w-fit hover:bg-white/10 transition">
                <Mail className="w-4 h-4 text-violet-400" /><span className="font-mono text-sm text-zinc-300">{personalData.email}</span>
              </a>
              <div className="flex items-center gap-3 glass rounded-full px-5 py-3 w-fit">
                <MapPin className="w-4 h-4 text-cyan-400" /><span className="font-mono text-sm text-zinc-300">{personalData.location}</span>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="font-mono text-xs text-zinc-300">I usually reply within a few hours, not days.</div>
              <div className="font-mono text-[11px] text-zinc-500 mt-1">Unless exams are on — then I’m probably also panicking with you, but I’ll still reply. Promise no spam, no newsletter you didn’t ask for.</div>
              {isApiEnabled() && <div className="mt-2 font-mono text-[10px] text-emerald-300">✓ Connected to secure database — messages stored safely</div>}
            </div>

            <div className="mt-8 flex gap-3">
              {[
                { icon: Github, href: personalData.socials?.github || '#' },
                { icon: Linkedin, href: personalData.socials?.linkedin || '#' },
              ].map((s,i) => (
                <a key={i} href={s.href} className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-white/10 transition"><s.icon className="w-5 h-5" /></a>
              ))}
            </div>
          </div>

          <div className="bg-[#0f0f12] border-l border-white/5 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono text-xs text-zinc-500 uppercase">Your name</label>
                  <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="mt-2 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none" placeholder="What should I call you?" />
                </div>
                <div>
                  <label className="font-mono text-xs text-zinc-500 uppercase">Email — I won't share it</label>
                  <input required type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="mt-2 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="font-mono text-xs text-zinc-500 uppercase">You are?</label>
                <select value={form.type} onChange={e=>setForm({...form, type: e.target.value})} className="mt-2 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white focus:border-violet-500/50 focus:outline-none">
                  <option className="bg-black">Student (Class 11/12) — need help</option>
                  <option className="bg-black">Parent — worried about marks</option>
                  <option className="bg-black">Educator / School — want to collaborate</option>
                  <option className="bg-black">Just saying hi</option>
                  <option className="bg-black">Other</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-xs text-zinc-500 uppercase">What's up?</label>
                <textarea required rows={5} value={form.message} onChange={e=>setForm({...form, message: e.target.value})} className="mt-2 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none" placeholder="Write like you talk to a friend. What chapter confused you?" />
              </div>
              <button type="submit" className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition">
                Send it to Nitesh <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              {sent && <div className="font-mono text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 text-center">✓ Got it! I saw it in my admin panel. I'll reply soon — usually before I sleep. — Nitesh</div>}
              {error && <div className="font-mono text-xs text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-center">{error}</div>}
              <div className="font-mono text-[11px] text-zinc-500 text-center">I reply myself. No bots. {isApiEnabled() ? 'Stored safely in database.' : 'No spam.'}</div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
