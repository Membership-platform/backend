import { Request, Response, NextFunction } from 'express'
import db from 'src/database/models/'
import { decode } from '../utils/tokens'
import {
	DELETED_ACCOUNT,
	INVALID_TOKEN,
	TOKEN_REQUIRED,
} from '../constants/errorMessages'
import { HTTP_UNAUTHORIZED } from '../constants/httpStatusCodes'
import 'dotenv/config'

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
	let token = req.header('x-access-token') || req.header('Authorization')
	if (!token) {
		return res.status(HTTP_UNAUTHORIZED).json({
			status: HTTP_UNAUTHORIZED,
			message: TOKEN_REQUIRED,
		})
	}
	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length)
	}
	try {
		const decoded = decode(token)
		const decodedUser = decoded.decoded as Record<string, number>

		const user = await User.findOne({ where: { id: Number(decodedUser.id) } })

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