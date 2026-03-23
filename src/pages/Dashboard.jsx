import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Users, ChevronRight, Zap, TrendingUp, Star, Bell,
  ArrowUpRight, BarChart2, Heart, Briefcase, GraduationCap, Crown
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { Link } from 'react-router-dom'

// ─── Tiny SVG Sparkline ────────────────────────────────────────────────────────
function Sparkline({ data = [], color = 'var(--accent-primary)', height = 60, width = 300 }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * (height - 12) - 6
    return `${x},${y}`
  }).join(' ')
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={`0,${height} ${pts} ${width},${height}`}
        fill="url(#sparkGrad)"
      />
    </svg>
  )
}

// ─── Group icon map ─────────────────────────────────────────────────────────
const GROUP_ICONS = {
  family: Users,
  friends: Heart,
  colleagues: Briefcase,
  mentees: GraduationCap,
}

// ─── Mock analytics series ───────────────────────────────────────────────────
const ANALYTICS_DATA = [4, 7, 5, 9, 6, 12, 8, 14, 11, 16, 13, 19]

export default function Dashboard() {
  const { people, groups, relationships } = useStore()

  const totalConnections = people.length
  const totalRelationships = relationships.length
  const totalGroups = groups.length

  // Most recently added (last 6 people)
  const recentPeople = useMemo(() => [...people].reverse().slice(0, 6), [people])

  // Group stats
  const groupStats = groups.map(g => ({
    ...g,
    count: people.filter(p => p.groupId === g.id).length,
    Icon: GROUP_ICONS[g.id] || Users,
  }))

  const statCards = [
    { label: 'Total People', value: totalConnections, icon: Users, delta: '+3 this month' },
    { label: 'Relationships', value: totalRelationships, icon: TrendingUp, delta: 'Mapped links' },
    { label: 'New This Week', value: 2, icon: Star, delta: '↑ Growing' },
  ]

  return (
    <div className="w-full flex gap-6 pb-6 min-h-0">
      {/* ── LEFT / MAIN ─────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col gap-5">

        {/* Hero Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl p-7 border"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent)' }} />
          <div className="absolute bottom-0 right-16 w-28 h-28 rounded-full opacity-5 pointer-events-none"
            style={{ background: 'var(--accent-primary)' }} />

          <div className="relative z-10 flex items-end justify-between gap-4">
            <div className="space-y-2">

              <h1 className="text-3xl font-black tracking-tighter leading-tight" style={{ color: 'var(--text-primary)' }}>
                Hi Petrus.
                <br />
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, var(--accent-primary), #38bdf8)' }}>
                  Welcome back.
                </span>
              </h1>
              <p className="text-sm max-w-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                You have <strong style={{ color: 'var(--text-primary)' }}>{totalConnections}</strong> connections across{' '}
                <strong style={{ color: 'var(--text-primary)' }}>{totalGroups}</strong> clusters — keep mapping your world.
              </p>
            </div>
            <Link to="/family-tree">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="shrink-0 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg"
                style={{ backgroundColor: 'var(--accent-primary)', color: '#fff' }}
              >
                View Tree
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-3 gap-4">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="p-5 rounded-2xl border flex items-center justify-between group hover:shadow-lg transition-all"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1" style={{ color: 'var(--text-secondary)' }}>{s.label}</p>
                <p className="text-3xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
                <p className="text-[10px] mt-1 font-semibold" style={{ color: 'var(--accent-primary)' }}>{s.delta}</p>
              </div>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: 'rgba(16,185,129,0.12)', color: 'var(--accent-primary)' }}>
                <s.icon size={20} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trending — Cluster Cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-black uppercase tracking-widest opacity-60" style={{ color: 'var(--text-secondary)' }}>
              Clusters
            </h2>
            <Link to="/" className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color: 'var(--accent-primary)' }}>
              View All <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {groupStats.map((g, i) => (
              <Link key={g.id} to={`/group/${g.id}`}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.07 * i }}
                  className="p-5 rounded-2xl border flex items-center justify-between group cursor-pointer transition-all"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(16,185,129,0.12)', color: 'var(--accent-primary)' }}>
                      <g.Icon size={18} />
                    </div>
                    <div>
                      <p className="font-black text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>{g.name}</p>
                      <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>{g.count} people</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="opacity-30 group-hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--accent-primary)' }} />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>


      </div>

    </div>
  )
}
