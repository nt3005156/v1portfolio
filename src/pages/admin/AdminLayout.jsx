import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, GraduationCap, BookOpen, Layers, FileCode, Briefcase, Palette, LogOut, ExternalLink, Menu, X, MessageSquare, Megaphone, Clock, MapPin, School, Building } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const nav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/admin', exact: true },
  { label: 'Messages', icon: MessageSquare, to: '/admin/messages' },
  { label: 'Daily Logs', icon: Clock, to: '/admin/logs' },
  { label: 'Experience', icon: MapPin, to: '/admin/experience' },
  { label: 'Education', icon: School, to: '/admin/education' },
  { label: 'Engaged Schools', icon: Building, to: '/admin/engaged' },
  { label: 'Classes', icon: GraduationCap, to: '/admin/classes' },
  { label: 'Subjects', icon: Layers, to: '/admin/subjects' },
  { label: 'Chapters', icon: BookOpen, to: '/admin/chapters' },
  { label: 'Projects', icon: Briefcase, to: '/admin/projects' },
  { label: 'Ads / Sponsors', icon: Megaphone, to: '/admin/ads' },
  { label: 'Content', icon: FileCode, to: '/admin/content' },
  { label: 'Theme & Settings', icon: Palette, to: '/admin/settings' },
]

export default function AdminLayout() {
  const { logout, personal, theme } = useAdmin()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [msgCount, setMsgCount] = useState(0)

  useEffect(()=>{
    try {
      const msgs = JSON.parse(localStorage.getItem('exp_messages')||'[]')
      setMsgCount(msgs.filter(m=>!m.read).length)
    } catch {}
    const id = setInterval(()=>{
      try {
        const msgs = JSON.parse(localStorage.getItem('exp_messages')||'[]')
        setMsgCount(msgs.filter(m=>!m.read).length)
      } catch {}
    }, 3000)
    return ()=>clearInterval(id)
  }, [])

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-mono font-bold text-white" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>NKT</div>
          <div>
            <div className="font-mono text-xs text-zinc-400">NKT CMS</div>
            <div className="font-medium text-white text-sm truncate max-w-[140px]">{personal.name}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-1 overflow-auto">
        {nav.map(item => (
          <NavLink key={item.to} to={item.to} end={item.exact} className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl text-xs font-mono transition ${isActive ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`} onClick={()=>setOpen(false)}>
            <span className="flex items-center gap-2"><item.icon className="w-4 h-4" /> {item.label}</span>
            {item.label==='Messages' && msgCount>0 && <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">{msgCount}</span>}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-white/5 space-y-2">
        <a href="/" target="_blank" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-mono text-zinc-400 hover:text-white hover:bg-white/5 transition">
          <ExternalLink className="w-4 h-4" /> View Live Site
        </a>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-mono text-red-300 hover:bg-red-500/10 transition">
          <LogOut className="w-4 h-4" /> Logout
        </button>
        <div className="font-mono text-[10px] text-zinc-600 mt-2">Content auto-saved • Export before update</div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 flex">
      <div className="hidden lg:flex w-[280px] shrink-0 border-r border-white/5 bg-[#0a0a0f] sticky top-0 h-screen flex-col">
        <Sidebar />
      </div>

      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs text-white" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>NKT</div>
          <span className="font-mono text-xs text-white truncate">{personal.name}</span>
          {msgCount>0 && <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">{msgCount}</span>}
        </div>
        <button onClick={()=>setOpen(!open)} className="w-10 h-10 rounded-full glass flex items-center justify-center">{open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="lg:hidden fixed inset-0 z-30 bg-[#0a0a0f] pt-16">
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 min-w-0 pt-16 lg:pt-0">
        <div className="max-w-[1280px] mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
