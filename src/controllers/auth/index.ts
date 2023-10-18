import { Request, Response } from 'express'
import * as tokens from 'src/utils/tokens'
import * as status from 'src/constants/httpStatusCodes'
import * as errorMessages from 'src/constants/errorMessages'
import * as successMessages from 'src/constants/successMessages'
import signup from 'src/helpers/mailer/templates/signup'

import db from 'src/database/models'
import Transporter from 'src/helpers/nodeMailer'

const { User } = db

export default class AuthController {
	/**
	 * @description user signup function
	 * @param {object} req request from user
	 * @param {object} res response from server
	 * @return {object} user information & token
	 */
	static async signup(req: Request, res: Response): Promise<Response> {
		const code = Math.floor(10000 + Math.random() * 90000)

		const newUser = await User.create({
			email: req.body.email,
			password: req.body.password,
			phone: req.body.phone,
			authConfirmToken: code,
		})

		return (
			(await Transporter.sendMail({
				from: '"Membership Platform 👻" <test@gmail.com>', // sender address
				to: req.body.email, // list of receivers
				subject: 'Hello ✔', // Subject line
				text: 'Confirmation Code', // plain text body
				html: signup(newUser.get().authConfirmToken), // html body
			})) &&
			res.status(status.HTTP_CREATED).json({
				status: status.HTTP_CREATED,
				message: successMessages.CREATED,
				user: { ...newUser.get(), password: undefined },
			})
		)
	}

	/**
	 * @description - login user function
	 * @param {object} req
	 * @param {object} res
	 * @return {Promise} response object
	 */
	static async login(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body
		const user = await User.findOne({ where: { email } })

		if (!user?.get()?.email) {
			return res.status(status.HTTP_NOT_FOUND).json({
				status: status.HTTP_NOT_FOUND,
				message: errorMessages.EMAIL_NOT_FOUND,
			})
		}

		if (!(await user.comparePassword(password))) {
			return res.status(status.HTTP_UNAUTHORIZED).json({
				status: status.HTTP_UNAUTHORIZED,
				message: errorMessages.BAD_CREDENTIALS,
			})
		}

		if (!user.get().verified) {
			return res.status(status.HTTP_UNAUTHORIZED).json({
				status: status.HTTP_UNAUTHORIZED,
				message: errorMessages.ACCOUNT_NOT_VERIFIED,
			})
		}

		const payload = {
			id: user.get().id,
			role: user.get().roleId,
			email: user.get().email,
		}

		const token = tokens.generate(payload)

		res.cookie('access_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		})

		return res.status(status.HTTP_OK).json({
			status: status.HTTP_OK,
			message: successMessages.SIGNED_IN,
			user: { ...user.get(), password: undefined },
		})
	}

	/**
	 * @description - logout user function
	 * @param {object} req
	 * @param {object} res
	 * @return {Promise} response object
	 */
	static async logout(_: any, res: Response): Promise<Response> {
		return res.clearCookie('access_token').status(status.HTTP_OK).json({
			status: status.HTTP_OK,
			message: successMessages.SIGNED_OUT,
		})
	}
}
