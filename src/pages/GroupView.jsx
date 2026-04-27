import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import ProfileCard from '../components/ProfileCard'
import { Users, Plus, ChevronLeft, ChevronRight, Hash } from 'lucide-react'

const ITEMS_PER_PAGE = 8

// ─── Pagination Component (Shared Logic) ─────────────────────────────────────
function Pagination({ page, total, perPage, onChange }) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="w-10 h-10 rounded-2xl border flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
      >
        <ChevronLeft size={18} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="w-10 h-10 rounded-2xl border font-black text-xs transition-all hover:scale-105"
          style={{
            backgroundColor: p === page ? 'var(--accent-primary)' : 'var(--bg-secondary)',
            borderColor: p === page ? 'var(--accent-primary)' : 'var(--border-color)',
            color: p === page ? '#fff' : 'var(--text-secondary)',
          }}
        >
          {p}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="w-10 h-10 rounded-2xl border flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

export default function GroupView() {
  const { groupId } = useParams()
  const { people, groups, searchQuery, openModal } = useStore()
  const [page, setPage] = useState(1)
  
  const group = groups.find(g => g.id === groupId)
  const filteredPeople = useMemo(() => 
    people.filter(p => p.groupId === groupId && 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [people, groupId, searchQuery]
  )

  const paginatedPeople = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return filteredPeople.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredPeople, page])

  if (!group) return <div>Group not found</div>

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Header Bar */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-2" 
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--accent-primary)' }}>
            <Users size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-secondary)' }}>Directory</span>
              <span className="w-1 h-1 rounded-full bg-slate-400 opacity-30" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--accent-primary)' }}>{group.name}</span>
            </div>
            <h1 className="text-3xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
              {group.name}
            </h1>
            {group.description && (
              <p className="text-xs mt-1 max-w-lg opacity-60" style={{ color: 'var(--text-secondary)' }}>
                {group.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
            <Hash size={12} />
            {filteredPeople.length} Connections
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal('addConnection', { groupId })}
            className="h-11 px-5 rounded-xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest shadow-lg transition-all" 
            style={{ backgroundColor: 'var(--accent-primary)', color: '#fff' }}
          >
            <Plus size={16} />
            Add Profile
          </motion.button>
        </div>
      </header>

      {/* Grid */}
      <div className="flex-1 w-full">
        <AnimatePresence mode="popLayout">
          {paginatedPeople.length > 0 ? (
            <motion.div 
              key={`${groupId}-${page}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {paginatedPeople.map((person, idx) => (
                <ProfileCard key={person.id} person={person} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="py-24 text-center rounded-[2.5rem] border-2 border-dashed flex flex-col items-center gap-3" 
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center opacity-20" style={{ backgroundColor: 'var(--text-secondary)' }}>
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>No connections found</p>
                <p className="text-[10px] font-bold opacity-50" style={{ color: 'var(--text-secondary)' }}>Try a different search term or add a new profile.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <Pagination 
        page={page} 
        total={filteredPeople.length} 
        perPage={ITEMS_PER_PAGE} 
        onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }} 
      />
    </div>
  )
}
