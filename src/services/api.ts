import axios from 'axios';

const apiUrl = process.env.REACT_APP_AWS;

export const api = axios.create({
  baseURL: apiUrl,
});

const token = localStorage.getItem('@rasg:token');

api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';

export function setToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}
