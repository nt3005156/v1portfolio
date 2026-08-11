import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, FileText, Upload, Link as LinkIcon } from 'lucide-react'
import { readFileAsDataURL, formatFileSize } from '../../utils/fileStorage'

export default function ChaptersManager() {
  const { learning, addChapter, updateChapter, deleteChapter } = useAdmin()
  const [selectedClass, setSelectedClass] = useState(learning.classes[0]?.id || '')
  const [selectedSubject, setSelectedSubject] = useState(learning.classes[0]?.subjects[0]?.id || '')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [activeTab, setActiveTab] = useState('basic')
  const [uploadingIdx, setUploadingIdx] = useState(null)

  const currentClass = learning.classes.find(c=>c.id===selectedClass)
  const currentSubject = currentClass?.subjects.find(s=>s.id===selectedSubject)

  const defaultForm = {
    title: '', subtitle: '', duration: '45 min', level: 'Beginner', tags: '', progress: 0,
    materials: { notes: '', importantQuestions: [''], mcqs: [{ q: '', options: ['', '', '', ''], ans: 0 }], programs: [{ title: '', lang: 'c', code: '' }], pdfs: [{ name: '', size: '', url: '', fileData: '' }] }
  }
  const [form, setForm] = useState(defaultForm)

  const handleClassChange = (cid) => {
    setSelectedClass(cid)
    const cls = learning.classes.find(c=>c.id===cid)
    setSelectedSubject(cls?.subjects[0]?.id || '')
  }

  const openCreate = () => {
    setEditing(null); setForm(JSON.parse(JSON.stringify(defaultForm))); setActiveTab('basic'); setShowModal(true)
  }
  const openEdit = (ch) => {
    setEditing(ch)
    setForm({
      title: ch.title,
      subtitle: ch.subtitle,
      duration: ch.duration,
      level: ch.level,
      tags: (ch.tags||[]).join(', '),
      progress: ch.progress||0,
      materials: {
        notes: ch.materials?.notes||'',
        importantQuestions: ch.materials?.importantQuestions?.length ? ch.materials.importantQuestions : [''],
        mcqs: ch.materials?.mcqs?.length ? ch.materials.mcqs : [{ q: '', options: ['', '', '', ''], ans: 0 }],
        programs: ch.materials?.programs?.length ? ch.materials.programs : [{ title: '', lang: 'c', code: '' }],
        pdfs: ch.materials?.pdfs?.length ? ch.materials.pdfs.map(p=>({ name: p.name, size: p.size||'', url: p.url||'', fileData: p.fileData||p.url||'' })) : [{ name: '', size: '', url: '', fileData: '' }]
      }
    })
    setActiveTab('basic'); setShowModal(true)
  }

  const handleFileUpload = async (idx, file) => {
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large (max 5MB for localStorage demo). For production, use Supabase/S3. File: ' + formatFileSize(file.size))
    }
    setUploadingIdx(idx)
    try {
      const dataUrl = await readFileAsDataURL(file)
      const arr = [...form.materials.pdfs]
      arr[idx].name = arr[idx].name || file.name
      arr[idx].size = formatFileSize(file.size)
      arr[idx].url = dataUrl
      arr[idx].fileData = dataUrl
      setForm({...form, materials:{...form.materials, pdfs: arr}})
    } catch (e) { alert('Failed to read file') }
    setUploadingIdx(null)
  }

  const handleSave = () => {
    if (!form.title) return alert('Title required')
    const payload = {
      title: form.title,
      subtitle: form.subtitle,
      duration: form.duration,
      level: form.level,
      tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean),
      materials: {
        notes: form.materials.notes,
        importantQuestions: form.materials.importantQuestions.filter(q=>q.trim()),
        mcqs: form.materials.mcqs.filter(m=>m.q.trim()).map(m=>({ q: m.q, options: m.options, ans: Number(m.ans) })),
        programs: form.materials.programs.filter(p=>p.code.trim()).map(p=>({ title: p.title, lang: p.lang, code: p.code })),
        pdfs: form.materials.pdfs.filter(p=>p.name.trim()).map(p=>({ name: p.name, size: p.size, url: p.url, fileData: p.fileData||p.url }))
      }
    }
    if (editing) updateChapter(selectedClass, selectedSubject, editing.id, payload)
    else addChapter(selectedClass, selectedSubject, payload)
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-emerald-400 uppercase">Admin / Chapters — PDF Upload Supported</div>
          <h1 className="font-serif text-3xl text-white mt-2">Manage Chapters</h1>
          <p className="font-mono text-xs text-zinc-500 mt-1">Notes, Q&A, MCQs, code, syllabus, PDFs — now with computer upload. Optimized for 1000 students.</p>
        </div>
        <button onClick={openCreate} className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4"/>New Chapter</button>
      </div>

      <div className="flex flex-wrap gap-3 glass rounded-full p-2 w-fit">
        <select value={selectedClass} onChange={e=>handleClassChange(e.target.value)} className="bg-black border border-white/10 rounded-full px-4 py-2 text-sm text-white">
          {learning.classes.map(c=><option key={c.id} value={c.id} className="bg-black">{c.name}</option>)}
        </select>
        <select value={selectedSubject} onChange={e=>setSelectedSubject(e.target.value)} className="bg-black border border-white/10 rounded-full px-4 py-2 text-sm text-white">
          {currentClass?.subjects.map(s=><option key={s.id} value={s.id} className="bg-black">{s.name}</option>)}
        </select>
      </div>

      {!currentSubject ? <div className="font-mono text-sm text-zinc-500">No subject selected.</div> :
        <div className="grid gap-3">
          {currentSubject.chapters.map(ch=>(
            <div key={ch.id} className="group flex justify-between items-start p-5 rounded-2xl border border-white/10 bg-[#0a0a0f] hover:border-white/20 transition">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full bg-white/10 text-[10px] font-mono">{ch.level}</span>
                  <span className="font-mono text-xs text-zinc-500">{ch.duration}</span>
                  <span className="font-mono text-xs text-zinc-600">{ch.materials?.pdfs?.length||0} files</span>
                </div>
                <div className="font-medium text-white mt-2">{ch.title}</div>
                <div className="font-mono text-xs text-zinc-500">{ch.subtitle}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>openEdit(ch)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><Edit2 className="w-4 h-4"/></button>
                <button onClick={()=>{ if(confirm('Delete chapter?')) deleteChapter(selectedClass, selectedSubject, ch.id)}} className="w-8 h-8 rounded-full glass flex items-center justify-center text-red-300"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
          ))}
        </div>
      }

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center p-4 overflow-auto">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20, opacity: 0 }} className="w-full max-w-4xl my-8 glass rounded-[1.5rem] border border-white/10 p-6 max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#0a0a0f]/90 backdrop-blur-xl p-2 rounded-xl">
                <h3 className="font-serif text-xl text-white">{editing ? 'Edit' : 'New'} Chapter — {currentSubject?.name}</h3>
                <button onClick={()=>setShowModal(false)} className="w-8 h-8 rounded-full glass flex items-center justify-center"><X className="w-4 h-4"/></button>
              </div>

              <div className="flex gap-2 p-1 bg-black rounded-full w-fit border border-white/10 mb-6 flex-wrap">
                {[
                  { id: 'basic', label: 'Basic' },
                  { id: 'notes', label: 'Notes' },
                  { id: 'questions', label: 'Questions' },
                  { id: 'mcqs', label: 'MCQs' },
                  { id: 'code', label: 'Code' },
                  { id: 'links', label: 'PDF Upload' },
                ].map(t=><button key={t.id} onClick={()=>setActiveTab(t.id)} className={`px-4 py-2 rounded-full text-xs font-mono ${activeTab===t.id ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}>{t.label}</button>)}
              </div>

              {activeTab==='basic' && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className="font-mono text-xs text-zinc-500">Title *</label><input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none" placeholder="DBMS" /></div>
                    <div><label className="font-mono text-xs text-zinc-500">Subtitle</label><input value={form.subtitle} onChange={e=>setForm({...form, subtitle: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none" /></div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div><label className="font-mono text-xs text-zinc-500">Duration</label><input value={form.duration} onChange={e=>setForm({...form, duration: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                    <div><label className="font-mono text-xs text-zinc-500">Level</label><select value={form.level} onChange={e=>setForm({...form, level: e.target.value})} className="mt-1 w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>
                    <div><label className="font-mono text-xs text-zinc-500">Tags</label><input value={form.tags} onChange={e=>setForm({...form, tags: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
                  </div>
                </div>
              )}

              {activeTab==='notes' && (
                <div>
                  <label className="font-mono text-xs text-zinc-500 flex items-center gap-2"><FileText className="w-4 h-4"/> Notes</label>
                  <textarea value={form.materials.notes} onChange={e=>setForm({...form, materials: {...form.materials, notes: e.target.value}})} rows={14} className="mt-2 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white outline-none" />
                </div>
              )}

              {activeTab==='questions' && (
                <div className="space-y-3">
                  {form.materials.importantQuestions.map((q,i)=>(
                    <div key={i} className="flex gap-2">
                      <input value={q} onChange={e=>{ const arr=[...form.materials.importantQuestions]; arr[i]=e.target.value; setForm({...form, materials:{...form.materials, importantQuestions: arr}})}} className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder={`Q ${i+1}`} />
                      <button onClick={()=>{ const arr=form.materials.importantQuestions.filter((_,idx)=>idx!==i); setForm({...form, materials:{...form.materials, importantQuestions: arr}})}} className="w-10 h-10 rounded-xl bg-red-500/10 text-red-300 flex items-center justify-center"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  ))}
                  <button onClick={()=>setForm({...form, materials:{...form.materials, importantQuestions:[...form.materials.importantQuestions, '']}})} className="px-4 py-2 rounded-full glass text-xs flex items-center gap-2"><Plus className="w-3 h-3"/>Add Question</button>
                </div>
              )}

              {activeTab==='mcqs' && (
                <div className="space-y-6">
                  {form.materials.mcqs.map((mcq, idx)=>(
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
                      <div className="flex justify-between"><span className="font-mono text-xs text-zinc-400">MCQ {idx+1}</span><button onClick={()=>{ const arr=form.materials.mcqs.filter((_,i)=>i!==idx); setForm({...form, materials:{...form.materials, mcqs: arr}})}} className="text-red-300"><Trash2 className="w-4 h-4"/></button></div>
                      <input value={mcq.q} onChange={e=>{ const arr=[...form.materials.mcqs]; arr[idx].q=e.target.value; setForm({...form, materials:{...form.materials, mcqs: arr}})}} className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Question" />
                      <div className="grid md:grid-cols-2 gap-2">
                        {mcq.options.map((opt, oi)=>(
                          <div key={oi} className="flex gap-2"><span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono">{String.fromCharCode(65+oi)}</span><input value={opt} onChange={e=>{ const arr=[...form.materials.mcqs]; arr[idx].options[oi]=e.target.value; setForm({...form, materials:{...form.materials, mcqs: arr}})}} className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white" /></div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2"><label className="font-mono text-xs text-zinc-500">Correct 0-3</label><input type="number" min={0} max={3} value={mcq.ans} onChange={e=>{ const arr=[...form.materials.mcqs]; arr[idx].ans=Number(e.target.value); setForm({...form, materials:{...form.materials, mcqs: arr}})}} className="w-20 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-1 text-sm text-white" /></div>
                    </div>
                  ))}
                  <button onClick={()=>setForm({...form, materials:{...form.materials, mcqs:[...form.materials.mcqs, { q: '', options: ['', '', '', ''], ans: 0 }]}})} className="px-4 py-2 rounded-full glass text-xs flex items-center gap-2"><Plus className="w-3 h-3"/>Add MCQ</button>
                </div>
              )}

              {activeTab==='code' && (
                <div className="space-y-6">
                  {form.materials.programs.map((prog, idx)=>(
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
                      <div className="flex justify-between">
                        <input value={prog.title} onChange={e=>{ const arr=[...form.materials.programs]; arr[idx].title=e.target.value; setForm({...form, materials:{...form.materials, programs: arr}})}} className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white mr-2" placeholder="Title" />
                        <input value={prog.lang} onChange={e=>{ const arr=[...form.materials.programs]; arr[idx].lang=e.target.value; setForm({...form, materials:{...form.materials, programs: arr}})}} className="w-24 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white" placeholder="c" />
                        <button onClick={()=>{ const arr=form.materials.programs.filter((_,i)=>i!==idx); setForm({...form, materials:{...form.materials, programs: arr}})}} className="ml-2 w-10 h-10 rounded-xl bg-red-500/10 text-red-300 flex items-center justify-center"><Trash2 className="w-4 h-4"/></button>
                      </div>
                      <textarea value={prog.code} onChange={e=>{ const arr=[...form.materials.programs]; arr[idx].code=e.target.value; setForm({...form, materials:{...form.materials, programs: arr}})}} rows={6} className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-zinc-300" />
                    </div>
                  ))}
                  <button onClick={()=>setForm({...form, materials:{...form.materials, programs:[...form.materials.programs, { title: '', lang: 'c', code: '' }]}})} className="px-4 py-2 rounded-full glass text-xs flex items-center gap-2"><Plus className="w-3 h-3"/>Add Code</button>
                </div>
              )}

              {activeTab==='links' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="font-mono text-xs text-amber-200">📂 Now you can upload PDF from computer — plus external links. For production, use Supabase/S3.</div>
                    <div className="font-mono text-[11px] text-amber-300/70 mt-1">LocalStorage demo: up to 5MB. For larger files, use Link. 1000 students can download because file is saved as DataURL.</div>
                  </div>
                  {form.materials.pdfs.map((pdf, idx)=>(
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
                      <div className="grid md:grid-cols-[1fr_120px] gap-3">
                        <input value={pdf.name} onChange={e=>{ const arr=[...form.materials.pdfs]; arr[idx].name=e.target.value; setForm({...form, materials:{...form.materials, pdfs: arr}})}} className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white" placeholder="Notes PDF title" />
                        <div className="text-xs font-mono text-zinc-500 flex items-center">{pdf.size || 'No file yet'}</div>
                      </div>
                      <div className="grid md:grid-cols-[1fr_auto] gap-2">
                        <input value={pdf.url && !pdf.url.startsWith('data:') ? pdf.url : ''} onChange={e=>{ const arr=[...form.materials.pdfs]; arr[idx].url=e.target.value; setForm({...form, materials:{...form.materials, pdfs: arr}})}} className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white" placeholder="https://drive.google.com/... or external link" />
                        <label className="px-4 py-2 rounded-full bg-white text-black text-xs font-medium flex items-center gap-2 cursor-pointer hover:bg-zinc-200">
                          <Upload className="w-4 h-4"/> {uploadingIdx===idx ? 'Uploading...' : 'Upload from Computer'}
                          <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip" className="hidden" onChange={e=>{ const f=e.target.files[0]; if(f) handleFileUpload(idx, f) }} />
                        </label>
                      </div>
                      {pdf.url && pdf.url.startsWith('data:') && (
                        <div className="flex items-center gap-2 font-mono text-xs text-emerald-300">
                          <span>✓ File ready — saved in browser, students can download</span>
                          <a href={pdf.url} download={pdf.name || 'file.pdf'} className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px]">Preview / Download</a>
                        </div>
                      )}
                      <div className="flex justify-end">
                        <button onClick={()=>{ const arr=form.materials.pdfs.filter((_,i)=>i!==idx); setForm({...form, materials:{...form.materials, pdfs: arr}})}} className="text-xs text-red-400 flex items-center gap-1"><Trash2 className="w-3 h-3"/>Remove</button>
                      </div>
                    </div>
                  ))}
                  <button onClick={()=>setForm({...form, materials:{...form.materials, pdfs:[...form.materials.pdfs, { name: '', size: '', url: '', fileData: '' }]}})} className="px-4 py-2 rounded-full glass text-xs flex items-center gap-2"><Plus className="w-3 h-3"/>Add File / Link</button>
                </div>
              )}

              <div className="mt-8 flex justify-end gap-3 sticky bottom-0 bg-[#0a0a0f]/90 backdrop-blur-xl p-2 rounded-xl">
                <button onClick={()=>setShowModal(false)} className="px-6 py-2.5 rounded-full glass text-sm">Cancel</button>
                <button onClick={handleSave} className="px-8 py-2.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2"><Save className="w-4 h-4"/>{editing ? 'Update' : 'Create'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
