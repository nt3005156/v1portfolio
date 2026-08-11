import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(() => onFinish?.(), 400); return 100 }
        return p + Math.random() * 18
      })
    }, 120)
    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#050507] flex flex-col items-center justify-center px-6"
    >
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="relative">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-mono text-xl font-bold">NKT</div>
            <motion.div className="absolute inset-0 rounded-2xl bg-violet-600 blur-2xl -z-10" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
          </div>
          <div className="text-center">
            <h1 className="font-serif italic text-3xl text-white">Crafting expedition</h1>
            <p className="font-mono text-xs tracking-widest text-zinc-500 mt-2">LOADING PORTFOLIO • {Math.floor(progress)}%</p>
          </div>
          <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-violet-600 to-cyan-400" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
