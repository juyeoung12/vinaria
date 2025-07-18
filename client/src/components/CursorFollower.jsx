// import React, { useEffect, useState } from "react";
// import styled from "styled-components";

// const Follower = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 50px;
//   height: 50px;
//   background-color: #222222e1;
//   border-radius: 50%;
//   pointer-events: none; /* 클릭 방지 */
//   z-index: 9999;
//   transform: translate(-50%, -50%);
//   transition: transform 0.05s ease-out;
// `;

// const CursorFollower = () => {
//   const [position, setPosition] = useState({ x: -100, y: -100 });

//   useEffect(() => {
//     const move = (e) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", move);
//     return () => window.removeEventListener("mousemove", move);
//   }, []);

//   return (
//     <Follower
//       style={{
//         transform: `translate(${position.x}px, ${position.y}px)`,
//       }}
//     />
//   );
// };

// export default CursorFollower;

import React, { useEffect, useState } from "react";
import styled from "styled-components";

// PNG 이미지 스타일
const Follower = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.07s ease-out;
`;

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <Follower
      src="/cursor.png" // ✅ 이미지 경로에 맞게 수정
      alt="Cursor Follower"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
};

export default CursorFollower;
