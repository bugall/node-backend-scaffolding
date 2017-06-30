import mysql from 'mysql'
import { dbConfig } from '../../config/index'
import Promise from 'bluebird'

const pool = mysql.createPool({
	connectionLimit: dbConfig.connectionLimit,
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	port: dbConfig.port,
	database: dbConfig.database
});
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
				connection.release();
				reject(err)
			} else {
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
				resolve(result)
			}
		})
	})
};

export { query }
