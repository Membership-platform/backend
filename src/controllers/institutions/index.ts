import { Response } from 'express'
import db from 'src/database/models'
import * as status from 'src/constants/httpStatusCodes'
import * as errorMessages from 'src/constants/errorMessages'

const { Institution } = db

export default class InstitutionController {
	/**
	 * @description method to find all Institutions
	 * @param {object} req genre request object
	 * @param {object} res response object from server
	 * @returns {object} return a user object
	 */
	static async getAll(_: any, res: Response): Promise<Response> {
		const fetchInstitutions = await Institution.findAll()

		return fetchInstitutions.length
			? res.status(status.HTTP_OK).json({
					status: status.HTTP_OK,
					institutions: fetchInstitutions,
			  })
			: res
					.status(status.HTTP_NOT_FOUND)
					.json({ errors: { genres: errorMessages.NOT_FOUND } })
	}
}
