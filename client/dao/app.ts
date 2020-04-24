import { request } from '../utils/request';

export const refreshAppContext = async () => {
  const {
    config,
    currentUser,
    adminRegistrationOpen,
    version
  } = await request('GET', 'api/app');

  if (!config) {
    return;
  }
  // Assign config.baseUrl to global
  // It doesn't change and is needed for fetch requests
  // This allows us to simplify the fetch() call
  window.BASE_URL = config.baseUrl;

  return {
    config,
    currentUser,
    adminRegistrationOpen,
    version
  };
};
