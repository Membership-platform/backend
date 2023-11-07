import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
	up: async (queryInterface: QueryInterface) => {
		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: new DataTypes.INTEGER(),
			},
			firstName: {
				type: new DataTypes.STRING(),
			},
			email: {
				type: new DataTypes.STRING(),
				unique: true,
			},
			password: {
				type: new DataTypes.STRING(),
			},
			phone: {
				type: new DataTypes.STRING(),
				allowNull: false,
				unique: true,
			},
			verified: {
				type: new DataTypes.BOOLEAN(),
			},
			admin: {
				type: new DataTypes.BOOLEAN(),
				defaultValue: false,
			},
			country: {
				type: new DataTypes.STRING(),
				allowNull: false,
			},
			language: {
				type: new DataTypes.STRING(),
				allowNull: true,
			},
			authConfirmToken: {
				type: new DataTypes.STRING(),
			},
			roleId: {
				type: new DataTypes.INTEGER(),
				allowNull: false,
			},
			institutionId: {
				type: new DataTypes.INTEGER(),
				allowNull: false,
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
		await queryInterface.dropTable('users')
	},
}
