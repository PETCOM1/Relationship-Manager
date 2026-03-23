import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, UserPlus, Link, Check, User } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function AddConnectionModal({ isOpen, onClose }) {
  const { groups, people, addPerson, addRelationship } = useStore()
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    info: '',
    groupId: 'family',
    photo: 'https://i.pravatar.cc/150',
    relatedTo: '',
    relType: 'partner'
  })

  const handleSubmit = () => {
    const newId = Math.random().toString(36).substr(2, 9)
    addPerson({ ...formData, id: newId })
    if (formData.relatedTo) {
      addRelationship({ fromId: formData.relatedTo, toId: newId, type: formData.relType })
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden border transition-colors"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <div className="p-6 space-y-6">
          <header className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-xl font-black flex items-center space-x-2" style={{ color: 'var(--text-primary)' }}>
                <UserPlus size={20} style={{ color: 'var(--accent-primary)' }} />
                <span>New Connection</span>
              </h2>
              <p className="text-[10px] font-bold opacity-60" style={{ color: 'var(--text-secondary)' }}>Expand your network.</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full transition-colors hover:bg-slate-500/10" style={{ color: 'var(--text-secondary)' }}>
              <X size={18} />
            </button>
          </header>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest pl-1 opacity-60" style={{ color: 'var(--text-secondary)' }}>Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border rounded-xl py-2 px-3 text-sm outline-none transition-all shadow-sm focus:ring-1"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--accent-primary)' }}
                  placeholder="Sam Rivera"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest pl-1 opacity-60" style={{ color: 'var(--text-secondary)' }}>Category</label>
                <select 
                  value={formData.groupId}
                  onChange={e => setFormData({...formData, groupId: e.target.value})}
                  className="w-full border rounded-xl py-2 px-3 text-sm outline-none transition-all shadow-sm focus:ring-1"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--accent-primary)' }}
                >
                  {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest pl-1 opacity-60" style={{ color: 'var(--text-secondary)' }}>Role / Title</label>
              <input 
                type="text" 
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                className="w-full border rounded-xl py-2 px-3 text-sm outline-none transition-all shadow-sm focus:ring-1"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--accent-primary)' }}
                placeholder="e.g. Mentor, Cousin"
              />
            </div>

            <div className="p-4 rounded-xl border transition-colors space-y-3" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center space-x-2 opacity-60" style={{ color: 'var(--text-secondary)' }}>
                <Link size={14} />
                <span className="text-[10px] font-black uppercase tracking-tight">Link Relationship</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <select 
                  value={formData.relatedTo}
                  onChange={e => setFormData({...formData, relatedTo: e.target.value})}
                  className="rounded-lg py-1.5 px-2 text-[10px] outline-none border transition-colors"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                >
                  <option value="">No link</option>
                  {people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <select 
                  value={formData.relType}
                  onChange={e => setFormData({...formData, relType: e.target.value})}
                  className="rounded-lg py-1.5 px-2 text-[10px] outline-none border transition-colors"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                >
                  <option value="partner">Partner</option>
                  <option value="parent">Parent of</option>
                </select>
              </div>
            </div>
          </div>

          <footer className="pt-2 flex items-center justify-end space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold transition-colors hover:opacity-70"
              style={{ color: 'var(--text-secondary)' }}
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg transition-all hover:scale-105 active:scale-95 text-white"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              Save Profile
            </button>
          </footer>
        </div>
      </motion.div>
    </div>
  )
}
