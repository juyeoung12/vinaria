import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 전체 레이아웃
const Wrapper = styled.div`
  flex: 1; /* 메인 콘텐츠가 flex-grow */
  display: flex;
  justify-content: center;
  background-color: #2d2d2d;
  padding: 40px 120px;
    min-height: 100%; /* 🔥 추가 */
  box-sizing: border-box;
`;

// max-width 컨테이너
const Max = styled.div`
  display: flex;
  width: 100%;
  max-width: 1440px;
  gap: 40px;
  align-items: flex-start;
`;

// 왼쪽 카테고리 영역
const CategoryWrapper = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CategoryButton = styled.button`
  padding: 10px 20px;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  background-color: ${(props) => (props.active ? "#333" : "transparent")};
  color: ${(props) => (props.active ? "#e4cfa1" : "#fff")};
  border: ${(props) => (props.active ? "none" : "1px solid transparent")};
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #2a2a2a;
  }
`;

// LP 카드 영역 (스크롤 지원)
const GridWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 200px); // 헤더+푸터 공간 제외
  padding-right: 4px;
`;

// LP 카드 목록
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 36px;
`;

const Card = styled.div`
  background-color: #1f1f1f;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 6px;
`;

const Artist = styled.p`
  font-size: 13px;
  color: #b0b0b0;
  margin-bottom: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ActionButton = styled.button`
  font-size: 12px;
  padding: 6px 12px;
  border: 1px solid #e4cfa1;
  color: #e4cfa1;
  background-color: transparent;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #e4cfa1;
    color: #121212;
  }
`;

// 카테고리 옵션들
const categories = ["전체", "인디", "재즈", "클래식", "시티팝"];

const ListPage = () => {
  const [lpList, setLpList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("전체");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/lps")
      .then((res) => {
        const filtered = res.data.filter(lp => lp.showInList);
        setLpList(filtered);
      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err);
      });
  }, []);

  const filteredList =
    activeCategory === "전체"
      ? lpList
      : lpList.filter((lp) => lp.genre === activeCategory);

  return (
    <Wrapper>
      <Max>
        {/* 왼쪽 카테고리 */}
        <CategoryWrapper>
          {categories.map((cat) => (
            <CategoryButton
              key={cat}
              active={cat === activeCategory}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </CategoryButton>
          ))}
        </CategoryWrapper>

        {/* LP 카드 목록 */}
        <GridWrapper>
          <Grid>
            {filteredList.map((lp) => (
              <Card key={lp._id}>
                <Thumbnail src={lp.thumbnail} alt={lp.title} />
                <Title>{lp.title}</Title>
                <Artist>{lp.artist}</Artist>

                <ButtonGroup>
                  {lp.showAudioButton && (
                    <ActionButton onClick={() => navigate(`/lp/${lp.id}?type=audio`)}>
                      음원
                    </ActionButton>
                  )}
                  {lp.showPurchaseButton && (
                    <ActionButton onClick={() => navigate(`/lp/${lp.id}?type=purchase`)}>
                      구매
                    </ActionButton>
                  )}
                </ButtonGroup>
              </Card>
            ))}
          </Grid>
        </GridWrapper>
      </Max>
    </Wrapper>
  );
};

export default ListPage;
