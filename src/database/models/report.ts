import { Model, Sequelize, DataTypes, ModelStatic } from 'sequelize'

export interface EventAttributes {
	id?: number
	status?: string
	userId?: number
	createdAt?: Date
	updatedAt?: Date
}

module.exports = (sequelize: Sequelize) => {
	/**
	 * Event Model
	 */
	class Report extends Model<EventAttributes> implements EventAttributes {
		public readonly id!: number

		status?: string
		userId?: number

		public readonly createdAt!: Date

		public readonly updatedAt!: Date

		/**
		 * @param {object} models
		 * @return {void}
		 */

		static associate(models: {
			User: ModelStatic<Model<any, any>>
			Payment: ModelStatic<Model<any, any>>
		}) {
			// Define association here
			Report.belongsTo(models.User, {
				as: 'user',
				foreignKey: 'userId',
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			})
			Report.hasMany(models.Payment, {
				as: 'report',
				foreignKey: 'reportId',
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			})
		}
	}

	Report.init(
		{
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
		},
		{
			sequelize,
			modelName: 'Report',
			tableName: 'reports',
		},
	)
	return Report
}
