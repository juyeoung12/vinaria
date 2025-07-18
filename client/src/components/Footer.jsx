import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: #222222;
  color: white;
  height: 115px;
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #e2e2e2;
  height: 100%;
  max-width: 1440px;
  width: 100%;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 31px;
  align-items: center;
`;

const Copyright = styled.div`
  text-align: right;
  font-size: 0.875rem;
  color: #e2e2e2;
  line-height: 1.4;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        {/* 연락처 */}
        <ContactInfo>
          <p style={{ margin: "0", fontSize: "14px" }}>TEL : 010-234-5678</p>
          <p style={{ margin: "0", fontSize: "14px" }}>E-MAIL : info@vinaria.co.kr</p>
        </ContactInfo>

        {/* SNS 아이콘 */}
        <SocialIcons>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="29" viewBox="0 0 14 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.0085 8.27273V12.0511H0.755682V8.27273H13.0085ZM3.81889 29V6.31605C3.81889 4.92164 4.10677 3.76113 4.68253 2.83452C5.26728 1.90791 6.04995 1.2152 7.03054 0.756391C8.01113 0.297584 9.09967 0.06818 10.2962 0.06818C11.1418 0.06818 11.893 0.135652 12.5497 0.270596C13.2064 0.405539 13.6922 0.526988 14.0071 0.634943L13.0355 4.41335C12.8286 4.35038 12.5677 4.2874 12.2528 4.22443C11.938 4.15246 11.5871 4.11648 11.2003 4.11648C10.2917 4.11648 9.64844 4.33688 9.2706 4.7777C8.90175 5.20952 8.71733 5.83025 8.71733 6.63991V29H3.81889Z"
                fill="#E2E2E2"
              />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.5" y="1.5" width="27" height="27" rx="8.5" stroke="#E2E2E2" strokeWidth="3" />
              <path
                d="M15.198 9.32666C18.3932 9.32688 21.0378 11.9825 21.0378 15.3267C21.0378 18.6708 18.3932 21.3264 15.198 21.3267C12.0027 21.3267 9.35718 18.6709 9.35718 15.3267C9.35718 11.9824 12.0027 9.32666 15.198 9.32666Z"
                stroke="#E2E2E2"
                strokeWidth="3"
              />
              <path
                d="M22.8572 7.81689C23.3587 7.81697 23.7859 8.23731 23.7859 8.78076C23.7857 9.324 23.3585 9.74357 22.8572 9.74365C22.3558 9.74365 21.9287 9.32405 21.9285 8.78076C21.9285 8.23726 22.3556 7.81689 22.8572 7.81689Z"
                fill="#E2E2E2"
                stroke="#E2E2E2"
              />
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M29 0C32.866 0 36 3.13401 36 7V17C36 20.866 32.866 24 29 24H7C3.13401 24 0 20.866 0 17V7C0 3.13401 3.13401 0 7 0H29ZM17.0742 8.47754C15.7436 7.80025 14.167 8.76672 14.167 10.2598V14.4248C14.1672 15.9177 15.7437 16.8843 17.0742 16.207L21.165 14.124C22.6218 13.3823 22.6219 11.3012 21.165 10.5596L17.0742 8.47754Z"
                fill="#E2E2E2"
              />
            </svg>
          </a>
        </SocialIcons>

        {/* 저작권 */}
        <Copyright>
          <p style={{ margin: "0", fontSize: "14px" }}>© VINARIA, All Rights Reserved.</p>
          <p style={{ margin: "0", fontSize: "14px" }}>
            Icons provided by Lucide, licensed under the MIT License.
          </p>
        </Copyright>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
