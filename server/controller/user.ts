import user from '../models/user'

const postUserInfo = async ctx => {
  const data = ctx.request.body
  const userAuth = await login.getUserByName(data.username)

  if(userAuth === null){
    let userInfo = {
      username: data.username,
      password: data.password,
      nickname: data.nickname,
      creationTime: dataTime(),
      updateTime: dataTime()
    }
    user.addUser(userInfo)
    ctx.body = {
      code: '0000',
      info: '新建成功!'
    }
  }else {
    ctx.body = {
      code: '9999',
      info: '用户已存在!'
    }
  }
}

export default {
  postUserInfo
}