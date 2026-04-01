import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home.jsx'
import Today from './Today.jsx'
import Week from './Week.jsx'
import Month from './Month.jsx'
import Settings from './Settings.jsx'
import {useEffect} from 'react'
import {applyTheme, lightTheme, darkTheme} from './themeSettings.js'
import { CategoryProvider } from './components/categoryHelper.jsx'
import { AccountInfo } from './components/storeAccountInfo.jsx'
import { TaskProvider } from './TaskContext.jsx'
import Login from './Login.jsx'
import { useAccount } from './components/storeAccountInfo.jsx'

function ProtectedRoute({ element }) {
    const token = localStorage.getItem('token')
    return token ? element : <Navigate to="/login" replace />
}


function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme == 'dark') {
      applyTheme(darkTheme)
    }
    else if (savedTheme == 'light') {
      applyTheme(lightTheme)
    }
  }, [])
  return (
    <TaskProvider>
      <CategoryProvider>
        <AccountInfo>
          <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<ProtectedRoute element={<Home />} />} />
              <Route path="/today" element={<ProtectedRoute element={<Today />} />} />
              <Route path="/week" element={<ProtectedRoute element={<Week />} />} />
              <Route path="/month" element={<ProtectedRoute element={<Month />} />} />
              <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AccountInfo>
      </CategoryProvider>
    </TaskProvider>

  )
}

export default App;
