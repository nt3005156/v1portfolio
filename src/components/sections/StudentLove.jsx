import { motion } from 'framer-motion'

const testimonials = [
  { name: 'Sita • Class 12', text: 'I was scared of DBMS, but his notes made me actually like it. Scored 92!', score: '92' },
  { name: 'Ram • Class 11', text: 'He explains binary like you’re 5 — finally it clicked. No more mugging.', score: 'A+' },
  { name: 'Anu • Batch 2024', text: 'The code examples actually run. I copied, broke, fixed — learned.', score: '88' },
  { name: 'Bikash • Class 12', text: 'No heavy English. Just simple talk. That helped me more than tuition.', score: '90' },
]

export default function StudentLove() {
  return (
    <section className="py-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/5 to-transparent pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] text-amber-300 uppercase">Real students — no fake reviews</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-[0.9] mt-3 text-white">What <span className="italic font-light">they say</span> when I’m not listening</h2>
          </div>
          <div className="font-mono text-sm text-zinc-500 max-w-[38ch]">I didn’t ask them to write this. They just DM’d after exams. I kept the screenshots.</div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {testimonials.map((t,i)=>(
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.07 }} className="glass rounded-2xl p-5 hover:border-violet-500/20 transition">
              <div className="flex justify-between items-start">
                <div className="font-mono text-xs text-zinc-400">{t.name}</div>
                <div className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono">{t.score}</div>
              </div>
              <div className="font-serif text-[15px] text-white mt-4 leading-relaxed">“{t.text}”</div>
              <div className="mt-4 flex gap-1">{[1,2,3,4,5].map(s=> <span key={s} className="w-3 h-3 rounded-full bg-amber-400/80" />)}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-xl">🔥</div>
            <div><div className="font-medium text-white text-sm">Small wins daily</div><div className="font-mono text-xs text-zinc-500 mt-1">One chapter a day. No pressure. Just keep coming back.</div></div>
          </div>
          <div className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xl">🏅</div>
            <div><div className="font-medium text-white text-sm">You’ll feel progress</div><div className="font-mono text-xs text-zinc-500 mt-1">DBMS Master, C Pro, Quiz Champ — silly badges, but they work.</div></div>
          </div>
          <div className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xl">💬</div>
            <div><div className="font-medium text-white text-sm">I actually reply</div><div className="font-mono text-xs text-zinc-500 mt-1">Stuck at 10pm? DM me. I’ve been there. I’ll try to help that night itself.</div></div>
          </div>
        </div>
      </div>
    </section>
  )
}
