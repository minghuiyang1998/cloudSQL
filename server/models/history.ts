import { Model } from './model' 
import { History } from '../entities/History';

type Connection = {
  cid: String,
  dialect: String,
  host: String,
  port: Number,
  database?: String, 
  sid?: String,
  user?: String,
  password?: String,
}

export class HistoryModel extends Model {
  historyCreate = async (uuid: String, connection: Connection) => {
    try {
      const historyRepo = this.ctx.connection.getRepository(History);
      const _new = historyRepo.create({
        uuid,
        data: JSON.stringify([connection])
      });
      await historyRepo.save(_new);
      
      const _history = await historyRepo.findOne(uuid);
      const { data = ''} = _history
      let result = []
      if (data) {
        result = JSON.parse(data)
      }
      return result
    } catch (e) {
      return e
    }
  }

  historyUpdate = async (uuid: string, cid: String, connection: Connection) => {
    try {
      const historyRepo = this.ctx.connection.getRepository(History);
      const history = await historyRepo.findOne(uuid);
      const { data = '' } = history || {}
      const _data = JSON.parse(data)
      for ( let c of _data) {
        if (c.cid === cid) {
          c = {
            ...c,
            connection
          }
          break;
        }
      }
      history.data = JSON.stringify(_data)
      await historyRepo.persist(history)

      const newHistory = await historyRepo.findOne(uuid);
      const { data: newStr = ''} = newHistory
      let result = []
      if (data) {
        result = JSON.parse(newStr)
      }
      return result
    } catch (e) {
      return e
    }
  }

  historyDelete = async (uuid: string, cid: string) => {
    try {
      const historyRepo = this.ctx.connection.getRepository(History);
      const history = await historyRepo.findOne(uuid);
      const { data = '' } = history || {}
      const _data = JSON.parse(data)
      const _index = _data.findIndex( c  => c.cid = cid )
      _data.slice(_index, 1)
      
      const newHistory = await historyRepo.findOne(uuid);
      const { data: newStr = ''} = newHistory
      let result = []
      if (data) {
        result = JSON.parse(newStr)
      }
      return result
    } catch(e) {
      return  e
    }
  }

  historyGetByUser = async (uuid: String) => {
    try {
      const historyRepo = this.ctx.connection.getRepository(History);
      const _history = await historyRepo.findOne(uuid);
      const { data = ''} = _history
      let result = []
      if (data) {
        result = JSON.parse(data)
      }
      return result
    } catch (e) {
      return e
    }
  }
}

