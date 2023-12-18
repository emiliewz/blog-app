import axios from 'axios';
import { UserEntry } from '../app/types';
const baseUrl = '/api/users';

const getAll = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

const create = async (object: UserEntry) => {
  const result = await axios.post(baseUrl, object);
  return result.data;
};

const check = async (headers: object) => {
  const result = await axios.get(`${baseUrl}/check`, { headers });
  return result.data;
};

export default {
  getAll,
  create,
  check
};