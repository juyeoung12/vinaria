import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { X, Search, ChevronDown, ChevronUp } from 'lucide-react';
import styled from 'styled-components';

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
    color: #8C8C8C;
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
  color: white;
  text-align: left;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  border-bottom: 2px solid #E2E2E2;
  color: #e2e2e2;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid #8C8C8C;
  color: #e2e2e2;
`;

const Th = styled.th`
  padding: 0.75rem 12px;
  color: #e2e2e2;
`;

const Td = styled.td`
  padding: 0.5rem 12px;
  color: #e2e2e2;
`;

const DeleteButton = styled.button`
  color: #8C8C8C;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    color: #E4CFA1;
  }
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

const MembersTab = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    axios.get('/admin/users')
      .then(res => setUsers(res.data.users))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) return;
    try {
      await axios.delete(`/admin/users/${userId}`);
      setUsers(prev => prev.filter(user => user._id !== userId));
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const visibleUsers = isExpanded ? filteredUsers : filteredUsers.slice(0, 4);

  return (
    <Container>
      <h2 style={{color: '#E2E2E2'}}>회원 관리</h2>
      <InnerWrapper>
        <SearchBox>
          <SearchInput
            type="text"
            placeholder="이름 또는 이메일 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          />
          <SearchIcon size={20} />
        </SearchBox>
        <Table>
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '35%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '15%' }} />
          </colgroup>
          <Thead>
            <Tr>
              <Th>이름</Th>
              <Th>이메일</Th>
              <Th>가입일</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {visibleUsers.map(user => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{new Date(user.createdAt).toISOString().slice(0, 10)}</Td>
                <Td>
                  <DeleteButton onClick={() => handleDelete(user._id)}>
                    <X size={18} />
                  </DeleteButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {filteredUsers.length > 4 && (
          <LoadMoreButton onClick={() => setIsExpanded(prev => !prev)}>
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </LoadMoreButton>
        )}
      </InnerWrapper>
    </Container>
  );
};

export default MembersTab;
