import { Request, Response, NextFunction } from 'express'
import * as status from 'src/constants/httpStatusCodes'
import db from 'src/database/models'

const { User } = db

/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} ress
 * @param {void} next
 * @returns {void}
 */
export default async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<any> => {
	const id = (<any>req).user ? (<any>req).user.id : 0

	const requestUser = await User.findOne({ where: { id, roleId: 1 } })

	if (!requestUser) {
		return res.status(status.HTTP_ACCESS_DENIED).json({
			message: 'Permission denied, you are not allowed to perform this action',
		})
	}
	return next()
}
