import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Search, LayoutDashboard, Users, 
  ChevronLeft, Moon, Sun, Github
} from 'lucide-react'
import { useStore } from '../store/useStore'
import AddConnectionModal from './AddConnectionModal'

export default function Layout({ children }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)
  const { groups, people, searchQuery, setSearchQuery, isDarkMode, toggleDarkMode } = useStore()
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
        animate={{ width: isSidebarOpen ? 'var(--sidebar-w)' : '80px' }}
        className="fixed left-4 top-4 bottom-4 border transition-all duration-300 z-50 flex flex-col rounded-[2.5rem] sidebar-float overflow-hidden"
        style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          borderColor: 'var(--border-color)' 
        }}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden" style={{ backgroundColor: 'var(--accent-primary)' }}>
                <div className="absolute inset-0 bg-white/20 -rotate-45 translate-x-1" />
                <div className="absolute inset-0 bg-white/20 rotate-45 -translate-x-1" />
                <Users className="text-white w-4 h-4 relative z-10" />
              </div>
              {isSidebarOpen && (
                <span className="font-black text-xl tracking-tighter" style={{ color: 'var(--text-primary)' }}>ReSync</span>
              )}
          </div>
          {isSidebarOpen && (
            <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        <div className="px-4 mb-6">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full h-12 rounded-2xl border-2 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] hover:shadow-md"
            style={{ borderColor: 'var(--border-color)', color: 'var(--accent-primary)' }}
          >
            <Plus size={20} />
            {isSidebarOpen && <span className="font-bold text-sm">Add New</span>}
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto overflow-x-hidden pt-2 scrollbar-none">
          <NavItem 
            to="/" 
            icon={<LayoutDashboard size={20} />} 
            label="Home" 
            active={location.pathname === '/'}
            isSidebarOpen={isSidebarOpen}
          />
          <NavItem 
            to="/family-tree" 
            icon={<Github size={20} />} 
            label="Kinship Map" 
            active={location.pathname === '/family-tree'}
            isSidebarOpen={isSidebarOpen}
          />
          
          <div className={`pt-6 pb-2 px-4 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-40' : 'opacity-0'}`}>
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Clusters</span>
          </div>
          
          {groups.map(group => (
            <NavItem 
              key={group.id}
              to={`/group/${group.id}`} 
              icon={<Users size={20} />} 
              label={group.name} 
              active={location.pathname === `/group/${group.id}`}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </nav>



        <div className="p-4 flex items-center justify-between border-t transition-colors" style={{ borderColor: 'var(--border-color)' }}>
          <button 
            onClick={toggleDarkMode}
            className="p-3 rounded-2xl transition-all hover:scale-110 shadow-sm"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--accent-primary)' }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {!isSidebarOpen && (
            <button onClick={() => setIsSidebarOpen(true)} className="p-3 rounded-2xl transition-all hover:scale-110" style={{ color: 'var(--text-secondary)' }}>
              <ChevronLeft className="rotate-180" size={20} />
            </button>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className="flex-1 transition-all duration-300 relative flex flex-col" 
        style={{ marginLeft: isSidebarOpen ? 'var(--sidebar-w)' : '80px' }}
      >
        <header 
          className={`h-16 flex items-center justify-between px-4 z-40 transition-all duration-500`}
        >
          <div className="relative w-80 max-w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
            <input 
              type="text" 
              placeholder="Search anything..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full h-12 rounded-2xl pl-12 pr-4 text-xs transition-all focus:ring-2 outline-none border transition-colors shadow-sm"
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                '--tw-ring-color': 'var(--accent-primary)'
              }}
            />

            {/* Global Search Results Dropdown */}
            <AnimatePresence>
              {isSearchFocused && searchQuery.length > 0 && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsSearchFocused(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-14 left-0 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                      {people.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6).map(p => (
                        <Link 
                          key={p.id} 
                          to={`/person/${p.id}`}
                          onClick={() => {
                            setSearchQuery('')
                            setIsSearchFocused(false)
                          }}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                        >
                          <img src={p.photo} className="w-8 h-8 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all shadow-sm" alt="" />
                          <div className="min-w-0">
                            <p className="text-[11px] font-black truncate" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                            <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest" style={{ color: 'var(--accent-primary)' }}>{p.role}</p>
                          </div>
                        </Link>
                      ))}
                      {people.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                        <div className="p-8 text-center">
                          <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">No results found</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

          </div>

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
      </main>

      <AddConnectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

function NavItem({ to, icon, label, active, isSidebarOpen }) {
  return (
    <Link to={to} className="block group">
      <div 
        className={`flex items-center space-x-4 p-4 rounded-[1.25rem] transition-all duration-300 relative ${active ? 'shadow-lg' : 'hover:bg-slate-500/5'}`}
        style={{ 
          backgroundColor: active ? 'var(--accent-primary)' : 'transparent',
          color: active ? 'white' : 'var(--text-secondary)'
        }}
      >
        <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
          {icon}
        </div>
        {isSidebarOpen && (
          <span className={`font-bold text-sm tracking-tight`}>
            {label}
          </span>
        )}
        {active && isSidebarOpen && (
           <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/50" />
        )}
      </div>
    </Link>
  )
}
