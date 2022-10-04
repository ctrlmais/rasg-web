import axios from 'axios';

const apiUrl = process.env.REACT_APP_AWS;

export const api = axios.create({
  baseURL: apiUrl,
});

api.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  '@barber:token',
)}`;

export function setToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}
