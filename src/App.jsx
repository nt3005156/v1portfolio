import { useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollProgress from './components/layout/ScrollProgress'
import Loader from './components/layout/Loader'
import Home from './pages/Home'
import LearningHub from './pages/LearningHub'
import { AdminProvider, useAdmin } from './context/AdminContext'

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const MessagesManager = lazy(() => import('./pages/admin/MessagesManager'))
const DailyLogManager = lazy(() => import('./pages/admin/DailyLogManager'))
const ExperienceManager = lazy(() => import('./pages/admin/ExperienceManager'))
const EducationManager = lazy(() => import('./pages/admin/EducationManager'))
const EngagedManager = lazy(() => import('./pages/admin/EngagedManager'))
const ClassesManager = lazy(() => import('./pages/admin/ClassesManager'))
const SubjectsManager = lazy(() => import('./pages/admin/SubjectsManager'))
const ChaptersManager = lazy(() => import('./pages/admin/ChaptersManager'))
const ProjectsManager = lazy(() => import('./pages/admin/ProjectsManager'))
const AdsManager = lazy(() => import('./pages/admin/AdsManager'))
const ContentManager = lazy(() => import('./pages/admin/ContentManager'))
const SettingsManager = lazy(() => import('./pages/admin/SettingsManager'))

function ProtectedAdmin({ children }) {
  const { isAuthenticated } = useAdmin()
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  return children
}

function PublicSite() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const { theme, incrementViewer } = useAdmin()

  useEffect(() => {
    incrementViewer()
  }, [])

  useEffect(() => {
    if (!theme.enableJourney) return
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)
    return () => { lenis.destroy(); cancelAnimationFrame(id) }
  }, [theme.enableJourney])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 selection:bg-violet-500/30" style={{ background: theme.background }}>
      <ScrollProgress />
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learn" element={<LearningHub />} />
              <Route path="/learn/:classId" element={<LearningHub />} />
              <Route path="/learn/:classId/:subjectId" element={<LearningHub />} />
              <Route path="/learn/:classId/:subjectId/:chapterId" element={<LearningHub />} />
            </Routes>
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  if (isAdminRoute) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#050507] flex items-center justify-center font-mono text-zinc-500">Loading admin...</div>}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
            <Route index element={<Dashboard />} />
            <Route path="messages" element={<MessagesManager />} />
            <Route path="logs" element={<DailyLogManager />} />
            <Route path="experience" element={<ExperienceManager />} />
            <Route path="education" element={<EducationManager />} />
            <Route path="engaged" element={<EngagedManager />} />
            <Route path="classes" element={<ClassesManager />} />
            <Route path="subjects" element={<SubjectsManager />} />
            <Route path="chapters" element={<ChaptersManager />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="ads" element={<AdsManager />} />
            <Route path="content" element={<ContentManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Route>
          <Route path="*" element={<Navigate to={location.pathname.startsWith('/admin') ? '/admin/login' : '/'} />} />
        </Routes>
      </Suspense>
    )
  }

  return (
    <Routes>
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AdminProvider>
      <AppRoutes />
    </AdminProvider>
  )
}
