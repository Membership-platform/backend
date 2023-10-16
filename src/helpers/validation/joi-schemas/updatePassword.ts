import Joi from 'joi'

import * as validate from '..'

const passwordValidator: any = (
	value: string,
	helpers: { message: (arg0: string | boolean) => any },
) => {
	const checkPassword = validate.password(value, true)
	return checkPassword === true ? true : helpers?.message(checkPassword)
}

export default Joi.object().keys({
	password: Joi.string().required().custom(passwordValidator),
	confirmPassword: Joi.string().required().custom(passwordValidator),
})
