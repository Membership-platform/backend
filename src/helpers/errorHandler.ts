import {
	HTTP_EXIST,
	HTTP_SERVER_ERROR,
	HTTP_BAD_REQUEST,
} from '../constants/httpStatusCodes'
import { CONFLICT, UNEXPECTED_ERROR } from '../constants/errorMessages'

/**
 * @param {object} err
 * @returns {object} an object containing descriptive error messages
 */
export default (err = {}) => {
	const errors: { key: any; message: any }[] = []
	switch ((<any>err).name) {
		case 'SequelizeUniqueConstraintError':
			Object.keys((<any>err).fields).forEach((key) => {
				errors.push({
					key,
					message: `${key} "${(<any>err).fields[key]}" ${CONFLICT}`,
				})
			})
			return { code: HTTP_EXIST, message: (<any>err).message, errors }
		case 'SequelizeValidationError':
			;(<any>err).errors.forEach((error: { path: any; message: any }) => {
				errors.push({ key: error.path, message: error.message })
			})
			return { code: HTTP_BAD_REQUEST, message: (<any>err).message, errors }
		case 'SequelizeBulkRecordError':
			;(<any>err).errors.errors.forEach(
				(error: { path: any; message: any }) => {
					errors.push({ key: error.path, message: error.message })
				},
			)
			return { code: HTTP_BAD_REQUEST, message: (<any>err).message, errors }
		default:
			return {
				code:
					((<any>err).extensions && (<any>err).extensions.code) ||
					HTTP_SERVER_ERROR,
				message: (<any>err).message || UNEXPECTED_ERROR,
				errors,
			}
	}
}
