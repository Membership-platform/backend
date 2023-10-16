import { Request, Response, NextFunction } from 'express'
import db from 'src/database/models/'
import * as status from 'src/constants/httpStatusCodes'
import * as errorMessages from 'src/constants/errorMessages'

const { User } = db

export default async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<any> => {
	let [isEmailUsed, isSameOldEmail] = [false, false]
	;(<any>req).changeEmail = { newEmail: '', message: '' }

	if (req.body.email) {
		const findUser = await User.findOne({ where: { email: req.body.email } })

		if (findUser == null) {
			next()
		}

		if (!findUser.errors && Object.keys(findUser).length > 0) {
			isEmailUsed = (<any>req).user.id !== findUser.id
			isSameOldEmail = req.body.email === findUser.email
		}
		if (!isSameOldEmail) {
			;(<any>req).changeEmail.newEmail = req.body.email
		}
		delete req.body.email
	}

	return (
		(isEmailUsed &&
			res
				.status(status.HTTP_EXIST)
				.json({ errors: { email: errorMessages.EMAIL_ALREADY_USED } })) ||
		next()
	)
}
