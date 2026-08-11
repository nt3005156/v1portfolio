import { motion } from 'framer-motion'
import { ArrowUpRight, Search, BookOpen, Clock, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppData } from '../../context/AdminContext'

export default function LearningHubPreview() {
  const { learningData } = useAppData()
  return (
    <section id="learning" className="relative py-24 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/10 via-transparent to-emerald-950/10 pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 font-mono text-xs text-violet-300">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" /> STUDENT LEARNING HUB • 1000+ LEARNERS
            </div>
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.9] mt-6">
              <span className="italic font-light text-zinc-200">Learn like</span><br />
              <span className="text-white">you're on a</span><br />
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-300 bg-clip-text text-transparent">guided trail.</span>
            </h2>
            <p className="font-mono text-[14px] leading-relaxed text-zinc-400 mt-6">
              Not just PDFs. Interactive notes, runnable code, MCQs that explain why — structured as a journey from Class 11 foundations to Class 12 mastery.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link to="/learn" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium text-[15px] hover:bg-zinc-200 transition">
              Enter Learning Hub <ArrowUpRight className="w-5 h-5" />
            </Link>
            <div className="glass rounded-2xl p-4 font-mono text-xs text-zinc-400 flex items-center gap-3">
              <Search className="w-4 h-4 text-zinc-500" /> Search across 56 chapters, 200+ programs
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {(learningData?.classes || []).map((cls, i) => (
            <motion.div key={cls.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0a0a0f] p-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cls.color} opacity-10 group-hover:opacity-15 transition-opacity`} />
              <div className="relative rounded-[1.3rem] bg-[#0f0f12] border border-white/5 p-6 h-full">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cls.color} flex items-center justify-center text-2xl font-serif text-white`}>{cls.short}</div>
                    <div>
                      <div className="font-serif text-2xl text-white">{cls.name}</div>
                      <div className="font-mono text-xs text-zinc-500">{cls.description}</div>
                    </div>
                  </div>
                  <Link to={`/learn/${cls.id}`} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:rotate-45 transition-transform"><ArrowUpRight className="w-5 h-5" /></Link>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="glass rounded-xl p-3">
                    <div className="font-serif text-xl text-white">{cls.subjects?.length || 0}</div>
                    <div className="font-mono text-[10px] text-zinc-500 uppercase">Subjects</div>
                  </div>
                  <div className="glass rounded-xl p-3">
                    <div className="font-serif text-xl text-white">{cls.subjects?.reduce((a,b)=>a+(b.chapters?.length||0),0) || 0}</div>
                    <div className="font-mono text-[10px] text-zinc-500 uppercase">Chapters</div>
                  </div>
                  <div className="glass rounded-xl p-3">
                    <div className="font-serif text-xl text-white">{cls.stats?.students || '0'}</div>
                    <div className="font-mono text-[10px] text-zinc-500 uppercase">Students</div>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5">
                  {(cls.subjects || []).slice(0, 3).map(sub => (
                    <Link key={sub.id} to={`/learn/${cls.id}/${sub.id}`} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 transition group/item">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{sub.icon}</span>
                        <span className="font-mono text-sm text-zinc-300">{sub.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-500 group-hover/item:text-white">
                        <span className="font-mono text-xs">{sub.chapters.length} ch</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { icon: BookOpen, k: "Structured Notes", v: "Boards-focused, diagram-rich" },
            { icon: Clock, k: "Continue Learning", v: "Pick up where you left off" },
            { icon: Search, k: "Smart Search", v: "Find any chapter in seconds" },
          ].map(card => (
            <div key={card.k} className="glass rounded-2xl p-5 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"><card.icon className="w-5 h-5 text-zinc-300" /></div>
              <div><div className="font-medium text-white text-sm">{card.k}</div><div className="font-mono text-xs text-zinc-500 mt-1">{card.v}</div></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
