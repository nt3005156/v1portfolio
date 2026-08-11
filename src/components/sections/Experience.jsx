import { motion, useScroll, useTransform } from 'framer-motion'
import { useAppData } from '../../context/AdminContext'
import { useRef } from 'react'

export default function Experience() {
  const { experienceData, educationData } = useAppData()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={ref} id="experience" className="relative py-24 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-16">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-violet-400 uppercase">05 — Expedition Path</div>
          <h2 className="font-serif text-5xl leading-[0.95] mt-4">Where I've <br /><span className="italic font-light">been & built</span></h2>
          <div className="mt-10 relative hidden lg:block">
            <div className="absolute left-1 top-0 w-[2px] h-full bg-white/10" />
            <motion.div style={{ scaleY }} className="absolute left-1 top-0 w-[2px] h-full bg-violet-500 origin-top" />
            <div className="pl-8 space-y-10">
              {(educationData || []).map((ed, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <div className="font-mono text-xs text-zinc-500">{ed.year}</div>
                  <div className="font-medium text-white">{ed.degree}</div>
                  <div className="font-mono text-xs text-zinc-400">{ed.school}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 w-[2px] h-full bg-white/5 hidden lg:block" />
          <div className="space-y-8">
            {(experienceData || []).map((exp, i) => (
              <motion.div key={exp.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative pl-0 lg:pl-10 group">
                <div className="hidden lg:flex absolute left-[-9px] top-8 w-5 h-5 rounded-full bg-[#0a0a0f] border-2 border-violet-500 items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-violet-400" />
                </div>
                <div className="glass rounded-[1.5rem] p-7 hover:border-violet-500/20 transition-colors">
                  <div className="flex flex-wrap justify-between gap-3">
                    <div>
                      <div className="font-serif text-2xl text-white">{exp.role}</div>
                      <div className="font-mono text-xs text-zinc-400 mt-1">{exp.org} • {exp.location}</div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/10 font-mono text-xs text-zinc-300 h-fit">{exp.period}</div>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {(exp.points || []).map(p => (
                      <li key={p} className="flex gap-3 font-mono text-[13px] leading-relaxed text-zinc-400">
                        <span className="text-violet-400 mt-[3px]">›</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
