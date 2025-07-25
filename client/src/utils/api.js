// utils/api.js (공통 요청 함수)
const API_URL = 'http://localhost:5000/api/auth';

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data; // { message, token, user }
};

export const signup = async (email, password, name) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data; // { message }
};
