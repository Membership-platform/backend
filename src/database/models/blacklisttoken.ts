// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class BlacklistToken extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }

//   }
//   BlacklistToken.init({
//     token: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'BlacklistToken',
//   });
//   return BlacklistToken;
// };

import { Model, Sequelize, DataTypes, ModelStatic } from 'sequelize'

export interface EventAttributes {
	id?: number
	token?: string
	userId?: number
	createdAt?: Date
	updatedAt?: Date
}

module.exports = (sequelize: Sequelize) => {
	/**
	 * Event Model
	 */
	class BlackListToken
		extends Model<EventAttributes>
		implements EventAttributes
	{
		public readonly id!: number

		token?: string

		userId?: number

		public readonly createdAt!: Date

		public readonly updatedAt!: Date

		/**
		 * @param {object} models
		 * @return {void}
		 */

		static associate(models: { User: ModelStatic<Model<any, any>> }) {
			// Define association here
			BlackListToken.belongsTo(models.User, {
				as: 'user',
				foreignKey: 'userId',
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			})
		}
	}

	BlackListToken.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: new DataTypes.INTEGER(),
			},
			token: {
				type: new DataTypes.STRING(),
				allowNull: false,
				unique: true,
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
			modelName: 'BlacklistToken',
			tableName: 'blacklisttoken',
		},
	)
	return BlackListToken
}
