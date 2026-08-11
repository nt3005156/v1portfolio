import { motion } from 'framer-motion'
import { useAppData } from '../../context/AdminContext'
import { ArrowUpRight, Github } from 'lucide-react'
import { useState } from 'react'

const categories = ["All", "Education Platform", "Frontend", "Open Source", "Full Stack"]

export default function Projects() {
  const { projectsData } = useAppData()
  const safeProjects = projectsData || []
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? safeProjects : safeProjects.filter(p => p.category === active)

  return (
    <section id="projects" className="relative py-24 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] text-amber-300 uppercase">04 — Featured Work</div>
            <h2 className="font-serif text-5xl md:text-[3.5rem] leading-[0.9] mt-3">Projects that <br /><i className="font-light">shipped & helped</i></h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setActive(c)} className={`px-4 py-2 rounded-full text-sm font-mono border transition ${active === c ? 'bg-white text-black border-white' : 'border-white/10 text-zinc-400 hover:text-white hover:border-white/20'}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6 auto-rows-[360px]">
          {filtered.map((p, idx) => (
            <motion.div
              key={p.id || idx}
              layout
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}
              className={`group relative overflow-hidden rounded-[1.8rem] border border-white/10 ${idx === 0 ? 'md:col-span-8' : idx === 1 ? 'md:col-span-4' : 'md:col-span-6'} bg-[#0c0c0f]`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-[0.08] group-hover:opacity-[0.14] transition-opacity`} />
              <div className="absolute inset-0 bg-grid opacity-[0.05]" />
              <div className="relative h-full p-7 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-mono text-xs text-white">{p.year}</div>
                    <div className="px-3 py-1 rounded-full bg-white/10 font-mono text-[11px] text-zinc-300">{p.category}</div>
                  </div>
                  <div className="flex gap-2">
                    <a href={p.links?.github || '#'} className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/10 transition"><Github className="w-4 h-4" /></a>
                    <a href={p.links?.live || '#'} className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition"><ArrowUpRight className="w-4 h-4" /></a>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="font-mono text-[11px] tracking-widest uppercase text-zinc-500">0{idx+1} — CASE STUDY</div>
                  <h3 className="font-serif text-3xl md:text-4xl leading-none mt-2 text-white">{p.title}</h3>
                  <p className="font-mono text-[13px] leading-relaxed text-zinc-400 mt-3 max-w-[48ch]">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {(p.tags || []).map(t => <span key={t} className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-mono text-zinc-300">{t}</span>)}
                  </div>
                </div>

                <motion.div className="absolute top-1/2 right-[-30px] -translate-y-1/2 w-40 h-40 rounded-full border border-white/10 flex items-center justify-center" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                  <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center text-4xl opacity-60">{p.image === 'hub' ? '📚' : p.image === 'algo' ? '🧩' : p.image === 'portfolio' ? '🛻' : '⚙️'}</div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
