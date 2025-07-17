// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AsideButton from '../components/AsideButton';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen text-white overflow-x-hidden">
      <Header />
      
      {/* ✅ flex-1로 main이 남은 높이 모두 차지하게 함 */}
      <main className="flex-1 bg-[#222222]">
        <Outlet />
      </main>

      <Footer />
      <AsideButton />
    </div>
  );
};

export default MainLayout;
