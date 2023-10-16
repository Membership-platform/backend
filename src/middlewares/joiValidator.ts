import { Request, Response } from 'express'
import { HTTP_BAD_REQUEST } from '../constants/httpStatusCodes'
import { BAD_REQUEST } from '../constants/errorMessages'

export default (schema: {
		validate: (
			arg0: any,
			arg1: { abortEarly: boolean },
		) => PromiseLike<{ error: any }> | { error: any }
	}) =>
	async (req: Request, res: Response) => {
		const { error } = await schema.validate(req.body, { abortEarly: false })
		if (error) {
			const errors: { key: any; type: any; message: any }[] = []
			error.details.forEach(
				(value: {
					context: { key: any; label: any }
					type: any
					message: string
				}) => {
					errors.push({
						key: value.context?.key || value.context?.label,
						type: value.type,
						message: value.message.replace(/"/g, ''),
					})
				},
			)
			return res
				.status(HTTP_BAD_REQUEST)
				.json({ status: HTTP_BAD_REQUEST, message: BAD_REQUEST, errors })
		}
		return next()
	}
function next() {
	throw new Error('Function not implemented.')
}
