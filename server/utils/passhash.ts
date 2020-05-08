import bcrypt from 'bcrypt';

/**
 * Compares password string to passhash string
 * @param {string} password
 * @param {string} passhash
 * @returns {Promise<boolean>}
 */
export function comparePassword(password: string, passhash: string) {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(password, passhash, (err, isMatch) => {
      if (err) {
        reject(err);
      }
      resolve(isMatch);
    });
  });
}

export function getPasshash(password: string) {
  const SALT_ROUNDS = 10;
  return new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (error, hash) => {
        // Store hash in your password DB.
        if (error) {
          reject(error);
        }
        resolve(hash);
      });
    });
  });
}

export default {
  comparePassword,
  getPasshash,
};
