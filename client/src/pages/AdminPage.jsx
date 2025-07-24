import React, { useState, useRef, useEffect } from 'react';
import axios from '../api/axios'; // 토큰 자동 포함됨
import styled from 'styled-components';
import { Search, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

import UserMenu from '../components/UserMenu';
import UploadTab from '../components/admin/UploadTab';
import MembersTab from '../components/admin/MembersTab';
import ContentsTab from '../components/admin/ContentsTab';
import { useAuth } from '../context/AuthContext';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  color: white;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #222222;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 18px;
  border-right: 1px solid #333;
  font-weight: 500;
`;

const SidebarMenuItem = styled.div`
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#E4CFA1' : '#E2E2E2')};
  transition: color 0.2s;

  &:hover {
    color: #E4CFA1;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #2d2d2d;
`;

const AdminHeader = styled.div`
  height: 35px;
  background-color: #2d2d2d;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: flex-end;
  padding: 26px 40px;
  gap: 20px;
`;

const IconButton = styled.div`
  cursor: pointer;

  svg {
    color: white;
    transition: color 0.2s;
  }

  &:hover svg {
    color: #d1d5db;
  }
`;

const Content = styled.div`
  padding: 50px 303px;
  box-sizing: border-box;
  flex: 1;
  height: 100%;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 32px;
  }
`;

const AdminPage = () => {
  const { user } = useAuth(); // 🔹 현재 로그인한 사용자
  const [files, setFiles] = useState([]);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selected]);
  };

  const handleCancelFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async (file, index) => {
    const formData = new FormData();
    formData.append('file', file);

    // ✅ uploader 추가
    if (user && user._id) {
      formData.append('uploader', user._id);
    }

    setUploadingIndex(index);
    setProgress(0);
    const startTime = Date.now();

    try {
      await axios.post('/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        }
      });

      alert(`${file.name} 업로드 완료!`);
      setFiles(prev => prev.filter((_, i) => i !== index));
      fetchUploadedFiles();
    } catch (err) {
      alert(`${file.name} 업로드 실패`);
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = 500 - elapsed;
      setTimeout(() => {
        setUploadingIndex(null);
        setProgress(0);
      }, remaining > 0 ? remaining : 0);
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const res = await axios.get('/admin/files');
      const serverFiles = res.data.files || [];

      const processedFiles = serverFiles.map(file => ({
        ...file,
        title: file.title || file.name
      }));

      setUploadedFiles(processedFiles);
    } catch (err) {
      console.error('업로드된 파일 불러오기 실패', err);
      setUploadedFiles([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/files/${id}`);
      fetchUploadedFiles();
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'contents') {
      fetchUploadedFiles();
    }
  }, [activeTab]);

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const renderTabContent = () => {
    if (activeTab === 'upload') {
      return (
        <UploadTab
          fileInputRef={fileInputRef}
          files={files}
          uploadingIndex={uploadingIndex}
          progress={progress}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          handleCancelFile={handleCancelFile}
        />
      );
    } else if (activeTab === 'members') {
      return <MembersTab />;
    } else if (activeTab === 'contents') {
      return (
        <ContentsTab
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          handleDelete={handleDelete}
        />
      );
    }
  };
  
  return (
    <Wrapper>
      <Sidebar>
        <LogoLink to="/">
          <img src="/icons/Vinaria.svg" alt="Vinaria Logo" />
        </LogoLink>
        <div style={{ margin: "36px 0 0 43px", display: "flex", flexDirection: "column", gap: "27px" }}>
          <SidebarMenuItem onClick={() => setActiveTab('upload')} $active={activeTab === 'upload'}>
            업로드
          </SidebarMenuItem>
          <SidebarMenuItem onClick={() => setActiveTab('members')} $active={activeTab === 'members'}>
            회원 관리
          </SidebarMenuItem>
          <SidebarMenuItem onClick={() => setActiveTab('contents')} $active={activeTab === 'contents'}>
            콘텐츠 관리
          </SidebarMenuItem>
        </div>
      </Sidebar>
      <ContentArea>
        <AdminHeader>
          <IconButton><Search size={25} /></IconButton>
          <IconButton><Bell size={25} /></IconButton>
          <UserMenu />
        </AdminHeader>
        <Content>{renderTabContent()}</Content>
      </ContentArea>
    </Wrapper>
  );
};

export default AdminPage;
