import { Request, Response, NextFunction } from 'express'

import errorHandler from 'src/helpers/errorHandler'

export default (
		controller: (
			req: Request,
			res: Response,
			next: NextFunction,
		) => Promise<Response>,
	) =>
	async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response> => {
		try {
			const result = await controller(req, res, next)
			return result
		} catch (err: any) {
			const error: any = errorHandler(err)
			return res
				.status(error.code)
				.json({
					status: error.code,
					message: error.message,
					errors: error.errors,
				})
		}
	}
