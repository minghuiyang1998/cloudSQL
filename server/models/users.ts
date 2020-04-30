import { Model } from './model' 
import { User } from '../entities/User';
import { v4 } from 'uuid';
import { getPasshash } from '../utils/passhash';
import moment from 'moment';

export class UserModel extends Model {
  userSave = async () => {
    const userRepo = this.ctx.connection.getRepository(User);
    const { body } = this.ctx.request || {}
    const { username = '', password = '' } = body || {};
    let passhash = '';
    password.length && ( passhash = await getPasshash(password))
    const uuid = v4()
    const _user = {
      uuid,
      username,
      passhash,
      createdDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    }
    const newUser = userRepo.create(_user);
    console.log("UserModel -> userSave -> newUser", newUser)
    await userRepo.save(newUser);
    return newUser
  }

  userGetById = async (uuid: string) => {
    const userRepo = this.ctx.connection.getRepository(User);
    const _user = await userRepo.findOne(uuid);
    return _user
  }

  // TODO: unique name
  userGetByName = async () => {
    const { body } = this.ctx.request || {}
    const { username = '', password = '' } = body;
    const userRepo = this.ctx.connection.getRepository(User);
    const _user = await userRepo.findOne(username);
    return _user
  }
}

