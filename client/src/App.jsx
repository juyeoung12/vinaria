// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ListPage from "./pages/ListPage";
import Upload from './pages/Upload'
import Marketplace from './pages/Marketplace'
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
<BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<ListPage />} />
            {/* 다른 페이지 라우팅 추가 */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
