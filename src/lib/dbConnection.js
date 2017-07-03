import mysql from 'mysql'
import { dbConfig } from '../../config/index'
import Promise from 'bluebird'

const pool = mysql.createPool({
	connectionLimit: dbConfig.mysql.connectionLimit,
	host: dbConfig.mysql.host,
	user: dbConfig.mysql.user,
	password: dbConfig.mysql.password,
	port: dbConfig.mysql.port,
	database: dbConfig.mysql.database
});

console.log(dbConfig)
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
				resolve(connection)
			}
		})
	})
}

const query = async function(query, params) {
	console.log('Sql---->:', query)
	params = params || {};
	const conn = await getConnection()

	return new Promise( (resolve, reject) => {
		conn.query(query, params, (err, results) => {
			if (err) {
				conn.release();
				reject(err)
			} else {
				resolve(results)
			}
		})
	})
};

export { query }
