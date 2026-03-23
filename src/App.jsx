import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import GroupView from './pages/GroupView'
import FamilyTree from './pages/FamilyTree'
import PersonProfile from './pages/PersonProfile'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/group/:groupId" element={<GroupView />} />
        <Route path="/family-tree" element={<FamilyTree />} />
        <Route path="/person/:id" element={<PersonProfile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  )
}

export default App
