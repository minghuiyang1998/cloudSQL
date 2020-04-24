import Message from '../utils/message';
import { request } from '../utils/request';

export const initialState = {
  availableTags: []
};

export const loadTags = async state => {
  const { error, tags } = await request('GET', '/api/tags');
  if (error) {
    Message.error(error);
  }
  return { availableTags: tags };
};

export default { initialState, loadTags };
