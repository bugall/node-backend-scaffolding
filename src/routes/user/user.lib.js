import crypto from 'crypto'

export default class {
    constructor(){}
    static passwordEncrypt(password) {
        const hash = crypto.createHash('md5')
        return hash.update(password).digest('hex')
    }
}