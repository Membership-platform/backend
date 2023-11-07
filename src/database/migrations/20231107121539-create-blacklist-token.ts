import { QueryInterface, DataTypes } from 'sequelize'
module.exports = {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable('BlacklistTokens', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: new DataTypes.INTEGER(),
			},
			token: {
				type: new DataTypes.STRING(),
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
	async down(queryInterface: QueryInterface) {
		await queryInterface.dropTable('BlacklistTokens')
	},
}
