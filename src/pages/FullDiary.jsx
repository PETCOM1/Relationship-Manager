import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, BookOpen, Clock, Trash2, Calendar, 
  Search, Filter, SortAsc, SortDesc, TrendingUp,
  FileText, CalendarDays
} from 'lucide-react'
import { useStore } from '../store/useStore'

export default function FullDiary() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { people, deleteNote } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('newest') // newest or oldest

  const person = useMemo(() => people.find(p => p.id === id), [people, id])

  const filteredAndSortedNotes = useMemo(() => {
    if (!person?.notes) return []
    
    let result = [...person.notes]
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(n => n.content.toLowerCase().includes(query))
    }
    
    result.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })
    
    return result
  }, [person?.notes, searchQuery, sortOrder])

  // Simple stats
  const totalEntries = person?.notes?.length || 0
  const totalWords = person?.notes?.reduce((acc, n) => acc + n.content.split(/\s+/).length, 0) || 0
  const avgWords = totalEntries > 0 ? Math.round(totalWords / totalEntries) : 0

  if (!person) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="text-xl font-black opacity-50">Person Not Found</p>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft size={16} /> Go Home
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-[1400px] pb-32 mt-8">
      {/* Header Section */}
      <header className="pt-12 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-6">
            <button 
              onClick={() => navigate(`/person/${id}`)}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-2xl border backdrop-blur-sm transition-all hover:scale-105 shadow-sm"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)', backgroundColor: 'rgba(var(--bg-secondary-rgb), 0.5)' }}
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Return to Profile</span>
            </button>
            <div className="space-y-1">
              <h1 className="text-6xl font-black tracking-tighter leading-none" style={{ color: 'var(--text-primary)' }}>
                The Journal
              </h1>
              <p className="text-sm font-bold opacity-40 uppercase tracking-[0.3em] pl-1" style={{ color: 'var(--accent-primary)' }}>
                {person.name}'s History
              </p>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-4 backdrop-blur-md p-2 rounded-[2.5rem] border shadow-sm self-start md:self-auto" style={{ borderColor: 'var(--border-color)', backgroundColor: 'rgba(var(--bg-secondary-rgb), 0.4)' }}>
            <StatCard icon={<FileText size={14} />} label="Total" value={totalEntries} color="var(--accent-primary)" />
            <div className="w-px h-8" style={{ backgroundColor: 'var(--border-color)' }} />
            <StatCard icon={<TrendingUp size={14} />} label="Avg Words" value={avgWords} color="var(--accent-primary)" />
            <div className="w-px h-8" style={{ backgroundColor: 'var(--border-color)' }} />
            <div className="px-5 py-2 text-center">
               <span className="block text-[8px] font-black uppercase tracking-widest opacity-30 mb-0.5">Focus</span>
               <span className="text-xs font-black uppercase tracking-widest text-emerald-600">High</span>
            </div>
          </div>
        </div>

        {/* Toolbar: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-[3rem] border overflow-hidden" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)', boxShadow: 'var(--glass-shadow)' }}>
          <div className="flex-1 w-full relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity" size={20} style={{ color: 'var(--accent-primary)' }} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search through memories..."
              className="w-full h-16 pl-16 pr-8 bg-transparent border-none focus:ring-0 text-sm font-bold placeholder:opacity-30"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>
          <div className="w-full sm:w-auto flex items-center gap-2 pr-2">
            <button 
              onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
              className="px-8 h-16 rounded-3xl border flex items-center gap-3 transition-all group"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
            >
              {sortOrder === 'newest' ? <SortDesc size={18} className="opacity-40" /> : <SortAsc size={18} className="opacity-40" />}
              <span className="text-[10px] font-black uppercase tracking-widest min-w-[60px]">
                {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Diary Entries List */}
      <div className="grid grid-cols-1 gap-12 relative">
        {/* Timeline Path Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block opacity-40" style={{ backgroundColor: 'var(--border-color)' }} />

        <AnimatePresence mode="popLayout">
          {filteredAndSortedNotes.length > 0 ? (
            filteredAndSortedNotes.map((note, index) => (
              <motion.div 
                key={note.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`relative flex flex-col ${index % 2 === 0 ? 'lg:items-start' : 'lg:items-end'}`}
              >
                {/* Visual Connector Dot on Timeline */}
                <div className="absolute left-1/2 top-14 w-4 h-4 rounded-full border-4 -translate-x-1/2 hidden lg:block z-10" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--accent-primary)' }} />

                <div className="w-full lg:w-[48%] group">
                  <div className="relative p-10 rounded-[4rem] border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 overflow-hidden"
                    style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                    
                    {/* Entry Header */}
                    <div className="flex items-center gap-4 mb-10">
                       <div className="w-14 h-14 rounded-[1.5rem] border flex items-center justify-center transition-colors" 
                            style={{ borderColor: 'var(--border-color)', color: 'var(--accent-primary)' }}>
                         <CalendarDays size={24} />
                       </div>
                       <div>
                         <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30 mb-1" style={{ color: 'var(--text-secondary)' }}>Handwritten Memoir</p>
                         <p className="text-[13px] font-black uppercase tracking-widest text-emerald-600">
                            {new Date(note.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - {new Date(note.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                         </p>
                       </div>
                       
                       <div className="ml-auto">
                         <button 
                           onClick={() => deleteNote(person.id, note.id)}
                           className="p-3.5 rounded-2xl bg-rose-50 text-rose-500 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all shadow-sm"
                         >
                           <Trash2 size={18} />
                         </button>
                       </div>
                    </div>

                    <div className="relative pl-8 border-l-4 border-emerald-500/10 group-hover:border-emerald-500/30 transition-colors max-h-[300px] group-hover:max-h-[800px] overflow-hidden group-hover:overflow-y-auto duration-700 ease-in-out pr-4 custom-scrollbar">
                      <p className="text-xl leading-[2.2] whitespace-pre-wrap italic opacity-80 line-clamp-[8] group-hover:line-clamp-none transition-all duration-700" 
                         style={{ color: 'var(--text-secondary)', fontFamily: 'Georgia, serif' }}>
                        "{note.content}"
                      </p>
                      {/* Gradient Fade for Truncation */}
                      <div className="absolute bottom-0 left-0 w-full h-16 group-hover:opacity-0 pointer-events-none transition-opacity duration-500" style={{ background: 'linear-gradient(to top, var(--bg-secondary), transparent)' }} />
                    </div>

                    {/* Subtle Entry ID / Index */}
                    <div className="absolute right-10 bottom-8 opacity-[0.03] select-none pointer-events-none">
                       <span className="text-8xl font-black italic">#{filteredAndSortedNotes.length - index}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-40 text-center rounded-[5rem] border-2 border-dashed flex flex-col items-center gap-8" 
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'rgba(var(--bg-secondary-rgb), 0.5)' }}
            >
               <div className="w-24 h-24 rounded-[2.5rem] shadow-2xl border flex items-center justify-center opacity-30" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                 <BookOpen size={48} className="text-slate-400" />
               </div>
               <div className="space-y-2">
                 <p className="text-2xl font-black opacity-30" style={{ color: 'var(--text-primary)' }}>
                   {searchQuery ? 'No matching memories found' : 'The journal is currently empty'}
                 </p>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
                   {searchQuery ? 'Try exploring a different keyword or date' : `Start chronicling your journey with ${person.name}`}
                 </p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="px-7 py-3 text-center">
      <div className="flex items-center justify-center gap-2 mb-1.5 opacity-30" style={{ color }}>
        {icon}
        <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-lg font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{value}</span>
    </div>
  )
}
