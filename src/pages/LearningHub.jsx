import { useMemo, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, BookOpen, ChevronRight, ArrowLeft, GraduationCap, Play, FileText, HelpCircle, Code2, Download, CheckCircle2, Bookmark, Timer } from 'lucide-react'
import { useAppData } from '../context/AdminContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import ExamPreparation from '../components/sections/ExamPreparation'

function Breadcrumb({ parts }) {
  return (
    <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 overflow-auto">
      <Link to="/learn" className="hover:text-white transition">Hub</Link>
      {parts.map((p,i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3" />
          {p.href ? <Link to={p.href} className="hover:text-white transition">{p.label}</Link> : <span className="text-zinc-300">{p.label}</span>}
        </span>
      ))}
    </div>
  )
}

function getAllChaptersFromData(learningData) {
  const chapters = [];
  (learningData?.classes || []).forEach(cls => {
    (cls.subjects || []).forEach(sub => {
      (sub.chapters || []).forEach(ch => {
        chapters.push({ ...ch, classId: cls.id, className: cls.name, subjectId: sub.id, subjectName: sub.name })
      })
    })
  })
  return chapters
}

export default function LearningHub() {
  const { learningData } = useAppData()
  const { classId, subjectId, chapterId } = useParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [recently, setRecently] = useLocalStorage('recent-chapters', [])
  const [progress, setProgress] = useLocalStorage('chapter-progress', {})
  const [activeTab, setActiveTab] = useState('notes')

  const selectedClass = (learningData.classes || []).find(c => c.id === classId)
  const selectedSubject = selectedClass?.subjects.find(s => s.id === subjectId)
  const selectedChapter = selectedSubject?.chapters.find(ch => ch.id === chapterId)

  const allChapters = useMemo(() => getAllChaptersFromData(learningData), [learningData])
  const filteredChapters = useMemo(() => {
    if (!search) return allChapters
    const q = search.toLowerCase()
    return allChapters.filter(ch => (ch.title || '').toLowerCase().includes(q) || (ch.subtitle || '').toLowerCase().includes(q) || (ch.tags||[]).some(t => (t || '').toLowerCase().includes(q)))
  }, [search, allChapters])

  useEffect(() => {
    if (selectedChapter) {
      const entry = { id: selectedChapter.id, title: selectedChapter.title, subtitle: selectedChapter.subtitle, classId, subjectId, at: Date.now() }
      setRecently(prev => {
        const without = prev.filter(r => r.id !== entry.id)
        return [entry, ...without].slice(0, 6)
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [selectedChapter?.id])

  const toggleProgress = (id) => {
    setProgress(prev => ({ ...prev, [id]: prev[id] ? 0 : 100 }))
  }

  if (selectedChapter) {
    const mat = selectedChapter.materials || { notes: '', importantQuestions: [], mcqs: [], programs: [], pdfs: [] }
    return (
      <div className="min-h-screen bg-[#050507] pt-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Breadcrumb parts={[
              { label: selectedClass.name, href: `/learn/${selectedClass.id}` },
              { label: selectedSubject.name, href: `/learn/${selectedClass.id}/${selectedSubject.id}` },
              { label: selectedChapter.title }
            ]} />
            <button onClick={() => navigate(-1)} className="glass rounded-full px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Back</button>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <div>
              <div className="glass rounded-[1.5rem] p-7 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className={`px-2.5 py-1 rounded-full bg-gradient-to-r ${selectedSubject.color} text-white`}>{selectedSubject.short}</span>
                      <span className="text-zinc-500 flex items-center gap-1"><Clock className="w-3 h-3" />{selectedChapter.duration}</span>
                      <span className="text-zinc-500">{selectedChapter.level}</span>
                    </div>
                    <h1 className="font-serif text-3xl md:text-4xl text-white mt-4 leading-tight">{selectedChapter.title}</h1>
                    <p className="font-mono text-sm text-zinc-400 mt-2">{selectedChapter.subtitle}</p>
                  </div>
                  <button onClick={() => toggleProgress(selectedChapter.id)} className={`w-10 h-10 rounded-full flex items-center justify-center border transition ${progress[selectedChapter.id] ? 'bg-emerald-500 border-emerald-500 text-black' : 'glass border-white/10 text-zinc-400 hover:text-white'}`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-8 flex gap-2 p-1 bg-black rounded-full w-fit border border-white/10">
                  {[
                    { id: 'notes', label: 'Notes', icon: FileText },
                    { id: 'questions', label: 'Questions', icon: HelpCircle },
                    { id: 'mcq', label: 'MCQs', icon: Timer },
                    { id: 'code', label: 'Code', icon: Code2 },
                  ].map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-4 py-2 rounded-full text-xs font-mono flex items-center gap-1.5 transition ${activeTab === t.id ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                      <t.icon className="w-3.5 h-3.5" /> {t.label}
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                  <AnimatePresence mode="wait">
                    {activeTab === 'notes' && (
                      <motion.div key="notes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="prose prose-invert prose-sm max-w-none">
                        <div className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-zinc-300 bg-white/[0.02] border border-white/5 rounded-2xl p-6">{mat.notes || 'No notes yet.'}</div>
                      </motion.div>
                    )}
                    {activeTab === 'questions' && (
                      <motion.div key="q" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                        {(mat.importantQuestions||[]).length === 0 && <div className="font-mono text-sm text-zinc-500">No questions added yet.</div>}
                        {(mat.importantQuestions||[]).map((q,i) => (
                          <div key={i} className="glass rounded-xl p-4 flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center text-xs shrink-0">{i+1}</span>
                            <span className="font-mono text-sm text-zinc-300">{q}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                    {activeTab === 'mcq' && (
                      <motion.div key="mcq" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                        {(mat.mcqs||[]).map((m,i) => (
                          <div key={i} className="glass rounded-xl p-5">
                            <div className="font-mono text-sm text-white">{i+1}. {m.q}</div>
                            <div className="mt-3 grid gap-2">
                              {(m.options||[]).map((o, oi) => (
                                <div key={oi} className={`px-4 py-2.5 rounded-xl border text-sm font-mono ${oi === m.ans ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-white/[0.02] border-white/5 text-zinc-400'}`}>{String.fromCharCode(65+oi)}. {o}</div>
                              ))}
                            </div>
                          </div>
                        ))}
                        {(mat.mcqs||[]).length === 0 && <div className="font-mono text-sm text-zinc-500">MCQs coming soon.</div>}
                      </motion.div>
                    )}
                    {activeTab === 'code' && (
                      <motion.div key="code" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                        {(mat.programs||[]).map((prog, i) => (
                          <div key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0f]">
                            <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04] border-b border-white/5">
                              <div className="font-mono text-xs text-zinc-300 flex items-center gap-2"><Code2 className="w-4 h-4" />{prog.title} • {prog.lang}</div>
                              <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-400" /><div className="w-2 h-2 rounded-full bg-amber-400" /><div className="w-2 h-2 rounded-full bg-emerald-400" /></div>
                            </div>
                            <pre className="p-4 text-[12px] font-mono leading-relaxed text-zinc-300 overflow-auto"><code>{prog.code}</code></pre>
                          </div>
                        ))}
                        {(mat.programs||[]).length === 0 && <div className="font-mono text-sm text-zinc-500">Code examples coming soon.</div>}
                        {(mat.pdfs||[]).length > 0 && (
                          <div className="mt-6">
                            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3">Resources — Notes / Syllabus / PDF</div>
                            {mat.pdfs.map((pdf, i) => {
                              const isData = pdf.url?.startsWith('data:')
                              return (
                                <div key={i} className="glass rounded-xl p-4 flex items-center justify-between">
                                  <div className="flex items-center gap-3"><Download className="w-4 h-4 text-violet-400" /><span className="font-mono text-sm text-zinc-300">{pdf.name}</span><span className="text-xs text-zinc-500">{pdf.size || ''}</span></div>
                                  {pdf.url ? (
                                    isData ? <a href={pdf.url} download={pdf.name || 'file.pdf'} className="px-3 py-1.5 rounded-full bg-emerald-500 text-black text-xs font-mono hover:bg-emerald-400 transition">Download</a>
                                    : <a href={pdf.url} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-mono hover:bg-zinc-200 transition">Open Link</a>
                                  ) : <button className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-mono">Download</button>}
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass rounded-[1.5rem] p-6">
                <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">Up Next</div>
                <div className="mt-4 space-y-3">
                  {selectedSubject.chapters.filter(c => c.id !== selectedChapter.id).slice(0,4).map(ch => (
                    <Link key={ch.id} to={`/learn/${classId}/${subjectId}/${ch.id}`} className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition">
                      <div>
                        <div className="font-mono text-sm text-white group-hover:text-violet-300 transition">{ch.title}</div>
                        <div className="font-mono text-xs text-zinc-500">{ch.duration}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] p-[1px] bg-gradient-to-br from-violet-600/40 to-cyan-400/40">
                <div className="rounded-[1.5rem] bg-[#0a0a0f] p-6">
                  <div className="font-serif text-xl text-white">Continue Learning Path</div>
                  <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.round((selectedSubject.chapters.findIndex(c => c.id === selectedChapter.id)+1)/selectedSubject.chapters.length*100)}%` }} className="h-full bg-gradient-to-r from-violet-600 to-cyan-400" />
                  </div>
                  <div className="mt-2 font-mono text-xs text-zinc-500">{selectedSubject.chapters.findIndex(c => c.id === selectedChapter.id)+1} / {selectedSubject.chapters.length} chapters completed in {selectedSubject.name}</div>
                </div>
              </div>

              {recently.length > 0 && (
                <div className="glass rounded-[1.5rem] p-6">
                  <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Bookmark className="w-3 h-3" /> Recently Viewed</div>
                  <div className="mt-4 space-y-2">
                    {recently.slice(0,3).map(r => (
                      <Link key={r.id+r.at} to={`/learn/${r.classId}/${r.subjectId}/${r.id}`} className="block p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition">
                        <div className="font-mono text-sm text-zinc-300 truncate">{r.title}</div>
                        <div className="font-mono text-[11px] text-zinc-500">{r.subtitle}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (selectedClass && selectedSubject) {
    return (
      <div className="min-h-screen bg-[#050507] pt-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <Breadcrumb parts={[
            { label: selectedClass.name, href: `/learn/${selectedClass.id}` },
            { label: selectedSubject.name }
          ]} />
          <div className="mt-8 flex flex-col lg:flex-row justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedSubject.color} flex items-center justify-center text-2xl`}>{selectedSubject.icon}</div>
                <div>
                  <h1 className="font-serif text-4xl text-white">{selectedSubject.name}</h1>
                  <p className="font-mono text-sm text-zinc-400 mt-1">{selectedSubject.description}</p>
                </div>
              </div>
            </div>
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search chapters, tags..." className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-10 pr-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50" />
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(search ? filteredChapters.filter(c => c.subjectId === selectedSubject.id) : selectedSubject.chapters).map((ch, i) => (
              <motion.div key={ch.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.04 }} className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0a0a0f] hover:border-white/20 transition-colors">
                <div className="p-6">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-full bg-white/10 text-[10px] font-mono text-zinc-400">{ch.level}</span>
                      <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1"><Clock className="w-3 h-3" />{ch.duration}</span>
                    </div>
                    <button onClick={() => toggleProgress(ch.id)} className={`w-7 h-7 rounded-full border flex items-center justify-center transition ${progress[ch.id] ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/10 text-zinc-600 hover:text-white'}`}><CheckCircle2 className="w-4 h-4" /></button>
                  </div>
                  <h3 className="font-serif text-xl text-white mt-5 group-hover:text-violet-300 transition-colors">{ch.title}</h3>
                  <p className="font-mono text-xs text-zinc-500 mt-2">{ch.subtitle}</p>
                  <div className="mt-4 flex gap-2 flex-wrap">{(ch.tags||[]).map(t => <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/5 text-[10px] font-mono text-zinc-400">{t}</span>)}</div>
                  <Link to={`/learn/${classId}/${subjectId}/${ch.id}`} className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition">Open <ArrowLeft className="w-4 h-4 rotate-180" /></Link>
                </div>
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${selectedSubject.color} opacity-10 blur-2xl rounded-full group-hover:opacity-20 transition`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (selectedClass) {
    return (
      <div className="min-h-screen bg-[#050507] pt-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <Breadcrumb parts={[{ label: selectedClass.name }]} />
          <div className="mt-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${selectedClass.color} text-white font-mono text-xs`}><GraduationCap className="w-4 h-4" />{selectedClass.name}</div>
              <h1 className="font-serif text-5xl text-white mt-6 leading-none">{selectedClass.name}<br /><span className="italic font-light text-zinc-400">subjects</span></h1>
              <p className="font-mono text-sm text-zinc-400 mt-4 max-w-[38ch]">{selectedClass.description}</p>
              <div className="mt-8 flex gap-3 flex-wrap">
                {(selectedClass.subjects || []).map(s => (
                  <div key={s.id} className="glass rounded-xl px-4 py-3 text-center">
                    <div className="font-serif text-xl text-white">{(s.chapters?.length || 0)}</div>
                    <div className="font-mono text-[10px] text-zinc-500 uppercase">{s.short}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {(selectedClass.subjects || []).map((sub, i) => (
                <motion.div key={sub.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.05 }} className="group rounded-[1.5rem] border border-white/10 bg-[#0a0a0f] p-6 hover:border-white/20 transition">
                  <div className="flex justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sub.color} flex items-center justify-center text-xl`}>{sub.icon}</div>
                    <div className="font-mono text-xs text-zinc-500">{sub.chapters.length} chapters</div>
                  </div>
                  <h3 className="font-serif text-2xl text-white mt-5">{sub.name}</h3>
                  <p className="font-mono text-xs text-zinc-500 mt-2">{sub.description}</p>
                  <Link to={`/learn/${classId}/${sub.id}`} className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium group-hover:bg-zinc-200 transition">Explore <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" /></Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050507] pt-24 pb-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 font-mono text-xs text-zinc-400"><span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" /> STUDENT LEARNING HUB v2</div>
            <h1 className="font-serif text-5xl md:text-6xl text-white leading-[0.9] mt-6">Choose your<br /><span className="italic font-light bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">class & dive in.</span></h1>
            <p className="font-mono text-sm text-zinc-400 mt-4 max-w-[42ch]">Expandable, searchable, offline-ready. Built for NEB boards and real understanding.</p>
          </div>
          <div className="lg:w-[380px] space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search chapters, e.g. DBMS, Number System" className="w-full glass rounded-full pl-12 pr-4 py-4 font-mono text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50" />
            </div>
            {recently.length > 0 && (
              <div className="glass rounded-2xl p-5">
                <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">Continue Learning</div>
                <div className="mt-3 space-y-2">
                  {recently.slice(0,2).map(r => (
                    <Link key={r.id+r.at} to={`/learn/${r.classId}/${r.subjectId}/${r.id}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition">
                      <div className="w-9 h-9 rounded-full bg-violet-600/20 flex items-center justify-center"><Play className="w-4 h-4 text-violet-300" /></div>
                      <div><div className="font-mono text-sm text-white truncate max-w-[18ch]">{r.title}</div><div className="font-mono text-[11px] text-zinc-500">Resume • {r.subtitle}</div></div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {search && (
          <div className="mt-12">
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">Search results • {filteredChapters.length}</div>
            <div className="grid md:grid-cols-3 gap-4">
              {filteredChapters.map(ch => (
                <Link key={ch.id} to={`/learn/${ch.classId}/${ch.subjectId}/${ch.id}`} className="glass rounded-2xl p-5 hover:border-violet-500/30 transition">
                  <div className="font-mono text-xs text-zinc-500">{ch.className} • {ch.subjectName}</div>
                  <div className="font-serif text-lg text-white mt-1">{ch.title}</div>
                  <div className="font-mono text-xs text-zinc-500 mt-1">{ch.subtitle}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {!search && (
          <>
            <div className="mt-14 grid md:grid-cols-2 gap-6">
              {(learningData?.classes || []).map((cls, i) => (
                <motion.div key={cls.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.1 }} className="group relative rounded-[1.8rem] border border-white/10 bg-[#0a0a0f] p-2 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${cls.color} opacity-10 group-hover:opacity-15 transition`} />
                  <div className="relative rounded-[1.4rem] bg-[#0f0f12] border border-white/5 p-7">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4 items-center">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cls.color} flex items-center justify-center font-serif text-2xl text-white`}>{cls.short}</div>
                        <div>
                          <div className="font-serif text-3xl text-white">{cls.name}</div>
                          <div className="font-mono text-xs text-zinc-500 mt-1">{cls.description}</div>
                        </div>
                      </div>
                      <Link to={`/learn/${cls.id}`} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition"><ChevronRight className="w-5 h-5" /></Link>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      <div className="glass rounded-xl p-3"><div className="font-serif text-xl text-white">{cls.subjects?.length || 0}</div><div className="font-mono text-[10px] text-zinc-500 uppercase">Subjects</div></div>
                      <div className="glass rounded-xl p-3"><div className="font-serif text-xl text-white">{cls.subjects?.reduce((a,b)=>a+(b.chapters?.length||0),0) || 0}</div><div className="font-mono text-[10px] text-zinc-500 uppercase">Chapters</div></div>
                      <div className="glass rounded-xl p-3"><div className="font-serif text-xl text-white">{cls.stats?.students || '0'}</div><div className="font-mono text-[10px] text-zinc-500 uppercase">Learners</div></div>
                    </div>

                    <div className="mt-6">
                      <div className="font-mono text-[11px] tracking-widest uppercase text-zinc-500">Popular Subjects</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(cls.subjects || []).map(s => (
                          <Link key={s.id} to={`/learn/${cls.id}/${s.id}`} className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono text-zinc-300 hover:bg-white hover:text-black transition flex items-center gap-1.5">
                            <span>{s.icon}</span> {s.name} <span className="text-[10px] opacity-60">({(s.chapters?.length || 0)})</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <ExamPreparation />

            <div className="mt-14 glass rounded-[1.5rem] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center"><BookOpen className="w-6 h-6 text-white" /></div>
                <div><div className="font-medium text-white">Easy to expand</div><div className="font-mono text-xs text-zinc-500 mt-1"> GeT Back<code className="px-1.5 py-0.5 bg-white/10 rounded"></code></div></div>
              </div>
              <Link to="/" className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition">Back to Portfolio</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
