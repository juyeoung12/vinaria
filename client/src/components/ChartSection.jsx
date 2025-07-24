import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GlobalStyle = createGlobalStyle`
  .slick-slide {
    padding: 0 !important;
    margin-right: 0px !important;
  }

  .slick-track {
    gap: 8px !important;
    display: flex !important;
  }
`;

const SliderControls = styled.div`
  position: absolute;
  top: -34px;
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

const Outer = styled.div`
  width: 100%;
  background-color: #222;
  display: flex;
  justify-content: center;
  height: 90vh;
`;

const Section = styled.section`
  width: 100%;
  max-width: 1440px;
  padding: 40px 0 0 0;
  background-color: #222;
  display: flex;
  justify-content: center;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
  height: 100%;
  padding: 0 0 30px 0;
  box-sizing: border-box;
  margin-top: 100px;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 4px;

  span {
    color: #e4cfa1;
    margin-left: 6px;
    font-size: 35px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #aaa;
  margin-bottom: 40px;
`;

const TabWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin: 25px 0;
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
  background: #222222;
  height: ${(props) => (props.$tab === "music" ? "250px" : "290px")};
  transition: background-color 0.3s;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #303030;

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
    width: 47px;
    height: 47px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .rank {
    position: absolute;
    top: -23px;
    left: 12px;
    font-size: 16px;
    color: #e2e2e2;
    background-color: #222222e0;
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
  overflow: visible;
`;

const CardWrapper = styled.div`
  width: 250px !important;
  flex: 0 0 auto;
`;

const repeatToFill = (arr, targetLength) => {
  if (arr.length === 0) return [];
  const result = [];
  while (result.length < targetLength) {
    result.push(...arr);
  }
  return result.slice(0, targetLength);
};

const ChartSection = () => {
  const [tab, setTab] = useState("music");
  const [lpData, setLpData] = useState([]);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/lps")
      .then((res) => setLpData(res.data))
      .catch((err) => console.error("데이터 로딩 실패", err));
  }, []);

  const sorted = [...lpData]
    .filter((item) => item.showInChart === true)
    .sort((a, b) => {
      return tab === "music" ? a.rank_audio - b.rank_audio : a.rank_sale - b.rank_sale;
    })
    .slice(0, 10);

  const filled = repeatToFill(sorted, 10);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
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
              앨범
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
                  <Card $tab={tab} onClick={() => navigate(`/lp/${item.id}?type=${tab}`)}>
                    <div className="image-container">
                      <img src={item.thumbnail} alt={item.title} />
                      <img src="/icons/play.svg" alt="play" className="play-icon" />
                      <p className="rank">{index + 1}</p>
                    </div>
                    <p className="artist">{item.artist}</p>
                    <h4>{tab === "purchase" ? item.album : item.title}</h4>
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
