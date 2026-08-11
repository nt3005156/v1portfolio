import { motion } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'
import { GraduationCap, BookOpen, Layers, Briefcase, Eye, Megaphone, TrendingUp, Plus, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { learning, projects, personal, activity, viewerCount, ads } = useAdmin()

  const totalClasses = learning.classes.length
  const totalSubjects = learning.classes.reduce((a,c)=>a+c.subjects.length,0)
  const totalChapters = learning.classes.reduce((a,c)=>a+c.subjects.reduce((s,sub)=>s+sub.chapters.length,0),0)
  const totalProjects = projects.length

  const stats = [
    { label: 'Total Views (from 1111)', value: viewerCount, icon: Eye, color: 'from-violet-600 to-indigo-600', to: '/admin/settings' },
    { label: 'Classes', value: totalClasses, icon: GraduationCap, color: 'from-cyan-500 to-blue-600', to: '/admin/classes' },
    { label: 'Subjects', value: totalSubjects, icon: Layers, color: 'from-emerald-500 to-teal-600', to: '/admin/subjects' },
    { label: 'Chapters', value: totalChapters, icon: BookOpen, color: 'from-amber-500 to-orange-600', to: '/admin/chapters' },
    { label: 'Projects', value: totalProjects, icon: Briefcase, color: 'from-pink-500 to-rose-500', to: '/admin/projects' },
    { label: 'Sponsor Ads', value: ads.length, icon: Megaphone, color: 'from-amber-500 to-orange-600', to: '/admin/ads' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-violet-400 uppercase">Admin / Dashboard — NKT</div>
          <h1 className="font-serif text-4xl text-white mt-2">Hey, <span className="italic font-light">{personal.firstName || 'Nitesh'}</span> — you’ve got this.</h1>
          <p className="font-mono text-sm text-zinc-500 mt-2">Manage everything from here. No code, just your teaching. Viewer count started at 1111 and grows every visit.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link to="/admin/classes" className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2 hover:bg-zinc-200"><Plus className="w-4 h-4"/>New Class</Link>
          <Link to="/admin/ads" className="px-5 py-2.5 rounded-full glass text-white text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4"/>New Ad</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s,i)=>(
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.05 }} className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0a0a0f] p-5 hover:border-white/20 transition">
            <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${s.color} opacity-20 blur-2xl rounded-full`} />
            <div className="flex justify-between items-start">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}><s.icon className="w-4 h-4 text-white"/></div>
              <Link to={s.to} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition"><ArrowUpRight className="w-3 h-3"/></Link>
            </div>
            <div className="mt-4 font-serif text-2xl text-white">{s.value}</div>
            <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="glass rounded-[1.5rem] p-6">
          <div className="flex items-center justify-between">
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">Classes Overview</div>
            <Link to="/admin/classes" className="font-mono text-xs text-violet-400 hover:text-violet-300">Manage all →</Link>
          </div>
          <div className="mt-6 space-y-3">
            {learning.classes.map(cls=>(
              <div key={cls.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cls.color} flex items-center justify-center font-serif text-white`}>{cls.short}</div>
                  <div><div className="font-medium text-white text-sm">{cls.name}</div><div className="font-mono text-xs text-zinc-500">{cls.subjects.length} subjects • {cls.subjects.reduce((a,b)=>a+b.chapters.length,0)} chapters</div></div>
                </div>
                <div className="font-mono text-xs text-zinc-500">{cls.stats?.students || '—'}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-[1.5rem] p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 flex items-center gap-2"><TrendingUp className="w-3 h-3"/> Recent Activity</div>
            <div className="mt-4 space-y-3 max-h-[260px] overflow-auto pr-1">
              {activity.length===0 && <div className="font-mono text-xs text-zinc-600">No activity yet. Start by creating a class.</div>}
              {activity.slice(0,10).map((a,i)=>(
                <div key={i} className="flex gap-3 text-xs font-mono">
                  <span className="text-zinc-600 shrink-0">{new Date(a.at).toLocaleTimeString()}</span>
                  <span className="text-violet-300">{a.action}</span>
                  <span className="text-zinc-400 truncate">{a.detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] p-[1px] bg-gradient-to-br from-violet-600/30 to-cyan-400/30">
            <div className="rounded-[1.5rem] bg-[#0a0a0f] p-6">
              <div className="font-serif text-xl text-white">How this stays after 1 month</div>
              <div className="font-mono text-xs text-zinc-400 mt-2">All your content is saved in browser localStorage + auto backup <code className="bg-white/10 px-1 rounded">exp_backup_latest</code>. When you deploy new code on same domain, storage stays. Plus export JSON before any big update — that's your safety net.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
