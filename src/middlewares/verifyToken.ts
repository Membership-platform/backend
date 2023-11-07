import { Request, Response, NextFunction } from 'express'
import db from 'src/database/models/'
import jwt from 'jsonwebtoken'
import { decode } from '../utils/tokens'
import {
	DELETED_ACCOUNT,
	INVALID_TOKEN,
	SESSION_EXPIRED,
	TOKEN_REQUIRED,
} from '../constants/errorMessages'
import { HTTP_UNAUTHORIZED } from '../constants/httpStatusCodes'
import 'dotenv/config'

import dotenv from 'dotenv'

dotenv.config()

const { User } = db

/**
 * @param {object} req express request
 * @param {object} res express response
 * @returns {number} userid
 */

const auth = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<any> => {
	try {
		let token = req.headers['cookie']

		// let token = req.cookies.access_token
		if (!token) {
			return res.status(HTTP_UNAUTHORIZED).json({
				status: HTTP_UNAUTHORIZED,
				message: TOKEN_REQUIRED,
			})
		}

		const cookie = token.split('=')[1]

		const decoded = decode(cookie)

		const decodedUser = decoded.decoded as Record<string, number>

		const { id } = decodedUser

		const user = await User.findOne({ where: { id } })

		if (user?.get()?.id) {
			;(<any>req).user = user.get()
			return next()
		}
		return res.status(HTTP_UNAUTHORIZED).json({
			status: HTTP_UNAUTHORIZED,
			message: DELETED_ACCOUNT,
		})
	} catch (err) {
		return res.status(HTTP_UNAUTHORIZED).json({
			status: HTTP_UNAUTHORIZED,
			message: INVALID_TOKEN,
		})
	}
}

export default auth
