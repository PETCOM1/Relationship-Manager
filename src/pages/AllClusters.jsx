import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Heart, Briefcase, GraduationCap, Layers, ArrowRight } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function AllClusters() {
  const { groups, people } = useStore()

  const getIcon = (iconName) => {
    const icons = {
      Users,
      Heart,
      Briefcase,
      GraduationCap
    }
    const IconComponent = icons[iconName] || Layers
    return <IconComponent size={24} />
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  }

  return (
    <div className="py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-black tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
          All Clusters
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Manage and explore your relationship groups
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {groups.map(group => {
          const groupCount = people.filter(p => p.groupId === group.id).length

          return (
            <motion.div key={group.id} variants={itemVariants}>
              <Link to={`/group/${group.id}`} className="block h-full group">
                <div 
                  className="h-full p-6 rounded-3xl transition-all duration-300 relative overflow-hidden"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, #059669 100%)',
                        color: 'white',
                        boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      {getIcon(group.icon)}
                    </div>
                    
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <ArrowRight size={16} style={{ color: 'var(--text-primary)' }} />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-1 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      {group.name}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      {groupCount} {groupCount === 1 ? 'Connection' : 'Connections'}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
