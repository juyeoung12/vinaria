// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Marketplace from './pages/Marketplace'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/marketplace" element={<Marketplace />} />
        {/* 필요하면 로그인/회원가입, 상세 페이지도 추가 */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
