import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { Save, Plus, Trash2 } from 'lucide-react'

export default function ContentManager() {
  const { personal, setPersonal, skills, setSkills, experience, setExperience, education, setEducation, achievements, setAchievements, services, setServices } = useAdmin()
  const [tab, setTab] = useState('personal')

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[11px] tracking-[0.2em] text-cyan-300 uppercase">Admin / Content</div>
        <h1 className="font-serif text-3xl text-white mt-2">Manage Portfolio Content</h1>
        <p className="font-mono text-xs text-zinc-500 mt-1">Edit personal info, skills, experience, education, achievements, services — all live instantly.</p>
      </div>

      <div className="flex gap-2 p-1 bg-black rounded-full w-fit border border-white/10 flex-wrap">
        {[
          { id: 'personal', label: 'Personal' },
          { id: 'skills', label: 'Skills' },
          { id: 'experience', label: 'Experience' },
          { id: 'education', label: 'Education' },
          { id: 'achievements', label: 'Achievements' },
          { id: 'services', label: 'Services' },
        ].map(t=> <button key={t.id} onClick={()=>setTab(t.id)} className={`px-4 py-2 rounded-full text-xs font-mono ${tab===t.id ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}>{t.label}</button>)}
      </div>

      {tab==='personal' && (
        <div className="glass rounded-[1.5rem] p-6 space-y-4">
          <h3 className="font-serif text-xl text-white">Personal Info</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="font-mono text-xs text-zinc-500">Full Name</label><input value={personal.name} onChange={e=>setPersonal({...personal, name: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
            <div><label className="font-mono text-xs text-zinc-500">First Name</label><input value={personal.firstName} onChange={e=>setPersonal({...personal, firstName: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
            <div><label className="font-mono text-xs text-zinc-500">Tagline</label><input value={personal.tagline} onChange={e=>setPersonal({...personal, tagline: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
            <div><label className="font-mono text-xs text-zinc-500">Location</label><input value={personal.location} onChange={e=>setPersonal({...personal, location: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
            <div><label className="font-mono text-xs text-zinc-500">Email</label><input value={personal.email} onChange={e=>setPersonal({...personal, email: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
            <div><label className="font-mono text-xs text-zinc-500">Roles (comma sep)</label><input value={(personal.roles||[]).join(', ')} onChange={e=>setPersonal({...personal, roles: e.target.value.split(',').map(s=>s.trim())})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
          </div>
          <div><label className="font-mono text-xs text-zinc-500">Bio (short)</label><textarea value={personal.bio} onChange={e=>setPersonal({...personal, bio: e.target.value})} rows={2} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
          <div><label className="font-mono text-xs text-zinc-500">Long Bio</label><textarea value={personal.longBio} onChange={e=>setPersonal({...personal, longBio: e.target.value})} rows={4} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
          <div className="grid md:grid-cols-3 gap-4">
            {personal.stats?.map((s,i)=>(
              <div key={i} className="flex gap-2">
                <input value={s.value} onChange={e=>{ const arr=[...personal.stats]; arr[i]={...arr[i], value: e.target.value}; setPersonal({...personal, stats: arr})}} className="w-20 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white" />
                <input value={s.label} onChange={e=>{ const arr=[...personal.stats]; arr[i]={...arr[i], label: e.target.value}; setPersonal({...personal, stats: arr})}} className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white" />
              </div>
            ))}
          </div>
          <div className="pt-4 flex justify-end"><div className="px-5 py-2 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono">Auto-saved to localStorage ✓</div></div>
        </div>
      )}

      {tab==='skills' && (
        <div className="space-y-4">
          {skills.map((cat, ci)=>(
            <div key={ci} className="glass rounded-[1.5rem] p-6">
              <div className="flex justify-between items-center">
                <input value={cat.category} onChange={e=>{ const arr=[...skills]; arr[ci].category=e.target.value; setSkills([...arr])}} className="bg-transparent text-white font-medium text-lg outline-none border-b border-white/10" />
                <button onClick={()=>{ const arr=skills.filter((_,i)=>i!==ci); setSkills(arr)}} className="text-red-300 text-xs"><Trash2 className="w-4 h-4"/></button>
              </div>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {cat.skills.map((sk, si)=>(
                  <div key={si} className="flex gap-2">
                    <input value={sk.name} onChange={e=>{ const arr=[...skills]; arr[ci].skills[si].name=e.target.value; setSkills([...arr])}} className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white" />
                    <input type="number" value={sk.level} onChange={e=>{ const arr=[...skills]; arr[ci].skills[si].level=Number(e.target.value); setSkills([...arr])}} className="w-20 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white" />
                    <button onClick={()=>{ const arr=[...skills]; arr[ci].skills=arr[ci].skills.filter((_,i)=>i!==si); setSkills([...arr])}} className="text-red-300"><Trash2 className="w-4 h-4"/></button>
                  </div>
                ))}
              </div>
              <button onClick={()=>{ const arr=[...skills]; arr[ci].skills=[...arr[ci].skills, { name: 'New Skill', level: 80 }]; setSkills([...arr])}} className="mt-4 px-4 py-2 rounded-full glass text-xs flex items-center gap-2"><Plus className="w-3 h-3"/>Add Skill</button>
            </div>
          ))}
          <button onClick={()=>setSkills([...skills, { category: 'New Category', icon: '✨', color: 'from-violet-500 to-fuchsia-500', skills: [] }])} className="px-5 py-2.5 rounded-full bg-white text-black text-sm flex items-center gap-2"><Plus className="w-4 h-4"/>Add Category</button>
        </div>
      )}

      {tab==='experience' && (
        <div className="space-y-4">
          {experience.map((exp, i)=>(
            <div key={exp.id} className="glass rounded-[1.5rem] p-6 space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <input value={exp.role} onChange={e=>{ const arr=[...experience]; arr[i].role=e.target.value; setExperience([...arr])}} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Role" />
                <input value={exp.org} onChange={e=>{ const arr=[...experience]; arr[i].org=e.target.value; setExperience([...arr])}} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Org" />
                <input value={exp.period} onChange={e=>{ const arr=[...experience]; arr[i].period=e.target.value; setExperience([...arr])}} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Period" />
                <input value={exp.location} onChange={e=>{ const arr=[...experience]; arr[i].location=e.target.value; setExperience([...arr])}} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Location" />
              </div>
              <div className="space-y-2">
                {(exp.points||[]).map((pt, pi)=>(
                  <div key={pi} className="flex gap-2">
                    <input value={pt} onChange={e=>{ const arr=[...experience]; arr[i].points[pi]=e.target.value; setExperience([...arr])}} className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white" />
                    <button onClick={()=>{ const arr=[...experience]; arr[i].points=arr[i].points.filter((_,idx)=>idx!==pi); setExperience([...arr])}} className="text-red-300"><Trash2 className="w-4 h-4"/></button>
                  </div>
                ))}
                <button onClick={()=>{ const arr=[...experience]; arr[i].points=[...(arr[i].points||[]), 'New point']; setExperience([...arr])}} className="text-xs font-mono text-zinc-400">+ Add point</button>
              </div>
              <button onClick={()=>setExperience(experience.filter((_,idx)=>idx!==i))} className="text-xs text-red-400">Delete experience</button>
            </div>
          ))}
          <button onClick={()=>setExperience([{ id: Date.now(), role: 'New Role', org: 'Company', period: '2024', location: 'Remote', points: ['Did something'], color: 'violet' }, ...experience])} className="px-5 py-2.5 rounded-full bg-white text-black text-sm flex items-center gap-2"><Plus className="w-4 h-4"/>Add Experience</button>
        </div>
      )}

      {tab==='education' && (
        <div className="space-y-4">
          {education.map((ed,i)=>(
            <div key={i} className="glass rounded-[1.5rem] p-6 grid md:grid-cols-2 gap-3">
              <input value={ed.degree} onChange={e=>{ const arr=[...education]; arr[i].degree=e.target.value; setEducation([...arr])}} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Degree" />
              <input value={ed.school} onChange={e=>{ const arr=[...education]; arr[i].school=e.target.value; setEducation([...arr])}} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="School" />
              <input value={ed.year} onChange={e=>{ const arr=[...education]; arr[i].year=e.target.value; setEducation([...arr])}} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Year" />
              <input value={ed.detail} onChange={e=>{ const arr=[...education]; arr[i].detail=e.target.value; setEducation([...arr])}} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="Detail" />
              <button onClick={()=>setEducation(education.filter((_,idx)=>idx!==i))} className="text-xs text-red-400">Delete</button>
            </div>
          ))}
          <button onClick={()=>setEducation([...education, { degree: 'New Degree', school: 'University', year: '2024', detail: '' }])} className="px-5 py-2.5 rounded-full bg-white text-black text-sm"><Plus className="w-4 h-4 inline"/> Add Education</button>
        </div>
      )}

      {tab==='achievements' && (
        <div className="space-y-4">
          {achievements.map((a,i)=>(
            <div key={i} className="glass rounded-[1.5rem] p-6 grid md:grid-cols-3 gap-3">
              <input value={a.title} onChange={e=>{ const arr=[...achievements]; arr[i].title=e.target.value; setAchievements([...arr])}} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" />
              <input value={a.org} onChange={e=>{ const arr=[...achievements]; arr[i].org=e.target.value; setAchievements([...arr])}} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" />
              <div className="flex gap-2"><input value={a.desc} onChange={e=>{ const arr=[...achievements]; arr[i].desc=e.target.value; setAchievements([...arr])}} className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /><button onClick={()=>setAchievements(achievements.filter((_,idx)=>idx!==i))} className="text-red-300"><Trash2 className="w-4 h-4"/></button></div>
            </div>
          ))}
          <button onClick={()=>setAchievements([...achievements, { title: 'New Achievement', org: 'Org', desc: 'Desc' }])} className="px-5 py-2.5 rounded-full bg-white text-black text-sm">Add Achievement</button>
        </div>
      )}

      {tab==='services' && (
        <div className="space-y-4">
          {services.map((s,i)=>(
            <div key={i} className="glass rounded-[1.5rem] p-6 grid md:grid-cols-2 gap-3">
              <input value={s.title} onChange={e=>{ const arr=[...services]; arr[i].title=e.target.value; setServices([...arr])}} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" />
              <input value={s.icon} onChange={e=>{ const arr=[...services]; arr[i].icon=e.target.value; setServices([...arr])}} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" />
              <textarea value={s.desc} onChange={e=>{ const arr=[...services]; arr[i].desc=e.target.value; setServices([...arr])}} className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white md:col-span-2" rows={2} />
              <div className="flex gap-2 md:col-span-2"><input value={(s.tags||[]).join(', ')} onChange={e=>{ const arr=[...services]; arr[i].tags=e.target.value.split(',').map(t=>t.trim()); setServices([...arr])}} className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="tags, comma" /><button onClick={()=>setServices(services.filter((_,idx)=>idx!==i))} className="text-red-300"><Trash2 className="w-4 h-4"/></button></div>
            </div>
          ))}
          <button onClick={()=>setServices([...services, { title: 'New Service', desc: 'Desc', icon: '🚀', tags: [] }])} className="px-5 py-2.5 rounded-full bg-white text-black text-sm">Add Service</button>
        </div>
      )}
    </div>
  )
}
