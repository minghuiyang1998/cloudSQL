import Joi from '@hapi/joi';
import { getPasshash } from '../utils/passhash';
import { sequelizeDB } from '../utils/connectDB';
import { v4 } from 'uuid';

const userModel = '../schema/user.js';
const User = sequelizeDB.import(userModel);

const schema = Joi.object({
  uuid: Joi.string(),
  username: Joi.string().optional(),
  password: Joi.string().optional().strip(),
  passhash: Joi.string().optional(), // may not exist if user hasn't signed up yet
  createdDate: Joi.date().default(Date.now),
});

async function create(infos) {
  const { username = '', password = '' } = infos;
  let passhash = '';
  if (password) {
    passhash = await getPasshash(password);
  }
  const uuid = v4();
  const user = {
    uuid,
    username,
    passhash,
    password,
    createdDate: Date.now(),
  };
  const { error, value } = schema.validate(user);
  if (error) {
    return Promise.reject(error);
  }
  const newUser = await User.create(value);
  return newUser;
}

function findOneByUUid(uuid) {
  return User.findOne(uuid);
}

export default {
  create,
  findOneByUUid,
};
