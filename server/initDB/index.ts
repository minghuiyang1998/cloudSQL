import fs from 'fs'
import path from 'path'
import { query } from '../utils/connectDB'

/**
 * 遍历目录下的文件目录
 * @param  {string} pathResolve  需进行遍历的目录路径
 * @param  {string} mime         遍历文件的后缀名
 * @return {object}              返回遍历后的目录结果
 */
const walkFile = function(  pathResolve , mime ){
  let files = fs.readdirSync( pathResolve )
  let fileList = {}
   for( let [ i, item] of files.entries() ) {
    let itemArr = item.split('\.')
    let itemMime = ( itemArr.length > 1 ) ? itemArr[ itemArr.length - 1 ] : 'undefined'
    if( mime === itemMime ) {
      fileList[ item ] =  `${pathResolve}/${item}`
    }
  }
  return fileList
}

/**
 * 获取sql目录下的文件目录数据
 * @return {object} 
 */
function getSqlMap () {
    const p = path.resolve(__dirname, './sql')
    const fileList = walkFile( p, 'sql' )
    return fileList
}

/**
 * 封装所有sql文件脚本内容
 * @return {object} 
 */
function getSqlContentMap () {
  const sqlContentMap = {}
  let sqlMap = getSqlMap()
  for( let key in sqlMap ) {
    let content = fs.readFileSync( sqlMap[key], 'binary' )
    sqlContentMap[ key ] = content
  }
  return sqlContentMap
}

const eventLog = function( err , sqlFile, index ) {
    if( err ) {
      console.log(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败 o(╯□╰)o ！`)
    } else {
      console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功 O(∩_∩)O !`)
    }
}

// 执行建表sql脚本
const createAllTables = async () => {
    const sqlContentMap = getSqlContentMap()
    for( let key in sqlContentMap ) {
      const sqlShell = sqlContentMap[key]
      const sqlShellList = sqlShell.split(';')
      for ( let [ i, shell ] of sqlShellList.entries() ) {
        if ( shell.trim() ) {
          await query( shell )
          // let { serverStatus } = await query( shell )
          // if ( serverStatus === 200 ) {
          //   eventLog( null,  key, i)
          // } else {
          //   eventLog( true,  key, i) 
          // }
        }
      }
    }
    console.log('sql脚本执行结束！')
    console.log('请按 ctrl + c 键退出！')
}
  
createAllTables()