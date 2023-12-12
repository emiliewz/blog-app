import axios from 'axios';
import storageService from './storage';
import { BaseBlog } from '../app/types';

const baseUrl = '/api/blogs';

const headers = {
  'Authorization': `Bearer ${storageService.getUser()?.token}`
};

const getAll = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

const create = async (object: BaseBlog) => {
  const result = await axios.post(baseUrl, object, { headers });
  return result.data;
};

export default {
  getAll, create
};