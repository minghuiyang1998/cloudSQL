import { request } from '@/utils/request';

export function goSignIn(body) {
  request('POST', '/api/signin', body);
}