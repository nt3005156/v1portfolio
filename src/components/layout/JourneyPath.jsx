import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

const checkpoints = [
  { id: 'hero', label: 'Start' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Path' },
  { id: 'learning', label: 'Teach' },
  { id: 'contact', label: 'Connect' },
]

export default function JourneyPath() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const springY = useSpring(y, { stiffness: 60, damping: 20 })

  return (
    <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-0">
      {/* Track */}
      <div className="relative h-[42vh] w-[2px] bg-white/10 rounded-full overflow-visible">
        <motion.div className="absolute top-0 left-0 w-full origin-top bg-gradient-to-b from-violet-500 via-indigo-500 to-cyan-400 rounded-full" style={{ height: springY }} />
        {/* Traveller */}
        <motion.div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 -ml-[1px]" style={{ top: springY }}>
          <motion.div className="w-8 h-8 rounded-full bg-[#0a0a0f] border border-violet-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] -translate-y-1/2" animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {checkpoints.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-violet-400 transition-colors" />
            <span className="font-mono text-[10px] tracking-widest text-zinc-500 group-hover:text-zinc-300 uppercase opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">{c.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="mt-8 font-mono text-[9px] tracking-[0.2em] text-zinc-600 uppercase [writing-mode:vertical-lr]">Expedition 2024</div>
    </div>
  )
}
