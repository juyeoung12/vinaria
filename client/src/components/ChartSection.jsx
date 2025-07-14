import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Outer = styled.div`
  width: 100%;
  background-color: #222;
  display: flex;
  justify-content: center;
`;

const Section = styled.section`
  width: 100%;
  max-width: 1920px;
  padding: 80px 0;
  background-color: #222;
  display: flex;
  justify-content: center;
  height: 850px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
  span {
    color: #e4cfa1;
    margin-left: 6px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 30px;
`;

const TabWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
`;

const Tab = styled.button`
  font-size: 16px;
  font-weight: 600;
  padding: 8px 24px;
  border-radius: 6px;
  background-color: ${(props) => (props.$active ? "#e4cfa1" : "transparent")};
  color: ${(props) => (props.$active ? "#222" : "#fff")};
  border: 1px solid #e4cfa1;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #e4cfa1;
    color: #222;
  }
`;

const Card = styled.div`
  background: #2a2a2a;
  padding: 12px;
  width: 180px;
  border-radius: 12px;
  margin: 0 8px;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  .rank {
    font-size: 12px;
    color: #888;
    margin-bottom: 2px;
  }

  h4 {
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }

  p.artist {
    font-size: 12px;
    color: #aaa;
    margin-top: 4px;
  }

  .price {
    font-size: 13px;
    font-weight: 600;
    color: #e4cfa1;
    margin-top: 4px;
  }
`;

const ChartSection = () => {
  const [tab, setTab] = useState("music");
  const [lpData, setLpData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/lps")
      .then((res) => setLpData(res.data))
      .catch((err) => console.error("데이터 로딩 실패", err));
  }, []);

  const sorted = [...lpData]
    .filter((item) => item.showInChart)
    .sort((a, b) => {
      if (tab === "music") return a.rank_audio - b.rank_audio;
      return a.rank_sale - b.rank_sale;
    })
    .slice(0, 10);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
  };

  return (
    <Outer>
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
            <Tab $active={tab === "purchase"} onClick={() => setTab("purchase")}>
              구매
            </Tab>
          </TabWrapper>

          <Slider {...sliderSettings}>
            {sorted.map((item, index) => (
              <Card key={item._id}>
                <p className="rank">{index + 1}</p>
                <img src={item.thumbnail} alt={item.title} />
                <p className="artist">{item.artist}</p>
                <h4>{item.title}</h4>
                {tab === "purchase" && (
                  <p className="price">₩ {item.price.toLocaleString()}</p>
                )}
              </Card>
            ))}
          </Slider>
        </Container>
      </Section>
    </Outer>
  );
};

export default ChartSection;
