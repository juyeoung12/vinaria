import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// ✅ 디자인 기준에 맞춘 스타일
const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 72px;
  right: 84px;
  padding: 12px;
  border: 3px solid #5A84E1;
  color: #5A84E1;
  border-radius: 50%;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  z-index: 999;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    display: block;
  }

  path {
    stroke: #5A84E1;
    transition: stroke 0.3s ease;
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
      <svg
        width="28"
        height="14"
        viewBox="0 0 28 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 11L14.4264 2L25 11"
          stroke="#E2E2E2"
          strokeWidth="3"
          strokeLinecap="square"
        />
      </svg>
    </ScrollTopButton>
  );
};

export default AsideButton;
