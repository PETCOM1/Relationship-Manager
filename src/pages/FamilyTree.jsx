import React, { useMemo, useState } from 'react'
import Tree from 'react-d3-tree'
import { useNavigate, Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Users, ZoomIn, ZoomOut, Maximize, Plus,
  GitBranch, LayoutGrid, ChevronLeft, ChevronRight
} from 'lucide-react'

const CARDS_PER_PAGE = 8

// ─── Member Card ─────────────────────────────────────────────────────────────
function MemberCard({ person, index }) {
  return (
    <Link to={`/person/${person.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04 }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="p-5 rounded-2xl border flex flex-col items-center text-center gap-3 group cursor-pointer transition-all shadow-sm hover:shadow-lg"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <div className="relative">
          <img
            src={person.photo}
            alt={person.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 grayscale group-hover:grayscale-0 transition-all duration-500 shadow"
            style={{ borderColor: 'var(--border-color)' }}
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--bg-secondary)' }}>
            <User size={9} className="text-white" />
          </div>
        </div>
        <div className="min-w-0 w-full">
          <p className="text-xs font-black tracking-tight truncate hover:text-emerald-500 transition-colors" style={{ color: 'var(--text-primary)' }}>{person.name}</p>
          <p className="text-[10px] font-black uppercase tracking-widest mt-0.5" style={{ color: 'var(--accent-primary)' }}>{person.role}</p>
          <p className="text-[10px] mt-1 opacity-50 truncate font-medium" style={{ color: 'var(--text-secondary)' }}>{person.info}</p>
        </div>
      </motion.div>
    </Link>
  )
}

// ─── Pagination Controls ──────────────────────────────────────────────────────
function Pagination({ page, total, perPage, onChange }) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 pt-2">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
      >
        <ChevronLeft size={16} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="w-9 h-9 rounded-xl border font-black text-xs transition-all hover:scale-105"
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
        className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FamilyTree() {
  const navigate = useNavigate()
  const { people, relationships, searchQuery } = useStore()
  const [view, setView] = useState('tree') // 'tree' | 'members'
  const [page, setPage] = useState(1)

  const familyMembers = useMemo(
    () => people.filter(p => p.groupId === 'family' && 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [people, searchQuery]
  )

  const paginated = useMemo(() => {
    const start = (page - 1) * CARDS_PER_PAGE
    return familyMembers.slice(start, start + CARDS_PER_PAGE)
  }, [familyMembers, page])

  // ─── Custom Node Renderer ──────────────────────────────────────────────────
  const renderCustomNode = ({ nodeDatum, toggleNode }) => {
    const isPartnered = !!nodeDatum.attributes?.partnerName
    return (
      <g>
        <foreignObject width="460" height="260" x="-230" y="-130" className="overflow-visible">
          <div className="flex flex-col items-center justify-center h-full w-full p-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center space-x-4">
              {/* Main Person */}
              <motion.div
                whileHover={nodeDatum.attributes?.id ? { scale: 1.05 } : {}}
                onClick={(e) => {
                  if (nodeDatum.attributes?.id) {
                    e.stopPropagation()
                    navigate(`/person/${nodeDatum.attributes?.id}`)
                  }
                }}
                className={`w-40 border-2 rounded-2xl p-4 shadow-xl transition-all relative overflow-hidden ${nodeDatum.attributes?.id ? 'cursor-pointer group' : 'cursor-default'}`}
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col items-center text-center space-y-3 relative z-10">
                  <div className="relative">
                    <img
                      src={nodeDatum.attributes?.photo}
                      className="w-14 h-14 rounded-full border-2 grayscale group-hover:grayscale-0 transition-all duration-500 object-cover shadow-md"
                      style={{ borderColor: 'var(--bg-primary)' }}
                      alt=""
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border shadow-md"
                      style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--bg-secondary)' }}>
                      <User size={10} className="text-white" />
                    </div>
                  </div>
                  <div className="leading-tight">
                    <h4 className="text-[11px] font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      {nodeDatum.name}
                    </h4>
                    <p className="text-[8px] font-black uppercase tracking-[0.1em] opacity-70" style={{ color: 'var(--accent-primary)' }}>
                      {nodeDatum.attributes?.role}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Partner */}
              {isPartnered && (
                <>
                  <div className="w-6 h-0.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--accent-primary)', opacity: 0.3 }} />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/person/${nodeDatum.attributes?.partnerId}`)
                    }}
                    className="w-40 border-2 rounded-2xl p-4 shadow-xl transition-all cursor-pointer group relative overflow-hidden"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex flex-col items-center text-center space-y-3 relative z-10">
                      <div className="relative">
                        <img
                          src={nodeDatum.attributes?.partnerPhoto}
                          className="w-14 h-14 rounded-full border-2 grayscale group-hover:grayscale-0 transition-all duration-500 object-cover shadow-md"
                          style={{ borderColor: 'var(--bg-primary)' }}
                          alt=""
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border shadow-md"
                          style={{ backgroundColor: '#f43f5e', borderColor: 'var(--bg-secondary)' }}>
                          <Users size={10} className="text-white" />
                        </div>
                      </div>
                      <div className="leading-tight">
                        <h4 className="text-[11px] font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
                          {nodeDatum.attributes?.partnerName}
                        </h4>
                        <p className="text-[8px] font-black uppercase tracking-[0.1em] opacity-70" style={{ color: '#f43f5e' }}>
                          {nodeDatum.attributes?.partnerRole}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>

            {nodeDatum.children?.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleNode()
                }}
                className="mt-4 w-8 h-8 rounded-full border flex items-center justify-center shadow-lg z-20"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <Plus size={16} className={nodeDatum.__rd3t.collapsed ? 'rotate-0' : 'rotate-45 transition-transform'} />
              </motion.button>
            )}
          </div>
        </foreignObject>
      </g>
    )
  }

  const treeData = useMemo(() => {
    const globalVisited = new Set()

    const buildHierarchy = (personId) => {
      if (globalVisited.has(personId)) return null
      const person = familyMembers.find(p => p.id === personId)
      if (!person) return null
      globalVisited.add(personId)

      const partnerRel = relationships.find(r =>
        (r.fromId === person.id || r.toId === person.id) && r.type === 'partner'
      )
      const partnerId = partnerRel
        ? (partnerRel.fromId === person.id ? partnerRel.toId : partnerRel.fromId)
        : null
      const partner = partnerId ? familyMembers.find(p => p.id === partnerId) : null
      if (partnerId) globalVisited.add(partnerId)

      const childrenRels = relationships.filter(r =>
        (r.fromId === person.id || (partner && r.fromId === partner.id)) && r.type === 'parent'
      )
      const children = childrenRels.map(r => buildHierarchy(r.toId)).filter(Boolean)

      return {
        name: person.name,
        attributes: {
          id: person.id,
          role: person.role,
          photo: person.photo,
          info: person.info,
          partnerId: partner?.id,
          partnerName: partner?.name,
          partnerRole: partner?.role,
          partnerPhoto: partner?.photo,
        },
        children,
      }
    }

    const childrenIds = new Set(relationships.filter(r => r.type === 'parent').map(r => r.toId))
    const potentialRoots = familyMembers.filter(p => !childrenIds.has(p.id))
    const uniqueRoots = []
    const rootTracker = new Set()

    potentialRoots.forEach(p => {
      if (rootTracker.has(p.id)) return
      uniqueRoots.push(p)
      rootTracker.add(p.id)
      const partnerRel = relationships.find(r =>
        (r.fromId === p.id || r.toId === p.id) && r.type === 'partner'
      )
      if (partnerRel) {
        const pid = partnerRel.fromId === p.id ? partnerRel.toId : partnerRel.fromId
        rootTracker.add(pid)
      }
    })

    if (uniqueRoots.length === 0) return { name: 'No Family Data', children: [] }
    if (uniqueRoots.length === 1) return buildHierarchy(uniqueRoots[0].id)

    return {
      name: 'Ancestry',
      attributes: { role: 'Origin', photo: 'https://cdn-icons-png.flaticon.com/512/1177/1177568.png' },
      children: uniqueRoots.map(root => buildHierarchy(root.id)).filter(Boolean),
    }
  }, [familyMembers, relationships])

  return (
    <div className="flex flex-col gap-5 w-full pb-6">

      {/* ── Header Bar ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
            Kinship Map
          </h1>
          <p className="text-xs font-bold opacity-50 mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            {familyMembers.length} family members · 5 generations
          </p>
        </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <Users size={12} className="opacity-50" />
              {familyMembers.length} Connections
            </div>
            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-2xl border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              {[
                { id: 'tree', Icon: GitBranch, label: 'Tree' },
                { id: 'members', Icon: LayoutGrid, label: 'Members' },
              ].map(({ id, Icon, label }) => (
                <button
                  key={id}
                  onClick={() => { setView(id); setPage(1) }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm"
                  style={{
                    backgroundColor: view === id ? 'var(--accent-primary)' : 'transparent',
                    color: view === id ? '#fff' : 'var(--text-secondary)',
                  }}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        {view === 'tree' ? (
          <motion.div
            key="tree"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative rounded-3xl border overflow-hidden"
            style={{ height: '70vh', backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
          >
            <style>{`
              .rd3t-link {
                stroke: #10B981 !important;
                stroke-width: 2.5px !important;
                stroke-opacity: 0.4 !important;
                transition: all 0.3s ease;
              }
              .dark .rd3t-link { stroke: #34D399 !important; }
              .rd3t-link:hover { stroke-width: 5px !important; stroke-opacity: 1 !important; }
            `}</style>

            {/* Floating label */}
            <div className="absolute top-4 left-4 z-30 backdrop-blur-xl border p-2.5 rounded-2xl shadow-xl flex items-center gap-3 border-l-4"
              style={{ backgroundColor: 'rgba(var(--bg-secondary-rgb, 255,255,255), 0.7)', borderColor: 'var(--border-color)', borderLeftColor: 'var(--accent-primary)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--accent-primary)' }}>
                <Users size={16} />
              </div>
              <div>
                <h2 className="text-xs font-black leading-tight" style={{ color: 'var(--text-primary)' }}>KINSHIP DYNAMICS</h2>
                <p className="text-[7px] uppercase tracking-[0.2em] font-black opacity-50" style={{ color: 'var(--text-secondary)' }}>5-Generation Interactive Tree</p>
              </div>
            </div>

            {/* Zoom controls */}
            <div className="absolute bottom-4 right-4 z-30 flex flex-col gap-1.5 backdrop-blur-xl p-1 rounded-2xl border shadow-xl"
              style={{ backgroundColor: 'rgba(var(--bg-secondary-rgb, 255,255,255), 0.7)', borderColor: 'var(--border-color)' }}>
              <button className="p-2 rounded-xl hover:scale-110 transition-transform" style={{ color: 'var(--text-secondary)' }}><ZoomIn size={16} /></button>
              <button className="p-2 rounded-xl hover:scale-110 transition-transform" style={{ color: 'var(--text-secondary)' }}><ZoomOut size={16} /></button>
              <button className="p-2 rounded-xl hover:scale-110 transition-transform" style={{ color: 'var(--text-secondary)' }}><Maximize size={16} /></button>
            </div>

            <div className="w-full h-full bg-[radial-gradient(circle_at_center,var(--bg-secondary),transparent_80%)]">
              <Tree
                data={treeData}
                orientation="vertical"
                pathFunc="step"
                separation={{ siblings: 1.8, nonSiblings: 2.2 }}
                translate={{ x: (window.innerWidth - 240) / 2, y: 120 }}
                renderCustomNodeElement={renderCustomNode}
                nodeSize={{ x: 480, y: 450 }}
                scaleExtent={{ min: 0.1, max: 2 }}
                transitionDuration={500}
                initialDepth={10}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="members"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-5"
          >
            {/* Info row */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold opacity-50" style={{ color: 'var(--text-secondary)' }}>
                Showing {(page - 1) * CARDS_PER_PAGE + 1}–{Math.min(page * CARDS_PER_PAGE, familyMembers.length)} of {familyMembers.length} members
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {paginated.map((person, i) => (
                <MemberCard key={person.id} person={person} index={i} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              page={page}
              total={familyMembers.length}
              perPage={CARDS_PER_PAGE}
              onChange={setPage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
