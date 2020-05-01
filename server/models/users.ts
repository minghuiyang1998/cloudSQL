import { Model } from './model' 
import { User } from '../entities/User';

export class UserModel extends Model {
  userSave = async (user: Object) => {
    const userRepo = this.ctx.connection.getRepository(User);
    const newUser = userRepo.create(user);
    await userRepo.save(newUser);
    return newUser
  }

  userGetById = async (uuid: String) => {
    const userRepo = this.ctx.connection.getRepository(User);
    const _user = await userRepo.findOne(uuid);
    return _user
  }

  // TODO: unique name
  userGetByName = async (username: String) => {
    const userRepo = this.ctx.connection.getRepository(User);
    const _user = await userRepo.findOne({username});
    return _user
  }
}

