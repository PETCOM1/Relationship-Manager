import React, { useMemo, useState } from 'react'
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
  const { people, relationships, groups, addNote, deleteNote } = useStore()
  const [noteText, setNoteText] = useState('')

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
    <div className="max-w-[1400px] pb-20">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between mb-4">
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
      <section className="relative mb-8">
        <div className="h-40 rounded-[2.5rem] overflow-hidden relative shadow-lg border" style={{ borderColor: 'var(--border-color)' }}>
           {/* Abstract Background */}
           <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900" />
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.pattern')]" />
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        </div>

        <div className="px-12 -mt-16 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <img 
                src={person.photo} 
                className="w-32 h-32 rounded-[2.5rem] object-cover border-[4px] shadow-2xl" 
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
                { label: 'Date of Birth', value: '12 October 1995', Icon: Calendar },
                { label: 'Relationship', value: person.role, Icon: Heart }
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

          {/* Lattice and Diary removed from here */}
        </div>
      </div>

      {/* Full-Width Personal Diary System (Matches Hero Banner Width) */}
      <div className="mt-16 pb-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest opacity-60" style={{ color: 'var(--text-secondary)' }}>Personal Diary</h3>
            <span className="text-[10px] font-bold opacity-40">{(person.notes || []).length} Entries</span>
          </div>
          
          {/* Quick Entry Area */}
          <div className="p-8 rounded-[3rem] border bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: 'var(--border-color)' }}>
            <textarea 
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Record whatever you know about this person..."
              className="w-full h-32 bg-transparent border-none focus:ring-0 text-base placeholder:opacity-40 shadow-none resize-none px-2 leading-relaxed"
              style={{ color: 'var(--text-primary)' }}
            />
            <div className="flex justify-end pt-4">
              <button 
                onClick={() => {
                  if (noteText.trim()) {
                    addNote(person.id, noteText.trim())
                    setNoteText('')
                  }
                }}
                disabled={!noteText.trim()}
                className="px-10 py-4 rounded-3xl bg-emerald-500 text-white font-black text-[11px] uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 disabled:shadow-none"
              >
                Save Diary Entry
              </button>
            </div>
          </div>

          {/* Diary Entries List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(person.notes || []).length > 0 ? (
              <>
                {person.notes.slice(0, 3).map((note) => (
                  <motion.div 
                    key={note.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-5 p-8 rounded-[3rem] border bg-white shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-3 rounded-2xl border bg-slate-50" style={{ borderColor: 'var(--border-color)', color: 'var(--accent-primary)' }}>
                          <Clock size={16} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: 'var(--text-secondary)' }}>
                          {new Date(note.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - {new Date(note.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <button 
                        onClick={() => deleteNote(person.id, note.id)}
                        className="p-3 rounded-2xl opacity-0 group-hover:opacity-100 hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm"
                      >
                        <Share2 size={16} className="rotate-45" />
                      </button>
                    </div>
                    
                    <div className="relative max-h-[160px] group-hover:max-h-[600px] overflow-hidden group-hover:overflow-y-auto transition-all duration-700 ease-in-out pr-2 custom-scrollbar">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap italic line-clamp-6 group-hover:line-clamp-none transition-all duration-700" style={{ color: 'var(--text-secondary)' }}>
                        "{note.content}"
                      </p>
                      {/* Gradient Fade for Truncation */}
                      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 pointer-events-none transition-opacity duration-500" />
                    </div>
                  </motion.div>
                ))}
              </>
            ) : (
              <div className="col-span-full py-24 text-center rounded-[3rem] border border-dashed flex flex-col items-center gap-4" style={{ borderColor: 'var(--border-color)' }}>
                 <div className="w-16 h-16 rounded-3xl border border-dashed flex items-center justify-center opacity-20">
                    <BookOpen size={32} />
                 </div>
                 <p className="text-xs font-bold opacity-30 italic max-w-xs mx-auto">This personal diary is empty. Start recording your journey with {person.name} above.</p>
              </div>
            )}
          </div>

          {(person.notes || []).length > 3 && (
            <div className="flex justify-center pt-6">
              <Link 
                to={`/person/${person.id}/diary`}
                className="group px-12 py-5 rounded-[2.5rem] border border-dashed text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-colors flex items-center gap-4"
                style={{ color: 'var(--accent-primary)', borderColor: 'var(--border-color)' }}
              >
                Browse Full History <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Relationship Lattice (Now at the very bottom) */}
      <div className="space-y-6 pt-12 pb-24 border-t" style={{ borderColor: 'var(--border-color)' }}>
         <div className="flex items-center justify-between">
           <h3 className="text-sm font-black uppercase tracking-widest opacity-60" style={{ color: 'var(--text-secondary)' }}>Relationship Lattice</h3>
           <Link to="/family-tree" className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--accent-primary)' }}>Visualize Full Network</Link>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
           {connections.map((conn, i) => (
             <Link to={`/person/${conn.person.id}`} key={i}>
               <motion.div 
                 whileHover={{ scale: 1.05, y: -4 }}
                 className="p-5 rounded-[2rem] border bg-white shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-3 relative overflow-hidden group"
                 style={{ borderColor: 'var(--border-color)' }}
               >
                 <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <img src={conn.person.photo} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt="" />
                 <div className="text-center min-w-0 w-full">
                   <p className="text-[10px] font-black truncate" style={{ color: 'var(--text-primary)' }}>{conn.person.name}</p>
                   <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mt-0.5" style={{ color: 'var(--text-secondary)' }}>{conn.type}</p>
                 </div>
               </motion.div>
             </Link>
           ))}
           {connections.length === 0 && (
             <div className="col-span-full py-12 text-center text-xs font-bold opacity-20 italic bg-white/50 rounded-[2rem] border border-dashed" style={{ borderColor: 'var(--border-color)' }}>No publicly mapped connections available.</div>
           )}
         </div>
      </div>
    </div>
  )
}
