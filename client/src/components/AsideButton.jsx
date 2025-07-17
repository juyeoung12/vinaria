import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import styled from 'styled-components';

// ✅ 디자인 기준에 맞춘 스타일
const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 72px;
  right: 84px;
  padding: 12px;
  border: 3px solid #e2e2e2;
  color: #e2e2e2;
  border-radius: 50%;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  z-index: 999;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
    svg {
    display: block;
  }

  path {
    stroke: #e2e2e2;
    transition: stroke 0.3s ease;
  }

  &:hover {
    border-color: #e4cfa1;

    path {
      stroke: #e4cfa1;
    }
  }
`;

const AsideButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <ScrollTopButton onClick={scrollToTop}>
     <svg width="28" height="14" viewBox="0 0 28 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 11L14.4264 2L25 11" stroke="#E2E2E2" stroke-width="3" stroke-linecap="square"/>
    </svg>
    </ScrollTopButton>
  );
};

export default AsideButton;
