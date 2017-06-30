import { query } from '../lib/dbConnection'

/**
 * Get user widgets
 * @param  {String} userId
 * @return {Promise}
 */

const User = {}
User.getUser = async function(id) {
	return await query('SELECT * FROM user WHERE userId =?', [userId])
};

User.createUser = async function(name, password) {
	return await query('INSERT INTO tbl_name (name, password) VALUES(?, ?)', [name, password])
};

export { getUser, createUser }
