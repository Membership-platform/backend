import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
	up: async (queryInterface: QueryInterface) => {
		await queryInterface.createTable('reports', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: new DataTypes.INTEGER(),
			},
			status: {
				type: new DataTypes.ENUM('pending', 'approved', 'rejected'),
				allowNull: false,
				defaultValue: 'pending',
			},
			userId: {
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
		await queryInterface.dropTable('reports')
	},
}
