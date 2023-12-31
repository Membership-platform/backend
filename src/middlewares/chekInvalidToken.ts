import { Request, Response, NextFunction } from 'express'
import db from '../database/models'
import { decode } from '../utils/tokens'
import * as status from '../constants/httpStatusCodes'
import 'dotenv/config'

const { Token } = db

/**
 * @param {object} req express request
 * @param {object} res express response
 * @returns {number} userid
 */

const checkInvalidToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<any> => {
	let token: any = req.header('access-token') || req.header('Authorization')

	const decoded = decode(token)
	const { id } = decoded.decoded as Record<string, number>

	const isLoggedout = await Token.findOne({
		where: { userId: id, token },
	})

	if (isLoggedout === null) {
		next()
	}

	if (Object.keys(isLoggedout?.dataValues).length) {
		return res
			.status(status.HTTP_UNAUTHORIZED)
			.json({ errors: { token: 'This token is invalid' } })
	}
}

export default checkInvalidToken
