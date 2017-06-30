import { query } from '../lib/dbConnection'

/**
 * Get user widgets
 * @param  {String} userId
 * @return {Promise}
 */

const User = {}
User.getUser = async function(id) {
	return await query('select * from user where userId =?', [userId])
};
export default User
