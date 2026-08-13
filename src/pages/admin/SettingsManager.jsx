import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { Save, Download, Upload, RefreshCw, Palette, Shield } from 'lucide-react'
import { isApiEnabled } from '../../lib/api'

export default function SettingsManager() {
  const { theme, setTheme, exportAll, importAll, resetAll, creds, updateCreds, logActivity } = useAdmin()
  const [localTheme, setLocalTheme] = useState(theme)
  const [localCreds, setLocalCreds] = useState({ username: creds.username, password: '' })
  const [oldPassword, setOldPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [credsMsg, setCredsMsg] = useState(null)
  const [saving, setSaving] = useState(false)
  const [importText, setImportText] = useState('')
  const apiEnabled = isApiEnabled()

  const handleThemeSave = () => {
    setTheme(localTheme)
    logActivity('SETTINGS', 'Theme updated')
    alert('Theme saved! Changes apply instantly across site.')
  }

  const handleCredsSave = async () => {
    if (!localCreds.username || !localCreds.password) return alert('Username & password required')
    if (localCreds.password.length < 8) return alert('Password must be at least 8 characters')
    if (localCreds.password !== confirmPassword) return alert('New passwords do not match')
    if (apiEnabled && !oldPassword) return alert('Enter your current password to confirm the change')

    setSaving(true)
    setCredsMsg(null)
    const res = await updateCreds(localCreds, oldPassword)
    setSaving(false)

    if (res?.ok) {
      setCredsMsg({ type: 'ok', text: res.message })
      setOldPassword('')
      setConfirmPassword('')
      setLocalCreds({ ...localCreds, password: '' })
    } else {
      setCredsMsg({ type: 'err', text: res?.error || 'Update failed' })
    }
  }

  const handleFileImport = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result)
        const ok = importAll(json)
        if (ok) alert('Import successful! Reloading...'), window.location.reload()
        else alert('Import failed')
      } catch { alert('Invalid JSON') }
    }
    reader.readAsText(file)
  }

  const handleTextImport = () => {
    try {
      const json = JSON.parse(importText)
      const ok = importAll(json)
      if (ok) alert('Imported!'), window.location.reload()
      else alert('Failed')
    } catch { alert('Invalid JSON') }
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="font-mono text-[11px] tracking-[0.2em] text-violet-400 uppercase">Admin / Theme & Settings</div>
        <h1 className="font-serif text-3xl text-white mt-2">Theme & Global Settings</h1>
        <p className="font-mono text-xs text-zinc-500 mt-1">Customize colors, branding, credentials, backup/restore.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Theme */}
        <div className="glass rounded-[1.5rem] p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center"><Palette className="w-5 h-5 text-white"/></div>
            <div><div className="font-medium text-white">Theme Colors</div><div className="font-mono text-xs text-zinc-500">Live preview — applies instantly</div></div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="font-mono text-xs text-zinc-500">Primary</label><div className="flex gap-2 mt-1"><input type="color" value={localTheme.primary} onChange={e=>setLocalTheme({...localTheme, primary: e.target.value})} className="w-10 h-10 rounded-xl bg-transparent border border-white/10" /><input value={localTheme.primary} onChange={e=>setLocalTheme({...localTheme, primary: e.target.value})} className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white" /></div></div>
              <div><label className="font-mono text-xs text-zinc-500">Secondary</label><div className="flex gap-2 mt-1"><input type="color" value={localTheme.secondary} onChange={e=>setLocalTheme({...localTheme, secondary: e.target.value})} className="w-10 h-10 rounded-xl bg-transparent border border-white/10" /><input value={localTheme.secondary} onChange={e=>setLocalTheme({...localTheme, secondary: e.target.value})} className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white" /></div></div>
              <div><label className="font-mono text-xs text-zinc-500">Accent (cyan)</label><div className="flex gap-2 mt-1"><input type="color" value={localTheme.accent} onChange={e=>setLocalTheme({...localTheme, accent: e.target.value})} className="w-10 h-10 rounded-xl bg-transparent border border-white/10" /><input value={localTheme.accent} onChange={e=>setLocalTheme({...localTheme, accent: e.target.value})} className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white" /></div></div>
              <div><label className="font-mono text-xs text-zinc-500">Background</label><div className="flex gap-2 mt-1"><input type="color" value={localTheme.background} onChange={e=>setLocalTheme({...localTheme, background: e.target.value})} className="w-10 h-10 rounded-xl bg-transparent border border-white/10" /><input value={localTheme.background} onChange={e=>setLocalTheme({...localTheme, background: e.target.value})} className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white" /></div></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><label className="font-mono text-xs text-zinc-500">Logo Text</label><input value={localTheme.logoText} onChange={e=>setLocalTheme({...localTheme, logoText: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" placeholder="NKT" /></div>
              <div><label className="font-mono text-xs text-zinc-500">Site Title (SEO)</label><input value={localTheme.siteTitle} onChange={e=>setLocalTheme({...localTheme, siteTitle: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
            </div>

            <div className="flex gap-3">
              <label className="flex items-center gap-2 font-mono text-xs text-zinc-400"><input type="checkbox" checked={localTheme.enableJourney} onChange={e=>setLocalTheme({...localTheme, enableJourney: e.target.checked})} /> Enable Journey Path</label>
              <label className="flex items-center gap-2 font-mono text-xs text-zinc-400"><input type="checkbox" checked={localTheme.enableAurora} onChange={e=>setLocalTheme({...localTheme, enableAurora: e.target.checked})} /> Enable Aurora</label>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-400/20 border border-white/10">
              <div className="font-mono text-xs text-white">Preview</div>
              <div className="mt-2 flex gap-2"><div className="w-12 h-12 rounded-xl" style={{ background: `linear-gradient(135deg, ${localTheme.primary}, ${localTheme.secondary})` }} /><div className="w-12 h-12 rounded-xl" style={{ background: localTheme.accent }} /><div className="w-12 h-12 rounded-xl border border-white/10" style={{ background: localTheme.background }} /></div>
            </div>

            <button onClick={handleThemeSave} className="w-full px-6 py-3 rounded-full bg-white text-black text-sm font-medium flex items-center justify-center gap-2"><Save className="w-4 h-4"/>Save Theme</button>
          </div>
        </div>

        {/* Security & Backup */}
        <div className="space-y-6">
          <div className="glass rounded-[1.5rem] p-6 space-y-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"><Shield className="w-5 h-5 text-white"/></div><div><div className="font-medium text-white">Admin Credentials</div><div className="font-mono text-xs text-zinc-500">Change login for /admin</div></div></div>
            <div><label className="font-mono text-xs text-zinc-500">Username</label><input autoComplete="username" value={localCreds.username} onChange={e=>setLocalCreds({...localCreds, username: e.target.value})} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>

            {apiEnabled && (
              <div><label className="font-mono text-xs text-zinc-500">Current password</label><input type="password" autoComplete="current-password" value={oldPassword} onChange={e=>setOldPassword(e.target.value)} placeholder="Required to confirm" className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
            )}

            <div><label className="font-mono text-xs text-zinc-500">New password</label><input type="password" autoComplete="new-password" value={localCreds.password} onChange={e=>setLocalCreds({...localCreds, password: e.target.value})} placeholder="Min 8 characters" className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>
            <div><label className="font-mono text-xs text-zinc-500">Confirm new password</label><input type="password" autoComplete="new-password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" /></div>

            {credsMsg && (
              <div className={`font-mono text-xs rounded-xl px-4 py-2.5 border ${credsMsg.type === 'ok' ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20' : 'text-red-300 bg-red-500/10 border-red-500/20'}`}>{credsMsg.text}</div>
            )}
            {!apiEnabled && (
              <div className="font-mono text-[11px] text-amber-300/80 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5">Local mode — no backend configured. Credentials are stored in this browser only.</div>
            )}

            <button onClick={handleCredsSave} disabled={saving} className="w-full px-6 py-3 rounded-full bg-white text-black text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60"><Save className="w-4 h-4"/>{saving ? 'Updating…' : 'Update Credentials'}</button>
          </div>

          <div className="glass rounded-[1.5rem] p-6 space-y-4">
            <div className="font-medium text-white">Backup & Restore</div>
            <p className="font-mono text-xs text-zinc-500">Export everything as JSON, or import a previous backup. Stored in localStorage — for production you'd connect a backend.</p>
            
            <div className="grid grid-cols-2 gap-3">
              <button onClick={exportAll} className="px-4 py-3 rounded-full glass border border-white/10 text-sm flex items-center justify-center gap-2 hover:bg-white/10"><Download className="w-4 h-4"/>Export JSON</button>
              <label className="px-4 py-3 rounded-full glass border border-white/10 text-sm flex items-center justify-center gap-2 hover:bg-white/10 cursor-pointer"><Upload className="w-4 h-4"/>Import File<input type="file" accept=".json" onChange={handleFileImport} className="hidden" /></label>
            </div>

            <div>
              <label className="font-mono text-xs text-zinc-500">Or paste JSON to import</label>
              <textarea value={importText} onChange={e=>setImportText(e.target.value)} rows={4} className="mt-1 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white" placeholder='{"personal": {...}, "learning": {...}}' />
              <button onClick={handleTextImport} className="mt-2 px-4 py-2 rounded-full bg-white/10 text-xs font-mono">Import Pasted JSON</button>
            </div>

            <div className="border-t border-white/5 pt-4">
              <button onClick={()=>{ if(confirm('Reset EVERYTHING to defaults? This clears localStorage.')) resetAll()}} className="w-full px-4 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center justify-center gap-2 hover:bg-red-500/20"><RefreshCw className="w-4 h-4"/>Reset All to Defaults</button>
              <p className="font-mono text-[10px] text-zinc-600 mt-2">This clears all classes, chapters, theme customizations you did via admin. Default seed data will be restored on reload.</p>
            </div>
          </div>

          <div className="rounded-[1.5rem] p-[1px] bg-gradient-to-br from-violet-600/20 to-cyan-400/20">
            <div className="rounded-[1.5rem] bg-[#0a0a0f] p-6">
              <div className="font-serif text-lg text-white">How Admin Data Works</div>
              <ul className="mt-3 space-y-2 font-mono text-xs text-zinc-400 list-disc pl-4">
                <li>All admin changes are saved to <code>localStorage</code> instantly — no backend needed for demo.</li>
                <li>Public site reads from same storage, so edits show live.</li>
                <li>For production, replace <code>AdminContext</code> with API calls to your backend (Node, Firebase, Supabase).</li>
                <li>Theme colors use CSS variables `--exp-primary` etc. applied to <code>:root</code>.</li>
                <li>Login is client-side (admin/admin123) — add real auth (JWT) in production.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
