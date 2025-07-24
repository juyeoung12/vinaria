import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios"; // ✅ 추가


// 데이터
const banners = [
  {
    id: 'lp007',
    genre: "인디",
    label: "The LP Room – July Edition",
    desc: "“지금 가장 많이 회자되고 있는 사운드”",
    image: "/images/home1.jpg",
  },
  {
    id: 'lp008',
    genre: "클래식",
    label: "Timeless Classics",
    desc: "“시대를 초월한 클래식의 깊은 울림”",
    image: "/images/Score.jpg",
  },
  {
    id: 'lp009',
    genre: "재즈",
    label: "Jazz Essentials",
    desc: "“느릿한 그루브, 따뜻하게 흐르는 감성”",
    image: "/images/groove.jpg",
  },
  {
    id: 'lp010',
    genre: "시티팝",
    label: "Retro City Pop Hits",
    desc: "“아날로그 감성 가득한 도심 속 드라이브 사운드”",
    image: "/images/sunset.jpg",
  },
];

// 스타일 정의
const Section = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2d2d2d;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 600px;
  display: flex;
  gap: 5px;
  margin-bottom: 65px;
`;

const LargeBanner = styled.div`
  width: 66.66%;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

    &:hover img {
    transform: scale(1.03);
  }

  .overlay {
    position: absolute;
    inset: 0;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 73px 107px;
    gap: 22px;
    z-index: 2;
  }

  h2 {
    font-size: 36px;
    font-weight: bold;
    margin: 0;
  }

  p {
    font-size: 21px;
    color: #ddd;
    margin: 0;
  }
`;

const SmallBanners = styled.div`
  width: 33.33%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SmallBanner = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

    &:hover img {
    transform: scale(1.03);
  }

  .overlay {
    position: absolute;
    inset: 0;
    color: white;
    display: flex;
    align-items: end;
    padding: 27px 37px;
    font-weight: 600;
    font-size: 18px;
    gap: 12px;
    z-index: 2;
  }
    
`;

const HeroSection = () => {
  const navigate = useNavigate();

  // 🔸 배너 클릭 시 장르 기반 랜덤 LP 조회 후 이동
const handleBannerClick = async (genre) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/lps?genre=${genre}`);
    const list = res.data;

    if (list.length === 0) {
      alert(`'${genre}' 장르의 LP가 없습니다`);
      return;
    }

    const random = list[Math.floor(Math.random() * list.length)];

    console.log("🎯 랜덤 LP:", random);
    navigate(`/lp/${random.id}`); // ✅ 여기 수정
  } catch (err) {
    console.error("랜덤 LP 불러오기 실패:", err);
    alert("서버 오류");
  }
};

  return (
    <Section>
      <Container>
        {/* 왼쪽 큰 배너 */}
        <LargeBanner onClick={() => handleBannerClick(banners[0].genre)}>
          <img src={banners[0].image} alt={banners[0].label} />
          <div className="overlay">
            <h2>{banners[0].label}</h2>
            <p style={{ color: "#e2e2e2" }}>{banners[0].desc}</p>
            <button
              className="btn-secondary"
              style={{
                marginTop: "27px",
                width: "180px",
                height: "59px",
                fontSize: "18px",
              }}
            >
              감상하러 가기
            </button>
          </div>
        </LargeBanner>

        {/* 오른쪽 작은 배너들 */}
        <SmallBanners>
          {banners.slice(1).map((item, i) => (
            <SmallBanner
              key={i}
              onClick={() => handleBannerClick(item.genre)}
            >
              <img src={item.image} alt={item.label} />
              <div className="overlay">
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      margin: "0",
                      fontWeight: "500",
                    }}
                  >
                    {item.genre.toUpperCase()}
                  </p>
                  <h2
                    style={{
                      fontSize: "20px",
                      margin: "0",
                      fontWeight: "700",
                    }}
                  >
                    {item.label}
                  </h2>
                  <span
                    style={{
                      fontSize: "13px",
                      margin: "0",
                      fontWeight: "500",
                      color: "#e2e2e2",
                    }}
                  >
                    {item.desc}
                  </span>
                </div>
              </div>
            </SmallBanner>
          ))}
        </SmallBanners>
      </Container>
    </Section>
  );
};

export default HeroSection;