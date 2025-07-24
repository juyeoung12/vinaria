// src/layouts/MainLayout.jsx

import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AsideButton from '../components/AsideButton';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen text-white overflow-x-hidden">
      {/* ✅ 고정된 헤더 */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* ✅ 헤더 높이만큼 여백 추가 (예: 80px) */}
      <div className="pt-[80px] flex-1 bg-[#222222]">
        <Outlet />
      </div>

      <Footer />
      <AsideButton />
    </div>
  );
};

export default MainLayout;
