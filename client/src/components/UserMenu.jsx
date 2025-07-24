// components/UserMenu.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserIcon = styled(User)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #d1d5db;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 38px;
  right: 0;
  background-color: #373737;
  padding: 12px 20px;
  width: 80px;
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
    margin: 10px 0 5px;
    font-size: 15px;
  }

  .logout {
    color: #e4cfa1;
    cursor: pointer;
    margin-top: 5px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  height: 25px;
`;

const UserMenu = () => {
  const { user, setUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(prev => !prev);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowDropdown(false);
  };

    return (
    <Wrapper>
      <UserIcon onClick={toggleDropdown} />
      {showDropdown && (
        <Dropdown>
          <p>{user?.name}님</p>
          <hr />
          {/* ✅ 관리자일 경우에만 보이도록 조건부 렌더링 */}
          {user?.role === 'admin' && (
            <Link to="/admin">관리자</Link>
          )}
          <Link to="/mypage">마이 페이지</Link>
          <p className="logout" onClick={handleLogout}>로그아웃</p>
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default UserMenu;
