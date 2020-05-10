import { createConnection } from 'typeorm';

export const typeorm = () => new Promise<any>((resolve, reject) => {
  createConnection().then(async (connection) => {
    resolve(connection);
  }).catch((error) => reject(error));
});
