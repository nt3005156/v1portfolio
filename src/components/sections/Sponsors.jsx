import { motion } from 'framer-motion'
import { useAppData } from '../../context/AdminContext'
import { ExternalLink, Megaphone } from 'lucide-react'

export default function Sponsors() {
  const { adsData } = useAppData()
  const activeAds = (adsData || []).filter(a => a.active)

  if (activeAds.length === 0) return null

  return (
    <section className="py-16 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center"><Megaphone className="w-4 h-4 text-amber-300" /></div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] text-amber-300 uppercase">Sponsors & Partners — From Admin</div>
            <h3 className="font-serif text-2xl text-white">Backed by folks who care about students</h3>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(activeAds || []).map((ad, i) => (
            <motion.a
              key={ad.id}
              href={ad.linkUrl || '#'}
              target={ad.linkUrl?.startsWith('http') ? '_blank' : undefined}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0a0a0f] p-5 hover:border-amber-500/30 transition"
            >
              {ad.imageUrl ? (
                <img src={ad.imageUrl} alt={ad.title} className="w-full h-32 object-cover rounded-xl mb-4 border border-white/10" />
              ) : (
                <div className="w-full h-32 rounded-xl bg-gradient-to-br from-violet-600/20 to-amber-500/20 border border-white/5 flex items-center justify-center mb-4">
                  <span className="font-mono text-xs text-zinc-500">Ad image — upload from admin</span>
                </div>
              )}
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-mono text-[11px] text-zinc-500 uppercase">{ad.company}</div>
                  <div className="font-medium text-white mt-1 group-hover:text-amber-200 transition">{ad.title}</div>
                  <div className="font-mono text-xs text-zinc-500 mt-2 line-clamp-2">{ad.description}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-white" />
              </div>
              <div className="mt-4 font-mono text-[10px] text-zinc-600">Sponsored • Admin can edit/delete anytime</div>
            </motion.a>
          ))}
        </div>

        <div className="mt-6 font-mono text-[11px] text-zinc-600 text-center"></div>
      </div>
    </section>
  )
}
