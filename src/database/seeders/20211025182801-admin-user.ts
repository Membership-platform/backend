import { QueryInterface } from 'sequelize/types'
const bcrypt = require('bcryptjs')

const hashPassword = (password: string) => bcrypt.hashSync(password)

module.exports = {
	up: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkInsert(
			'users',
			[
				{
					email: 'admin@admin.admin',
					password: hashPassword('admin'),
					phone: '00000000',
					country: 'Rwanda',
					language: 'English',
					roleId: 1,
					institutionId: 2,
					verified: true,
					admin: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		)
	},

	down: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkDelete('users', {}, {})
	},
}
