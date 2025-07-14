// src/components/AsideButton.jsx
import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

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
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-white text-black p-3 rounded-full shadow-lg z-50"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default AsideButton;
