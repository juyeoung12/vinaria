import React from "react";
import styled from "styled-components";
import { Search, ShoppingCart, LogIn } from "lucide-react";

// 전체 헤더
const HeaderWrapper = styled.header`
  width: 100%;
  max-width: 1440px;
  height: 80px;
  background-color: #1a1a1a;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  box-sizing: border-box;
`;

// 로고 링크
const LogoLink = styled.a`
  display: flex;
  align-items: center;

  img {
    height: 32px;
  }
`;

// 네비게이션 메뉴
const Nav = styled.nav`
  display: flex;
  gap: 74px;
  font-size: 0.875rem;
  font-weight: 500;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      color: #d1d5db; /* text-gray-300 */
    }
  }
`;

// 오른쪽 아이콘 영역
const Icons = styled.div`
  display: flex;
  gap: 22px;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #d1d5db; /* text-gray-300 */
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      {/* 로고 */}
      <LogoLink href="/">
        <img src="/icons/Vinaria.svg" alt="Vinaria Logo" />
      </LogoLink>

      {/* 네비게이션 */}
      <Nav>
        <a href="#">LP 음원/판매</a>
        <a href="#">LP 업로드</a>
        <a href="#">감상 패스</a>
        <a href="#">내 LP 보관함</a>
      </Nav>

      {/* 아이콘 */}
      <Icons>
        <Search />
        <ShoppingCart />
        <LogIn />
      </Icons>
    </HeaderWrapper>
  );
};

export default Header;
