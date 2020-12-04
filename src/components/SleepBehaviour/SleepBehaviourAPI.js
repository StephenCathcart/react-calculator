import axios from 'axios';

const headers = { 'Content-Type': 'application/json' };

export const saveScore = (data) => {
  return axios(process.env.REACT_APP_API_URI, {
    method: 'POST',
    headers,
    data,
  });
}