import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import GroupView from './pages/GroupView'
import FamilyTree from './pages/FamilyTree'
import PersonProfile from './pages/PersonProfile'
import FullDiary from './pages/FullDiary'

import PublicProfile from './pages/PublicProfile'
import AllClusters from './pages/AllClusters'

function App() {
  return (
    <Routes>
      <Route path="/share/:id" element={<PublicProfile />} />
      <Route path="/*" element={
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clusters" element={<AllClusters />} />
            <Route path="/group/:groupId" element={<GroupView />} />
            <Route path="/family-tree" element={<FamilyTree />} />
            <Route path="/person/:id" element={<PersonProfile />} />
            <Route path="/person/:id/diary" element={<FullDiary />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  )
}

export default App
