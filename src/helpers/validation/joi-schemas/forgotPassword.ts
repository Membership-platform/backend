import Joi from 'joi'
import * as validate from '..'

const emailValidator: any = (
	value: string,
	helpers: { message: (arg0: string | boolean) => any },
) => {
	const checkEmail = validate.email(value, true)
	return checkEmail === true ? true : helpers?.message(checkEmail)
}

export default Joi.object().keys({
	email: Joi.string().required().custom(emailValidator),
})
