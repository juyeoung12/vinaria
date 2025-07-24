import styled from 'styled-components';
import RecommendSection from '../components/RecommendSection';
import HeroSection from '../components/HeroSection';
import ChartSection from '../components/ChartSection';

// 일반 스크롤 컨테이너
const ScrollContainer = styled.div`
  overflow-y: auto;
  height: auto;
`;

const Section = styled.section`
  min-height: 100vh;
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
