import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MoreVertical, Mail, Phone, Calendar, User } from 'lucide-react'

export default function ProfileCard({ person }) {
  const navigate = useNavigate()

  return (
    <motion.div 
      whileHover={{ y: -6, scale: 1.01 }}
      onClick={() => navigate(`/person/${person.id}`)}
      className="w-full rounded-[2rem] p-6 border shadow-sm transition-all group h-full flex flex-col items-center text-center relative overflow-hidden cursor-pointer"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
    >
      {/* Decorative pulse on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div 
        className="absolute top-4 right-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-emerald-500"
        onClick={(e) => e.stopPropagation()}
      >
        <MoreVertical size={16} />
      </div>

      <div className="relative mb-5 flex justify-center group-hover:scale-110 transition-transform duration-500">
        <div className="relative">
          <img 
            src={person.photo} 
            alt={person.name} 
            className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-700 shadow-md border-2"
            style={{ borderColor: 'var(--bg-primary)' }}
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shadow-lg"
            style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--bg-secondary)' }}>
            <User size={9} className="text-white" />
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0 w-full mb-4">
        <h3 className="text-sm font-black tracking-tight mb-1 truncate px-2 group-hover:text-emerald-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
          {person.name}
        </h3>
        <p className="font-black text-[9px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--accent-primary)' }}>{person.role}</p>
        <p className="text-[10px] opacity-60 leading-relaxed line-clamp-2 px-2" style={{ color: 'var(--text-secondary)' }}>
          {person.info}
        </p>
      </div>

      <div className="w-full pt-4 border-t flex justify-center space-x-2 transition-colors" style={{ borderColor: 'var(--border-color)' }}>
        {[Mail, Phone, Calendar].map((Icon, i) => (
          <button 
            key={i}
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-xl transition-all hover:scale-110 shadow-sm"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }}
          >
            <Icon size={14} />
          </button>
        ))}
      </div>
    </motion.div>
  )
}
