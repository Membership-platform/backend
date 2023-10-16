import { QueryInterface } from 'sequelize/types'

module.exports = {
	up: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkInsert(
			'roles',
			[
				{
					name: 'admin',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'normal',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		)
	},

	down: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkDelete('roles', {}, {})
	},
}
