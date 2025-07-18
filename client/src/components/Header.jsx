import { Link } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import { Search, ShoppingCart, LogIn, ShoppingBag } from "lucide-react";
import { useAuthModal } from "../store/authModalContext";
import { useAuth } from "../context/AuthContext";

const HeaderContainer = styled.div`
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

// 드롭다운 메뉴
const Dropdown = styled.div`
  position: absolute;
  top: 38px;
  right: 0;
  background-color: #373737;
  padding: 12px 20px;
  width: 95px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  z-index: 10;

  p {
    margin: 3px 0 7px 0;
    color: #E2E2E2;
    font-size: 14px;
  }

  hr {
    margin: 0;
    border: 0.5px solid #303030;
  }

  a {
    text-decoration: none;
    color: #E2E2E2;
    margin-bottom: 8px;
    margin-top: 12px;
    font-size: 15px;
  }

  .logout {
    color: #e4cfa1;
    cursor: pointer;

  }
`;

const ProfileIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-top: 7px;
`;

const Header = () => {
  const { openAuthModal } = useAuthModal();
  const { user, setUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowDropdown(false);
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <LogoLink to="/">
          <img src="/icons/Vinaria.svg" alt="Vinaria Logo" />
        </LogoLink>

        <Nav>
          <Link to="/list">LP 음원/앨범</Link>
          <Link to="/subscribe">감상 패스</Link>
          <Link to="/mypage">내 LP 보관함</Link>
        </Nav>

        <Icons>
          <Search />
          <ShoppingBag size={25} />

          {user ? (
            <div style={{ position: "relative" }}>
              <ProfileIcon
                src="/icons/user.svg"
                alt="User"
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <Dropdown>
                  <p>{user.name}님</p>
                  <hr />
                  <Link to="/mypage">마이 페이지</Link>
                  <p className="logout"  style={{ fontSize: "15px" }} onClick={handleLogout}>
                    로그아웃
                  </p>
                </Dropdown>
              )}
            </div>
          ) : (
            <LogIn onClick={openAuthModal} />
          )}
        </Icons>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
