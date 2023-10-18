import { QueryInterface } from 'sequelize/types'

module.exports = {
	up: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkInsert(
			'institutions',
			[
				{
					name: 'valuers',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'surveyors',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'urban planners',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'architecte',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		)
	},

	down: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkDelete('institutions', {}, {})
	},
}
