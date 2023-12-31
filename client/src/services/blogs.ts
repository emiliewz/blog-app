import axios from 'axios';
import { BaseBlog, BlogsSliceState } from '../app/types';

const baseUrl = '/api/blogs';

type Headers = {
  Authorization: string
};

let headers: Headers = {} as Headers;

const setHeaders = (token: string) => headers = {
  Authorization: `Bearer ${token}`
};

const getAll = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

const create = async (object: BaseBlog) => {
  const result = await axios.post(baseUrl, object, { headers });
  return result.data;
};

const update = async (object: BlogsSliceState) => {
  const result = await axios.put(`${baseUrl}/${object.id}`, object, { headers });
  return result.data;
};

const comment = async (comment: string, id: string) => {
  const result = await axios.post(`${baseUrl}/${id}/comments`, { comment }, { headers });
  return result.data;
};

const remove = async (id: string) => {
  const result = await axios.delete(`${baseUrl}/${id}`, { headers });
  return result.data;
};

export default {
  getAll, create, update, comment, remove, setHeaders
};