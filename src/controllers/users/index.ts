import { Response } from 'express'
import db from 'src/database/models'
import * as status from 'src/constants/httpStatusCodes'
import * as errorMessages from 'src/constants/errorMessages'
import { decode } from 'src/utils/tokens'
import { hashPassword, validate } from 'src/utils/password'
import { REMOVED, UPDATED } from 'src/constants/successMessages'

const { User, Role } = db

export default class userController {
	/**
	 * @description method to find all Users
	 * @param {object} req genre request object
	 * @param {object} res response object from server
	 * @returns {object} return a user object
	 */
	static async getAll(_: any, res: Response): Promise<Response> {
		const fetchUsers = await User.findAll({
			include: [{ model: Role, as: 'role' }],
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

	/**
	 * @description User update Password function
	 * @param {object} req
	 * @param {object} res
	 * @return {Promise} response object
	 */

	/**
	 * @param  {object} req Forgot Password
	 * @param  {object} res
	 * @return {object} return an object containing the confirmation message
	 */
	static async sendEmail(req: Request, res: Response): Promise<Response> {
		const { email } = (<any>req).body
		const result = await User.findOne({ where: { email } }) // check if the email exist
		if (Object.keys(result).length <= 0) {
			return res.status(status.HTTP_NOT_FOUND).json({
				errors: 'email not found..',
			})
		}

		// await helper.sendMail(email, 'resetPassword', {
		// 	email,
		// 	Identifier: `${email}`,
		// }) // send mail

		return res.status(status.HTTP_OK).json({
			message: 'Email sent, please check your email',
		})
	}

	static async updatePassword(req: Request, res: Response): Promise<Response> {
		const token = (<any>req).cookies.access_token

		const { newPassword, confirmNewPassword } = (<any>req).body

		if (newPassword !== confirmNewPassword) {
			return res
				.status(status.HTTP_BAD_REQUEST)
				.json({ errors: 'Passwords are not matching' })
		}

		if (!newPassword || !confirmNewPassword) {
			return res
				.status(status.HTTP_BAD_REQUEST)
				.json({ errors: 'the password can not be empty' })
		}

		const isPasswordValid = validate(newPassword, 'required')
		const isPasswordValidTwo = validate(confirmNewPassword, 'required')

		if (isPasswordValid.length || isPasswordValidTwo.length) {
			return res
				.status(status.HTTP_BAD_REQUEST)
				.json({ message: isPasswordValid[0] })
		}

		const { email } = decode(token) as any

		const updateUser = await User.update(
			{ password: hashPassword(newPassword) },
			{
				where: { email },
				returning: true,
				plain: true,
			},
		)

		return res.status(status.HTTP_OK).json({
			status: status.HTTP_OK,
			message: UPDATED,
			user: { ...updateUser[1].dataValues, password: undefined },
		})
	}

	/**
	 * @description method to find one user or company
	 * @param {object} req user request object
	 * @param {object} res response object from server
	 * @returns {object} return a user or company
	 */
	static async getOne(req: Request, res: Response): Promise<Response> {
		const id = Number.parseInt((<any>req).params.id, 10)

		const fetchUser = await User.findOne({ where: { id } })

		return fetchUser?.get()
			? res.status(status.HTTP_OK).json({
					status: status.HTTP_OK,
					user: { ...fetchUser.get(), password: undefined },
			  })
			: res
					.status(status.HTTP_NOT_FOUND)
					.json({ errors: { user: errorMessages.USER_NOT_FOUND } })
	}

	/**
	 * @description method to find one user or company
	 * @param {object} req user request object
	 * @param {object} res response object from server
	 * @returns {object} return a user or company
	 */
	static async confirm(req: Request, res: Response): Promise<Response> {
		const { authConfirmToken } = (<any>req).body

		const getCode = await User.findOne({ where: { authConfirmToken } })

		if (!getCode) {
			return res.status(status.HTTP_NOT_FOUND).json({
				status: status.HTTP_NOT_FOUND,
				message: errorMessages.NOT_FOUND,
			})
		}

		const updateUser = await User.update(
			{ verified: true, authConfirmToken: null },
			{
				where: {
					authConfirmToken,
				},
			},
		)

		return res.status(status.HTTP_OK).json({
			status: status.HTTP_OK,
			message: errorMessages.ACTIVATED,
			updateUser,
		})
	}

	/**
	 * @description delete Use
	 * @param {object} req
	 * @param {object} res
	 * @return {Promise} response object
	 */
	static async DeleteUser(req: any, res: any): Promise<Response> {
		const id = (<any>req).params.id

		const fetchUser = await User.findOne({ where: { id } })

		if (!fetchUser) {
			return res.status(status.HTTP_BAD_REQUEST).json({
				status: status.HTTP_BAD_REQUEST,
				message: errorMessages.NOT_FOUND,
			})
		}
		await User.destroy({ where: { id } })
		return res.status(status.HTTP_OK).json({
			status: status.HTTP_OK,
			message: REMOVED,
		})
	}

	/**
	 * @description Update User
	 * @param {object} req
	 * @param {object} res
	 * @return {Promise} response object
	 */
	static async UpdateUser(req: any, res: any): Promise<Response> {
		const id = (<any>req).params.id

		const fetchUser = await User.findOne({ where: { id } })

		if (!fetchUser) {
			return res.status(status.HTTP_BAD_REQUEST).json({
				status: status.HTTP_BAD_REQUEST,
				message: errorMessages.NOT_FOUND,
			})
		}

		const updateUser = await User.update(req.body, { where: { id } })

		return res.status(status.HTTP_OK).json({
			status: status.HTTP_OK,
			message: errorMessages.ACCOUNT_UPDATED,
			updateUser,
		})
	}
}
