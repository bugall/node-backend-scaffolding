import { query } from '../lib/dbConnection'

/**
 * Get user widgets
 * @param  {String} userId
 * @return {Promise}
 */

const getUser = async function(id) {
	return await query('SELECT * FROM user WHERE id =?', [id])
};

const createUser = async function(name, password) {
	return await query('INSERT INTO user (name, password) VALUES(?, ?)', [name, password])
};

const userModel = { getUser, createUser }

export default userModel
