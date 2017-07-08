import mysql from 'mysql'
import { dbConfig } from '../../config/index'
import Promise from 'bluebird'
import Log from './log'

const pool = mysql.createPool({
	connectionLimit: dbConfig.mysql.connectionLimit,
	host: dbConfig.mysql.host,
	user: dbConfig.mysql.user,
	password: dbConfig.mysql.password,
	port: dbConfig.mysql.port,
	database: dbConfig.mysql.database
});
const log = new Log()

/**
 * Run database query
 * @param  {String} query
 * @param  {Object} [params]
 * @return {Promise}
 */
const getConnection = () => {
	return new Promise( (resolve, reject) => {
		pool.getConnection( (err, connection)  => {
			if (err) {
				reject(err)
			} else {
				log.info(`log=lib;model=dbConnection;method=getConnection;msg=get connection`)
				resolve(connection)
			}
		})
	})
}

const query = async function(query, params) {
	params = params || {};
	const conn = await getConnection()

	return new Promise( (resolve, reject) => {
		conn.query(query, params, (err, results) => {
			if (err) {
				conn.release();
				reject(err)
			} else {
				resolve(results)
				log.info(`log=lib;model=dbConnection;method=query;info=${query}${params}`)
			}
		})
	})
};

export { query }
