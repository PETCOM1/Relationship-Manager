import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Layers, Users, Heart, Briefcase, GraduationCap, Star, Shield, Zap, Target } from 'lucide-react'
import { useStore } from '../store/useStore'

const ICON_OPTIONS = [
  { id: 'Users', icon: Users },
  { id: 'Heart', icon: Heart },
  { id: 'Briefcase', icon: Briefcase },
  { id: 'GraduationCap', icon: GraduationCap },
  { id: 'Star', icon: Star },
  { id: 'Shield', icon: Shield },
  { id: 'Zap', icon: Zap },
  { id: 'Target', icon: Target },
  { id: 'Layers', icon: Layers }
]

export default function AddClusterModal() {
  const { addGroup, modalConfig, closeModal } = useStore()
  const { isOpen, type } = modalConfig
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Layers',
    color: 'emerald'
  })

  const handleSubmit = () => {
    if (!formData.name) return
    addGroup(formData)
    closeModal()
    setFormData({ name: '', description: '', icon: 'Layers', color: 'emerald' })
  }

  if (!isOpen || type !== 'addCluster') return null

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
      onClick={closeModal}
    >
      <motion.div 
        onClick={(e) => e.stopPropagation()}
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
                <Layers size={20} style={{ color: 'var(--accent-primary)' }} />
                <span>New Cluster</span>
              </h2>
              <p className="text-[10px] font-bold opacity-60" style={{ color: 'var(--text-secondary)' }}>Categorize your connections.</p>
            </div>
            <button onClick={closeModal} className="p-1.5 rounded-full transition-colors hover:bg-slate-500/10" style={{ color: 'var(--text-secondary)' }}>
              <X size={18} />
            </button>
          </header>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest pl-1 opacity-60" style={{ color: 'var(--text-secondary)' }}>Cluster Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full border rounded-xl py-2.5 px-4 text-sm outline-none transition-all shadow-sm focus:ring-1"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--accent-primary)' }}
                placeholder="e.g. Neighbors, Church, Tennis Club"
                autoFocus
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest pl-1 opacity-60" style={{ color: 'var(--text-secondary)' }}>Description</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                rows={2}
                className="w-full border rounded-xl py-2.5 px-4 text-sm outline-none transition-all shadow-sm focus:ring-1 resize-none"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--accent-primary)' }}
                placeholder="People from the local community..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest pl-1 opacity-60" style={{ color: 'var(--text-secondary)' }}>Select Icon</label>
              <div className="grid grid-cols-5 gap-2">
                {ICON_OPTIONS.map((opt) => {
                  const Icon = opt.icon
                  const isActive = formData.icon === opt.id
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setFormData({...formData, icon: opt.id})}
                      className={`h-12 rounded-xl flex items-center justify-center border transition-all ${isActive ? 'shadow-md scale-105' : 'opacity-40 hover:opacity-100'}`}
                      style={{ 
                        backgroundColor: isActive ? 'rgba(16,185,129,0.1)' : 'var(--bg-primary)',
                        borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-color)',
                        color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)'
                      }}
                    >
                      <Icon size={20} />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <footer className="pt-2 flex items-center justify-end space-x-3">
            <button 
              onClick={closeModal}
              className="px-4 py-2 text-xs font-bold transition-colors hover:opacity-70"
              style={{ color: 'var(--text-secondary)' }}
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={!formData.name}
              className="px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg transition-all hover:scale-105 active:scale-95 text-white disabled:opacity-50 disabled:hover:scale-100"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              Create Cluster
            </button>
          </footer>
        </div>
      </motion.div>
    </div>
  )
}
