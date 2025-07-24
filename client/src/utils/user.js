// utils/user.js
export const getMe = async (token) => {
  const res = await fetch('http://localhost:5000/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data; // { _id, email, name }
};
