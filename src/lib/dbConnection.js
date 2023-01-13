import mysql from 'mysql'
import config from '../../config/index'
import Promise from 'bluebird'
import Log from './log'
const dbConfig = config.dbConfig

const pool = mysql.createPool({
  connectionLimit: dbConfig.mysql.connectionLimit,
  psm: dbConfig.mysql.psm,
  idlTime: 10,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  port: dbConfig.mysql.port,
  database: dbConfig.mysql.database,
})
const log = new Log()

const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        log.info('log=lib;model=dbConnection;method=getConnection;msg=get connection')
        resolve(connection)
      }
    })
  })
}

const exec = async function(queryContent, params) {
  const conn = await getConnection()
  // eslint-disable-next-line
  return new Promise((resolve, reject) => {
    conn.query(queryContent, params, (err, results) => {
      if (err) {
        conn.release()
        reject(err)
      } else {
        resolve(results)
        log.info(`log=lib;model=dbConnection;method=query;info=${queryContent}${params}`)
      }
    })
  })
}

export { exec }
