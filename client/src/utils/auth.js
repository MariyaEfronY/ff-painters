// src/utils/auth.js
export const setToken = (token) => {
  localStorage.setItem('painterToken', token);
};

export const getToken = () => {
  return localStorage.getItem('painterToken');
};

export const removeToken = () => {
  localStorage.removeItem('painterToken');
};
