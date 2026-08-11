import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { personalData as defaultPersonal, skillsData as defaultSkills, experienceData as defaultExp, educationData as defaultEdu, achievementsData as defaultAch, servicesData as defaultServices, dailyLogData as defaultLogs } from '../data/personalData'
import { projectsData as defaultProjects } from '../data/projectsData'
import { learningData as defaultLearning } from '../data/learningData'
import { api, isApiEnabled } from '../lib/api'

const AdminContext = createContext(null)

const STORAGE_KEYS = {
  auth: 'exp_admin_auth',
  token: 'exp_admin_token',
  creds: 'exp_admin_creds',
  personal: 'exp_personal',
  skills: 'exp_skills',
  exp: 'exp_experience',
  edu: 'exp_education',
  ach: 'exp_achievements',
  services: 'exp_services',
  projects: 'exp_projects',
  learning: 'exp_learning',
  theme: 'exp_theme',
  activity: 'exp_activity',
  version: 'exp_version',
  backup: 'exp_backup_latest',
  ads: 'exp_ads',
  viewer: 'exp_viewer_count',
  logs: 'exp_daily_logs',
  engaged: 'exp_current_engaged'
}

const DEFAULT_CREDS = { username: 'admin', password: 'admin123' }
const DEFAULT_THEME = {
  primary: '#7c3aed',
  secondary: '#6366f1',
  accent: '#06b6d4',
  background: '#050507',
  cardBg: '#0a0a0f',
  siteTitle: 'Nitesh Kr Thakur — CS Educator & Developer',
  logoText: 'NKT',
  enableJourney: true,
  enableAurora: true
}

const APP_VERSION = '5.0-backend-full'

const DEFAULT_ADS = [
  {
    id: 'ad-1',
    title: 'Learn with Nitesh — New Batch',
    company: 'NKT Classes',
    description: 'Class 12 CS Crash Course — limited seats, enrollment open.',
    imageUrl: '',
    linkUrl: '#contact',
    active: true,
    createdAt: new Date().toISOString()
  }
]

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch {}
  return fallback
}

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (isApiEnabled()) {
      return !!localStorage.getItem(STORAGE_KEYS.token)
    }
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.auth))?.isAuth || false } catch { return false }
  })
  const [creds, setCreds] = useState(() => loadFromStorage(STORAGE_KEYS.creds, DEFAULT_CREDS))
  const [personal, setPersonal] = useState(() => loadFromStorage(STORAGE_KEYS.personal, defaultPersonal))
  const [skills, setSkills] = useState(() => loadFromStorage(STORAGE_KEYS.skills, defaultSkills))
  const [experience, setExperience] = useState(() => loadFromStorage(STORAGE_KEYS.exp, defaultExp))
  const [education, setEducation] = useState(() => loadFromStorage(STORAGE_KEYS.edu, defaultEdu))
  const [achievements, setAchievements] = useState(() => loadFromStorage(STORAGE_KEYS.ach, defaultAch))
  const [services, setServices] = useState(() => loadFromStorage(STORAGE_KEYS.services, defaultServices))
  const [projects, setProjects] = useState(() => loadFromStorage(STORAGE_KEYS.projects, defaultProjects))
  const [learning, setLearning] = useState(() => loadFromStorage(STORAGE_KEYS.learning, defaultLearning))
  const [theme, setTheme] = useState(() => {
    const t = loadFromStorage(STORAGE_KEYS.theme, DEFAULT_THEME)
    if (t.logoText === 'AR') t.logoText = 'NKT'
    return t
  })
  const [activity, setActivity] = useState(() => loadFromStorage(STORAGE_KEYS.activity, []))
  const [ads, setAds] = useState(() => loadFromStorage(STORAGE_KEYS.ads, DEFAULT_ADS))
  const [viewerCount, setViewerCount] = useState(() => {
    const v = loadFromStorage(STORAGE_KEYS.viewer, 1111)
    return typeof v === 'number' ? v : 1111
  })
  const [dailyLogs, setDailyLogs] = useState(() => loadFromStorage(STORAGE_KEYS.logs, defaultLogs))
  const [engaged, setEngaged] = useState(() => loadFromStorage(STORAGE_KEYS.engaged, defaultPersonal.currentEngaged || []))
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(localStorage.getItem('exp_messages') || '[]') } catch { return [] }
  })

  const apiEnabled = isApiEnabled()

  // Keep personal.currentEngaged in sync
  useEffect(() => {
    setPersonal(prev => {
      const same = JSON.stringify(prev.currentEngaged) === JSON.stringify(engaged)
      if (same) return prev
      return { ...prev, currentEngaged: engaged }
    })
  }, [engaged])

  // Persist to localStorage (fallback/cache)
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify({ isAuth: isAuthenticated, at: Date.now() })) }, [isAuthenticated])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.creds, JSON.stringify(creds)) }, [creds])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.personal, JSON.stringify(personal)) }, [personal])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.skills, JSON.stringify(skills)) }, [skills])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.exp, JSON.stringify(experience)) }, [experience])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.edu, JSON.stringify(education)) }, [education])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ach, JSON.stringify(achievements)) }, [achievements])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.services, JSON.stringify(services)) }, [services])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects)) }, [projects])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.learning, JSON.stringify(learning)) }, [learning])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(theme)) }, [theme])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.activity, JSON.stringify(activity.slice(0, 100))) }, [activity])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ads, JSON.stringify(ads)) }, [ads])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.viewer, JSON.stringify(viewerCount)) }, [viewerCount])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.logs, JSON.stringify(dailyLogs)) }, [dailyLogs])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.engaged, JSON.stringify(engaged)) }, [engaged])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.version, JSON.stringify({ version: APP_VERSION, at: Date.now() })) }, [])

  // Auto backup
  useEffect(() => {
    try {
      const backup = { personal, skills, experience, education, achievements, services, projects, learning, theme, creds, ads, viewerCount, dailyLogs, engaged, messages, version: APP_VERSION, at: new Date().toISOString() }
      localStorage.setItem(STORAGE_KEYS.backup, JSON.stringify(backup))
    } catch {}
  }, [personal, skills, experience, education, achievements, services, projects, learning, theme, creds, ads, viewerCount, dailyLogs, engaged, messages])

  // Apply theme
  useEffect(() => {
    const r = document.documentElement
    r.style.setProperty('--exp-primary', theme.primary)
    r.style.setProperty('--exp-secondary', theme.secondary)
    r.style.setProperty('--exp-accent', theme.accent)
    r.style.setProperty('--exp-bg', theme.background)
    r.style.setProperty('--exp-card', theme.cardBg)
    document.body.style.background = theme.background
  }, [theme])

  // Load from API if enabled
  useEffect(() => {
    if (!apiEnabled) return
    const loadFromApi = async () => {
      // Viewer count
      try {
        const v = await api.getViewer()
        if (v && typeof v.count === 'number') setViewerCount(v.count)
      } catch {}

      // Classes + Subjects + Chapters => rebuild learning
      try {
        const classes = await api.getClasses()
        const subjects = await api.getAllSubjects()
        const chapters = await api.getChapters()
        if (classes && classes.length > 0) {
          const rebuilt = {
            classes: classes.map(cls => {
              const clsSubjects = subjects.filter(s => s.classId === cls.customId || s.classId === cls._id || s.classId === cls.id)
              return {
                id: cls.customId || cls._id,
                name: cls.name,
                short: cls.short,
                description: cls.description,
                color: cls.color,
                accent: cls.accent,
                stats: cls.stats,
                subjects: clsSubjects.map(sub => {
                  const subChapters = chapters.filter(ch => ch.subjectId === sub.customId || ch.subjectId === sub._id || (ch.subjectId === sub.id && ch.classId === (cls.customId || cls._id)))
                  return {
                    id: sub.customId || sub._id,
                    name: sub.name,
                    short: sub.short,
                    description: sub.description,
                    icon: sub.icon,
                    color: sub.color,
                    chapters: subChapters.map(ch => ({
                      id: ch.customId || ch._id,
                      title: ch.title,
                      subtitle: ch.subtitle,
                      duration: ch.duration,
                      level: ch.level,
                      tags: ch.tags,
                      materials: ch.materials
                    }))
                  }
                })
              }
            })
          }
          if (rebuilt.classes.length > 0) setLearning(rebuilt)
        }
      } catch (e) {
        console.warn('API learning load failed, using localStorage', e.message)
      }

      // Other entities
      const loaders = [
        { fn: api.getProjects, setter: setProjects },
        { fn: api.getAds, setter: setAds },
        { fn: api.getLogs, setter: setDailyLogs },
        { fn: api.getExperience, setter: setExperience },
        { fn: api.getEducation, setter: setEducation },
        { fn: api.getEngaged, setter: setEngaged },
        { fn: () => api.getMessages().catch(()=>[]), setter: setMessages },
      ]
      for (const { fn, setter } of loaders) {
        try {
          const data = await fn()
          if (Array.isArray(data) && data.length > 0) setter(data.map((d) => {
            if (d.customId && !d.id) return { ...d, id: d.customId }
            return d
          }))
        } catch {}
      }

      // Configs
      try {
        const configs = await api.getAllConfigs()
        if (Array.isArray(configs)) {
          configs.forEach((c) => {
            if (!c.key || !c.data) return
            if (c.key === 'personal') setPersonal(c.data)
            if (c.key === 'theme') {
              const t = c.data
              if (t.logoText === 'AR') t.logoText = 'NKT'
              setTheme(t)
            }
            if (c.key === 'skills') setSkills(c.data)
            if (c.key === 'achievements') setAchievements(c.data)
            if (c.key === 'services') setServices(c.data)
          })
        }
      } catch {}
    }
    loadFromApi()
  }, [])

  const logActivity = (action, detail) => {
    setActivity(prev => [{ action, detail, at: new Date().toISOString() }, ...prev].slice(0, 100))
  }

  const login = async (username, password) => {
    if (apiEnabled) {
      try {
        const res = await api.login(username, password)
        if (res.token) {
          localStorage.setItem(STORAGE_KEYS.token, res.token)
          setIsAuthenticated(true)
          logActivity('LOGIN', `Admin logged in via API`)
          return true
        }
      } catch (err) {
        return false
      }
    }
    // Fallback local
    if (username === creds.username && password === creds.password) {
      setIsAuthenticated(true)
      logActivity('LOGIN', `Admin logged in`)
      return true
    }
    return false
  }
  const logout = () => {
    if (apiEnabled) localStorage.removeItem(STORAGE_KEYS.token)
    setIsAuthenticated(false)
    logActivity('LOGOUT', 'Admin logged out')
  }
  const updateCreds = async (newCreds) => {
    if (apiEnabled) {
      try {
        await api.changePassword(creds.password, newCreds.password, newCreds.username)
      } catch {}
    }
    setCreds(newCreds)
    logActivity('SETTINGS', 'Updated admin credentials')
  }

  const incrementViewer = async () => {
    try {
      const sessionKey = 'exp_session_viewed'
      if (sessionStorage.getItem(sessionKey)) return
      sessionStorage.setItem(sessionKey, '1')
      if (apiEnabled) {
        try {
          const res = await api.incrementViewer()
          if (res && typeof res.count === 'number') {
            setViewerCount(res.count)
            return
          }
        } catch {}
      }
      setViewerCount(prev => (typeof prev === 'number' ? prev : 1111) + 1)
    } catch {
      setViewerCount(prev => (typeof prev === 'number' ? prev : 1111) + 1)
    }
  }

  // Ads CRUD — API aware
  const addAd = async (ad) => {
    if (apiEnabled) {
      try { const created = await api.createAd(ad); setAds(prev => [{ id: created.customId || created._id, ...created }, ...prev]); logActivity('CREATE', `Ad ${ad.title}`); return } catch {}
    }
    const newAd = { id: `ad-${Date.now()}`, active: true, createdAt: new Date().toISOString(), ...ad }
    setAds(prev => [newAd, ...prev])
    logActivity('CREATE', `Ad created: ${newAd.title}`)
  }
  const updateAd = async (id, data) => {
    if (apiEnabled) { try { await api.updateAd(id, data) } catch {} }
    setAds(prev => prev.map(a => (a.id === id || a.customId === id || a._id === id) ? { ...a, ...data } : a))
    logActivity('UPDATE', `Ad ${id} updated`)
  }
  const deleteAd = async (id) => {
    if (apiEnabled) { try { await api.deleteAd(id) } catch {} }
    setAds(prev => prev.filter(a => a.id !== id && a.customId !== id && a._id !== id))
    logActivity('DELETE', `Ad ${id} deleted`)
  }

  // Daily Logs
  const addLog = async (log) => {
    if (apiEnabled) { try { const c = await api.createLog(log); setDailyLogs(prev => [{ id: c.customId || c._id, ...c }, ...prev]); return } catch {} }
    const newLog = { date: 'Today', ...log, id: `log-${Date.now()}` }
    setDailyLogs(prev => [newLog, ...prev])
    logActivity('CREATE', `Daily log added: ${log.time}`)
  }
  const updateLog = async (id, data) => {
    if (apiEnabled) { try { await api.updateLog(id, data) } catch {} }
    setDailyLogs(prev => prev.map(l => (l.id === id || l.customId === id || `${l.time}-${l.date}` === id) ? { ...l, ...data } : l))
  }
  const deleteLog = async (id) => {
    if (apiEnabled) { try { await api.deleteLog(id) } catch {} }
    setDailyLogs(prev => prev.filter(l => (l.id || l.customId || `${l.time}-${l.date}`) !== id))
  }

  // Engaged
  const addEngaged = async (item) => {
    if (apiEnabled) { try { const c = await api.createEngaged(item); setEngaged(prev => [...prev, { id: c.customId || c._id, ...c }]); return } catch {} }
    const newItem = { id: `eng-${Date.now()}`, ...item }
    setEngaged(prev => [...prev, newItem])
  }
  const updateEngaged = async (id, data) => {
    if (apiEnabled) { try { await api.updateEngaged(id, data) } catch {} }
    setEngaged(prev => prev.map(e => (e.id === id || e.customId === id || e.name === id) ? { ...e, ...data } : e))
  }
  const deleteEngaged = async (id) => {
    if (apiEnabled) { try { await api.deleteEngaged(id) } catch {} }
    setEngaged(prev => prev.filter(e => (e.id || e.customId || e.name) !== id))
  }

  // Classes
  const addClass = async (cls) => {
    if (apiEnabled) {
      try {
        const created = await api.createClass({ customId: cls.id || `class-${Date.now()}`, ...cls })
        // reload learning from API? For simplicity, update local state too
        const newCls = { id: created.customId || created._id, ...created, subjects: [] }
        setLearning(prev => ({ ...prev, classes: [...prev.classes, newCls] }))
        return
      } catch {}
    }
    const newCls = { stats: { subjects: 0, chapters: 0, students: '0' }, subjects: [], ...cls, id: cls.id || `class-${Date.now()}` }
    setLearning(prev => ({ ...prev, classes: [...prev.classes, newCls] }))
    logActivity('CREATE', `Class created: ${newCls.name}`)
  }
  const updateClass = async (classId, data) => {
    if (apiEnabled) { try { await api.updateClass(classId, data) } catch {} }
    setLearning(prev => ({ ...prev, classes: prev.classes.map(c => c.id === classId || c.customId === classId ? { ...c, ...data } : c) }))
  }
  const deleteClass = async (classId) => {
    if (apiEnabled) { try { await api.deleteClass(classId) } catch {} }
    setLearning(prev => ({ ...prev, classes: prev.classes.filter(c => c.id !== classId && c.customId !== classId) }))
  }

  // Subjects
  const addSubject = async (classId, subject) => {
    if (apiEnabled) {
      try {
        const created = await api.createSubject({ customId: subject.id || `sub-${Date.now()}`, classId, ...subject })
        const newSub = { id: created.customId || created._id, ...created, chapters: [] }
        setLearning(prev => ({
          ...prev,
          classes: prev.classes.map(c => (c.id === classId || c.customId === classId) ? { ...c, subjects: [...c.subjects, newSub] } : c)
        }))
        return
      } catch {}
    }
    const newSub = { chaptersCount: 0, chapters: [], ...subject, id: subject.id || `sub-${Date.now()}` }
    setLearning(prev => ({
      ...prev,
      classes: prev.classes.map(c => c.id === classId ? { ...c, subjects: [...c.subjects, newSub] } : c)
    }))
  }
  const updateSubject = async (classId, subjectId, data) => {
    if (apiEnabled) { try { await api.updateSubject(subjectId, data) } catch {} }
    setLearning(prev => ({
      ...prev,
      classes: prev.classes.map(c => (c.id === classId || c.customId === classId) ? { ...c, subjects: c.subjects.map(s => (s.id === subjectId || s.customId === subjectId) ? { ...s, ...data } : s) } : c)
    }))
  }
  const deleteSubject = async (classId, subjectId) => {
    if (apiEnabled) { try { await api.deleteSubject(subjectId) } catch {} }
    setLearning(prev => ({
      ...prev,
      classes: prev.classes.map(c => (c.id === classId || c.customId === classId) ? { ...c, subjects: c.subjects.filter(s => s.id !== subjectId && s.customId !== subjectId) } : c)
    }))
  }

  // Chapters
  const addChapter = async (classId, subjectId, chapter) => {
    if (apiEnabled) {
      try {
        const created = await api.createChapter({ customId: chapter.id || `ch-${Date.now()}`, classId, subjectId, ...chapter })
        const newCh = { id: created.customId || created._id, ...created }
        setLearning(prev => ({
          ...prev,
          classes: prev.classes.map(c => (c.id === classId || c.customId === classId) ? {
            ...c,
            subjects: c.subjects.map(s => (s.id === subjectId || s.customId === subjectId) ? { ...s, chapters: [...s.chapters, newCh] } : s)
          } : c)
        }))
        return
      } catch {}
    }
    const newCh = { progress: 0, tags: [], materials: { notes: '', importantQuestions: [], mcqs: [], programs: [], pdfs: [] }, ...chapter, id: chapter.id || `ch-${Date.now()}` }
    setLearning(prev => ({
      ...prev,
      classes: prev.classes.map(c => c.id === classId ? {
        ...c,
        subjects: c.subjects.map(s => s.id === subjectId ? { ...s, chapters: [...s.chapters, newCh] } : s)
      } : c)
    }))
  }
  const updateChapter = async (classId, subjectId, chapterId, data) => {
    if (apiEnabled) { try { await api.updateChapter(chapterId, data) } catch {} }
    setLearning(prev => ({
      ...prev,
      classes: prev.classes.map(c => (c.id === classId || c.customId === classId) ? {
        ...c,
        subjects: c.subjects.map(s => (s.id === subjectId || s.customId === subjectId) ? {
          ...s,
          chapters: s.chapters.map(ch => (ch.id === chapterId || ch.customId === chapterId) ? { ...ch, ...data } : ch)
        } : s)
      } : c)
    }))
  }
  const deleteChapter = async (classId, subjectId, chapterId) => {
    if (apiEnabled) { try { await api.deleteChapter(chapterId) } catch {} }
    setLearning(prev => ({
      ...prev,
      classes: prev.classes.map(c => (c.id === classId || c.customId === classId) ? {
        ...c,
        subjects: c.subjects.map(s => (s.id === subjectId || s.customId === subjectId) ? {
          ...s,
          chapters: s.chapters.filter(ch => ch.id !== chapterId && ch.customId !== chapterId)
        } : s)
      } : c)
    }))
  }

  // Projects
  const addProject = async (proj) => {
    if (apiEnabled) {
      try { const c = await api.createProject(proj); setProjects(prev => [{ id: c.customId || c._id, ...c }, ...prev]); return } catch {}
    }
    setProjects(prev => [{ id: `proj-${Date.now()}`, ...proj }, ...prev])
  }
  const updateProject = async (id, data) => {
    if (apiEnabled) { try { await api.updateProject(id, data) } catch {} }
    setProjects(prev => prev.map(p => (p.id === id || p.customId === id) ? { ...p, ...data } : p))
  }
  const deleteProject = async (id) => {
    if (apiEnabled) { try { await api.deleteProject(id) } catch {} }
    setProjects(prev => prev.filter(p => p.id !== id && p.customId !== id))
  }

  const exportAll = () => {
    const data = { personal, skills, experience, education, achievements, services, projects, learning, theme, creds, ads, viewerCount, dailyLogs, engaged, messages, exportedAt: new Date().toISOString(), version: APP_VERSION }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nitesh-backup-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    logActivity('EXPORT', 'Exported backup')
  }

  const importAll = (json) => {
    try {
      const data = typeof json === 'string' ? JSON.parse(json) : json
      if (data.personal) setPersonal(data.personal)
      if (data.skills) setSkills(data.skills)
      if (data.experience) setExperience(data.experience)
      if (data.education) setEducation(data.education)
      if (data.achievements) setAchievements(data.achievements)
      if (data.services) setServices(data.services)
      if (data.projects) setProjects(data.projects)
      if (data.learning) setLearning(data.learning)
      if (data.theme) {
        if (data.theme.logoText === 'AR') data.theme.logoText = 'NKT'
        setTheme(data.theme)
      }
      if (data.creds) setCreds(data.creds)
      if (data.ads) setAds(data.ads)
      if (data.viewerCount) setViewerCount(data.viewerCount)
      if (data.dailyLogs) setDailyLogs(data.dailyLogs)
      if (data.engaged) setEngaged(data.engaged)
      logActivity('IMPORT', 'Imported backup')
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  const resetAll = () => {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k))
    localStorage.removeItem('exp_messages')
    localStorage.removeItem(STORAGE_KEYS.token)
    window.location.reload()
  }

  // Messages handling with API
  const addMessageLocal = (msg) => {
    setMessages(prev => [msg, ...prev].slice(0, 500))
    try { localStorage.setItem('exp_messages', JSON.stringify([msg, ...(JSON.parse(localStorage.getItem('exp_messages')||'[]'))].slice(0,500))) } catch {}
  }

  const value = useMemo(() => ({
    isAuthenticated, creds, login, logout, updateCreds,
    personal, setPersonal, skills, setSkills, experience, setExperience, education, setEducation, achievements, setAchievements, services, setServices,
    projects, setProjects, addProject, updateProject, deleteProject,
    learning, setLearning, addClass, updateClass, deleteClass, addSubject, updateSubject, deleteSubject, addChapter, updateChapter, deleteChapter,
    theme, setTheme,
    activity, logActivity,
    ads, setAds, addAd, updateAd, deleteAd,
    viewerCount, setViewerCount, incrementViewer,
    dailyLogs, setDailyLogs, addLog, updateLog, deleteLog,
    engaged, setEngaged, addEngaged, updateEngaged, deleteEngaged,
    messages, setMessages, addMessageLocal,
    exportAll, importAll, resetAll,
    apiEnabled,
    version: APP_VERSION
  }), [isAuthenticated, creds, personal, skills, experience, education, achievements, services, projects, learning, theme, activity, ads, viewerCount, dailyLogs, engaged, messages])

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}

export function useAppData() {
  try {
    const admin = useAdmin()
    return {
      personalData: admin.personal,
      skillsData: admin.skills,
      experienceData: admin.experience,
      educationData: admin.education,
      achievementsData: admin.achievements,
      servicesData: admin.services,
      projectsData: admin.projects,
      learningData: admin.learning,
      theme: admin.theme,
      adsData: admin.ads,
      viewerCount: admin.viewerCount,
      incrementViewer: admin.incrementViewer,
      dailyLogs: admin.dailyLogs,
      engaged: admin.engaged,
      messages: admin.messages
    }
  } catch {
    return {
      personalData: defaultPersonal,
      skillsData: defaultSkills,
      experienceData: defaultExp,
      educationData: defaultEdu,
      achievementsData: defaultAch,
      servicesData: defaultServices,
      projectsData: defaultProjects,
      learningData: defaultLearning,
      theme: DEFAULT_THEME,
      adsData: DEFAULT_ADS,
      viewerCount: 1111,
      incrementViewer: () => {},
      dailyLogs: defaultLogs,
      engaged: defaultPersonal.currentEngaged || [],
      messages: []
    }
  }
}
