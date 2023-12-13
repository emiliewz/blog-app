import axios from 'axios';
import { LoginEntry } from '../app/types';
const baseUrl = '/api/login';

const login = async (credentials: LoginEntry) => {
  const result = await axios.post(baseUrl, credentials);
  return result.data;
};

export default { login };