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
              <Route path='/' element={<Home />} />
              <Route path="/today" element={<Today />} />
              <Route path="/week" element={<Week />} />
              <Route path="/month" element={<Month />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AccountInfo>
      </CategoryProvider>
    </TaskProvider>

  )
}

export default App;
