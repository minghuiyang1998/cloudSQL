import { Model } from './model' 
import { User } from '../entities/User';
import { v4 } from 'uuid';
import { getPasshash } from '../utils/passhash';

export class UserModel extends Model {
  userSave = async () => {
    const userRepo = this.ctx.connection.getRepository(User);
    const { body } = this.ctx.request || {}
    const { username = '', password = '' } = body;
    let passhash = '';
    if (password) {
      passhash = await getPasshash(password);
    }
    const uuid = v4();
    const _user = {
      uuid,
      username,
      passhash,
      password,
      createdDate: Date.now(),
    }
    const newUser = userRepo.create(_user);
    await userRepo.save(newUser);
    return newUser
  }

  userGetById = async (uuid: string) => {
    const userRepo = this.ctx.connection.getRepository(User);
    const _user = await userRepo.findOne(uuid);
    return _user
  }
}

