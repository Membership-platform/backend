import { Model, Sequelize, DataTypes, ModelStatic } from 'sequelize'

export interface EventAttributes {
	id?: number
	status?: string
	userId?: number
	reportId?: number
	operator?: string
	createdAt?: Date
	updatedAt?: Date
}

module.exports = (sequelize: Sequelize) => {
	/**
	 * Event Model
	 */
	class Payment extends Model<EventAttributes> implements EventAttributes {
		public readonly id!: number

		status?: string
		userId?: number
		reporId?: number
		operator?: string

		public readonly createdAt!: Date

		public readonly updatedAt!: Date

		/**
		 * @param {object} models
		 * @return {void}
		 */

		static associate(models: {
			User: ModelStatic<Model<any, any>>
			Report: ModelStatic<Model<any, any>>
		}) {
			// Define association here
			Payment.belongsTo(models.User, {
				as: 'user',
				foreignKey: 'userId',
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			})
			Payment.belongsTo(models.Report, {
				as: 'report',
				foreignKey: 'reportId',
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			})
		}
	}

	Payment.init(
		{
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
		},
		{
			sequelize,
			modelName: 'Payment',
			tableName: 'payments',
		},
	)
	return Payment
}
