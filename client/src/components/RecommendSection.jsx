import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";

const Section = styled.section`
  color: white;
  padding: 6rem;
  position: relative;
  overflow: hidden;
  height: 800px;
  background-image: url("/images/home3.jpg");
  object-fit: cover;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 150px;
`;

const Title = styled.h2`
  font-size: 50px;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #E4CFA1;
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: 18px;
  color: #E2E2E2;
  line-height: 1.6;
  margin: 0;
`;

const Flex = styled.div`
  display: flex;
  gap: 65px;
  flex-direction: column;
`;

const CardButton = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.25rem 2rem;
  border: 3px solid #E2E2E2;
  background: #22222294;
  color: white;
  font-size: 22px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: none;
  width: 540px;
  height: 221px;
  gap: 1rem;

  // 기본 호버 효과 제거
  &:hover {
    background: #22222294;
    color: #ffffff;
  }

  // 화살표에만 호버 효과 적용
  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(10px);
  }
`;


const RecommendSection = () => {
  const navigate = useNavigate();

  return (
    <Section>
      <Content>
        <div style={{display: 'flex', flexDirection: 'column', gap: '33px'}}>
          <Title>
            Vinaria<br/>
            RECOMMENDS
          </Title>
          <Description>
            지금 나만의 LP를 고르러 가볼까요?<br/>
            Vinaria의 리스트에서 직접 골라보세요
          </Description>
        </div>

        <Flex>
          <CardButton onClick={() => navigate("/marketplace")}>
            <span>들을 LP 음원을<br/>
            찾고 있다면?</span>
            <svg
              width="59"
              height="42"
              viewBox="0 0 59 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 21.6977H56M56 21.6977L41.2442 3M56 21.6977L41.2442 39"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="square"
              />
            </svg>
          </CardButton>
          <CardButton onClick={() => navigate("/marketplace")}>
            <span>소장할 LP를<br/>
               찾고 있다면?</span>
            <svg
              width="59"
              height="42"
              viewBox="0 0 59 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 21.6977H56M56 21.6977L41.2442 3M56 21.6977L41.2442 39"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="square"
              />
            </svg>
          </CardButton>
        </Flex>
      </Content>
    </Section>
  );
};

export default RecommendSection;
