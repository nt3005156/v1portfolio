import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'
import { Shield, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const { login, isAuthenticated } = useAdmin()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // Redirect declaratively — calling navigate() during render is a React
  // side-effect-in-render warning and can loop.
  if (isAuthenticated) return <Navigate to="/admin" replace />

  const handle = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    // login() is async — without await this is a Promise (always truthy),
    // which made every attempt "succeed" and never show an error.
    const ok = await login(username, password)
    setBusy(false)
    if (ok) navigate('/admin')
    else setError('Invalid username or password.')
  }

  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-30" />
      <div className="absolute -top-1/2 -right-1/2 w-[80vw] h-[80vw] bg-gradient-to-br from-violet-600/20 to-cyan-400/10 rounded-full blur-[120px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="glass rounded-[2rem] p-8 md:p-10 border border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div>
            <div>
              <div className="font-mono text-xs tracking-widest text-zinc-500 uppercase">Expedition CMS</div>
              <div className="font-semibold text-white">Admin Access</div>
            </div>
          </div>

          <h1 className="font-serif text-3xl text-white leading-none">Welcome back,<br/><span className="italic font-light text-zinc-400">creator.</span></h1>
          <p className="font-mono text-xs text-zinc-500 mt-3">Manage classes, chapters, theme & content — no code needed.</p>

          <form onSubmit={handle} className="mt-8 space-y-4">
            <div>
              <label className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Username</label>
              <input value={username} onChange={e=>setUsername(e.target.value)} className="mt-2 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-violet-500/50 outline-none" placeholder="admin" />
            </div>
            <div>
              <label className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Password</label>
              <div className="relative mt-2">
                <input type={show ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white focus:border-violet-500/50 outline-none" />
                <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"><span>{show ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}</span></button>
              </div>
            </div>

            {error && <div className="font-mono text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{error}</div>}

            <button type="submit" disabled={busy} className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-zinc-200 transition disabled:opacity-60">
              {busy ? 'Signing in…' : 'Enter Dashboard'} <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-6">
              <Link to="/" className="font-mono text-xs text-zinc-500 hover:text-white">← Back to site</Link>
              
            </div>
          </form>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { k: 'Classes', v: 'CRUD + colors' },
            { k: 'Chapters', v: 'Notes, MCQs, Code' },
            { k: 'Theme', v: 'Colors & branding' },
          ].map(c => (
            <div key={c.k} className="glass rounded-xl p-3 text-center">
              <div className="font-mono text-xs text-white">{c.k}</div>
              <div className="font-mono text-[10px] text-zinc-500">{c.v}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
