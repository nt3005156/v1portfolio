import { motion } from 'framer-motion'
import { useAppData } from '../../context/AdminContext'

export default function About() {
  const { personalData, theme, dailyLogs, educationData, engaged } = useAppData()
  const logs = dailyLogs || []
  // Use admin-managed engaged schools, fallback to personalData.currentEngaged for backward compat
  const currentSchools = (engaged && engaged.length > 0) ? engaged : (personalData.currentEngaged || [])
  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/[0.03] to-transparent pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="sticky top-32 h-fit">
          <div className="font-mono text-[11px] tracking-[0.2em] text-violet-400 uppercase">02 — About Me (real talk)</div>
          <h2 className="font-serif text-5xl md:text-6xl leading-[0.9] mt-4">
            <span className="font-light italic text-zinc-200">I was that</span><br />
            <span className="text-white">confused student,</span><br />
            <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">now I explain it.</span>
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-white border border-white/10" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
              {theme.logoText || 'NKT'}
            </div>
            <div>
              <div className="font-medium text-white">{personalData.name}</div>
              <div className="font-mono text-xs text-zinc-500">{personalData.location} • Still learning, honestly</div>
            </div>
          </div>
          <div className="mt-6 font-mono text-[11px] leading-relaxed text-zinc-500 max-w-[32ch]">
            I don't have it all figured out. I just know what it's like to blank out in an exam, and I try to make sure you don't. — Nitesh
          </div>

          <div className="mt-10 glass rounded-2xl p-5">
            <div className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">Education — Where I studied</div>
            <div className="mt-4 space-y-3">
              {(educationData || []).map((ed,i)=>(
                <div key={i} className="border-l border-white/10 pl-3">
                  <div className="font-medium text-white text-sm">{ed.degree}</div>
                  <div className="font-mono text-xs text-zinc-400">{ed.school} • {ed.year}</div>
                  <div className="font-mono text-[11px] text-zinc-500 mt-1">{ed.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="space-y-10">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[17px] leading-relaxed text-zinc-300">
            {personalData.longBio}
            <span className="text-white"> I won't ask you to mug up definitions.</span> We'll do the messy part together — draw it, break it, fix it. I even keep my old mistakes in notes so you see where I got stuck. If it finally clicks for you at 11pm before exam, my day is made.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "How I actually teach", desc: "I start with a real-life example. Why would a shopkeeper need DBMS? Then we go to the definition. Way less scary that way." },
              { title: "Why I code this site myself", desc: "Because I got tired of notes getting lost in Facebook groups and PDFs named 'final_final.pdf'. This site keeps everything in one place, works offline-ish, and doesn't spam you." },
              { title: "The community bit", desc: "I still reply to DMs at 10pm when exams are near. 1000+ students later, I've learned more from their doubts than any course." },
              { title: "What I'm trying next", desc: "Little quizzes that tell you why your answer is wrong, not just 'incorrect'. And yes, I'm recording some videos where I actually make mistakes and correct them live." },
            ].map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-6 group hover:border-violet-500/30 transition-colors">
                <div className="font-medium text-white">{c.title}</div>
                <div className="font-mono text-[13px] leading-relaxed text-zinc-400 mt-2">{c.desc}</div>
                <div className="mt-4 w-8 h-[2px] bg-white/10 group-hover:bg-violet-500/50 transition-colors" />
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-[1px]">
            <div className="rounded-[1.5rem] bg-[#0a0a0f] p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> What happened today — managed from admin
                </div>
                <div className="font-mono text-[10px] text-zinc-600">Editable via Admin → Daily Logs</div>
              </div>
              <div className="mt-6 space-y-3 font-mono text-sm">
                {(!logs || logs.length===0) && <div className="text-zinc-500 text-xs">No logs yet. Add from admin.</div>}
                {(logs || []).slice(0,6).map((log, idx)=>(
                  <div key={idx} className="flex gap-3"><span className="text-zinc-600">{log.time}</span><span className="text-zinc-200">{log.text}</span></div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">Currently Teaching At — Live from Admin</div>
              <div className="font-mono text-[10px] text-zinc-600">{currentSchools.length} schools</div>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              {currentSchools.length === 0 && <div className="col-span-3 font-mono text-xs text-zinc-500">No schools added yet. Add from Admin → Engaged Schools.</div>}
              {currentSchools.map((sch,i)=>(
                <div key={sch.id || i} className="bg-white/[0.03] border border-white/5 rounded-xl p-3 hover:border-violet-500/20 transition">
                  <div className="font-medium text-white text-sm">{sch.name} <span className="text-zinc-500 text-xs">({sch.level})</span></div>
                  <div className="font-mono text-[11px] text-zinc-500 mt-1">{sch.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 font-mono text-[10px] text-zinc-600">Tip: Go to Admin → Engaged Schools → Add/Edit/Delete → updates here instantly, no rebuild needed.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
