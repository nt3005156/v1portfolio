import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppData } from '../../context/AdminContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const isHome = loc.pathname === '/'
  const { personalData, theme } = useAppData()

  const links = [
    { label: 'Work', href: isHome ? '#projects' : '/#projects' },
    { label: 'Skills', href: isHome ? '#skills' : '/#skills' },
    { label: 'Journey', href: isHome ? '#experience' : '/#experience' },
    { label: 'Learning Hub', href: '/learn', highlight: true },
  ]

  const scrollTo = (href) => {
    if (href.startsWith('#') || href.includes('#')) {
      const id = href.split('#')[1]
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="fixed top-0 inset-x-0 z-50 px-4 md:px-6 py-4"
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between glass rounded-2xl px-4 md:px-6 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-mono text-sm font-bold text-white" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>NKT</div>
            <div className="hidden md:block">
              <div className="font-mono text-xs font-semibold tracking-wide leading-none">{personalData.name?.toUpperCase() || 'ALEX RIVERA'}</div>
              <div className="font-mono text-[10px] text-zinc-500 leading-none mt-1">PORTFOLIO / 2024 • ADMIN</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 bg-black/30 rounded-full p-1 border border-white/5">
            {links.map(l => (
              l.highlight ? (
                <Link key={l.label} to={l.href} className="px-4 py-2 rounded-full bg-white text-black font-medium text-sm flex items-center gap-1 hover:bg-zinc-200 transition">
                  {l.label} <ArrowUpRight className="w-4 h-4" />
                </Link>
              ) : (
                <a key={l.label} href={l.href} onClick={(e) => { if (isHome && l.href.startsWith('#')) { e.preventDefault(); scrollTo(l.href) } }} className="px-4 py-2 rounded-full text-sm text-zinc-400 hover:text-white hover:bg-white/10 transition">
                  {l.label}
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/admin" className="hidden md:flex w-10 h-10 rounded-full glass items-center justify-center hover:bg-white/10" title="Admin"><Shield className="w-4 h-4" /></Link>
            <a href="#contact" onClick={(e) => { if (isHome) { e.preventDefault(); scrollTo('#contact') } }} className="hidden md:flex px-5 py-2.5 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-sm font-medium hover:brightness-110 transition" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>Let's Talk</a>
            <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl md:hidden pt-24 px-6">
            <div className="flex flex-col gap-2">
              {links.map((l,i) => (
                <motion.a
                  key={l.label}
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i*0.05 }}
                  href={l.href}
                  onClick={(e) => {
                    if (l.href === '/learn' || l.href.startsWith('/admin')) { setOpen(false); return }
                    if (isHome && l.href.startsWith('#')) { e.preventDefault(); scrollTo(l.href) } else if (l.href.includes('/#')) { /* allow nav */ }
                  }}
                  className={`text-4xl font-serif py-4 border-b border-white/10 ${l.highlight ? 'text-violet-300' : 'text-white'}`}
                >
                  {l.label}
                </motion.a>
              ))}
              <Link to="/admin" onClick={()=>setOpen(false)} className="text-2xl font-mono py-4 text-zinc-400 flex items-center gap-2"><Shield className="w-5 h-5"/>Admin Panel</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
