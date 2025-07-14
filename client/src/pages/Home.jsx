import React from "react";
import HeroSection from "../components/HeroSection";
import ChartSection from "../components/ChartSection";
import RecommendSection from "../components/RecommendSection";
import MainLayout from "../layouts/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <ChartSection />
      <RecommendSection />
    </MainLayout>
  );
};

export default Home;
