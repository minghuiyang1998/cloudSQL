import {
  QUERY,
  SCHEMA,
  CONNECTION
} from '../reducers/type';
import connection from './connection';

export default function reducer(state, action) {
  const { type = '' } = action || {};
  // TODO: 取事件第一小节的名字
  const keys = type.split('_');
  switch (keys[0]) {
    case QUERY:
      break;
    case SCHEMA:
      break;
    case CONNECTION:
      break;
    default:break;
  }
}