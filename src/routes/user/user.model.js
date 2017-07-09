import { exec } from '../../lib/dbConnection'

export default class {
  constructor() { }
  static async getUserById(id) {
    return await exec('SELECT * FROM user WHERE id =?', [id])
  }
  static async createUser(username, password) {
    return await exec('INSERT INTO user (name, password) VALUES(?, ?)', [username, password])
  }
  static async getUserInfoByUsername(username) {
    return await exec('SELECT password FROM user WHERE name = ? limit 1', [username])
  }
}
