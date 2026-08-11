import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import Experience from '../components/sections/Experience'
import LearningHubPreview from '../components/sections/LearningHubPreview'
import AchievementsServices from '../components/sections/Achievements'
import StudentLove from '../components/sections/StudentLove'
import Sponsors from '../components/sections/Sponsors'
import Contact from '../components/sections/Contact'
import JourneyPath from '../components/layout/JourneyPath'
import { useAppData } from '../context/AdminContext'
import { Eye } from 'lucide-react'

function LiveCounter() {
  const { viewerCount } = useAppData()
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-6">
      <div className="glass rounded-full px-5 py-2.5 flex items-center gap-3 w-fit mx-auto md:mx-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-xs text-zinc-300 flex items-center gap-2"><Eye className="w-4 h-4" /> {viewerCount} students have joined — growing every day</span>
        <span className="px-2 py-0.5 rounded-full bg-white text-black text-[10px] font-mono">LIVE</span>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="relative">
      <JourneyPath />
      <Hero />
      <LiveCounter />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <AchievementsServices />
      <LearningHubPreview />
      <Sponsors />
      <StudentLove />
      <Contact />
    </div>
  )
}
