import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserPlus, Home, Layers, 
  Network, Moon, Sun,
  Users, Heart, Briefcase, GraduationCap
} from 'lucide-react'
import { useStore } from '../store/useStore'
import AddConnectionModal from './AddConnectionModal'
import AddClusterModal from './AddClusterModal'

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const { groups, isDarkMode, toggleDarkMode, openModal } = useStore()
  const location = useLocation()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className={`min-h-screen flex p-4 gap-4 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`} style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Sidebar - Floating Card Style */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 'var(--sidebar-w)' : '80px',
          backgroundColor: isSidebarOpen ? 'var(--glass-bg)' : 'rgba(var(--bg-secondary-rgb), 0.4)'
        }}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
        className="fixed left-4 top-4 bottom-4 z-50 flex flex-col rounded-[2.5rem] overflow-hidden group/sidebar"
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        style={{ 
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--glass-border)',
          boxShadow: 'var(--glass-shadow)'
        }}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden shadow-lg border border-white/10" 
                  style={{ background: 'linear-gradient(135deg, var(--accent-primary) 0%, #059669 100%)' }}>
                <div className="absolute inset-0 bg-white/20 -rotate-45 translate-y-1" />
                <span className="text-white font-black text-xl relative z-10 italic tracking-tighter">R</span>
              </div>
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10, width: 0 }}
                    animate={{ opacity: 1, x: 0, width: 'auto' }}
                    exit={{ opacity: 0, x: -10, width: 0 }}
                    className="font-black text-xl tracking-tighter overflow-hidden whitespace-nowrap" 
                    style={{ color: 'var(--text-primary)' }}
                  >
                    ReSync
                  </motion.span>
                )}
              </AnimatePresence>
          </div>
        </div>

        <div className="px-4 mb-6">
          <button 
            onClick={() => openModal('addCluster')}
            className="w-full h-12 rounded-2xl flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md relative overflow-hidden group"
            style={{ 
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, #10B981 100%)',
              color: 'white'
            }}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Layers size={20} className="relative z-10" />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: -10, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: -10, width: 0 }}
                  className="font-bold text-sm relative z-10 overflow-hidden whitespace-nowrap"
                >
                  New Cluster
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto overflow-x-hidden pt-2 scrollbar-none">
          <NavItem 
            to="/" 
            icon={<Home size={20} />} 
            label="Home" 
            active={location.pathname === '/'}
            isSidebarOpen={isSidebarOpen}
          />
          <NavItem 
            to="/family-tree" 
            icon={<Network size={20} />} 
            label="Kinship Map" 
            active={location.pathname === '/family-tree'}
            isSidebarOpen={isSidebarOpen}
          />
          
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 0.6, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="pt-8 pb-3 px-4 overflow-hidden"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>Clusters</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {groups.map(group => {
            const IconComponent = {
              Users,
              Heart,
              Briefcase,
              GraduationCap
            }[group.icon] || Layers

            return (
              <NavItem 
                key={group.id}
                to={`/group/${group.id}`} 
                icon={<IconComponent size={20} />} 
                label={group.name} 
                active={location.pathname === `/group/${group.id}`}
                isSidebarOpen={isSidebarOpen}
              />
            )
          })}
        </nav>



        <div className="p-4 border-t transition-colors" style={{ borderColor: 'var(--border-color)' }}>
          <div 
            onClick={toggleDarkMode}
            className={`flex items-center rounded-[1.25rem] cursor-pointer transition-all duration-300 relative group/toggle ${isDarkMode ? 'bg-emerald-500/10' : 'bg-slate-100 dark:bg-white/5'}`}
            style={{ 
              padding: isSidebarOpen ? '12px 16px' : '12px',
              border: '1px solid var(--border-color)'
            }}
          >
            <div className="relative w-10 h-6 rounded-full transition-colors flex items-center p-1 bg-white dark:bg-slate-800 shadow-inner border border-black/5 dark:border-white/5">
              <motion.div 
                className="w-4 h-4 rounded-full shadow-md flex items-center justify-center overflow-hidden"
                initial={false}
                animate={{ 
                  x: isDarkMode ? 16 : 0,
                  backgroundColor: isDarkMode ? 'var(--accent-primary)' : '#f59e0b'
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isDarkMode ? (
                  <Moon size={10} className="text-white" />
                ) : (
                  <Sun size={10} className="text-white" />
                )}
              </motion.div>
            </div>
            
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: -10, width: 0 }}
                  className="ml-3 flex flex-col overflow-hidden whitespace-nowrap"
                >
                  <span className="text-[10px] font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                  </span>
                  <span className="text-[8px] font-bold opacity-50" style={{ color: 'var(--text-secondary)' }}>
                    Appearance
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main 
        className="flex-1 relative flex flex-col" 
        animate={{ marginLeft: isSidebarOpen ? 'var(--sidebar-w)' : '80px' }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      >
        <header 
          className="sticky top-0 h-16 flex items-center justify-between px-6 z-40 transition-all duration-500 backdrop-blur-lg border-b"
          style={{ 
            backgroundColor: 'rgba(var(--bg-primary-rgb), 0.65)',
            borderColor: 'var(--border-color)' 
          }}
        >
          <div />

          <Link to="/person/6" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
             <div className="hidden md:flex flex-col items-end">
               <span className="text-xs font-black tracking-tight leading-none" style={{ color: 'var(--text-primary)' }}>Petrus</span>
               <span className="text-[9px] font-bold opacity-50 leading-none" style={{ color: 'var(--text-secondary)' }}>Munzhedzi</span>
             </div>
             <img src="https://i.pravatar.cc/150?u=user1" className="w-10 h-10 rounded-2xl shadow-md border-2" style={{ borderColor: 'var(--bg-secondary)' }} alt="User" />
          </Link>
        </header>

        <div className="flex-1 w-full mt-4 flex flex-col px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-1 flex flex-col"
            >
              <div className="w-full max-w-[1400px] mx-auto flex-1 flex flex-col">
                {children}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>

      <AddConnectionModal />
      <AddClusterModal />
    </div>
  )
}

function NavItem({ to, icon, label, active, isSidebarOpen }) {
  return (
    <Link to={to} className="block group">
      <div 
        className={`flex items-center space-x-4 p-4 rounded-[1.25rem] transition-all duration-300 relative ${active ? 'shadow-lg shadow-emerald-500/20' : 'hover:bg-white/5 dark:hover:bg-white/5'}`}
        style={{ 
          background: active ? 'linear-gradient(135deg, var(--accent-primary) 0%, #059669 100%)' : 'transparent',
          color: active ? 'white' : 'var(--text-secondary)',
          border: active ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent'
        }}
      >
        <div className={`transition-transform duration-300 ${active ? 'scale-110 drop-shadow-md' : 'group-hover:scale-110'}`}>
          {icon}
        </div>
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0, x: -10, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 'auto' }}
              exit={{ opacity: 0, x: -10, width: 0 }}
              className={`font-bold text-sm tracking-tight overflow-hidden whitespace-nowrap ${active ? 'text-white' : ''}`}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
        {active && isSidebarOpen && (
           <motion.div 
             layoutId="active-indicator"
             className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
           />
        )}
      </div>
    </Link>
  )
}
