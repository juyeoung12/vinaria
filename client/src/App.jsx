// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListPage from './pages/ListPage';
import LpDetailPage from './pages/LpDetailPage';
import MainLayout from './layouts/MainLayout';
import AuthModal from './components/AuthModal';
import { AuthModalProvider } from "./store/authModalContext.jsx";
import { AuthProvider } from "./context/AuthContext";
import MyPage from './pages/Mypage.jsx';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthModalProvider>
          <AuthModal />
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/lp/:id" element={<LpDetailPage />} />
              <Route path="/mypage" element={<MyPage />} />
            </Route>
            
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </AuthModalProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
