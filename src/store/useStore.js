import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      people: [
        // Generation 1
        { id: '1', name: 'Munzhedzi Mususumeli', role: 'Grandfather', info: 'Family Ancestor', photo: 'https://i.pravatar.cc/150?u=gf1', groupId: 'family' },
        { id: '2', name: 'Marandela Munzhedzi', role: 'Grandmother', info: 'Family Matriarch', photo: 'https://i.pravatar.cc/150?u=gm1', groupId: 'family' },
        
        // Generation 2
        { id: '3', name: 'Mushoni Munzhedzi', role: 'Aunt', info: 'Daughter of Mususumeli', photo: 'https://i.pravatar.cc/150?u=aunt1', groupId: 'family' },
        { id: '4', name: 'Munzhedzi Livhuwani', role: 'Father', info: 'Son of Mususumeli', photo: 'https://i.pravatar.cc/150?u=f1', groupId: 'family' },
        { id: '5', name: 'Kahtushtshelo Edith Munzhedzi', role: 'Mother', info: 'Wife of Livhuwani', photo: 'https://i.pravatar.cc/150?u=m1', groupId: 'family' },
        { id: '12', name: 'Aifheli', role: 'Uncle', info: 'Son of Mususumeli', photo: 'https://i.pravatar.cc/150?u=u1', groupId: 'family' },
        { id: '13', name: 'Betuel', role: 'Uncle', info: 'Son of Mususumeli', photo: 'https://i.pravatar.cc/150?u=u2', groupId: 'family' },
        { id: '14', name: 'Azwindini', role: 'Uncle', info: 'Son of Mususumeli', photo: 'https://i.pravatar.cc/150?u=u3', groupId: 'family' },
        { id: '15', name: 'Fulufhelo', role: 'Aunt', info: 'Wife of Aifheli', photo: 'https://i.pravatar.cc/150?u=a2', groupId: 'family' },
        { id: '16', name: 'Mukoni', role: 'Cousin', info: 'Son of Aifheli', photo: 'https://i.pravatar.cc/150?u=c3', groupId: 'family' },
        { id: '17', name: 'Unarine', role: 'Cousin', info: 'Daughter of Aifheli', photo: 'https://i.pravatar.cc/150?u=c4', groupId: 'family' },
        
        // Generation 3
        { id: '6', name: 'Munyadziwa Petrus Munzhedzi', role: 'User', info: 'Son of Livhuwani', photo: 'https://i.pravatar.cc/150?u=user1', groupId: 'family' },
        { id: '7', name: 'Risuna', role: 'Wife', info: 'Partner of Petrus', photo: 'https://i.pravatar.cc/150?u=w1', groupId: 'family' },
        { id: '8', name: 'Tshedza', role: 'Sister', info: 'Daughter of Livhuwani', photo: 'https://i.pravatar.cc/150?u=s1', groupId: 'family' },
        { id: '9', name: 'Mpho', role: 'Brother', info: 'Son of Livhuwani', photo: 'https://i.pravatar.cc/150?u=b1', groupId: 'family' },
        
        // Generation 4
        { id: '10', name: 'Lufuno', role: 'Child', info: 'Son of Petrus', photo: 'https://i.pravatar.cc/150?u=c1', groupId: 'family' },
        { id: '11', name: 'Tshililo', role: 'Child', info: 'Son of Petrus', photo: 'https://i.pravatar.cc/150?u=c2', groupId: 'family' },
        { id: '18', name: 'Merium', role: 'Daughter-in-law', info: 'Wife of Tshililo', photo: 'https://i.pravatar.cc/150?u=w2', groupId: 'family' },
        
        // Generation 5
        { id: '19', name: 'Malamba', role: 'Grandchild', info: 'Child of Tshililo', photo: 'https://i.pravatar.cc/150?u=c5', groupId: 'family' },

        // Friends
        { id: '20', name: 'Kudzwai', role: 'Best Friend', info: 'University Friend', photo: 'https://i.pravatar.cc/150?u=f10', groupId: 'friends' },
        { id: '21', name: 'Tendai', role: 'Friend', info: 'Childhood Friend', photo: 'https://i.pravatar.cc/150?u=f11', groupId: 'friends' },
        { id: '22', name: 'Rorisang', role: 'Friend', info: 'Hiking Buddy', photo: 'https://i.pravatar.cc/150?u=f12', groupId: 'friends' },

        // Colleagues
        { id: '29', name: 'Julian Reed', role: 'Colleague', info: 'Lead Developer', photo: 'https://i.pravatar.cc/150?u=17', groupId: 'colleagues' },
        { id: '23', name: 'Jessica Chen', role: 'Project Manager', info: 'Agile Specialist', photo: 'https://i.pravatar.cc/150?u=c10', groupId: 'colleagues' },
        { id: '24', name: 'Marcus Thorne', role: 'Senior Designer', info: 'UI/UX Expert', photo: 'https://i.pravatar.cc/150?u=c11', groupId: 'colleagues' },
        { id: '25', name: 'Sarah Miller', role: 'QA Engineer', info: 'Automation Lead', photo: 'https://i.pravatar.cc/150?u=c12', groupId: 'colleagues' },

        // Mentees
        { id: '26', name: 'Blessing', role: 'Mentee', info: 'Junior Developer', photo: 'https://i.pravatar.cc/150?u=m10', groupId: 'mentees' },
        { id: '27', name: 'Kabo', role: 'Mentee', info: 'Design Intern', photo: 'https://i.pravatar.cc/150?u=m11', groupId: 'mentees' },
        { id: '28', name: 'Thabo', role: 'Mentee', info: 'CS Student', photo: 'https://i.pravatar.cc/150?u=m12', groupId: 'mentees' },
      ],
      groups: [
        { id: 'family', name: 'Family', icon: 'Users', color: 'blue' },
        { id: 'friends', name: 'Friends', icon: 'Heart', color: 'rose' },
        { id: 'colleagues', name: 'Colleagues', icon: 'Briefcase', color: 'amber' },
        { id: 'mentees', name: 'Mentees', icon: 'GraduationCap', color: 'emerald' },
      ],
      relationships: [
        // Gen 1 Partner
        { fromId: '1', toId: '2', type: 'partner' },
        
        // Gen 1 to Gen 2
        { fromId: '1', toId: '3', type: 'parent' },
        { fromId: '2', toId: '3', type: 'parent' },
        { fromId: '1', toId: '4', type: 'parent' },
        { fromId: '2', toId: '4', type: 'parent' },
        { fromId: '1', toId: '12', type: 'parent' },
        { fromId: '2', toId: '12', type: 'parent' },
        { fromId: '1', toId: '13', type: 'parent' },
        { fromId: '2', toId: '13', type: 'parent' },
        { fromId: '1', toId: '14', type: 'parent' },
        { fromId: '2', toId: '14', type: 'parent' },
        
        // Gen 2 Partner
        { fromId: '4', toId: '5', type: 'partner' },
        { fromId: '12', toId: '15', type: 'partner' },
        
        // Gen 2 to Gen 3 (Aifheli & Fulufhelo's kids)
        { fromId: '12', toId: '16', type: 'parent' },
        { fromId: '15', toId: '16', type: 'parent' },
        { fromId: '12', toId: '17', type: 'parent' },
        { fromId: '15', toId: '17', type: 'parent' },
        
        // Gen 2 to Gen 3 (Livhuwani & Edith's kids)
        { fromId: '4', toId: '6', type: 'parent' },
        { fromId: '5', toId: '6', type: 'parent' },
        { fromId: '4', toId: '8', type: 'parent' },
        { fromId: '5', toId: '8', type: 'parent' },
        { fromId: '4', toId: '9', type: 'parent' },
        { fromId: '5', toId: '9', type: 'parent' },
        
        // Gen 3 Partner (Petrus & Risuna)
        { fromId: '6', toId: '7', type: 'partner' },
        
        // Gen 3 to Gen 4
        { fromId: '6', toId: '10', type: 'parent' },
        { fromId: '7', toId: '10', type: 'parent' },
        { fromId: '6', toId: '11', type: 'parent' },
        { fromId: '7', toId: '11', type: 'parent' },
        
        // Gen 4 Partner
        { fromId: '11', toId: '18', type: 'partner' },
        
        // Gen 4 to Gen 5 (Tshililo & Merium)
        { fromId: '11', toId: '19', type: 'parent' },
        { fromId: '18', toId: '19', type: 'parent' },
      ],
      searchQuery: '',
      isDarkMode: true,
      modalConfig: { isOpen: false, type: null, data: {} },

      // Actions
      openModal: (type, data = {}) => set({ modalConfig: { isOpen: true, type, data } }),
      closeModal: () => set({ modalConfig: { isOpen: false, type: null, data: {} } }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      addPerson: (person) => set((state) => ({ people: [...state.people, { ...person, id: Math.random().toString(36).substr(2, 9) }] })),
      updatePerson: (id, updates) => set((state) => ({
        people: state.people.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
      addRelationship: (rel) => set((state) => ({ relationships: [...state.relationships, rel] })),
      addGroup: (group) => set((state) => ({ 
        groups: [...state.groups, { ...group, id: group.name.toLowerCase().replace(/\s+/g, '-') }] 
      })),
      deletePerson: (id) => set((state) => ({
        people: state.people.filter(p => p.id !== id),
        relationships: state.relationships.filter(r => r.fromId !== id && r.toId !== id)
      })),
      addNote: (personId, content) => set((state) => ({
        people: state.people.map(p => 
          p.id === personId 
            ? { ...p, notes: [{ id: Date.now(), content, date: new Date().toISOString() }, ...(p.notes || [])] } 
            : p
        )
      })),
      deleteNote: (personId, noteId) => set((state) => ({
        people: state.people.map(p => 
          p.id === personId 
            ? { ...p, notes: (p.notes || []).filter(n => n.id !== noteId) } 
            : p
        )
      })),
    }),
    {
      name: 'relationship-manager-storage',
    }
  )
)
