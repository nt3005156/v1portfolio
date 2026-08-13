import { motion } from 'framer-motion'
import { BookOpen, Download, ExternalLink, FileText, GraduationCap } from 'lucide-react'

// Static practice question sets. PDFs live in /public/exam-prep/ and are
// served straight from the site root — no API, no admin, no CMS.
const PRACTICE_SETS = [
  {
    id: 'class-9',
    emoji: '📘',
    badge: 'Class 9',
    title: 'Class 9 Examination Practice Question Set',
    description: 'Practice question set for Class 9 examination preparation.',
    file: '/exam-prep/class-9-practice-question-set.pdf',
    downloadName: 'Class-9-Examination-Practice-Question-Set.pdf',
    color: 'from-violet-600 to-indigo-600',
  },
  {
    id: 'class-10',
    emoji: '📕',
    badge: 'Class 10',
    title: 'Class 10 Examination Practice Question Set',
    description: 'Practice question set for Class 10 examination preparation.',
    file: '/exam-prep/class-10-practice-question-set.pdf',
    downloadName: 'Class-10-Examination-Practice-Question-Set.pdf',
    color: 'from-rose-600 to-amber-500',
  },
]

export default function ExamPreparation() {
  return (
    <section id="exam-prep" aria-labelledby="exam-prep-heading" className="mt-14 scroll-mt-24">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 font-mono text-xs text-zinc-400">
            <GraduationCap className="w-4 h-4 text-violet-300" />
            EXAM PREPARATION
          </div>
          <h2 id="exam-prep-heading" className="font-serif text-4xl md:text-5xl text-white leading-[0.95] mt-5">
            Practice{' '}
            <span className="italic font-light bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
              question sets.
            </span>
          </h2>
          <p className="font-mono text-sm text-zinc-400 mt-4 max-w-[52ch]">
            Practice question sets to help you prepare for your examinations. Opens in a new tab — read, zoom and print, or download to keep offline.
          </p>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {PRACTICE_SETS.map((set, i) => (
          <motion.div
            key={set.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-[1.8rem] border border-white/10 bg-[#0a0a0f] p-2 overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${set.color} opacity-10 group-hover:opacity-15 transition`} />

            <div className="relative rounded-[1.4rem] bg-[#0f0f12] border border-white/5 p-7">
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4 items-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${set.color} flex items-center justify-center text-2xl group-hover:scale-105 transition-transform`}>
                    <span role="img" aria-hidden="true">{set.emoji}</span>
                  </div>
                  <div>
                    <div className="font-serif text-3xl text-white">{set.badge}</div>
                    <div className="font-mono text-xs text-zinc-500 mt-1">Examination Practice Question Set</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 shrink-0">
                  <FileText className="w-3 h-3" /> PDF
                </span>
              </div>

              <h3 className="font-serif text-xl text-white mt-6 leading-snug">{set.title}</h3>
              <p className="font-mono text-xs text-zinc-500 mt-2">{set.description}</p>

              <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap items-center gap-3">
                <a
                  href={set.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View Practice Set — ${set.title} (opens in a new tab)`}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f12]"
                >
                  <BookOpen className="w-4 h-4" />
                  View Practice Set
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>

                <a
                  href={set.file}
                  download={set.downloadName}
                  aria-label={`Download PDF — ${set.title}`}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full glass border-white/10 text-sm font-mono text-zinc-300 hover:bg-white/10 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f12]"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
