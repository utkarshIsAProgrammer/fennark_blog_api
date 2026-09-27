import axios from 'axios';

const api = axios.create({
  baseURL: '/api/blogs',
  headers: { 'Content-Type': 'application/json' },
});

// Uniform error message extraction so toasts stay consistent everywhere
export function getApiError(err, fallback = 'Something went wrong!') {
  // No response at all → network level failure (server down, wrong port, etc.)
  if (!err?.response) {
    return 'Cannot reach the API. Is the server running? (cd server && npm run dev)';
  }
  const status = err.response.status;
  // 502/504 come from the Vite proxy when the backend is unreachable
  if (status === 502 || status === 504) {
    return 'The API did not respond. Make sure the Express server is running on port 5500.';
  }
  return err.response.data?.message || err.message || fallback;
}

export const getPosts = async () => {
  const res = await api.get('/');
  return res.data; // { success, message, posts }
};

export const getPost = async (id) => {
  const res = await api.get(`/${id}`);
  return res.data; // { success, message, post }
};

export const createPost = async (payload) => {
  const res = await api.post('/', payload);
  return res.data; // { success, message, post }
};

export const updatePost = async (id, payload) => {
  const res = await api.put(`/${id}`, payload);
  return res.data; // { success, message, post }
};

export const deletePost = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data; // { success, message }
};
