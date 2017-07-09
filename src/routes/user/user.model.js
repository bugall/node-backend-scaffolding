import { query } from '../../lib/dbConnection'

/**
 * Get user widgets
 * @param  {String} userId
 * @return {Promise}
 */

export default class {
    constructor() {}
    static async getUserById(id) {
        return await query('SELECT * FROM user WHERE id =?', [id])
    }
    static async createUser(username, password) {
        return await query('INSERT INTO user (name, password) VALUES(?, ?)', [username, password])
    }
    static async getUserInfoByUsername(username) {
        return await query('SELECT password FROM user WHERE name = ? limit 1' , [username])
    }
}
