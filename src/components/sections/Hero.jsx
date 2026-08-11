import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Play, Sparkles } from 'lucide-react'
import { useAppData } from '../../context/AdminContext'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  const ref = useRef(null)
  const { personalData, theme } = useAppData()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const roadProgress = useTransform(scrollYProgress, [0, 0.2], [0, 100])

  return (
    <section ref={ref} id="hero" className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-[#050507]" style={{ background: `radial-gradient(at 20% 20%, ${theme.primary}18, transparent 60%)` }} />
        <div className="absolute inset-0 bg-grid opacity-[0.03]" />
        <motion.div style={{ y }} className="absolute -top-1/2 -right-1/2 w-[80vw] h-[80vw] rounded-full blur-[120px]" />
        <motion.div style={{ y: useTransform(scrollYProgress, [0,1], ["0%", "-10%"]) }} className="absolute -bottom-1/2 -left-1/2 w-[60vw] h-[60vw] bg-gradient-to-tr from-amber-500/10 to-orange-600/5 rounded-full blur-[100px]" />
      </div>

      <motion.div style={{ opacity }} className="relative max-w-[1280px] mx-auto px-6 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center py-12">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs font-mono text-zinc-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            NEB Class 11/12 Specialist • 1000+ Students
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="font-serif text-[10vw] lg:text-[5.2rem] leading-[0.85] tracking-[-0.04em] text-balance">
            <span className="block font-light italic text-zinc-100">I am {personalData.firstName}</span>
            <span className="block font-light text-zinc-400 ml-6 lg:ml-10">code & classroom</span>
            <span className="block font-medium text-white">made simple to <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.accent})` }}>understand.</span></span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8 flex flex-wrap gap-3 font-mono text-[11px] tracking-widest text-zinc-500 uppercase">
            {(personalData.roles || []).map(r => (
              <span key={r} className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.02]">{r}</span>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-8 text-[15px] leading-relaxed text-zinc-400 max-w-[52ch]">
            {personalData.longBio} From code to classroom — every scroll is a step, every project a camp on the expedition.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-zinc-200 transition">
              <Play className="w-4 h-4 fill-black" /> View My Work
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <Link to="/learn" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass text-white font-medium text-sm hover:bg-white/10 transition">
              <Sparkles className="w-4 h-4 text-violet-400" /> Explore Learning Hub
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-12 flex items-center gap-8 border-t border-white/5 pt-6">
            {(personalData.stats || []).map(s => (
              <div key={s.label}>
                <div className="font-serif text-3xl text-white">{s.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="mt-6 font-mono text-[11px] text-zinc-600">
            “First understand, then write — code is like an essay.” • Performance tuned for 1000+ concurrent students
          </div>
        </div>

        <div className="relative lg:h-[720px] flex items-center justify-center">
          <div className="relative w-full max-w-[520px] aspect-[4/5] glass rounded-[2.5rem] overflow-hidden p-3">
            <div className="relative w-full h-full rounded-[1.8rem] bg-gradient-to-b from-zinc-900 to-black overflow-hidden border border-white/10">
              <div className="absolute inset-0">
                <svg viewBox="0 0 400 800" className="w-full h-full">
                  <defs>
                    <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={theme.primary} stopOpacity="0" />
                      <stop offset="20%" stopColor={theme.primary} stopOpacity="0.8" />
                      <stop offset="80%" stopColor={theme.accent} stopOpacity="0.8" />
                      <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 200 0 Q 180 200 210 400 Q 230 600 200 800" stroke="url(#roadGrad)" strokeWidth="80" fill="none" strokeLinecap="round" opacity="0.15" />
                  <path d="M 200 0 Q 180 200 210 400 Q 230 600 200 800" stroke="white" strokeOpacity="0.08" strokeWidth="1.5" fill="none" strokeDasharray="4 12" />
                  <motion.path d="M 200 0 Q 180 200 210 400 Q 230 600 200 800" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="8 16" fill="none" animate={{ strokeDashoffset: [0, -120] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
                </svg>

                {[
                  { y: 12, label: "About", icon: "👋" },
                  { y: 32, label: "Skills", icon: "🧠" },
                  { y: 53, label: "Projects", icon: "🚀" },
                  { y: 75, label: "Learn", icon: "📚" },
                ].map((cp, i) => (
                  <motion.div key={cp.label} className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3" style={{ top: `${cp.y}%` }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 + i * 0.15 }}>
                    <div className="glass rounded-full px-3 py-1.5 flex items-center gap-2 text-xs font-medium">
                      <span>{cp.icon}</span><span className="font-mono text-[11px]">{cp.label}</span>
                    </div>
                  </motion.div>
                ))}

                <motion.div className="absolute left-1/2 w-12 h-12 -ml-6"
                  animate={{ top: ["-5%", "105%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.6)] rotate-[-10deg]" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
                    <span className="text-lg">📚</span>
                  </div>
                </motion.div>
              </div>

              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-6 left-4 glass rounded-2xl p-3 w-36">
                <div className="flex gap-1 mb-2"><div className="w-2 h-2 rounded-full bg-red-400" /><div className="w-2 h-2 rounded-full bg-amber-400" /><div className="w-2 h-2 rounded-full bg-emerald-400" /></div>
                <div className="font-mono text-[9px] leading-relaxed text-zinc-400">
                  <div className="text-violet-300">learning = understanding</div>
                  <div className="ml-2">{`{ read + practice }`}</div>
                  <div className="ml-2 text-cyan-300">{`repeat ∞`}</div>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 5.5, delay: 1 }} className="absolute bottom-6 right-4 glass rounded-2xl p-3 w-40">
                <div className="font-mono text-[10px] text-zinc-300">Student says</div>
                <div className="font-serif text-sm text-white mt-1">“DBMS notes helped me score 92!”</div>
                <div className="font-mono text-[9px] text-zinc-500 mt-2">— Class 12 • 2024</div>
              </motion.div>
            </div>
          </div>

          <motion.div className="absolute bottom-0 lg:bottom-4 left-0 right-0 flex justify-center lg:justify-end">
            <div className="glass rounded-full px-4 py-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-zinc-400">
              <div className="w-12 h-[2px] bg-white/20 rounded-full overflow-hidden"><motion.div className="h-full bg-violet-400" style={{ width: roadProgress }} /></div>
              SCROLL TO BEGIN
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
