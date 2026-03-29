import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home.jsx'
import Today from './Today.jsx'
import Week from './Week.jsx'
import { TaskProvider } from './TaskContext.jsx'

function App() {
  return (
    <TaskProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/today" element={<Today />} />
        <Route path="/week" element={<Week />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TaskProvider>
  )
}

export default App;
