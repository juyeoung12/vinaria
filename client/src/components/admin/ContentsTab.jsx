import React, { useState } from 'react';
import styled from 'styled-components';
import { X, Music, Image, Video, Search, Pencil, ChevronDown, ChevronUp } from 'lucide-react';
import axios from '../../api/axios';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  flex-direction: column;
`;

const InnerWrapper = styled.div`
  width: 1000px;
  background-color: #373737;
  border-radius: 8px;
  padding: 2rem;
`;

const SearchBox = styled.div`
  position: relative;
  width: 950px;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.375rem;
  background-color: #373737;
  color: #8C8C8C;
  border: 1px solid #8C8C8C;
  ::placeholder {
    color: #E2E2E2;
  }
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #8C8C8C;
`;

const Table = styled.table`
  width: 960px;
  color: #E2E2E2;
  text-align: left;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  border-bottom: 2px solid #E2E2E2;
  color: #E2E2E2;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid #8C8C8C;
  color: #E2E2E2;
`;

const Th = styled.th`
  padding: 0.75rem 12px;
  color: #E2E2E2;
`;

const Td = styled.td`
  padding: 5px 12px;
  color: #E2E2E2;
`;

const ActionButton = styled.button`
  color: #8C8C8C;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 6px;
  padding: 4px;

  &:hover {
    color: #E4CFA1;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #888;
  background-color: #2d2d2d;
  color: white;
`;

const LoadMoreButton = styled.button`
  background-color: transparent;
  border: none;
  color: #E2E2E2;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 950px;

  &:hover {
    color: #E4CFA1;
  }
`;
const ContentsTab = ({ uploadedFiles, setUploadedFiles, handleDelete }) => {
  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  const renderFileIcon = (type) => {
    if (type.startsWith('audio')) return <Music size={16} />;
    if (type.startsWith('image')) return <Image size={16} />;
    if (type.startsWith('video')) return <Video size={16} />;
    return null;
  };

  const filteredFiles = uploadedFiles.filter(file =>
    ((file.title || file.name) || '').toLowerCase().includes(search.toLowerCase()) ||
    (file.uploader || '').toLowerCase().includes(search.toLowerCase()) ||
    (file.category || '').toLowerCase().includes(search.toLowerCase())
  );

  const visibleFiles = isExpanded ? filteredFiles : filteredFiles.slice(0, 4);

  const handleEdit = (index, file) => {
    setEditIndex(index);
    setEditValues({
      uploader: file.uploader || '',
      category: file.category || '',
      date: file.date ? new Date(file.date).toISOString().slice(0, 10) : '',
      title: file.title || file.name || '',
    });
  };

  const handleSave = async (file) => {
    try {
      await axios.patch(`/admin/file-by-id/${file._id}`, editValues);
      setUploadedFiles(prev =>
        prev.map(f => (f._id === file._id ? { ...f, ...editValues } : f))
      );
      setEditIndex(null);
    } catch (err) {
      console.error('수정 실패', err);
    }
  };

  return (
    <Container>
      <h2 style={{ color: '#E2E2E2' }}>콘텐츠 관리</h2>
      <InnerWrapper>
        <SearchBox>
          <SearchInput
            type="text"
            placeholder="제목, 업로더 또는 카테고리 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          />
          <SearchIcon size={20} />
        </SearchBox>
        <Table>
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '5%' }} />
          </colgroup>
          <Thead>
            <Tr>
              <Th>업로더</Th>
              <Th>종류</Th>
              <Th>제목</Th>
              <Th>카테고리</Th>
              <Th>등록일</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {visibleFiles.map((file, index) => (
              <Tr key={file._id}>
                <Td>
                  {editIndex === index ? (
                    <Input
                      value={editValues.uploader}
                      onChange={(e) => setEditValues(prev => ({ ...prev, uploader: e.target.value }))}
                    />
                  ) : (
                    file.uploader || '-'
                  )}
                </Td>
                <Td>{renderFileIcon(file.type || '')}</Td>
                <Td>
                  {editIndex === index ? (
                    <Input
                      value={editValues.title}
                      onChange={(e) => setEditValues(prev => ({ ...prev, title: e.target.value }))}
                    />
                  ) : (
                    file.title || file.name || '-'
                  )}
                </Td>
                <Td>
                  {editIndex === index ? (
                    <Input
                      value={editValues.category}
                      onChange={(e) => setEditValues(prev => ({ ...prev, category: e.target.value }))}
                    />
                  ) : (
                    file.category || '-'
                  )}
                </Td>
                <Td>
                  {editIndex === index ? (
                    <Input
                      type="date"
                      value={editValues.date}
                      onChange={(e) => setEditValues(prev => ({ ...prev, date: e.target.value }))}
                    />
                  ) : (
                    file.date
                      ? new Date(file.date).toLocaleDateString('ko-KR')
                      : '-'
                  )}
                </Td>
                <Td>
                  {editIndex === index ? (
                    <>
                      <ActionButton onClick={() => handleSave(file)}>✔</ActionButton>
                      <ActionButton onClick={() => setEditIndex(null)}>✖</ActionButton>
                    </>
                  ) : (
                    <>
                      <ActionButton onClick={() => handleEdit(index, file)}>
                        <Pencil size={16} />
                      </ActionButton>
                      <ActionButton onClick={() => handleDelete(file.name)}>
                        <X size={18} />
                      </ActionButton>
                    </>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {filteredFiles.length > 4 && (
          <LoadMoreButton onClick={() => setIsExpanded(prev => !prev)}>
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </LoadMoreButton>
        )}
      </InnerWrapper>
    </Container>
  );
};

export default ContentsTab;
