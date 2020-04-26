import { config } from '../../constant/db';
import { Sequelize } from 'sequelize' // 引入sequelize

const {database = '', host = '', user = '', password = '', dialect = '', port = 0} = config
const url = `${dialect}://${user}:${password}@${host}:${port}/${database}`
const sequelize = new Sequelize(url,{
    define:{
        // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
        timestamps: false
    },
    timezone: '+08:00' // 时差区，国内需要加入不然存储的时间会有时差
})

export default sequelize
