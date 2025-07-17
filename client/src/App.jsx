// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListPage from './pages/ListPage';
import LpDetailPage from './pages/LpDetailPage';
import Upload from './pages/Upload';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter> {/* ✅ Router는 가장 바깥 */}
      <Routes>
        {/* ✅ MainLayout이 전체 감싸고 Outlet으로 자식들 렌더링 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/lp/:id" element={<LpDetailPage />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
