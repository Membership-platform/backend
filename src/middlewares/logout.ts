import { Request, Response } from 'express'
import db from 'src/database/models'
import * as status from 'src/constants/httpStatusCodes'

const { Token } = db

export default async (req: Request, res: Response) => {
	const token = req.headers['access-token'] || req.params.token || null

	const savedToken = await Token.bulkCreate(
		[{ token, userId: (<any>req).user.id }],
		{
			returning: true,
		},
	)

	if (savedToken.errors) {
		return res
			.status(status.HTTP_SERVER_ERROR)
			.json({ errors: 'Oops, something went wrong, please try again!' })
	}

	await Token.destroy({ where: { userId: (<any>req).user.id } })

	return res
		.status(status.HTTP_OK)
		.json({ message: 'you are successfully logged out' })
}
