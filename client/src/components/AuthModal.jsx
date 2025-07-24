import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuthModal } from "../store/authModalContext";
import { useAuth } from "../context/AuthContext.jsx";
import { login, signup } from "../utils/api";

// 🔹 배경 노이즈 효과 오버레이
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(6px) brightness(0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

// 🔹 모달 박스
const Modal = styled.div`
  background-color: #222;
  padding: 40px 36px;
  width: 350px;
  height: ${(props) => (props.$tab === "signup" ? "470px" : "380px")};
  color: white;
  text-align: center;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 🔹 타이틀
const Title = styled.h2`
  font-size: 27px;
  font-weight: 700;
  margin: ${(props) => (props.$tab === "signup" ? "2px 0 12px 0" : "12px 0 12px 0")};
`;

// 🔹 탭 영역
const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 27px;
  margin-top: 7px;

  span {
    font-size: 19px;
    cursor: pointer;
    color: #8C8C8C;
    border-bottom: 1px solid transparent;

    &.active {
      color: #E4CFA1;
      font-weight: 600;
    }
  }
`;

// 🔹 입력 필드
const Input = styled.input`
  width: 290px;
  padding: 12px 14px;
  background-color: #373737;
  border: none;
  color: #8C8C8C;
  margin-bottom: 8px;
  font-size: 13px;
  height: 33px;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: 1px solid #555;
  }
`;

// 🔹 버튼
const Button = styled.button`
  width: 318px;
  padding: 12px;
  background-color: #5A84E1;
  border: none;
  font-weight: 600;
  font-size: 15px;
  color: #222222;
  margin-top: 17px;
  cursor: pointer;
  height: 57px;

  &:hover {
    background-color: #4772c0ff;
    color: #222222;
  }
`;

// 🔹 로그인 탭 전용 링크
const LinkLogin = styled.p`
  font-size: 12px;
  color: #8C8C8C;
  text-align: right;
  margin-top: 0px;
  margin-bottom: 14px;
  cursor: pointer;
  width: 318px;

  &:hover {
    text-decoration: underline;
  }
`;

// 🔹 회원가입 탭 전용 링크 (작게)
const LinkSignup = styled.p`
  font-size: 12px;
  color: #8C8C8C;
  margin-top: 12px;
  text-align: center;
  cursor: pointer;
  width: 100%;

  span {
    font-weight: 500;
    cursor: pointer;
    margin-left: 5px;
  }

  &:hover span {
    text-decoration: underline;
  }
`;

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal } = useAuthModal();
  const { setUser } = useAuth();
  const [tab, setTab] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [signupName, setSignupName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [loading, setLoading] = useState(false);
  

  const fullSignupEmail = `${emailId}@${emailDomain}`;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    document.body.style.overflow = isAuthModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAuthModalOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const { token, user } = await login(email, password);
      localStorage.setItem("token", token);
      setUser(user);
      alert("로그인 성공");
      closeAuthModal();
    } catch (err) {
      alert(err.message || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (loading) return;
    if (!emailRegex.test(fullSignupEmail)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (signupPassword !== signupConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    try {
      await signup(fullSignupEmail, signupPassword, signupName);
      alert("회원가입 성공!");
      setTab("login");
    } catch (err) {
      alert(err.message || "회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <Overlay onClick={closeAuthModal}>
      <Modal $tab={tab} onClick={(e) => e.stopPropagation()}>
        <Title $tab={tab}>Vinaria</Title>

        <Tabs>
          <span className={tab === "login" ? "active" : ""} onClick={() => setTab("login")}>로그인</span>
          <span>|</span>
          <span className={tab === "signup" ? "active" : ""} onClick={() => setTab("signup")}>회원가입</span>
        </Tabs>

        {tab === "login" ? (
          <>
            <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin(e);
              }}
            />
            <LinkLogin onClick={() => alert("비밀번호 찾기 기능 준비 중입니다.")}>아이디 / 비밀번호 찾기</LinkLogin>
            <Button onClick={handleLogin} disabled={loading}>{loading ? "로그인 중..." : "로그인"}</Button>
          </>
        ) : (
          <>
            <div style={{ display: "flex", gap: "8px"}}>
              <Input
                type="text"
                placeholder="이메일"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                style={{ width: "119px", height: "27px" }}
              />
              <span style={{ color: "#aaa", alignSelf: "center" }}>@</span>
              <select
                value={emailDomain}
                onChange={(e) => setEmailDomain(e.target.value)}
                style={{
                  width: "140px",
                  backgroundColor: "#373737",
                  color: "#8C8C8C",
                  border: "none",
                  fontSize: "13px",
                  height: "49px",
                  padding: "6px"
                }}
              >
                <option value="">선택</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.net">daum.net</option>
                <option value="hotmail.com">hotmail.com</option>
                <option value="yahoo.co.kr">yahoo.co.kr</option>
              </select>
            </div>
            {emailId && emailDomain && !emailRegex.test(fullSignupEmail) && (
              <p style={{ color: "#ff6666", fontSize: "12px", textAlign: "left", width: "318px", marginBottom: "4px", marginTop: "-4px" }}>
                이메일 형식이 올바르지 않습니다.
              </p>
            )}
            <Input
              type="password"
              placeholder="비밀번호"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={signupConfirm}
              onChange={(e) => setSignupConfirm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSignup();
              }}
            />
            {signupPassword && signupConfirm && (
              <p
                style={{
                  color: signupPassword === signupConfirm ? "#5A84E1" : "#ff6666",
                  fontSize: "12px",
                  textAlign: "left",
                  width: "318px",
                  marginBottom: "4px",
                  marginTop: "-4px"
                }}
              >
                {signupPassword === signupConfirm ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."}
              </p>
            )}
            <Input
              type="text"
              placeholder="이름"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />
            <Button onClick={handleSignup} disabled={loading}>{loading ? "회원가입 중..." : "회원가입"}</Button>
            <LinkSignup>
              이미 계정이 있으신가요?
              <span onClick={() => setTab("login")}>로그인 하기</span>
            </LinkSignup>
          </>
        )}
      </Modal>
    </Overlay>
  );
};

export default AuthModal;