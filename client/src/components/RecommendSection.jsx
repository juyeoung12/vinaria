import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";

const Section = styled.section`
  color: white;
  height: 100vh; /* ✅ 뷰포트 높이 전체 */
  padding: 0;
  position: relative;
  overflow: hidden;
  background-image: url("/images/home3.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  scroll-snap-align: start;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 6rem; /* ✅ 여백 여기서 */
  gap: 150px;
  box-sizing: border-box;
  padding-top: 130px;
`;

const Title = styled.h2`
  font-size: 60px;
  font-weight: 600;
  margin: 0;
  color: #E4CFA1;
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: 22px;
  color: #E2E2E2;
  line-height: 1.6;
  margin: 0;
`;

const CardButton = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 65px;
  border: 3px solid #ffffff;
  background: #22222294;
  color: white;
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;
  width: 1000PX;
  height: 500PX;

  &:hover {
    background: #22222294;
    color: #ffffff;
  }

  img {
    width: 130px;
    height: 85px;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: translateX(25px);
  }
`;


const RecommendSection = () => {
  const navigate = useNavigate();

  return (
    <Section>
      <Content>
          <CardButton onClick={() => navigate("/list")}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '45px',
                textAlign: 'left'
              }}
            >
              <Title>
                Vinaria<br />
                RECOMMENDS
              </Title>
              <Description>
                지금 나만의 LP를 고르러 가볼까요?<br />
                <b>Vinaria</b>의 리스트에서 직접 골라보세요
              </Description>
            </div>
            <img src="/arrow.png" alt="arrow" className="arrow-icon" />
          </CardButton>
      </Content>
    </Section>
  );
};

export default RecommendSection;
