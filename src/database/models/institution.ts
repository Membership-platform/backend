import { Model, Sequelize, DataTypes } from 'sequelize'

export interface EventAttributes {
	id?: number
	name?: string
	createdAt?: Date
	updatedAt?: Date
}

module.exports = (sequelize: Sequelize) => {
	/**
	 * Institution Model
	 */
	class Institution extends Model<EventAttributes> implements EventAttributes {
		public readonly id!: number

		name?: string

		public readonly createdAt!: Date

		public readonly updatedAt!: Date

		/**
		 * @param {object} models
		 * @return {void}
		 */

		static associate() {
			// Define association here
		}
	}

	Institution.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: new DataTypes.INTEGER(),
			},
			name: {
				type: new DataTypes.STRING(),
				allowNull: false,
				unique: true,
			},
			createdAt: {
				allowNull: false,
				type: new DataTypes.DATE(),
			},
			updatedAt: {
				allowNull: false,
				type: new DataTypes.DATE(),
			},
		},
		{
			sequelize,
			modelName: 'Institution',
			tableName: 'institutions',
		},
	)
	return Institution
}
