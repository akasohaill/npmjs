import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import PackagePage from './pages/PackagePage'
import VersionPage from './pages/VersionPage'
import Footer from './components/Footer'
import NavBar from './components/NavBar'


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<SearchPage />} />
        <Route path="/package/:name" element={<PackagePage />} />
        <Route path="/package/:name/:version" element={<VersionPage />} />
      </Routes>
    </Router>
    <Footer/>
    </>
  )
}

export default App
