import React, { useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Mail, Phone, Calendar, MapPin, 
  Link as LinkIcon, Share2, Heart, MessageSquare, 
  Clock, Award, BookOpen, Users, GitBranch
} from 'lucide-react'
import { useStore } from '../store/useStore'

export default function PersonProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { people, relationships, groups } = useStore()

  const person = useMemo(() => people.find(p => p.id === id), [people, id])
  
  const group = useMemo(() => 
    groups.find(g => g.id === person?.groupId), 
    [groups, person]
  )

  // Relationships
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
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="text-xl font-black opacity-50">Person Not Found</p>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 px-4 py-2 rounded-2xl border bg-white/50 backdrop-blur-sm transition-all hover:scale-105"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Directory</span>
        </button>

        <div className="flex items-center gap-2">
           <button className="p-2.5 rounded-2xl border bg-white shadow-sm hover:scale-110 transition-transform" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
             <Share2 size={16} />
           </button>
           <button className="p-2.5 rounded-2xl border bg-white shadow-sm hover:scale-110 transition-transform" style={{ borderColor: 'var(--border-color)', color: 'var(--accent-primary)' }}>
             <Heart size={16} />
           </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative mb-12">
        <div className="h-64 rounded-[3rem] overflow-hidden relative shadow-2xl border" style={{ borderColor: 'var(--border-color)' }}>
           {/* Abstract Background */}
           <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900" />
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.pattern')]" />
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        </div>

        <div className="px-12 -mt-20 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <img 
                src={person.photo} 
                className="w-40 h-40 rounded-[2.5rem] object-cover border-[6px] shadow-2xl" 
                style={{ borderColor: 'var(--bg-primary)' }}
                alt={person.name} 
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl border-4 flex items-center justify-center shadow-lg"
                style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--bg-primary)' }}>
                <Award size={20} className="text-white" />
              </div>
            </motion.div>

            <div className="pb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-3"
                style={{ backgroundColor: 'rgba(16,185,129,0.15)', color: 'var(--accent-primary)', backdropFilter: 'blur(8px)' }}>
                <LinkIcon size={10} />
                {group?.name || 'Contact'}
              </div>
              <h1 className="text-4xl font-black tracking-tighter leading-none mb-1" style={{ color: 'var(--text-primary)' }}>
                {person.name}
              </h1>
              <p className="text-lg font-bold opacity-60" style={{ color: 'var(--text-secondary)' }}>
                {person.role}
              </p>
            </div>
          </div>

          <div className="flex gap-2 pb-2">
            <button className="h-11 px-6 rounded-2xl bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 transition-transform">
              Connect
            </button>
            <button className="h-11 px-5 rounded-2xl border bg-white/50 backdrop-blur-sm font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105"
              style={{ borderColor: 'var(--border-color)' }}>
              Message
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="p-6 rounded-[2rem] border bg-white/30 backdrop-blur-md shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
            <h3 className="text-xs font-black uppercase tracking-widest opacity-50 mb-6" style={{ color: 'var(--text-secondary)' }}>Details</h3>
            <div className="space-y-5">
              {[
                { label: 'Location', value: 'Johannesburg, SA', Icon: MapPin },
                { label: 'Network', value: group?.name || 'General', Icon: Users },
                { label: 'Since', value: 'April 2024', Icon: Clock },
                { label: 'Status', value: person.role, Icon: GitBranch }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border" 
                    style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--accent-primary)' }}>
                    <item.Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: 'var(--text-secondary)' }}>{item.label}</p>
                    <p className="text-xs font-bold truncate" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 rounded-[2rem] border bg-white shadow-sm flex flex-col items-center text-center gap-1" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>1.2K</span>
                <span className="text-[9px] font-black uppercase opacity-40" style={{ color: 'var(--text-secondary)' }}>Interactions</span>
             </div>
             <div className="p-5 rounded-[2rem] border bg-white shadow-sm flex flex-col items-center text-center gap-1" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-2xl font-black" style={{ color: 'var(--accent-primary)' }}>{connections.length}</span>
                <span className="text-[9px] font-black uppercase opacity-40" style={{ color: 'var(--text-secondary)' }}>Links</span>
             </div>
          </div>
        </div>

        {/* Blog / Story Feed */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Biography Card */}
          <div className="p-8 rounded-[2.5rem] border bg-white shadow-sm border-t-8" 
            style={{ borderColor: 'var(--border-color)', borderTopColor: 'var(--accent-primary)' }}>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen size={20} style={{ color: 'var(--accent-primary)' }} />
              <h2 className="text-xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>The Story</h2>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              {person.info}. {person.name} has been an integral part of the {group?.name.toLowerCase()} circle, consistently contributing to the shared values and growth of the collective. 
              Our relationship is characterized by mutual respect and a shared history that spans across many successful collaborations.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 p-4 rounded-2xl bg-slate-50 border" style={{ borderColor: 'var(--border-color)' }}>
                <p className="text-[10px] font-black uppercase opacity-40 mb-1" style={{ color: 'var(--text-secondary)' }}>Strengths</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Reliability', 'Insight', 'Action'].map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-white border text-[9px] font-bold" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mini Activity Feed */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest opacity-60 ml-4" style={{ color: 'var(--text-secondary)' }}>Recent Memories</h3>
            
            {[
              { type: 'comment', text: 'shared a new insight in the group discussion', time: '2 hours ago', icon: MessageSquare },
              { type: 'connection', text: `joined the ${group?.name} cluster via Petrus`, time: '1 day ago', icon: Users },
              { type: 'award', text: 'recognized for outstanding contribution to the network', time: '3 days ago', icon: Award }
            ].map((post, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-start gap-4 p-5 rounded-3xl border bg-white hover:shadow-md transition-all group"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:rotate-6"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--accent-primary)' }}>
                  <post.icon size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-black truncate" style={{ color: 'var(--text-primary)' }}>{person.name}</span>
                    <span className="text-[10px] opacity-50 font-medium" style={{ color: 'var(--text-secondary)' }}>· {post.time}</span>
                  </div>
                  <p className="text-[11px] leading-snug" style={{ color: 'var(--text-secondary)' }}>
                    {post.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connections Grid */}
          <div className="space-y-4 pt-4">
             <div className="flex items-center justify-between mx-4">
               <h3 className="text-sm font-black uppercase tracking-widest opacity-60" style={{ color: 'var(--text-secondary)' }}>Relationship Lattice</h3>
               <Link to="/family-tree" className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--accent-primary)' }}>Visualize All</Link>
             </div>
             
             <div className="grid grid-cols-3 gap-3">
               {connections.slice(0, 3).map((conn, i) => (
                 <Link to={`/person/${conn.person.id}`} key={i}>
                   <motion.div 
                     whileHover={{ scale: 1.05, y: -2 }}
                     className="p-3 rounded-2xl border bg-white text-center flex flex-col items-center gap-2"
                     style={{ borderColor: 'var(--border-color)' }}
                   >
                     <img src={conn.person.photo} className="w-10 h-10 rounded-xl object-cover" alt="" />
                     <div className="min-w-0">
                       <p className="text-[9px] font-black truncate" style={{ color: 'var(--text-primary)' }}>{conn.person.name}</p>
                       <p className="text-[8px] font-bold opacity-50 uppercase tracking-tighter" style={{ color: 'var(--accent-primary)' }}>{conn.type}</p>
                     </div>
                   </motion.div>
                 </Link>
               ))}
               {connections.length === 0 && (
                 <div className="col-span-3 py-6 text-center text-[10px] font-bold opacity-30 italic">No public connections available.</div>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
