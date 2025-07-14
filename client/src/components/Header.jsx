import React from "react";
import { Search, ShoppingCart, LogIn } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full max-w-[1920px] h-[80px] bg-[#1a1a1a] text-white px-[86px] flex items-center justify-between mx-auto box-border">
      {/* 로고 */}
        <a href="/" className="flex items-center">
          <img
            src="/icons/Vinaria.svg"
            alt="Vinaria Logo" 
            className="h-[32px]"
          />
        </a>

      {/* 네비게이션 */}
      <nav className="flex gap-[74px] text-sm font-medium">
        <a href="#" className="hover:text-gray-300">LP 음원/판매</a>
        <a href="#" className="hover:text-gray-300">LP 업로드</a>
        <a href="#" className="hover:text-gray-300">감상 패스</a>
        <a href="#" className="hover:text-gray-300">내 LP 보관함</a>
      </nav>

      {/* 아이콘 영역 */}
      <div className="flex gap-[22px] items-center">
        <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <LogIn className="w-5 h-5 cursor-pointer hover:text-gray-300" />
      </div>
    </header>
  );
};

export default Header;
