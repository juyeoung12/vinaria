import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 데이터
const banners = [
  {
    genre: "groove",
    label: "The LP Room – July Edition",
    desc: "“지금 가장 많이 회자되고 있는 사운드”",
    image: "/images/home1.jpg",
  },
  {
    genre: "soul",
    label: "Groove & Soul Vibes",
    desc: "“느릿한 그루브, 따뜻하게 흐르는 감성”",
    image: "/images/home1.jpg",
  },
  {
    genre: "jazz",
    label: "Jazz Essentials",
    desc: "“느릿한 그루브, 따뜻하게 흐르는 감성”",
    image: "/images/home1.jpg",
  },
  {
    genre: "pop",
    label: "Modern Pop Wave",
    desc: "“느릿한 그루브, 따뜻하게 흐르는 감성”",
    image: "/images/home1.jpg",
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

  return (
    <Section>
      <Container>
        {/* 왼쪽 큰 배너 */}
        <LargeBanner onClick={() => navigate(`lp/:id?genre=${banners[0].genre}`)}>
          <img src={banners[0].image} alt={banners[0].label} />
          <div className="overlay">
            <h2>{banners[0].label}</h2>
            <p style={{color: '#e2e2e2'}}>{banners[0].desc}</p>
            <button className="btn-secondary" style={{ marginTop: '27px', width: '180px', height:'59px', fontSize: '18px' }}>감상하러 가기</button>
          </div>
        </LargeBanner>

        {/* 오른쪽 작은 배너들 */}
        <SmallBanners>
          {banners.slice(1).map((item, i) => (
            <SmallBanner key={i} onClick={() => navigate(`lp/:id?genre=${item.genre}`)}>
              <img src={item.image} alt={item.label} />
              <div className="overlay">
                <div>
                    <p style={{ fontSize: '13px', margin: '0', fontWeight: '500', }}>{item.genre.toUpperCase()}</p>
                    <h2 style={{ fontSize: '20px', margin: '0', fontWeight: '700' }}>{item.label}</h2>
                    <span style={{ fontSize: '13px', margin: '0', fontWeight: '500', color: '#e2e2e2' }}>
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
