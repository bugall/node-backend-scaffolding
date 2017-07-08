const dbConfig = {
	"mysql": {
		"host" : "localhost",
		"port" : 3306,
		"user" : "root",
		"password" : "nijiaoa",
		"database" : "test",
		"connectionLimit" : 100
	}
}

const server = {
	port: 3000
}

const logConfig = {
	path: '/var/log'
}

export { dbConfig, server, logConfig}
