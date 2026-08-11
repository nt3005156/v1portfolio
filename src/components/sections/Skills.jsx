import { motion } from 'framer-motion'
import { useAppData } from '../../context/AdminContext'

export default function Skills() {
  const { skillsData } = useAppData()
  const safeSkills = skillsData || []
  return (
    <section id="skills" className="relative py-24 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] text-cyan-300 uppercase">03 — Skills & Craft</div>
            <h2 className="font-serif text-5xl leading-none mt-3">Tools I <span className="italic font-light">actually</span> use daily</h2>
          </div>
          <div className="font-mono text-sm text-zinc-500 max-w-[36ch]">Not a buzzword list. These are tools I actually use when a student says “sir, site is slow” at 11pm before exam.</div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {safeSkills.map((cat, idx) => (
            <motion.div key={cat.category || idx}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0a0a0f] p-6 hover:border-white/20 transition-colors"
            >
              <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${cat.color} opacity-[0.08] blur-3xl rounded-full group-hover:opacity-[0.15] transition-opacity`} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white`}>{cat.icon}</div>
                  <div>
                    <div className="font-medium text-white">{cat.category}</div>
                    <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{(cat.skills || []).length} tools</div>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-violet-400 transition-colors" />
              </div>

              <div className="mt-8 space-y-5">
                {(cat.skills || []).map((s, i) => (
                  <div key={s.name || i}>
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-zinc-300">{s.name}</span>
                      <span className="text-zinc-500">{s.level}%</span>
                    </div>
                    <div className="mt-2 h-[4px] bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 + i * 0.06, ease: "easeOut" }} className={`h-full bg-gradient-to-r ${cat.color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
