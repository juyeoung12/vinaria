import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 전체 레이아웃
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: #2d2d2d;
  padding: 120px;
  min-height: 100%;
  box-sizing: border-box;
`;

// max-width 컨테이너
const Max = styled.div`
  display: flex;
  width: 100%;
  max-width: 1440px;
  gap: 145px;
  align-items: flex-start;
`;

// 왼쪽 카테고리 영역
const CategoryWrapper = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  height: 345px;
  box-shadow: 0 1px 6px 5px #2222224f;
`;

const CategoryButton = styled.button`
  padding: 24px 25px;
  text-align: left;
  font-size: 18px;
  font-weight: 500;
  background-color: ${(props) => (props.$active ? "#1E1E1E" : "transparent")};
  color: ${(props) => (props.$active ? "#e4cfa1" : "#E2E2E2")};
  border: none;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$active ? "#1E1E1E" : "transparent")};
    color: ${(props) => (props.$active ? "#e4cfa1" : "#E2E2E2")};
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: ${(props) =>
      props.$active ? "#e4cfa1" : "#E2E2E2"};
  }
`;

// LP 카드 영역
const GridWrapper = styled.div`
  flex: 1;
  overflow: visible;
  max-height: none;
  padding-right: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 235px);
  gap: 36px;
`;

const Card = styled.div`
  padding: 22px 16px 0;
  border-radius: 8px;
  text-align: center;
  width: 239px;
  height: 307px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #373737;
  }
`;

const Thumbnail = styled.img`
  width: 220px;
  height: 170px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  color: #ffffff;
  margin: 0 0 23px 0;
`;

const Artist = styled.p`
  font-size: 13px;
  color: #b0b0b0;
  margin: 0 0 6px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  width: 60px;
  height: 35px;
  font-size: 13px;
  padding: 0;
`;

const PrimaryButton = styled(Button)`
  width: 75px;
`;

const Baseline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 0 12px;
`;

const categories = ["전체", "인디", "재즈", "클래식", "시티팝"];

const ListPage = () => {
  const [lpList, setLpList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("전체");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/lps")
      .then((res) => {
        const filtered = res.data.filter((lp) => lp.showInList);
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
        <CategoryWrapper>
          {categories.map((cat) => (
            <CategoryButton
              key={cat}
              $active={cat === activeCategory}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </CategoryButton>
          ))}
        </CategoryWrapper>

        <GridWrapper>
          <Grid>
            {filteredList.length > 0 &&
              Array(8)
                .fill(null)
                .map((_, i) => {
                  const lp = filteredList[i % filteredList.length];
                  return (
                    <Card key={`${lp._id}-${i}`}>
                      <Thumbnail src={lp.thumbnail} alt={lp.title} />
                      <Baseline>
                        <Artist>{lp.artist}</Artist>
                        <Title>{lp.title}</Title>

                        <ButtonGroup>
                          <Button
                            className="btn-secondary"
                            onClick={() => navigate(`/lp/${lp._id}?type=audio`)}
                          >
                            음원
                          </Button>
                          <PrimaryButton
                            className="btn-primary"
                            onClick={() =>
                              navigate(`/lp/${lp._id}?type=purchase`)
                            }
                          >
                            LP 구매
                          </PrimaryButton>
                        </ButtonGroup>
                      </Baseline>
                    </Card>
                  );
                })}
          </Grid>
        </GridWrapper>
      </Max>
    </Wrapper>
  );
};

export default ListPage;
