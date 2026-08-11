import { motion } from 'framer-motion'
import { useAppData } from '../../context/AdminContext'

export default function AchievementsServices() {
  const { achievementsData, servicesData } = useAppData()
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-amber-300 uppercase">Achievements</div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {(achievementsData || []).map((a,i) => (
              <motion.div key={a.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.05 }} className="glass rounded-2xl p-5">
                <div className="font-mono text-[10px] text-zinc-500 uppercase">{a.org}</div>
                <div className="font-medium text-white mt-1">{a.title}</div>
                <div className="font-mono text-xs text-zinc-400 mt-2">{a.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-cyan-300 uppercase">What I Do</div>
          <div className="space-y-4 mt-6">
            {(servicesData || []).map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i*0.06 }} className="group flex gap-4 glass rounded-2xl p-5 hover:border-white/20 transition">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl shrink-0">{s.icon}</div>
                <div>
                  <div className="font-medium text-white">{s.title}</div>
                  <div className="font-mono text-xs text-zinc-400 mt-1">{s.desc}</div>
                  <div className="mt-3 flex gap-2">{(s.tags || []).map(t => <span key={t} className="text-[10px] font-mono px-2 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">{t}</span>)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
