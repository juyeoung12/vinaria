import React from 'react';
import styled from 'styled-components';
import { Music, Image, Video, X } from 'lucide-react';

const UploadBox = styled.div`
  border: 5px dashed #373737;
  padding: 60px;
  text-align: center;
  margin-bottom: 10px;
  transition: background-color 0.2s;
  cursor: pointer;
  height: 350px;
  width: 950px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  &:hover {
    background-color: #373737;
  }
`;

const UploadDescription = styled.div`
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  margin: 6px 0 40px;
  color: #8C8C8C;
`;

const FileRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #373737;
  padding: 12px 20px;
  margin-top: 10px;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 180px;
`;

const ProgressBar = styled.div`
  width: 150px;
  height: 8px;
  background-color: #555;
  border-radius: 10px;
  overflow: hidden;

  & > div {
    height: 100%;
    background-color: #E4CFA1;
    transition: width 0.3s ease;
  }
`;

const FilledBar = styled.div`
  width: ${({ percent }) => `${percent}%`};
`;

const PercentageText = styled.span`
  font-size: 12px;
  color: #ccc;
  min-width: 32px;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #8c8c8c;
  font-size: 16px;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    color: #8c8c8c;
  }
`;

const UploadImage = styled.img`
  width: 217px;
  height: 217px;
  margin-bottom: 10px;
  object-fit: contain;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const UploadTab = ({ fileInputRef, files, uploadingIndex, progress, handleFileChange, handleUpload, handleCancelFile }) => {
  const renderFileIcon = (type) => {
    if (type.startsWith('audio')) return <Music size={16} />;
    if (type.startsWith('image')) return <Image size={16} />;
    if (type.startsWith('video')) return <Video size={16} />;
    return null;
  };

  return (
    <>
      <h2 style={{color: '#E2E2E2'}}>업로드</h2>
      <UploadBox onClick={() => fileInputRef.current.click()}>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="audio/mp3,audio/wav,image/*,video/*"
          style={{ display: 'none' }}
        />
        <UploadImage src="/upload.png" alt="업로드 아이콘" />
        <div style={{ fontSize: '22px'}}>내 LP 음원을 업로드하세요</div>
      </UploadBox>
      <UploadDescription>
        <span>지원 형식: MP3, WAV, 이미지, 동영상</span>
        <span>최대 용량: 100MB</span>
      </UploadDescription>

      {files.map((file, idx) => (
        <FileRow key={idx}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {renderFileIcon(file.type)}
            <span style={{ color: "#e2e2e2"}}>{file.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {uploadingIndex === idx ? (
              <ProgressBarWrapper>
                <ProgressBar>
                  <FilledBar percent={progress} />
                </ProgressBar>
                <PercentageText>{progress}%</PercentageText>
              </ProgressBarWrapper>
            ) : (
              <button
                className="btn-primary"
                style={{ padding: '9px 15px', fontSize: '14px' }}
                onClick={() => handleUpload(file, idx)}
              >
                업로드
              </button>
            )}
            <CancelButton onClick={() => handleCancelFile(idx)}>
              <X size={16} />
            </CancelButton>
          </div>
        </FileRow>
      ))}
    </>
  );
};

export default UploadTab;
