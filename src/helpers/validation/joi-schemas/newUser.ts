import Joi from 'joi'

import * as validate from '..'

// const nameValidator =
// 	(label: any) =>
// 	(value: any, helpers: { message: (arg0: string | boolean) => any }) => {
// 		const checkEmail = validate.name({ name: value, required: true, label })
// 		return checkEmail === true ? true : helpers?.message(checkEmail)
// 	}

const emailValidator: any = (
	value: string,
	helpers: { message: (arg0: string | boolean) => any },
) => {
	const checkEmail = validate.email(value, true)
	return checkEmail === true ? true : helpers?.message(checkEmail)
}

const passwordValidator: any = (
	value: string,
	helpers: { message: (arg0: string | boolean) => any },
) => {
	const checkPassword = validate.password(value, true)
	return checkPassword === true ? true : helpers?.message(checkPassword)
}

export default Joi.object().keys({
	email: Joi.string().required().custom(emailValidator),
	password: Joi.string().required().custom(passwordValidator),
	phone: Joi.string().required(),
	country: Joi.string().required(),
	institutionId: Joi.number().required(),
})
