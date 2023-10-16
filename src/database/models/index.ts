import 'dotenv/config'
import fs from 'fs'
import path from 'path'
const { Sequelize } = require('sequelize')

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

const dbConfig = require('../config')

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const db = {} as Record<string, any>
const config = dbConfig[env]

const { database, username, password, ...options } = config

const sequelize = new Sequelize(database, username, password, options)

fs.readdirSync(__dirname)
	.filter(
		(file) =>
			file.indexOf('.') !== 0 &&
			file !== basename &&
			(file.slice(-3) === '.js' || file.slice(-3) === '.ts'),
	)
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(sequelize)
		db[model.name] = model
	})

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize

export default db
