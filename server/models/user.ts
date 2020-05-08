import { Model } from './model';
import { User } from '../entities/User';

export class UserModel extends Model {
  userSave = async (user: Object) => {
    try {
      const userRepo = this.ctx.connection.getRepository(User);
      const newUser = userRepo.create(user);
      await userRepo.save(newUser);
      return newUser;
    } catch (e) {
      return e;
    }
  }

  userGetById = async (uuid: String) => {
    try {
      const userRepo = this.ctx.connection.getRepository(User);
      const _user = await userRepo.findOne({ uuid });
      return _user;
    } catch (e) {
      return e;
    }
  }

  // TODO: unique name
  userGetByName = async (username: String) => {
    try {
      const userRepo = this.ctx.connection.getRepository(User);
      const _user = await userRepo.findOne({ username });
      return _user;
    } catch (e) {
      return e;
    }
  }
}
