import { useAppData } from '../../context/AdminContext'

export default function Footer() {
  const { personalData, theme, viewerCount } = useAppData()
  return (
    <footer className="relative border-t border-white/5 py-14 mt-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-white text-sm" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>{theme.logoText || 'NKT'}</div>
              <div className="font-medium text-white">{personalData.name} — CS Educator & Builder</div>
            </div>
            <div className="mt-4 font-serif italic text-[17px] leading-relaxed text-zinc-300 max-w-xl">
              “Code is like humor. When you have to explain it, it’s bad.” — Cory House
            </div>
            <div className="mt-3 font-mono text-xs text-zinc-500 max-w-md">
              I built this because I was tired of losing notes in random groups. It's just my teaching, written down, with my own mistakes included. Learn, build, teach, repeat.
            </div>
            <div className="mt-6 flex gap-3 font-mono text-[11px] text-zinc-600 flex-wrap">
              <span>{viewerCount} total visits</span><span>•</span><span>Kathmandu, Nepal</span><span>•</span><span>ESTD 2020</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5">
              <div className="font-mono text-[11px] tracking-widest text-violet-300 uppercase">A quick note from me</div>
              <div className="font-serif text-lg text-white mt-2">“First, solve the problem. Then, write the code.”</div>
              <div className="font-mono text-xs text-zinc-500 mt-1">— John Johnson • I try to keep it simple, even when I mess up</div>
            </div>
            <div className="flex justify-between items-center font-mono text-xs text-zinc-600">
              <span>© {new Date().getFullYear()} {personalData.name}. </span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />Live • {viewerCount}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
