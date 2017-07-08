import { query } from '../lib/dbConnection'

/**
 * Get user widgets
 * @param  {String} userId
 * @return {Promise}
 */

const getUserById = async function(id) {
	return await query('SELECT * FROM user WHERE id =?', [id])
};

const createUser = async function(name, password) {
	return await query('INSERT INTO user (name, password) VALUES(?, ?)', [name, password])
};

const getUserInfoByUsername = async function(username) {
	return await query('SELECT password FROM user WHERE name = ? limit 1' , [username])
}

const userModel = { 
	getUserById, 
	createUser,
	getUserInfoByUsername,
}

export default userModel
