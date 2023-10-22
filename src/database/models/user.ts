import { Model, Sequelize, DataTypes, ModelStatic } from 'sequelize'

import { comparePassword, hashPassword } from 'src/utils/password'

export interface UserAttributes {
	id: number
	email?: string
	password?: string
	verified?: string
	country?: string
	language?: string
	phone?: string
	admin?: boolean
	authConfirmToken?: string
	roleId?: number
	institutionId?: number
	createdAt?: Date
	updatedAt?: Date
}

module.exports = (sequelize: Sequelize) => {
	/**
	 * User model
	 */
	class User extends Model<UserAttributes> implements UserAttributes {
		customGet() {
			throw new Error('Method not implemented.')
		}
		// static beforeBulkUpdate = async (arg0: (_user: User) => Promise<void>) => {
		// 	throw new Error('Method not implemented.')
		// }
		// static beforeCreate = async (arg0: (_user: User) => Promise<void>) => {
		// 	throw new Error('Method not implemented.')
		// }
		public readonly id!: number

		email?: string

		password?: string

		phone?: string

		verified?: string

		country?: string

		language?: string

		admin?: boolean

		authConfirmToken?: string

		roleId?: number

		institutionId?: number

		public readonly createdAt!: Date

		public readonly updatedAt!: Date

		public comparePassword!: (password: string) => Promise<boolean>

		/**
		 * @param {object} models
		 * @return {void}
		 */
		static associate(models: {
			Role: ModelStatic<Model<any, any>>
			Institution: ModelStatic<Model<any, any>>
			Report: ModelStatic<Model<any, any>>
			Payment: ModelStatic<Model<any, any>>
		}) {
			User.belongsTo(models.Role, {
				as: 'role',
				foreignKey: 'roleId',
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			})
			User.belongsTo(models.Institution, {
				as: 'institution',
				foreignKey: 'institutionId',
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			})
			User.hasMany(models.Report, {
				as: 'user',
				foreignKey: 'userId',
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			})
			User.hasMany(models.Payment, {
				as: 'payment',
				foreignKey: 'userId',
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			})
		}
	}

	User.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: new DataTypes.INTEGER(),
			},
			email: {
				type: new DataTypes.STRING(),
				allowNull: false,
				unique: true,
			},
			password: {
				type: new DataTypes.STRING(),
				allowNull: false,
			},
			phone: {
				type: new DataTypes.STRING(),
				allowNull: false,
				unique: true,
			},
			verified: {
				type: new DataTypes.BOOLEAN(),
				defaultValue: false,
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
				defaultValue: 2,
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
		},
		{
			sequelize,
			freezeTableName: true,
			modelName: 'User',
			tableName: 'users',
		},
	)

	User.beforeCreate(async (_user: any) => {
		const user = _user
		if (user.password) {
			user.password = await hashPassword(user.password)
		}
	})

	User.beforeBulkUpdate(async (_user) => {
		const { attributes } = _user as any
		if (attributes.password) {
			attributes.password = await hashPassword(attributes.password)
		}
	})

	User.prototype.comparePassword = async function compareUserPassword(
		password,
	) {
		return comparePassword(password, this.get().password as string)
	}
	return User
}
