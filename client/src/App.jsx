// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListPage from './pages/ListPage';
import LpDetailPage from './pages/LpDetailPage';
import Upload from './pages/Upload';
import MainLayout from './layouts/MainLayout';
import AuthModal from './components/AuthModal';
import { AuthModalProvider } from "./store/authModalContext.jsx";
import { AuthProvider } from "./context/AuthContext";
import MyPage from './pages/Mypage.jsx';


function App() {
  return (
    <BrowserRouter> {/* ✅ Router는 가장 바깥 */}
    <AuthProvider>
        <AuthModalProvider>
          {/* <CursorFollower /> */}

          <AuthModal />

          <Routes>
            {/* ✅ MainLayout이 전체 감싸고 Outlet으로 자식들 렌더링 */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/lp/:id" element={<LpDetailPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/upload" element={<Upload />} />
            </Route>
          </Routes>
        </AuthModalProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
