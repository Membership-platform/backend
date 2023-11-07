import { Request, Response, NextFunction } from 'express'
import * as status from 'src/constants/httpStatusCodes'
import db from 'src/database/models'

const { User } = db

/**
 * @param {object} req Request to the route
 * @param {object} res Response from Sserver
 * @param {object} next middleware called to pass after success
 * @returns {object} returned response
 */
export default async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<any> => {
	let input = {}
	if (req.params && req.params.id) {
		;(<any>input).id = req.params.id
	}

	const findUser = await User.findOne({ where: { id: (<any>input)?.id } })

	if (findUser == null) {
		return res.status(status.HTTP_UNAUTHORIZED).json({
			errors: {
				account: `user "${
					(<any>input).email || (<any>input).id || (<any>input).username
				}" does not exist`,
			},
		})
	}

	if (Object.keys(findUser?.dataValues).length > 0) {
		next()
	}
}
