import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, MapPin, 
  Link as LinkIcon, Heart, 
  Clock, Award, BookOpen, Users, Shield
} from 'lucide-react'
import { useStore } from '../store/useStore'

export default function PublicProfile() {
  const { id } = useParams()
  const { people, relationships, groups } = useStore()

  const person = useMemo(() => people.find(p => p.id === id), [people, id])
  
  const group = useMemo(() => 
    groups.find(g => g.id === person?.groupId), 
    [groups, person]
  )

  const connections = useMemo(() => {
    return relationships
      .filter(r => r.fromId === id || r.toId === id)
      .map(r => {
        const otherId = r.fromId === id ? r.toId : r.fromId
        const otherPerson = people.find(p => p.id === otherId)
        return { ...r, person: otherPerson }
      })
      .filter(c => c.person)
  }, [relationships, id, people])

  if (!person) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <p className="text-xl font-black opacity-50" style={{ color: 'var(--text-secondary)' }}>Profile Not Found</p>
        <Link to="/" className="text-xs font-black uppercase tracking-widest text-emerald-500">Back to Safety</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Simple Public Header */}
      <header className="h-20 flex items-center justify-between px-8 border-b backdrop-blur-md sticky top-0 z-50" 
        style={{ backgroundColor: 'rgba(var(--bg-primary-rgb), 0.8)', borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg border border-white/10" 
               style={{ background: 'linear-gradient(135deg, var(--accent-primary) 0%, #059669 100%)' }}>
            <span className="text-white font-black text-sm italic">R</span>
          </div>
          <span className="font-black text-lg tracking-tighter" style={{ color: 'var(--text-primary)' }}>ReSync Public</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-emerald-500/5" style={{ borderColor: 'var(--accent-primary)44' }}>
          <Shield size={12} className="text-emerald-500" />
          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Protected Share</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Profile Hero */}
        <section className="relative mb-12">
          <div className="h-48 rounded-[3rem] overflow-hidden relative shadow-xl border mb-[-4rem]" style={{ borderColor: 'var(--border-color)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900" />
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.pattern')]" />
          </div>

          <div className="px-10 flex flex-col md:flex-row md:items-end gap-6 relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <img 
                src={person.photo} 
                className="w-40 h-40 rounded-[3rem] object-cover border-[6px] shadow-2xl" 
                style={{ borderColor: 'var(--bg-primary)' }}
                alt={person.name} 
              />
              <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-2xl border-4 flex items-center justify-center shadow-lg"
                style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--bg-primary)' }}>
                <Award size={20} className="text-white" />
              </div>
            </motion.div>

            <div className="pb-4 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-3"
                style={{ backgroundColor: 'rgba(16,185,129,0.15)', color: 'var(--accent-primary)', backdropFilter: 'blur(8px)' }}>
                <Users size={10} />
                {group?.name || 'Contact'}
              </div>
              <h1 className="text-5xl font-black tracking-tighter leading-none mb-2" style={{ color: 'var(--text-primary)' }}>
                {person.name}
              </h1>
              <p className="text-xl font-bold opacity-60" style={{ color: 'var(--text-secondary)' }}>
                {person.role}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-8">
            {/* Quick Details */}
            <div className="p-8 rounded-[2.5rem] border backdrop-blur-md shadow-sm" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
              <h3 className="text-xs font-black uppercase tracking-widest opacity-40 mb-8" style={{ color: 'var(--text-secondary)' }}>Public Details</h3>
              <div className="space-y-6">
                {[
                  { label: 'Network', value: group?.name || 'General', Icon: Users },
                  { label: 'Current Role', value: person.role, Icon: Award },
                  { label: 'Status', value: 'Active Connection', Icon: Heart },
                  { label: 'Location', value: 'Global Network', Icon: MapPin }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border" 
                      style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--accent-primary)' }}>
                      <item.Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-30" style={{ color: 'var(--text-secondary)' }}>{item.label}</p>
                      <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Story */}
          <div className="lg:col-span-2 space-y-10">
            <div className="p-10 rounded-[3rem] border shadow-sm border-l-8" 
              style={{ borderColor: 'var(--border-color)', borderLeftColor: 'var(--accent-primary)', backgroundColor: 'var(--bg-secondary)' }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-inner" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                  <BookOpen size={24} style={{ color: 'var(--accent-primary)' }} />
                </div>
                <h2 className="text-2xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>Professional Bio</h2>
              </div>
              <p className="text-lg leading-relaxed italic pr-4" style={{ color: 'var(--text-secondary)' }}>
                {person.info || 'Developing deep professional networks and fostering meaningful connections.'}
              </p>
            </div>

            {/* Public Network Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-black uppercase tracking-widest opacity-50" style={{ color: 'var(--text-secondary)' }}>Shared Connections</h3>
                <span className="px-3 py-1 rounded-full text-[9px] font-black bg-slate-500/10" style={{ color: 'var(--text-secondary)' }}>{connections.length} People</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {connections.map((conn, i) => (
                  <div 
                    key={i}
                    className="p-6 rounded-[2.5rem] border shadow-sm flex flex-col items-center gap-4 transition-transform hover:scale-[1.02]"
                    style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <img src={conn.person.photo} className="w-14 h-14 rounded-2xl object-cover shadow-md" alt="" />
                    <div className="text-center">
                      <p className="text-[11px] font-black truncate" style={{ color: 'var(--text-primary)' }}>{conn.person.name}</p>
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mt-1" style={{ color: 'var(--text-secondary)' }}>{conn.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t text-center space-y-4" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-30" style={{ color: 'var(--text-secondary)' }}>
            Generated by ReSync Relationship Manager
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/" className="text-[10px] font-black text-emerald-500 uppercase tracking-widest border border-emerald-500/20 px-4 py-2 rounded-xl hover:bg-emerald-500/5 transition-colors">
              Claim Your Profile
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
