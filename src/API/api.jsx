import axios from 'axios';

const API_ENDPOINT = 'https://api.ipify.org?format=json';

export const loginAPI = () => {
  return axios.get(API_ENDPOINT)
    .then(response => response.data.ip)
    .catch(error => {
      console.error('Error fetching IP address:', error);
      return null;
    });
}