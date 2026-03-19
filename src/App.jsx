import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import AboutPage from './components/AboutPage'
import ProjectPage from './components/ProjectPage'
import AdminPage from './components/AdminPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/*" element={
          <>
            <Nav />
            <Routes>
              <Route path="/"              element={<HomePage />} />
              <Route path="/about"         element={<AboutPage />} />
              <Route path="/project/:id"   element={<ProjectPage />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}
