import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { Pencil, ShoppingBag } from "lucide-react";

const PageWrapper = styled.div`
  background-color: #2d2d2d;
  color: white;
  padding: 110px 40px 0;
  box-sizing: border-box;
  height: 800px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 50px;
`;

const ContentGrid = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 354px;
  gap: 146px;
  height: 400px;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const Card = styled.div`
  background: transparent;
  border-bottom: 1px solid #8C8C8C;;
  padding: 0 0 12px;
  position: relative;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const CardTitle = styled.h3`
  font-size: 25px;
  font-weight: 500;
  color: #e2e2e2;
  margin-bottom: 14px;
  border-bottom: 3px solid #e2e2e2;
  padding: 0 0 11px 15px;
`;

const CardText = styled.p`
  font-size: 15px;
  color: #8C8C8C;
  margin: 5px 0;
  padding: 0 0 0 15px;
`;

const Arrow = styled.img`
  position: absolute;
  right: 0;
  top: 35%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease; /* 부드러운 애니메이션 */

  ${Card}:hover & {
    transform: translate(5px, -50%);
  }
`;

const ProfileCard = styled.div`
  border: 1px solid #8C8C8C;
  padding: 32px 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Border = styled.div`
  width: 95px;
  height: 95px;
  border-radius: 50%;
  border: 1px solid #5a84e1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const UserIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const UserRole = styled.span`
  font-size: 15px;
  color: #8C8C8C;
  margin-bottom: 4px;
`;

const Username = styled.p`
  font-size: 25px;
  font-weight: 500;
  margin: 0;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 40px;

  .icon-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 15px;
    color: #E2E2E2;
    cursor: pointer;
    gap: 10px;

    svg {
      margin-bottom: 4px;
      color: #E2E2E2;
    }
  }
`;

const MyPage = () => {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <PageWrapper>
      <Title>마이페이지</Title>

      <ContentGrid>
        {/* Left Side */}
        <LeftBox>
          <Card>
            <CardTitle>결제내역</CardTitle>
            <CardText>주문 내역이 없습니다</CardText>
            <Arrow src="/icons/more.svg" alt="arrow" />
          </Card>

          <Card>
            <CardTitle>등록한 음원 · LP</CardTitle>
            <CardText>주문 내역이 없습니다</CardText>
            <Arrow src="/icons/more.svg" alt="arrow" />
          </Card>
        </LeftBox>

        {/* Right Side */}
        <ProfileCard>
            <Border>
                <UserIcon src="/icons/user.svg" alt="user" />
            </Border>
          <UserRole>[신규회원]</UserRole>
          <Username>{user?.name}님</Username>

          <ProfileActions>
            <div className="icon-label">
              <Pencil size={47} />
              정보수정
            </div>
            <div className="icon-label">
              <ShoppingBag size={47} />
              장바구니
            </div>
          </ProfileActions>
        </ProfileCard>
      </ContentGrid>
    </PageWrapper>
  );
};

export default MyPage;
