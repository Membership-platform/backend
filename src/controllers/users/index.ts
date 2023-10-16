import { Response } from 'express'
import db from '../../database/models'
import * as status from '../../constants/httpStatusCodes'
import * as errorMessages from '../../constants/errorMessages'

const { User, Genre, Role, Subscription } = db

export default class userController {
	/**
	 * @description method to find all Users
	 * @param {object} req genre request object
	 * @param {object} res response object from server
	 * @returns {object} return a user object
	 */
	static async getAll(_: any, res: Response): Promise<Response> {
		const fetchUsers = await User.findAll({
			include: [
				{ model: Genre, as: 'genre' },
				{ model: Role, as: 'role' },
				{ model: Subscription, as: 'subscription' },
			],
		})

		const fetch = fetchUsers.map((user: { dataValues: { password: any } }) => {
			return delete user.dataValues.password && user.dataValues
		})

		return fetchUsers.length
			? res.status(status.HTTP_OK).json({
					status: status.HTTP_OK,
					users: fetch,
			  })
			: res
					.status(status.HTTP_NOT_FOUND)
					.json({ errors: { genres: errorMessages.NOT_FOUND } })
	}
}
