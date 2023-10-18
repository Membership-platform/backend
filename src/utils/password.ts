import bcrypt from 'bcryptjs'

import { SALT_ROUNDS } from 'src/constants/common'

export const hashPassword = (password: string, saltRound?: number) =>
	bcrypt.hashSync(password, bcrypt.genSaltSync(saltRound ?? SALT_ROUNDS))

export const comparePassword = (password: string, hashedPassword: string) =>
	bcrypt.compareSync(password, hashedPassword)

export const validate = (input: string, required = '') => {
	let errors: any[] = []

	if (!input && !required) {
		return []
	}
	if (
		input.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,25}$/) &&
		input.match(/[ \\,;:"!#$@*%&'+-/=?^_`{|}~]/)
	) {
		return []
	}

	errors = [
		...errors,
		'Your password should have a minimum 8 and maximum of 25 characters, it must include at least one upper case letter, one lower case letter, one numeric digit and one special character (*&^!%$@#)',
	]

	return errors
}
