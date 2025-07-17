import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { Search, ShoppingCart, LogIn } from "lucide-react";

// ✅ 바깥 헤더 컨테이너 (배경용)
const HeaderContainer = styled.div`
  width: 100%;
  background-color: #222222;
  display: flex;
  justify-content: center;
`;

// ✅ 내부 헤더 내용 (1440px 중앙 정렬)
const HeaderWrapper = styled.header`
  width: 100%;
  max-width: 1440px;
  height: 100px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
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
  font-size: 19px;
  font-weight: 500;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      color: #d1d5db;
    }
  }
`;

// 오른쪽 아이콘 영역
const Icons = styled.div`
  display: flex;
  gap: 22px;
  align-items: center;

  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #d1d5db;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        {/* 로고 */}
        <LogoLink href="/">
          <img src="/icons/Vinaria.svg" alt="Vinaria Logo" />
        </LogoLink>

        {/* 네비게이션 */}
        <Nav>
          <Link to="/list">LP 음원/앨범</Link>
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
    </HeaderContainer>
  );
};

export default Header;
