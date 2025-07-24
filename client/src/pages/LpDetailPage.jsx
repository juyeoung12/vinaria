import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #2d2d2d;
  color: #E2E2E2;
  min-height: 100vh;
  box-sizing: border-box;
`;

const Top = styled.div`
  display: flex;
  gap: 200px;
  margin-bottom: 60px;
  background: ${({ $bg }) => `url(${$bg}) no-repeat center top`};
  background-size: cover;
  padding: 70px 240px 60px;
  height: 600px;
  align-items: center;
`;

const AlbumImg = styled.img`
  width: 550px;
  height: 350px;
  object-fit: cover;
  border-radius: 8px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Edition = styled.h3`
  color: #E2E2E2;
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: 400;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 7px;
  color: #E2E2E2;
  margin-top: 14px;

`;

  const SubInfo = styled.div`
    font-size: 14px;
    color: #8c8c8c;
  `;

const Price = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 22px;
  color: #E2E2E2;
`;

const Shipping = styled.div`
  font-size: 14px;
  color: #8c8c8c;
  margin-bottom: 29px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 12px;
`;

const PrimaryButton = styled.button`
  background-color: white;
  color: black;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 4px;
`;

const SecondaryButton = styled.button`
  border: 1px solid white;
  background: transparent;
  color: white;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 4px;
`;

const Section = styled.div`
  margin-bottom: 48px;
`;

const SectionTitle = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Text = styled.p`
  color: #e2e2e2;
  font-size: 18px;
  line-height: 1.8;
  white-space: pre-line;
`;

const Tracklist = styled.div`
  color: #e2e2e2;
  border-radius: 6px;
  font-size: 15px;
  line-height: 1.8;
  white-space: pre-wrap;
`;

const SideTitle = styled.span`
  display: block;
  font-size: 21px;
  font-weight: bold;
  margin: 14px 0;
`;
const TrackBlock = styled.div`
  margin-bottom: 18px;
  white-space: pre-wrap;
  font-size: 17px;
`;

const LpDetailPage = () => {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const type = query.get("type");
  const [lp, setLp] = useState(null);

  useEffect(() => {
    const fetchLp = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/lps/${id}`);
    setLp(res.data);
  } catch (err) {
    console.error("❌ LP 데이터 로드 실패:", err);
  }
};
    fetchLp();
  }, [id]);

  if (!lp) return <Wrapper>로딩 중...</Wrapper>;

  return (
    <Wrapper>
      <Top $bg={lp.detailBg || "/images/lp-bg.jpg"}>
        <AlbumImg src={lp.detailImg || lp.thumbnail} alt={lp.title} />
        <Info>
          <Edition>[{lp.genre}]</Edition>
          <Title>{lp.artist} LP - {lp.title}</Title>
          <SubInfo>
            {new Date(lp.releaseDate).getFullYear()} • {lp.album.replace(lp.title, '').replace(/[\[\]]/g, '')} • 블랙 12인치 LP • {lp.edition}
          </SubInfo>
          <Price>{lp.price.toLocaleString()}원</Price>
          <Shipping>
            배송비&nbsp;{lp.shipping.toLocaleString()}원<br />
            <span style={{ fontSize: "13px"}}>
              (제주 3,000원, 제주 외 도서 산간 5,000원 추가)
            </span>
          </Shipping>
          <Buttons>
            {lp.showPurchaseButton && (
              <button className="btn-primary">구매하기</button>
            )}
            {lp.showAudioButton && (
              <button className="btn-secondary">장바구니 담기</button>
            )}
          </Buttons>
        </Info>
      </Top>
      <div style={{ padding: '30px 240px 50px'}}>
        <Section>
          <SectionTitle>[예약 판매]</SectionTitle>
          <Text><span style={{ fontSize: '20px'}}>{lp.artist} LP – {lp.title}</span><br></br>
          :블랙 12인치 LP · 한정판</Text>
        </Section>

        <Section>
          <SectionTitle>배송 일정</SectionTitle>
          <Text>2025년 8월 중순 발매 이후 순차 배송</Text>
        </Section>

        <Section>
          <SectionTitle>안내 사항</SectionTitle>
          <Text>{lp.notice}</Text>
        </Section>

        <Section>
            <SectionTitle>트랙리스트</SectionTitle>
            <Tracklist>
              {(() => {
                const lines = lp.trackInfo.split("\n");
                const elements = [];
                let currentTrack = [];

                lines.forEach((line, index) => {
                  const trimmed = line.trim();

                  if (trimmed === "Side A" || trimmed === "Side B") {
                    // 이전 트랙 블록 추가
                    if (currentTrack.length > 0) {
                      elements.push(
                        <TrackBlock key={`track-${index}`}>
                          {currentTrack.map((l, i) => (
                            <div key={i}>{l}</div>
                          ))}
                        </TrackBlock>
                      );
                      currentTrack = [];
                    }

                    elements.push(
                      <SideTitle key={`side-${index}`}>{trimmed}</SideTitle>
                    );
                  } else if (trimmed === "") {
                    // 빈 줄 => 현재 트랙 끝
                    if (currentTrack.length > 0) {
                      elements.push(
                        <TrackBlock key={`track-${index}`}>
                          {currentTrack.map((l, i) => (
                            <div key={i}>{l}</div>
                          ))}
                        </TrackBlock>
                      );
                      currentTrack = [];
                    }
                  } else {
                    currentTrack.push(trimmed);
                  }
                });

                // 마지막 트랙 블록 추가
                if (currentTrack.length > 0) {
                  elements.push(
                    <TrackBlock key={`track-last`}>
                      {currentTrack.map((l, i) => (
                        <div key={i}>{l}</div>
                      ))}
                    </TrackBlock>
                  );
                }

                return elements;
              })()}
            </Tracklist>
        </Section>
      </div>
    </Wrapper>
  );
};

export default LpDetailPage;
