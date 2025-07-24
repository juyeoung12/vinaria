import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { Search, LogIn, ShoppingBag, User } from "lucide-react";
import { useAuthModal } from "../store/authModalContext";
import { useAuth } from "../context/AuthContext";
import UserMenu from './UserMenu'; // ✅ UserMenu 추가

const HeaderContainer = styled.div`
  position: fixed;         // ✅ 화면 상단 고정
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  background-color: #222222;
  display: flex;
  justify-content: center;
`;

const HeaderWrapper = styled.header`
  width: 100%;
  max-width: 1440px;
  height: 90px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  box-sizing: border-box;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;

  img {
    height: 32px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 74px;
  font-size: 17px;
  font-weight: 500;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      color: #d1d5db;
    }
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 22px;
  align-items: center;

  svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #d1d5db;
    }
  }

  position: relative;
`;

const UserIcon = styled(User)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #d1d5db;
  }
`;

const Header = () => {
  const { openAuthModal } = useAuthModal();
  const { user } = useAuth();

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <LogoLink to="/">
          <img src="/icons/Vinaria.svg" alt="Vinaria Logo" />
        </LogoLink>

        <Nav>
          <Link to="/list">LP 음원/앨범</Link>
          <Link to="/subscribe">감상 패스</Link>
          <Link to="/mypage">마이페이지</Link>
        </Nav>

        <Icons>
          <Search />
          <ShoppingBag size={25} />
          {user ? <UserMenu /> : <LogIn onClick={openAuthModal} />}
        </Icons>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
