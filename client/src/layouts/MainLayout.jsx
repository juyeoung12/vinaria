// src/layouts/MainLayout.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import AsideButton from '../components/AsideButton';

const MainLayout = ({ children }) => {
  return (
    <div className="w-screen min-h-screen bg-[#1e1e1e] text-white overflow-x-hidden">
      <Header />

      <main>
        {children}
      </main>

      <Footer />

      <AsideButton />
    </div>
  );
};

export default MainLayout;
