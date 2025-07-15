import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .slick-slide {
    margin-right: 5px;
    min-width: 250px !important; /* 카드 크기 강제 */
  }

  .slick-list {
    margin-right: -5px;
    overflow: hidden; /* 🔒 줄바꿈 방지 */
  }

  .slick-track {
    display: flex !important;
    flex-wrap: nowrap !important;
  }
`;

// 🔽 커스텀 화살표 상단 배치용 Wrapper
const SliderControls = styled.div`
  position: absolute;
  top: -34px;          // 🔼 위로 빠지지 않도록 양수로 변경
  right: 0;
  display: flex;
  gap: 12px;
  z-index: 10;
`;

const ArrowWrapper = styled.div`
  cursor: pointer;

  img {
    width: 26px;
    height: 16px;
  }
`;

// 🔽 기본 스타일
const Outer = styled.div`
  width: 100%;
  background-color: #222;
  display: flex;
  justify-content: center;
`;

const Section = styled.section`
  width: 100%;
  max-width: 1440px;
  padding: 40px 0;              // 🔽 기존보다 패딩 줄이기
  background-color: #222;
  display: flex;
  justify-content: center;
  height: auto;                 // 🔽 고정 height 제거 (또는 더 작게 설정)
  min-height: 750px;    
`;

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
  height: 100%;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 4px;
  span {
    color: #e4cfa1;
    margin-left: 6px;
    font-size: 25px;
  }
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #aaa;
  margin-bottom: 40px;
`;

const TabWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  position: relative;
  align-items: center;
`;

const Tab = styled.button`
  font-size: 22px;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  color: ${(props) => (props.$active ? "#E2E2E2" : "#8C8C8C")};
  background: none;
  border: none;
  padding-bottom: 8px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #e2e2e2;
  }
`;

const Divider = styled.span`
  color: #373737;
  font-size: 30px;
  font-weight: 300;
  user-select: none;
`;

const Card = styled.div`
  padding: 33px 12px;
  width: 280px;
  position: relative;
  background: #222222;  // ✅ 기본 배경 고정
  height: ${(props) => (props.tab === "music" ? "250px" : "290px")};
  transition: background-color 0.3s;
  text-align: left;

  &:hover {
    background: #303030;  // ✅ 호버 시 배경 통일

    .play-icon {
      opacity: 1;
    }
  }

  .image-container {
    position: relative;
    width: 265px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    margin-bottom: 10px;
    
  }

  img {
    width: 240px;
    height: 180px;
    object-fit: cover;
    margin-top: 16px;
  }

  .play-icon {
    position: absolute;
    bottom: -10px;
    right: 31px;
    width: 42px;
    height: 42px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .rank {
    position: absolute;
    top: -23px;
    left: 13px;
    font-size: 16px;
    color: #888;
    background-color: #222222b0;
    padding: 9px 18px;
    border-radius: 0 0 11px 0;
  }

  h4 {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin: 0;
    margin-left: 12px;
  }

  .artist {
    font-size: 15px;
    color: #aaa;
    margin-top: 35px;
    margin-left: 12px;
  }

  .price {
    font-size: 21px;
    font-weight: 600;
    color: #e4cfa1;
    margin: 0;
    margin-top: 13px;
    margin-left: 12px;
  }
`;


const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 45px;
  overflow: visible;  // ✅ 넘치는 카드 숨기기
`;


const CardWrapper = styled.div`
  width: 250px !important;
  margin-right: 0px;

  &:last-child {
    margin-right: 0;
  }
`;

// 🔽 데이터 반복 함수
const repeatToFill = (arr, targetLength) => {
  if (arr.length === 0) return [];
  const result = [];
  while (result.length < targetLength) {
    result.push(...arr);
  }
  return result.slice(0, targetLength);
};

// 🔽 컴포넌트 본문
const ChartSection = () => {
  const [tab, setTab] = useState("music");
  const [lpData, setLpData] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/lps")
      .then((res) => {
        console.log("원본 데이터:", res.data);
        setLpData(res.data);
      })
      .catch((err) => console.error("데이터 로딩 실패", err));
  }, []);

  const sorted = [...lpData]
    .filter((item) => item.showInChart === true)
    .sort((a, b) => {
      if (tab === "music") return a.rank_audio - b.rank_audio;
      return a.rank_sale - b.rank_sale;
    })
    .slice(0, 10);

  const filled = repeatToFill(sorted, 10);

  // ✅ 슬라이드 설정: 소수 값으로 일부 카드만 보이게
  const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,  // ✅ 카드 250px 기준 적절한 개수로 보이게
  slidesToScroll: 1,
  arrows: false,
};

  return (
    <Outer>
      <GlobalStyle />
      <Section>
        <Container>
          <Title>
            Vinaria Chart <span>TOP 10</span>
          </Title>
          <Subtitle>
            {tab === "music"
              ? "7월 기준 가장 많이 플레이된 LP 음원"
              : "7월 기준 가장 많이 소장된 LP 앨범"}
          </Subtitle>

          <TabWrapper>
            <Tab $active={tab === "music"} onClick={() => setTab("music")}>
              음원
            </Tab>
            <Divider>|</Divider>
            <Tab $active={tab === "purchase"} onClick={() => setTab("purchase")}>
              구매
            </Tab>
          </TabWrapper>

          {sorted.length === 0 ? (
            <p style={{ color: "#888" }}>차트에 표시할 항목이 없습니다.</p>
          ) : (
            <SliderWrapper>
              <SliderControls>
                <ArrowWrapper onClick={() => sliderRef.current?.slickPrev()}>
                  <img src="/icons/arrow-left.svg" alt="prev" />
                </ArrowWrapper>
                <ArrowWrapper onClick={() => sliderRef.current?.slickNext()}>
                  <img src="/icons/arrow-right.svg" alt="next" />
                </ArrowWrapper>
              </SliderControls>

              <Slider ref={sliderRef} {...sliderSettings}>
                {filled.map((item, index) => (
                  <CardWrapper key={`${item._id}-${index}`}>
                    <Card tab={tab}>
                      <div className="image-container">
                        <img src={item.thumbnail} alt={item.title} />
                        <img src="/icons/play.svg" alt="play" className="play-icon" />
                        <p className="rank">{index + 1}</p>
                      </div>
                      <p className="artist">{item.artist}</p>
                      <h4>{item.title}</h4>
                      {tab === "purchase" && (
                        <p className="price">₩ {item.price.toLocaleString()}</p>
                      )}
                    </Card>
                  </CardWrapper>

                ))}
              </Slider>
            </SliderWrapper>
          )}
        </Container>
      </Section>
    </Outer>
  );
};

export default ChartSection;
