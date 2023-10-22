import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
	up: async (queryInterface: QueryInterface) => {
		await queryInterface.createTable('payments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: new DataTypes.INTEGER(),
			},
			status: {
				type: new DataTypes.STRING(),
			},
			operator: {
				type: new DataTypes.STRING(),
			},
			userId: {
				type: new DataTypes.INTEGER(),
			},
			reportId: {
				type: new DataTypes.INTEGER(),
			},
			createdAt: {
				allowNull: false,
				type: new DataTypes.DATE(),
			},
			updatedAt: {
				allowNull: false,
				type: new DataTypes.DATE(),
			},
		})
	},
	down: async (queryInterface: QueryInterface) => {
		await queryInterface.dropTable('payments')
	},
}
