import styled from 'styled-components';
import RecommendSection from '../components/RecommendSection';
import HeroSection from '../components/HeroSection';
import ChartSection from '../components/ChartSection';

// 전체 스크롤 영역
const ScrollContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
`;

// 각 섹션
const Section = styled.section`
  height: 100vh;
  scroll-snap-align: start;
`;

const Home = () => {
  return (
    <ScrollContainer>
      <Section>
        <HeroSection />
      </Section>
      <Section>
        <ChartSection />
      </Section>
      <Section>
        <RecommendSection />
      </Section>
    </ScrollContainer>
  );
};

export default Home;
