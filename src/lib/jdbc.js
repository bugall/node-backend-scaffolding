import mysql from 'mysql'
import { dbConfig } from '../config/index.js'
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
const query = function(query, params) {
	var defer = Promise.defer();
	params = params || {};
	pool.getConnection(function(err, connection) {
		if (err) {
			if (connection) {
				connection.release();
			}
			return defer.reject(err);
		}
		connection.query(query, params, function(err, results){
			if (err) {
				if (connection) {
					connection.release();
				}
				return defer.reject(err);
			}
			connection.release();
			defer.resolve(results);
		});
	});
	return defer.promise;
};

export { query }
