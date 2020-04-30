import bcrypt from 'bcrypt';

const salt = "DI3MS00mFkLYTlkMGI0ODUtZMTgwNzct"
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
        return reject(err);
      }
      resolve(isMatch);
    });
  });
}

export function getPasshash(password: string) {
  const saltRounds = 10;
  return new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        if (err) {
          return reject(err);
        }
        return resolve(hash);
        });
    });
  });
}

export default {
  comparePassword,
  getPasshash,
};
