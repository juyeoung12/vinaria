// src/hooks/useUser.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useUser = () => {
  const [user, setUser] = useState(null);

  const fetchMe = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.error('사용자 정보 불러오기 실패:', err.response?.data?.message);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return { user, fetchMe };
};

export default useUser;
